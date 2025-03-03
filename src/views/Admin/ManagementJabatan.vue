<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 min-h-screen p-6 ml-10" :class="isSidebarOpen ? 'ml-52' : 'ml-0'">
            <!-- Page Header -->
            <div class="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Management Jabatan
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Kelola jabatan untuk tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Form Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-red-700 mb-4">Tambah Jabatan</h2>
                <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Nama Jabatan</label>
                        <input type="text" v-model="jabatan.nama" class="w-full p-2 border rounded-md"
                            placeholder="Nama Jabatan" required />
                    </div>
                    <div>
                        <label class="text-gray-700 font-medium">Provinsi :</label>
                        <select v-model="jabatan.selectedWilayah" class="w-full p-2 border rounded-md"
                            @change="jabatan.selectedDaerah = 0" required>
                            <option :value="0" disabled>Semua Provinsi</option>
                            <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah">
                                {{ wilayah.nama_wilayah }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Jumlah Personil</label>
                        <input type="number" v-model="jabatan.maksimumAnggota" class="w-full p-2 border rounded-md"
                            placeholder="Jumlah Personil" required />
                    </div>

                    <div>
                        <label class="text-gray-700 font-medium">Kota/Kab :</label>
                        <select v-model="jabatan.selectedDaerah" class="w-full p-2 border rounded-md" required>
                            <option :value="0" disabled>Pilih Daerah</option>
                            <option v-for="daerah in jabatan.selectedWilayah.daerah" :key="daerah.id_daerah"
                                :value="daerah.id_daerah">
                                {{ daerah.nama_daerah }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Kode Struktural</label>
                        <input type="text" v-model="jabatan.uidJabatan" class="w-full p-2 border rounded-md"
                            placeholder="Kode Struktural" required />
                    </div>
                    <div class="">
                        <label class="block text-gray-600 font-medium mb-1">Tingkat</label>
                        <select v-model="jabatan.tingkat" class="w-full p-2 border rounded-md" name="" id="">
                            <option value="" disabled>Pilih Tingkat</option>
                            <option value="Pusat">Pusat</option>
                            <option value="Provinsi">Provinsi</option>
                            <option value="Kota/Kab">Kota/Kab</option>
                            <option value="Region 1">Region 1</option>
                            <option value="Region 2">Region 2</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                            <label class="font-semibold">Tambah Jabatan
                                <i class="fa-solid fa-address-card"></i>
                            </label>
                        </button>
                    </div>
                </form>
            </div>
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h1 class="font-semibold pb-2">Filter Jabatan</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
                    <label class="text-gray-700 font-medium">Provinsi :</label>
                    <select v-model="selectedWilayah" class="p-2 border rounded-md"
                        @change="GetJabatanByWilayahId(selectedWilayah.id_wilayah)">
                        <option disabled :value="0">Pilih Provinsi</option>
                        <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah">
                            {{ wilayah.nama_wilayah }}
                        </option>
                    </select>
                    <label class="text-gray-700 font-medium">Daerah : </label>
                    <select v-model="selectedDaerah" class="p-2 border rounded-md"
                        @change="GetJabatanByDaerahId(selectedDaerah.id_daerah)">
                        <option disabled :value="0">Pilih Daerah</option>
                        <option v-for="daerah in selectedWilayah.daerah" :key="daerah.id_daerah" :value="daerah">
                            {{ daerah.nama_daerah }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Table Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Daftar Jabatan
                    </h2>
                    <button @click="exportToCSV"
                        class="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                        <i class="fas fa-file-csv mr-2"></i> Export CSV
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-left">No.</th>
                                <th class="px-4 py-2 text-left">Nama Jabatan</th>
                                <th class="px-4 py-2 text-left">Provinsi</th>
                                <th class="px-4 py-2 text-left">Kode Wilayah</th>
                                <th class="px-4 py-2 text-left">Kota / Kab</th>
                                <th class="px-4 py-2 text-left">Kode Daerah</th>
                                <th class="px-4 py-2 text-left">Tingkat</th>
                                <th class="px-4 py-2 text-left">Personil</th>
                                <th class="px-4 py-2 text-left">Kode Struktural</th>
                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(jabatan, index) in jabatanList" :key="index" class="border-t">
                                <td class="px-4 py-2">{{ index + 1 }}</td>
                                <td class="px-4 py-2">{{ jabatan.nama }}</td>
                                <td class="px-4 py-2">
                                    {{ jabatan.wilayah ? jabatan.wilayah.nama_wilayah : "-" }}
                                </td>
                                <td class="px-4 py-2">
                                    {{ jabatan.wilayah ? jabatan.wilayah.kode_wilayah : "-" }}
                                </td>
                                <td class="px-4 py-2">
                                    {{ jabatan.daerah ? jabatan.daerah.nama_daerah : "-" }}
                                </td>
                                <td class="px-4 py-2">
                                    {{ jabatan.daerah ? jabatan.daerah.kode_daerah : "-" }}
                                </td>
                                <td class="px-4 py-2">{{ jabatan.tingkat }}</td>
                                <td class="px-4 py-2">{{ jabatan.maksimumAnggota }}</td>
                                <td class="px-4 py-2">{{ jabatan.uidJabatan }}</td>
                                <td class="px-4 py-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <!-- Tombol Edit -->
                                        <!-- <button @click="openModal(index)"
                                            class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                                            <i class="fas fa-edit"></i>
                                        </button> -->

                                        <!-- Tombol Hapus -->
                                        <button @click="openModal(index)"
                                            class="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                            <label for="">Edit</label>
                                        </button>
                                        <button @click="DeleteJabatan(jabatan.id)"
                                            class="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <i class="fas fa-trash-alt"></i>
                                            <label for="">Hapus</label>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Edit Modal -->
        <transition name="fade">
            <div v-if="isModalOpen"
                class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 class="text-xl font-semibold mb-4">Edit Jabatan</h2>
                    <form @submit.prevent="submitEdit">
                        <div class="mb-4">
                            <label class="block text-gray-700">Nama Jabatan:</label>
                            <input type="text" v-model="selectedJabatan.nama" class="w-full px-3 py-2 border rounded-md"
                                required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700">Tingkat Jabatan:</label>
                            <select v-model="selectedJabatan.tingkat" class="w-full px-3 py-2 border rounded-md">
                                <option value="" disabled>Pilih Tingkat</option>
                                <option value="Pusat">Pusat</option>
                                <option value="Provinsi">Provinsi</option>
                                <option value="Kota/Kab">Kota/Kab</option>
                                <option value="Region 1">Region 1</option>
                                <option value="Region 2">Region 2</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">Jumlah Personil:</label>
                            <input type="number" v-model="selectedJabatan.maksimumAnggota"
                                class="w-full px-3 py-2 border rounded-md" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">Kode Struktural:</label>
                            <input type="text" v-model="selectedJabatan.uidJabatan"
                                class="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div class="flex justify-end space-x-4">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 bg-gray-400 text-white rounded-md">
                                Batal
                            </button>
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </div>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="text-white text-lg">Sedang Memuat...</div>
        <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import api from "@/service/lpkni";
import Swal from "sweetalert2";
export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            selectedWilayah: 0,
            selectedDaerah: 0,
            jabatan: {
                nama: "",
                tingkat: "",
                maksimumAnggota: "",
                selectedWilayah: 0,
                selectedDaerah: 0,
                uidJabatan: ''
            },
            jabatanList: [],
            wilayahList: [],
            daerahList: [],
            isModalOpen: false,
            isModalDeleteOpen: false,
            selectedJabatan: {
                id: 0,
                nama: "",
                tingkat: "",
                maksimumAnggota: 0,
                wilayah_id: null,
                daerah_id: null,
                uidJabatan: '',
            },
            isLoading: false
        };
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    mounted() {
        // this.GetallJabatan();
        this.fetchWilayah();
    },
    methods: {
        DeleteJabatan(id) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Mengahapus Jabatan?',
                showDenyButton: true,
                confirmButtonText: "Ya",
                confirmButtonColor: '#22c55e',
                denyButtonText: `Tidak`,
                icon: 'warning',
                reverseButtons: true

            }).then(async (result) => {
                if (result.isDenied || !result.isConfirmed || result.isDismissed) {
                    return
                }
                this.isLoading = true
                api.DeleteJabatan(id).then(() => {
                    this.$toast.success('Delete Jabatan Berhasil!')
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);

                }).catch(() => {
                    this.$toast.error('Delete Jabatan Gagal!')
                }).finally(() => {
                    this.isLoading = false
                })
            })

        },
        async fetchWilayah() {
            await api
                .getAllWilayah()
                .then((res) => {
                    this.wilayahList = res.data;
                })
                .catch(() => { });
        },
        async GetallJabatan() {
            await api
                .GetallJabatan()
                .then((res) => {
                    this.jabatanList = res.data;

                    this.$toast.success("Berhasil Mengambil Data Jabatan", {
                        duration: 3000,
                    });
                })
                .catch(() => {
                    this.$toast.error("Gagal Mengambil Data Jabatan", { duration: 3000 });
                });
        },
        async GetJabatanByWilayahId(id) {
            this.selectedDaerah = 0;
            if (id === undefined) {
                await this.GetallJabatan();
            } else {
                await api
                    .GetJabatanByWilayahIdAdmin(id)
                    .then((res) => {

                        this.jabatanList = res.data;
                        this.$toast.success("Berhasil Mengambil Data Jabatan", {
                            duration: 3000,
                        });
                        console.log(this.jabatanList)
                    })
                    .catch(() => {
                        this.$toast.error("Gagal Mengambil Data Jabatan", {
                            duration: 3000,
                        });
                    });
            }
        },
        async GetJabatanByDaerahId(id) {

            await api
                .GetJabatanByDaerahIdAdmin(id)
                .then((res) => {
                    this.jabatanList = res.data;
                    this.$toast.success("Berhasil Mengambil Data Jabatan", {
                        duration: 3000,
                    });
                })
                .catch(() => {
                    this.$toast.error("Gagal Mengambil Data Jabatan", { duration: 3000 });
                });
        },
        async GetDaerahByWilayahId(id) {
            this.selectedDaerah = 0;
            await api
                .getDaerahByWilayahId(id)
                .then((response) => {
                    this.daerahList = response.data;
                    this.GetJabatanByWilayahId(id);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async submitForm() {
            const formData = {
                nama: this.jabatan.nama,
                maksimumAnggota: this.jabatan.maksimumAnggota,
                wilayah_id: this.jabatan.selectedWilayah.id_wilayah,
                daerah_id: this.jabatan.selectedDaerah,
                tingkat: this.jabatan.tingkat,
                uidJabatan: this.jabatan.uidJabatan
            };
            this.isLoading = true
            console.log(formData);
            await api
                .CreateJabatan(formData)
                .then(() => {
                    this.$toast.success("Berhasil Menambahkan Jabatan");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(() => {
                    this.$toast.error("Gagal Menambahkan Jabatan");
                }).finally(() => {
                    this.isLoading = false
                });
        },
        openModal(index) {
            this.selectedJabatan = { ...this.jabatanList[index] };
            console.log(this.selectedJabatan)
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedJabatan = null;
        },
        async submitEdit() {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Memperbarui Jabatan Ini?',
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: `Tidak`,
                confirmButtonColor: '#22c55e',
                icon: 'info',

            }).then(async (result) => {
                if (result.isDenied || !result.isConfirmed || result.isDismissed) {
                    return
                }
                this.isLoading = true;
                const forms = {
                    nama: this.selectedJabatan.nama,
                    maksimumAnggota: this.selectedJabatan.maksimumAnggota,
                    wilayah_id: this.selectedJabatan.wilayah_id,
                    daerah_id: this.selectedJabatan.daerah_id,
                    tingkat: this.selectedJabatan.tingkat,
                    uidJabatan: this.selectedJabatan.uidJabatan
                }
                console.log(forms)
                await api.UpdateJabatan(this.selectedJabatan.id, forms).then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Informasi!",
                        text: "Data Berhasil Di Perbarui!",
                        confirmButtonColor: '#22c55e',
                        showConfirmButton: true,
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }).catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Informasi!",
                        text: "Gagal Memperbarui Data!",
                        confirmButtonColor: '#22c55e',
                        showConfirmButton: true,
                    })
                }).finally(() => {
                    this.isLoading = false;
                })
            });
        },
        exportToCSV() {
            const headers = [
                "No",
                "Nama Jabatan",
                "Kode Wilayah",
                "Kota / Kab",
                "Kode Daerah",
                "Tingkat",
                "Jumlah Maksimum Anggota",
            ];
            const rows = this.jabatanList.map((jabatan, index) => [
                index + 1,
                jabatan.nama,
                jabatan.wilayah ? jabatan.wilayah.nama_wilayah : "-",
                jabatan.daerah ? jabatan.daerah.nama_daerah : "-",
                jabatan.tingkat,
                jabatan.maksimumAnggota,
            ]);
            const csvContent = [headers, ...rows]
                .map((row) => row.join(","))
                .join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });

            // Buat link untuk mendownload file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "data_daftarJabatan.csv";
            link.click();
        },
    },
};
</script>

<style scoped>
/* Custom styles */
</style>
