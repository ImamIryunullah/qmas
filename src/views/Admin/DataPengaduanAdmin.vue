<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-6">
            <!-- Page Title -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-y-2 gap-x-4">
                <div class="max-w-xl">
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        📋 Data Pengaduan
                    </h1>
                    <p class="text-gray-600 text-sm md:text-base">
                        Daftar pengaduan yang telah masuk.
                    </p>
                </div>
            </div>


            <!-- Table Section -->
            <div class="overflow-x-auto bg-white rounded-lg shadow-md p-4">
                <table class="w-full table-auto">
                    <thead class="bg-gray-700 text-white">
                        <tr>
                            <th class="px-4 py-3 border">No</th>
                            <th class="px-4 py-3 border">Nama</th>
                            <th class="px-4 py-3 border">Email</th>
                            <th class="px-4 py-3 border">Provinsi</th>
                            <th class="px-4 py-3 border">Kota/Kab</th>
                            <th class="px-4 py-3 border">Judul</th>
                            <th class="px-4 py-3 border">Publish</th>
                            <th class="px-4 py-3 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="(complaint, index) in paginatedComplaints" :key="index"
                            class="hover:bg-gray-100 transition">
                            <td class="px-4 py-3 border text-center">{{ (currentPage - 1) * itemsPerPage + index + 1 }}
                            </td>
                            <td class="px-4 py-3 border">{{ complaint.nama }}</td>
                            <td class="px-4 py-3 border">{{ complaint.email }}</td>
                            <td class="px-4 py-3 border">{{ complaint.wilayah }}</td>
                            <td class="px-4 py-3 border">{{ complaint.daerah }}</td>
                            <td class="px-4 py-3 border truncate w-48" :title="complaint.judul">
                                {{ complaint.judul.slice(0, 50) }}...
                            </td>
                            <td class="px-4 py-3 border">
                                <span
                                    :class="{ 'fa fa-check-square text-green-500': complaint.publish === 'Setuju', 'fa fa-ban text-red-500': complaint.publish === 'Ditolak' }">
                                    {{ complaint.publish }}
                                </span>
                            </td>

                            <!-- Tombol Detail -->
                            <td class="px-4 py-3 border text-center">
                                <button @click="openDetail(complaint)"
                                    class="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                                    🔍 Detail
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-wrap items-center justify-center md:justify-between mt-4 gap-2">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50">
                    ⬅️ Previous
                </button>

                <span class="text-gray-700 font-semibold w-full md:w-auto text-center">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>

                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50">
                    Next ➡️
                </button>
            </div>

            <!-- Modal for Viewing Full Details -->
            <transition name="fade">
                <div v-if="showDetailModal"
                    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                        <h2 class="text-xl font-bold mb-3 text-gray-800">Detail Pengaduan</h2>
                        <div class="space-y-3 text-gray-700">
                            <p><strong>Nama:</strong> {{ selectedComplaint.nama }}</p>
                            <p><strong>Email:</strong> {{ selectedComplaint.email }}</p>
                            <p><strong>Provinsi:</strong> {{ selectedComplaint.wilayah }}</p>
                            <p><strong>Kota/Kab:</strong> {{ selectedComplaint.daerah }}</p>
                            <p><strong>Judul:</strong> {{ selectedComplaint.judul }}</p>
                            <p><strong>Latitude:</strong> {{ selectedComplaint.latitude }}</p>
                            <p><strong>Longitude:</strong> {{ selectedComplaint.longtitude }}</p>
                            <p><strong>Publish:</strong> {{ selectedComplaint.publish }}</p>
                            <p><strong>Deskripsi:</strong> {{ selectedComplaint.deskripsi }}</p>
                            <p><strong>Harapan:</strong> {{ selectedComplaint.harapan }}</p>
                            <div v-if="selectedComplaint.gambarBukti" class="mt-4">
                                <p><strong>Lampiran Bukti:</strong></p>
                                <img :src="selectedComplaint.gambarBukti" alt="Bukti Pengaduan"
                                    class="mt-2 rounded-lg shadow-lg max-w-full h-auto">
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end space-x-3">
                            <button @click="showDetailModal = false"
                                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                Tutup
                            </button>
                            <button @click="publishComplaint"
                                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                                ✅ Publish
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";

export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            showDetailModal: false,
            selectedComplaint: {
                nama: "",
                email: "",
                wilayah: "",
                daerah: "",
                judul: "",
                latitude: "",
                longtitude: "",
                publish: "",
                deskripsi: "",
                harapan: "",
                gambarBukti: ""
            },
            currentPage: 1,
            itemsPerPage: 5,
            complaints: [
                { nama: "John Doe", email: "johndoe@example.com", wilayah: "Jawa Barat", daerah: "Bandung", judul: "Layanan tidak memuaskan", latitude: "243523", longtitude: "4242323", publish: "Setuju", deskripsi: "Deskripsi 1", harapan: "Harapan 1", gambarBukti: "" },
                { nama: "Jane Smith", email: "janesmith@example.com", wilayah: "DKI Jakarta", daerah: "Jakarta Selatan", judul: "Akses aplikasi error", latitude: "243523", longtitude: "4242323", publish: "Setuju", deskripsi: "Deskripsi 2", harapan: "Harapan 2", gambarBukti: "" },
                { nama: "Alice Johnson", email: "alice@example.com", wilayah: "Sumatera Utara", daerah: "Medan", judul: "Koneksi lambat", latitude: "123456", longtitude: "7891011", publish: "Ditolak", deskripsi: "Deskripsi 3", harapan: "Harapan 3", gambarBukti: "" },
                { nama: "Bob Williams", email: "bob@example.com", wilayah: "Bali", daerah: "Denpasar", judul: "Server sering down", latitude: "123123", longtitude: "456456", publish: "Ditolak", deskripsi: "Deskripsi 4", harapan: "Harapan 4", gambarBukti: "" },
                { nama: "Charlie Brown", email: "charlie@example.com", wilayah: "Sulawesi Selatan", daerah: "Makassar", judul: "Kesalahan data", latitude: "111111", longtitude: "222222", publish: "Setuju", deskripsi: "Deskripsi 5", harapan: "Harapan 5", gambarBukti: "" },
                { nama: "Charlie Brown", email: "charlie@example.com", wilayah: "Sulawesi Selatan", daerah: "Makassar", judul: "Kesalahan data", latitude: "111111", longtitude: "222222", publish: "Setuju", deskripsi: "Deskripsi 5", harapan: "Harapan 5", gambarBukti: "" },
            ]
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.complaints.length / this.itemsPerPage);
        },
        paginatedComplaints() {
            let start = (this.currentPage - 1) * this.itemsPerPage;
            let end = start + this.itemsPerPage;
            return this.complaints.slice(start, end);
        },

    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        openDetail(complaint) {
            this.selectedComplaint = complaint;
            this.showDetailModal = true;

        },
        publishComplaint() {
            this.$router.push("/admin/pengaduan-suara-konsumen")
        }
    }
};
</script>
