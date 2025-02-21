<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 min-h-screen p-6 ml-10">
            <!-- Page Header -->
            <div class="max-w-6xl mx-auto bg-red-500 p-6 rounded-lg shadow-md">
                <h1 class="text-2xl font-bold text-white mb-4">Kelola Portal Berita dari Pengaduan</h1>
                <p class="text-white">Mengelola berita berdasarkan pengaduan yang telah masuk.</p>
            </div>

            <!-- Complaint Table Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Daftar Pengaduan</h2>
                <div class="overflow-x-auto">
                    <table class="w-full border rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-left">No.</th>
                                <th class="px-4 py-2 text-left">Nama</th>
                                <th class="px-4 py-2 text-left">Judul</th>
                                <th class="px-4 py-2 text-left">Provinsi</th>
                                <th class="px-4 py-2 text-left">kotaKabupaten</th>
                                <th class="px-4 py-2 text-left">Deskripsi</th>
                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(complaint, index) in complaints" :key="index" class="border-t">
                                <td class="px-4 py-2">{{ index + 1 }}</td>
                                <td class="px-4 py-2">{{ complaint.nama }}</td>
                                <td class="px-4 py-2">{{ complaint.judul }}</td>
                                <td class="px-4 py-2">{{ complaint.deskripsi.slice(0, 50) }}...</td>
                                <td class="px-4 py-2">{{ complaint.wilayah }}</td>
                                <td class="px-4 py-2">{{ complaint.daerah }}...</td>
                                <td class="px-4 py-2 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <!-- Tombol Delete -->
                                        <button @click="deleteComplaint(index)"
                                            class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>

                                        <!-- Tombol Buat Berita -->
                                        <button @click="createPostFromComplaint(index)"
                                            class="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200">
                                            <i class="fas fa-newspaper"></i>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Create/Edit News Post Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Posting Ke Suara Konsumen</h2>
                <form @submit.prevent="submitPostForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Judul Berita</label>
                        <input type="text" v-model="postData.judul" class="w-full p-2 border rounded-md"
                            placeholder="Judul Berita" required />
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Provinsi</label>
                        <input type="text" v-model="postData.wilayah" class="w-full p-2 border rounded-md"
                            placeholder="Provinsi" required />
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Daerah</label>
                        <input type="text" v-model="postData.daerah" class="w-full p-2 border rounded-md"
                            placeholder="Daerah" required />
                    </div>
                    <div>
                        <label for="deskripsi" class="block text-gray-600 font-medium mb-1">Deskripsi (Utama)</label>
                        <textarea v-model="postData.deskripsi" id="deskripsi"
                            class="w-full p-3 border rounded-md bg-white resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                            placeholder="Masukkan deskripsi..." rows="4" required></textarea>
                    </div>
                    <div>
                        <label for="deskripsi" class="block text-gray-600 font-medium mb-1">Deskripsi 2
                            (Opsional)</label>
                        <textarea v-model="postData.deskripsi" id="deskripsi"
                            class="w-full p-3 border rounded-md bg-white resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                            placeholder="Masukkan deskripsi..." rows="4"></textarea>
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Tanggal Publikasi</label>
                        <input type="date" v-model="postData.judul" class="w-full p-2 border rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-600 font-medium mb-1">Gambar 1</label>
                        <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded-md" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-600 font-medium mb-1">Gambar 2 (Opsional)</label>
                        <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded-md" />
                    </div>
                    <div class="flex items-center space-x-4">
                        <button type="submit"
                            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">Posting</button>
                        <button type="button" @click="cancelPost"
                            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">Batal</button>
                    </div>
                </form>
            </div>
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
            complaints: [
                {
                    nama: "Jane Smith",
                    email: "janesmith@example.com",
                    wilayah: "DKI Jakarta",
                    daerah: "Jakarta Selatan",
                    judul: "Akses aplikasi error",
                    deskripsi: "Aplikasi sering error dan tidak bisa diakses...",
                    lampirans: [],
                    harapan: "Semoga bug segera diperbaiki.",
                },
                {
                    nama: "John Doe",
                    email: "johndoe@example.com",
                    wilayah: "Jawa Barat",
                    daerah: "Bandung",
                    judul: "Masalah koneksi internet",
                    deskripsi: "Koneksi internet di daerah saya sangat buruk...",
                    lampirans: [],
                    harapan: "Diharapkan ada perbaikan jaringan.",
                },
            ],
            provinsiList: [
                "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi",
                "Sumatera Selatan", "Bangka Belitung", "Bengkulu", "Lampung", "Banten", "DKI Jakarta",
                "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat",
                "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan",
                "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah",
                "Sulawesi Selatan", "Sulawesi Tenggara", "Sulawesi Barat", "Maluku", "Maluku Utara",
                "Papua", "Papua Barat"
            ],
            postData: {
                judul: "",
                deskripsi: "",
                wilayah: "",
                daerah: "",
                lampiran: null,
            },
            isEditMode: false,
            editIndex: null,
        };
    },
    methods: {
        openEditModal(index) {
            const complaint = this.complaints[index];
            this.postData = {
                judul: complaint.judul,
                deskripsi: complaint.deskripsi,
                wilayah: complaint.wilayah,
                daerah: complaint.daerah,
                lampiran: complaint.lampirans,
            };
            this.isEditMode = true;
            this.editIndex = index;
        },
        deleteComplaint(index) {
            this.complaints.splice(index, 1);
        },
        createPostFromComplaint(index) {
            const complaint = this.complaints[index];
            this.postData = {
                judul: complaint.judul,
                deskripsi: complaint.deskripsi,
                wilayah: complaint.wilayah,
                daerah: complaint.daerah,
                lampiran: complaint.lampirans,
            };
        },
        submitPostForm() {
            if (this.isEditMode) {
                // Update existing post
                this.complaints[this.editIndex].judul = this.postData.judul;
                this.complaints[this.editIndex].deskripsi = this.postData.deskripsi;
                this.complaints[this.editIndex].wilayah = this.postData.wilayah;
                this.complaints[this.editIndex].daerah = this.postData.daerah;
                this.complaints[this.editIndex].lampirans = this.postData.lampiran;
            } else {
                // Create new post
                this.complaints.push({
                    ...this.postData,
                    email: "admin@example.com",
                    wilayah: "Unknown",
                    daerah: "Unknown",
                    harapan: "Harap segera diproses.",
                });
            }
            this.cancelPost();
        },
        cancelPost() {
            this.isEditMode = false;
            this.postData = {
                judul: "",
                deskripsi: "",
                wilayah: "",
                daerah: "",
                lampiran: null,
            };
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.postData.lampiran = URL.createObjectURL(file);
            }
        },
    },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>