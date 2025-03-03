<template>
    <div>
        <NavbarAdmin />
        <div class="bg-gray-100 min-h-screen p-6 ml-10" :class="isSidebarOpen ? 'ml-52' : 'ml-0'">
            <!-- Page Header -->
            <div class="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Management Daerah
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Kelola jabatan untuk tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Form Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-red-700 mb-4">Tambah Daerah</h2>
                <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Nama Daerah</label>
                        <input type="text" v-model="Daerah.nama_daerah" class="w-full p-2 border rounded-md"
                            placeholder="Nama Daerah" required />
                    </div>
                    <div>
                        <label class="text-gray-700 font-medium">Provinsi :</label>
                        <select v-model="Daerah.wilayah" class="w-full p-2 border rounded-md" required>
                            <option :value="[{}]" disabled>Pilih Provinsi</option>
                            <option v-for="wilayah in wilayahList" :key="wilayah" :value="wilayah">
                                {{ wilayah.nama_wilayah }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Kode Daerah MENDAGRI</label>
                        <input type="text" v-model="Daerah.kode_daerah" class="w-full p-2 border rounded-md"
                            placeholder="Kode Daerah Mendagri" required />
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Kode Daerah LPKNI</label>
                        <input type="text" v-model="Daerah.kode_daerah_lpkni" class="w-full p-2 border rounded-md"
                            placeholder="Kode Daerah LPKNI" required />
                    </div>

                    <div class="flex items-end">
                        <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                            <label class="font-semibold">Tambah Daerah
                                <i class="fa-solid fa-address-card"></i>
                            </label>
                        </button>
                    </div>
                </form>
            </div>
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h1 class="font-semibold pb-2">Filter Daerah</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
                    <label class="text-gray-700 font-medium">Provinsi :</label>
                    <select @change="GetDaerahBywilayahId(wilayahid)" v-model="wilayahid" class="p-2 border rounded-md">
                        <option disabled :value="0">Pilih Wilayah</option>
                        <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah.id_wilayah">
                            {{ wilayah.nama_wilayah }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- Table Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Daftar Provinsi Seluruh Indonesia
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
                                <th class="px-4 py-2 text-left">Nama Kota/Kab</th>
                                <th class="px-4 py-2 text-left">Kode Kota/Kab MENDAGRI</th>
                                <th class="px-4 py-2 text-left">Kode Kota/Kab LPKNI</th>
                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(daerah, index) in daerahList" :key="index" class="border-t">
                                <td class="px-4 py-2">{{ index + 1 }}</td>
                                <td class="px-4 py-2">{{ daerah.nama_daerah }}</td>
                                <td class="px-4 py-2">
                                    {{ daerah.kode_daerah }}
                                </td>
                                <td class="px-4 py-2">
                                    {{ daerah.kode_daerah_lpkni }}
                                </td>

                                <td class="px-4 py-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <!-- Tombol Hapus -->
                                        <button @click="openModal(index)"
                                            class="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                            <label for="">Edit</label>
                                        </button>
                                        <button @click="DeleteDaerah(daerah.id_daerah)"
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
                    <h2 class="text-xl font-semibold mb-4">Edit Daerah</h2>
                    <form @submit.prevent="submitEdit">
                        <div class="mb-4">
                            <label class="block text-gray-700">Nama Daerah:</label>
                            <input type="text" v-model="selectedDaerah.nama_daerah"
                                class="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700">Kode Daerah MENDAGRI:</label>
                            <input type="text" v-model="selectedDaerah.kode_daerah"
                                class="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700">Kode Daerah LPKNI:</label>
                            <input type="text" v-model="selectedDaerah.kode_daerah_lpkni"
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
        <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="text-white text-lg">Sedang Memuat...</div>
            <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
        </div>
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
            wilayahList: [],
            daerahList: [],
            wilayahid: 0,
            isModalOpen: false,
            isModalDeleteOpen: false,
            Daerah: {
                nama_daerah: "",
                kode_daerah: "",
                kode_daerah_lpkni: "",
                wilayah: [{}]
            },
            selectedDaerah: {
                nama_daerah: "",
                kode_daerah: "",
                kode_daerah_lpkni: "",
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
        this.fetchDaerah();
        this.fetchWilayah()
    },
    methods: {
        DeleteDaerah(id) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Mengahapus Kota/Kab Ini?',
                showDenyButton: true,
                confirmButtonText: "Ya",
                confirmButtonColor: '#22c55e',
                denyButtonText: `Tidak`,
                icon: 'warning',
                reverseButtons: false
            }).then(async (result) => {
                if (result.isDenied || !result.isConfirmed || result.isDismissed) {
                    return
                }
                this.isLoading = true;
                api.DeleteDaerah(id).then(() => {
                    this.$toast.success('Hapus Kota/Kab Berhasil!')
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);

                }).catch(() => {
                    this.$toast.error('Hapus Kota/Kab Gagal!')
                }).finally(() => {
                    this.isLoading = false;
                });
            })

        },
        async fetchDaerah() {
            this.isLoading = true;
            await api
                .getAllDaerah()
                .then((res) => {
                    this.daerahList = res.data.data;
                    console.log(this.daerahList)
                })
                .catch(() => { }).finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchWilayah() {
            this.isLoading = true;
            await api
                .getAllWilayah()
                .then((res) => {
                    this.wilayahList = res.data;
                    console.log(this.wilayahList)
                })
                .catch(() => { }).finally(() => {
                    this.isLoading = false;
                });
        },
        async GetDaerahBywilayahId(id) {
            api.getDaerahByWilayahId(id).then((res) => {
                this.daerahList = res.data
            }).then(() => {

            })
        },
        async submitForm() {
            const formData = {
                nama_daerah: this.Daerah.nama_daerah,
                kode_daerah: this.Daerah.kode_daerah,
                kode_daerah_lpkni: this.Daerah.kode_daerah_lpkni,
                wilayahID: this.Daerah.wilayah.id_wilayah,
                kode_wilayah: this.Daerah.wilayah.kode_wilayah,
            }
            console.log(formData);
            this.isLoading = true;
            await api
                .CreateDaerah(formData)
                .then(() => {
                    this.$toast.success("Berhasil Menambahkan Kota/Kab");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                })
                .catch(() => {
                    this.$toast.error("Gagal Menambahkan Kota/Kab");
                }).finally(() => {
                    this.isLoading = false;
                });
        },
        openModal(index) {
            this.selectedDaerah = { ...this.daerahList[index] };
            console.log(this.selectedDaerah)
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedJabatan = null;
        },
        async submitEdit() {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Memperbarui Kota/Kab Ini?',
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
                const forms = this.selectedDaerah
                console.log(forms)
                await api.UpdateDaerah(this.selectedDaerah.id_daerah, forms).then(() => {
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
