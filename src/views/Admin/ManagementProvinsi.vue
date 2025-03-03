<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 min-h-screen p-6 ml-10" :class="isSidebarOpen ? 'ml-52' : 'ml-0'">
            <!-- Page Header -->
            <div class="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Management Provinsi
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Kelola jabatan untuk tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Form Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-red-700 mb-4">Tambah Provinsi Baru</h2>
                <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Nama Provinsi</label>
                        <input type="text" v-model="Wilayah.nama_wilayah" class="w-full p-2 border rounded-md"
                            placeholder="Nama Jabatan" required />
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Kode Wilayah MENDAGRI</label>
                        <input type="text" v-model="Wilayah.kode_wilayah" class="w-full p-2 border rounded-md"
                            placeholder="Kode Wilayah MENDAGRI" required />
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Kode Wilayah LPKNI</label>
                        <input type="text" v-model="Wilayah.kode_wilayah_lpkni" class="w-full p-2 border rounded-md"
                            placeholder="Kode Wilayah LPKNI" required />
                    </div>
                    <div class="flex items-end">
                        <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                            <label class="font-semibold">Tambah Provinsi
                                <i class="fa-solid fa-address-card"></i>
                            </label>
                        </button>
                    </div>
                </form>
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
                                <th class="px-4 py-2 text-left">Nama Provinsi</th>
                                <th class="px-4 py-2 text-left">Kode Provinsi MENDAGRI</th>
                                <th class="px-4 py-2 text-left">Kode Provinsi LPKNI</th>
                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(provinsi, index) in wilayahList" :key="index" class="border-t">
                                <td class="px-4 py-2">{{ index + 1 }}</td>
                                <td class="px-4 py-2">{{ provinsi.nama_wilayah }}</td>
                                <td class="px-4 py-2">
                                    {{ provinsi.kode_wilayah }}
                                </td>
                                <td class="px-4 py-2">
                                    {{ provinsi.kode_wilayah_lpkni }}
                                </td>

                                <td class="px-4 py-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <!-- Tombol Hapus -->
                                        <button @click="openModal(index)"
                                            class="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                            <label for="">Edit</label>
                                        </button>
                                        <button @click="deleteWilayah(provinsi.id_wilayah)"
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
                            <input type="text" v-model="selectedWilayah.nama_wilayah"
                                class="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700">Kode Provinsi MENDAGRI:</label>
                            <input type="text" v-model="selectedWilayah.kode_wilayah"
                                class="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700">Kode Provinsi LPKNI:</label>
                            <input type="text" v-model="selectedWilayah.kode_wilayah_lpkni"
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
            isModalOpen: false,
            isModalDeleteOpen: false,
            Wilayah: {
                nama_wilayah: "",
                kode_wilayah: "",
                kode_wilayah_lpkni: "",
            },
            selectedWilayah: {
                id_wilayah: 0,
                nama_wilayah: "",
                kode_wilayah: "",
                kode_wilayah_lpkni: "",
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
        deleteWilayah(id) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Mengahapus Wilayah?',
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
                api.DeleteWilayah(id).then(() => {
                    this.$toast.success('Hapus Provinsi Berhasil!')
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);

                }).catch(() => {
                    this.$toast.error('Hapus Provinsi Gagal!, Di Karenakan Provinsi ini Memiliki Kota/Kabupaten!')
                }).finally(() => {
                    this.isLoading = false;
                });
            })

        },
        async fetchWilayah() {
            this.isLoading = true;
            await api
                .getAllWilayah()
                .then((res) => {
                    this.wilayahList = res.data;
                })
                .catch(() => { }).finally(() => {
                    this.isLoading = false;
                });
        },

        async submitForm() {
            const formData = this.Wilayah
            console.log(formData);
            this.isLoading = true;
            await api
                .CreateWilayah(formData)
                .then(() => {
                    this.$toast.success("Berhasil Menambahkan Provinsi");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                })
                .catch(() => {
                    this.$toast.error("Gagal Menambahkan Provinsi");
                }).finally(() => {
                    this.isLoading = false;
                });
        },
        openModal(index) {
            this.selectedWilayah = { ...this.wilayahList[index] };
            console.log(this.selectedWilayah)
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedJabatan = null;
        },
        async submitEdit() {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Memperbarui Provinsi Ini?',
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
                const forms = this.selectedWilayah
                console.log(forms)
                await api.UpdateWilayah(this.selectedWilayah.id_wilayah, forms).then(() => {
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
