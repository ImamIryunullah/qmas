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
                    <select v-model="selectedWilayah" class="p-2 border rounded-md w-1/4">
                        <option :value="''">Pilih Wilayah</option>
                        <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah">
                            {{ wilayah.nama_wilayah }}
                        </option>
                    </select>
                    <label class="text-gray-700 font-medium">Kota/Kab : </label>
                    <select v-model="selectedDaerah" class="p-2 border rounded-md w-1/4">
                        <option disabled :value="''">Pilih Daerah</option>
                        <option v-for="daerah in selectedWilayah.daerah" :key="daerah.id_daerah"
                            :value="daerah.id_daerah">
                            {{ daerah.nama_daerah }}
                        </option>
                    </select>
                    <label class="text-gray-700 font-medium">Status Pembayaran : </label>
                    <select v-model="selectedStatus" class="p-2 border rounded-md w-1/4"
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
                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(jabatan, index) in transaksiList" :key="index" class="border-t">
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
                                <td class="px-4 py-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <!-- Tombol Edit -->
                                        <button @click="openModal(index)"
                                            class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                                            <i class="fas fa-edit"></i>
                                        </button>

                                        <!-- Tombol Hapus -->
                                        <button @click="deleteJabatan(index)"
                                            class="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <i class="fas fa-trash-alt"></i>
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
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import api from "@/service/lpkni";
export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            selectedWilayah: '',
            selectedDaerah: '',
            transaksiList: [],
            wilayahList: [],
            daerahList: [],
            isModalOpen: false,
            isModalDeleteOpen: false,
            selectedJabatan: null,
            selectedStatus: '',
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
        async fetchWilayah() {
            await api
                .getAllWilayah()
                .then((res) => {
                    this.wilayahList = res.data;
                })
                .catch(() => { });
        },
        async GetTransaksiByStatusByWilayahByDaerah(status) {
            api.GetTransaksiByStatusByWilayahByDaerah(status, this.selectedWilayah.id_wilayah, this.selectedDaerah).then((res) => {
                this.transaksiList = res.data
                console.log(this.transaksiList)
            }).catch(() => {

            })
        },
        async GetDaerahByWilayahId(id) {
            this.selectedDaerah = "";
            this.selectedStatus = "";
            await api
                .getDaerahByWilayahId(id)
                .then((response) => {
                    this.daerahList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        openModal(index) {
            this.selectedJabatan = { ...this.jabatanList[index] };
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedJabatan = null;
        },
        submitEdit() {
            const index = this.jabatanList.findIndex(
                (j) => j.nama === this.selectedJabatan.nama
            );
            if (index !== -1) {
                this.jabatanList[index] = { ...this.selectedJabatan };
            }
            this.closeModal();
        },
        deleteJabatan(index) {
            this.jabatanList.splice(index, 1);
        },
    },
};
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
