<template>
    <div>
        <NavbarAdmin />
        <div class="bg-gray-100 min-h-screen p-6 transition-all" :class="isSidebarOpen ? 'pl-72' : 'pl-20'">
            <!-- Page Header -->
            <div class="max-w-8xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Management Pengaduan
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Kelola Pembayaran Untuk anggota tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>

            <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                    Filter Pengaduan
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
                    <label class="text-gray-700 font-medium">Provinsi :</label>
                    <select v-model="selectedWilayah" class="p-2 border rounded-md w-auto">
                        <option :value="''">Pilih Wilayah</option>
                        <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah">
                            {{ wilayah.nama_wilayah }}
                        </option>
                    </select>
                    <label class="text-gray-700 font-medium">Kota/Kab : </label>
                    <select v-model="selectedDaerah" class="p-2 border rounded-md w-auto">
                        <option disabled :value="''">Pilih Daerah</option>
                        <option v-for="daerah in selectedWilayah.daerah" :key="daerah.id_daerah"
                            :value="daerah.id_daerah">
                            {{ daerah.nama_daerah }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- Table Section -->
            <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Daftar Pengaduan
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full border rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-center">ID Pengaduan</th>
                                <th class="px-4 py-2 text-center">Nama Lengkap</th>
                                <th class="px-4 py-2 text-center">Provinsi</th>
                                <th class="px-4 py-2 text-center">Kota / Kab</th>
                                <th class="px-4 py-2 text-center">Judul</th>
                                <th class="px-4 py-2 text-center">Kategori</th>
                                <th class="px-4 py-2 text-center">Publis</th>
                                <th class="px-4 py-2 text-center">Tanggal</th>
                                <th class="px-4 py-2 text-center">Jam</th>
                                <th class="px-4 py-2 text-center">Pengaduan Dari</th>
                                <th class="px-4 py-2 text-center">Lihat Pengaduan</th>
                            </tr>
                        </thead>
                        <tbody v-if="pengaduanList.length > 0">
                            <tr v-for="(data, index) in pengaduanList" :key="index" class="border-t">
                                <td class="px-4 py-2 text-center border border-b-2 ">{{ data.id }}</td>
                                <td class="px-4 py-2 border border-b-2">{{ data.nama }}</td>
                                <td class="px-4 py-2">
                                    {{ data.wilayah ? data.wilayah.nama_wilayah : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.daerah ? data.daerah.nama_daerah : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.judul ? data.judul : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.kategori ? data.kategori : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.publish ? 'Bisa Di Publish' : "Tidak Bisa Di Publish" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">{{ data.created_at.split('T')[0]
                                    }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">{{ data.created_at.split('T')[1].split('-')[0]
                                    }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">{{ data.data_anggota ? 'Anggota' : "Konsumen"
                                    }}
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <button @click="openModal(data)"
                                            class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                                            <h1>Lihat</h1>
                                            <i class="fa-solid fa-bars"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center">
                                <td colspan="7" class="text-gray-500 font-semibold">Pengaduan Tidak Tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal for Viewing Pengaduan -->
            <!-- Modal for Viewing Pengaduan -->
            <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-screen-xl w-full">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Detail Pengaduan</h3>

                    <!-- Detail of Pengaduan -->
                    <div class="mb-4">
                        <p><strong>Judul:</strong> {{ selectedPengaduan.judul }}</p>
                        <p><strong>Deskripsi:</strong> {{ selectedPengaduan.deskripsi }}</p>
                        <p><strong>Kategori:</strong> {{ selectedPengaduan.kategori }}</p>
                        <p><strong>Publikasi:</strong> {{ selectedPengaduan.publish ? 'Ya' : 'Tidak' }}</p>
                        <p><strong>Tindak Lanjut:</strong> {{ selectedPengaduan.tindak_lanjut }}</p>
                        <p><strong>Pengaduan Dari:</strong> {{ selectedPengaduan.data_anggota ? 'Anggota' : 'Konsumen'
                        }}</p>
                        <p><strong>Email Pengadu:</strong> {{ selectedPengaduan.email }}</p>
                        <p><strong>Wilayah:</strong> {{ selectedPengaduan.wilayah.nama_wilayah }}</p>
                        <p><strong>Daerah:</strong> {{ selectedPengaduan.daerah.nama_daerah }}</p>
                        <p><strong>Alamat Pengadu:</strong> {{ selectedPengaduan.data_anggota ?
                            selectedPengaduan.data_anggota.alamat : 'Tidak Tersedia' }}</p>
                        <p><strong>Status Pengadu:</strong> {{ selectedPengaduan.status }}</p>
                    </div>

                    <!-- Display Images Associated with Pengaduan -->
                    <div v-if="selectedPengaduan.media && selectedPengaduan.media.length > 0"
                        class="grid grid-cols-2 gap-4">
                        <div v-for="(media, index) in selectedPengaduan.media" :key="index"
                            class="flex flex-col items-center">
                            <img :src="getfullPathImage(media.imageUrl)" alt="Image"
                                class="w-40 h-40 object-cover rounded-md mb-2">
                            <p class="text-sm text-center">{{ media.deskripsi }}</p>
                        </div>
                    </div>

                    <!-- Close Modal Button -->
                    <div class="mt-6">
                        <button @click="closeModal"
                            class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                            Close
                        </button>
                    </div>
                </div>
            </div>
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
            selectedWilayah: '',
            selectedDaerah: '',
            pengaduanList: [],
            wilayahList: [],
            daerahList: [],
            isModalOpen: false,
            selectedStatus: '',
            selectedPengaduan: {}
        };
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    mounted() {
        this.fetchWilayah();
        this.GetAllPengaduanAdmin();
    },
    methods: {
        async fetchWilayah() {
            await api.getAllWilayah()
                .then((res) => {
                    this.wilayahList = res.data;
                })
                .catch(() => { });
        },
        async GetTransaksiByStatusByWilayahByDaerah(status) {
            api.GetTransaksiByStatusByWilayahByDaerah(status, this.selectedWilayah.id_wilayah, this.selectedDaerah)
                .then((res) => {
                    this.pengaduanList = res.data;
                    console.log(this.pengaduanList)
                })
                .catch(() => { });
        },
        async GetDaerahByWilayahId(id) {
            this.selectedDaerah = "";
            this.selectedStatus = "";
            await api.getDaerahByWilayahId(id)
                .then((response) => {
                    this.daerahList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async GetAllPengaduanAdmin() {
            await api.GetAllPengaduanAdmin()
                .then((res) => {
                    this.pengaduanList = res.data;
                    console.log(this.pengaduanList)
                    this.$toast.success('Berhasil Mengambil Data Pengaduan');
                })
                .catch(() => {
                    this.$toast.error('Gagal Mengambil Data Pengaduan');
                });
        },
        openModal(pengaduan) {
            this.selectedPengaduan = pengaduan;  // Assign the selected transaksi array
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        async updateStatus(id, status) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin Ingin Update Status Transaksi Ini?',
                showDenyButton: true,
                confirmButtonText: "Ya",
                reverseButtons: false,
                denyButtonText: `Tidak`,
                confirmButtonColor: '#22c55e',
                icon: 'info',

            }).then(async (result) => {
                if (result.isDenied || !result.isConfirmed || result.isDismissed) {
                    return
                }
                await api.UpdateTransaksiAnggotaAdmin(id, status).then(() => {
                    this.$toast.success("Update Status Transaksi Berhasil!")
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                }).catch(() => {
                    this.$toast.error("Update Status Transaksi Gagal!")
                })
            })
        },
        getfullPathImage(img) {
            return api.getfullpathImage(img)
        }
    }
};
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
