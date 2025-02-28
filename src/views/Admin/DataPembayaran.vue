<template>
    <div>
        <NavbarAdmin />
        <div class="bg-gray-100 min-h-screen p-6 transition-all" :class="isSidebarOpen ? 'pl-72' : 'pl-20'">
            <!-- Page Header -->
            <div class="max-w-8xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Management Pembayaran
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Kelola Pembayaran Untuk anggota tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>

            <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                    Filter Anggota
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
                    <label class="text-gray-700 font-medium">Status Pembayaran : </label>
                    <select v-model="selectedStatus" class="p-2 border rounded-md w-auto"
                        @change="GetTransaksiByStatusByWilayahByDaerah(selectedStatus)">
                        <option disabled value="">Pilih Transaksi</option>
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CANCEL">CANCEL</option>
                    </select>
                </div>
            </div>
            <!-- Table Section -->
            <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Daftar Anggota
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full border rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-left">ID Anggota</th>
                                <th class="px-4 py-2 text-left">Nama Lengkap</th>
                                <th class="px-4 py-2 text-left">Provinsi</th>
                                <th class="px-4 py-2 text-left">Kota / Kab</th>
                                <th class="px-4 py-2 text-left">Jabatan</th>
                                <th class="px-4 py-2 text-left">Tingkat</th>
                                <th class="px-4 py-2 text-left">Status Transaksi Terakhir</th>
                                <th class="px-4 py-2 text-center">Lihat Transaksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in transaksiList" :key="index" class="border-t">
                                <td class="px-4 py-2 border border-b-2">{{ data.daerah.kode_daerah
                                    + '.' + data.id_data_anggota }}</td>
                                <td class="px-4 py-2 border border-b-2">{{ data.nama_lengkap }}</td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.wilayah ? data.wilayah.nama_wilayah : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.daerah ? data.daerah.nama_daerah : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.jabatanStruktural ?
                                        data.jabatanStruktural.nama :
                                        "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">{{ data.jabatanStruktural ?
                                    data.jabatanStruktural.tingkat :
                                    "-" }}</td>
                                <td v-if="data.transaksiAnggota"
                                    class="px-4 py-2 border border-b-2 text-center font-semibold">
                                    <span :class="{
                                        'text-yellow-500': data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'PENDING',
                                        'text-green-500': data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'SUCCESS',
                                        'text-red-500': data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'CANCEL'
                                    }">

                                        <i v-if="data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'PENDING'"
                                            class="fas fa-hourglass-half"></i>
                                        <i v-if="data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'SUCCESS'"
                                            class="fas fa-check-circle"></i>

                                        <i v-if="data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'CANCEL'"
                                            class="fas fa-times-circle"></i>
                                    </span>
                                    <span :class="{
                                        'text-yellow-500': data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'PENDING',
                                        'text-green-500': data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'SUCCESS',
                                        'text-red-500': data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran === 'CANCEL'
                                    }">
                                        {{ data.transaksiAnggota[data.transaksiAnggota.length - 1].statusPembayaran }}
                                    </span>
                                </td>
                                <td class="px-4 py-2 border border-b-2 text-center font-semibold text-red-500" v-else>
                                    Belum ada
                                    Transaksi</td>
                                <td class="px-4 py-2 border border-b-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <button @click="openModal(data.transaksiAnggota)"
                                            class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                                            <h1>Lihat</h1>
                                            <i class="fa-solid fa-bars"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal -->
            <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                <div class="bg-white p-6 rounded-lg shadow-lg max-w-screen-xl w-full">
                    <!-- Close Button -->

                    <div class="flex justify-end">
                        <button @click="closeModal"
                            class="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Close
                        </button>
                    </div>

                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Daftar Transaksi Anggota</h3>
                    <!-- Transaction Table in Modal -->
                    <div class="overflow-x-auto">
                        <table class="w-full border rounded-lg">
                            <thead class="bg-gray-200 text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 text-left">ID Transaksi</th>
                                    <th class="px-4 py-2 text-left">Status Pembayaran</th>
                                    <th class="px-4 py-2 text-left">Metode Pembayaran</th>
                                    <th class="px-4 py-2 text-left">Jumlah Pembayaran</th>
                                    <th class="px-4 py-2 text-left">Tanggal Pembayaran</th>
                                    <th class="px-4 py-2 text-left">Vendor Pembayaran</th>
                                    <th class="px-4 py-2 text-center">Gambar</th>
                                    <th class="px-4 py-2 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaksi, index) in selectedTransaksi" :key="index" class="border-t">
                                    <td class="px-4 py-2">{{ transaksi.id }}</td>
                                    <td class="px-4 py-2 text-left font-semibold">
                                        <span :class="{
                                            'text-yellow-500': transaksi.statusPembayaran === 'PENDING',
                                            'text-green-500': transaksi.statusPembayaran === 'SUCCESS',
                                            'text-red-500': transaksi.statusPembayaran === 'CANCEL'
                                        }">
                                            <!-- PENDING Status with Icon -->
                                            <i v-if="transaksi.statusPembayaran === 'PENDING'"
                                                class="fas fa-hourglass-half"></i>
                                            <!-- Icon for PENDING -->
                                            <!-- SUCCESS Status with Icon -->
                                            <i v-if="transaksi.statusPembayaran === 'SUCCESS'"
                                                class="fas fa-check-circle"></i>
                                            <!-- Icon for SUCCESS -->
                                            <!-- CANCEL Status with Icon -->
                                            <i v-if="transaksi.statusPembayaran === 'CANCEL'"
                                                class="fas fa-times-circle"></i>
                                            <!-- Icon for CANCEL -->
                                        </span>
                                        <span :class="{
                                            'text-yellow-500': transaksi.statusPembayaran === 'PENDING',
                                            'text-green-500': transaksi.statusPembayaran === 'SUCCESS',
                                            'text-red-500': transaksi.statusPembayaran === 'CANCEL'
                                        }">
                                            {{ transaksi.statusPembayaran }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2">{{ transaksi.metodePembayaran }}</td>
                                    <td class="px-4 py-2">{{ transaksi.jumlahPembayaran }}</td>
                                    <td class="px-4 py-2">{{ transaksi.tanggalPembayaran.split('T')[0] }}</td>
                                    <td class="px-4 py-2">{{ transaksi.vendorPembayaran }}</td>
                                    <td class="px-4 py-2 text-center">
                                        <img :src="getfullPathImage(transaksi.imageUsers.imageUrl)"
                                            @click="openLightbox(getfullPathImage(transaksi.imageUsers.imageUrl))"
                                            alt="Transaksi Image" class="w-20 h-20 object-cover rounded-md" />
                                    </td>
                                    <td class="px-4 py-2 text-center">
                                        <!-- Buttons to update transaction status -->
                                        <div class="flex justify-center space-x-2">
                                            <!-- PENDING Button with Icon -->


                                            <!-- SUCCESS Button with Icon -->
                                            <button @click="updateStatus(transaksi.id, 'SUCCESS')"
                                                class="bg-green-500 text-white p-3 rounded-md hover:bg-green-600">

                                                <i class="fa-regular fa-circle-check"></i>
                                                <label for="">SUCCESS
                                                </label>
                                            </button>
                                            <button @click="updateStatus(transaksi.id, 'PENDING')"
                                                class="bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600">
                                                <i class="fa-solid fa-clock"></i>

                                                <label for="">PENDING
                                                </label>
                                            </button>
                                            <!-- CANCEL Button with Icon -->
                                            <button @click="updateStatus(transaksi.id, 'CANCEL')"
                                                class="bg-red-500 text-white p-3 rounded-md hover:bg-red-600">
                                                <i class="fa-solid fa-ban"></i>
                                                <label for="">CANCEL
                                                </label>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUsers" :index="lightboxIndex"
        @hide="lightboxVisible = false" />
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import api from "@/service/lpkni";
import Swal from "sweetalert2";
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
    components: {
        NavbarAdmin,
        VueEasyLightbox
    },
    data() {
        return {
            selectedWilayah: '',
            selectedDaerah: '',
            transaksiList: [],
            wilayahList: [],
            daerahList: [],
            isModalOpen: false,
            selectedStatus: '',
            selectedTransaksi: [],
            imageUsers: null,
            lightboxVisible: false

        };
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    mounted() {
        this.fetchWilayah();
        this.getAlltransaksi();
    },
    methods: {
        openLightbox(index) {
            this.lightboxVisible = true;
            this.imageUsers = index
            // this.lightboxIndex = index;
        },
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
                    this.transaksiList = res.data;
                    console.log(this.transaksiList)
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
        async getAlltransaksi() {
            await api.getAllTransaksiAdmin()
                .then((res) => {
                    this.transaksiList = res.data;
                    console.log(this.transaksiList)
                    this.$toast.success('Berhasil Mengambil Data Transaksi');
                })
                .catch(() => {
                    this.$toast.error('Gagal Mengambil Data Transaksi');
                });
        },
        openModal(transaksi) {
            this.selectedTransaksi = transaksi;  // Assign the selected transaksi array
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
