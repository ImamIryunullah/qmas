<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-8">

            <!-- Page Title -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 flex items-center">
                        📋 Data Pengaduan Anggota
                    </h1>
                    <p class="text-gray-600 text-sm md:text-base">Daftar pengaduan yang telah masuk.</p>
                </div>
            </div>

            <!-- Table Section -->
            <div class="overflow-x-auto bg-white rounded-lg shadow-md">
                <table class="min-w-full table-auto">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-4 py-3 border">No</th>
                            <th class="px-4 py-3 border">Nama</th>
                            <th class="px-4 py-3 border">Email</th>
                            <th class="px-4 py-3 border">Provinsi</th>
                            <th class="px-4 py-3 border">Kota/Kab</th>
                            <th class="px-4 py-3 border">Judul</th>
                            <th class="px-4 py-3 border">Deskripsi</th>
                            <th class="px-4 py-3 border">Lampiran</th>
                            <th class="px-4 py-3 border">Harapan</th>
                            <th class="px-4 py-3 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(complaint, index) in complaints" :key="index" class="text-gray-600 border-b">
                            <td class="px-4 py-3 border text-center">{{ index + 1 }}</td>
                            <td class="px-4 py-3 border truncate">{{ complaint.nama }}</td>
                            <td class="px-4 py-3 border truncate">{{ complaint.email }}</td>
                            <td class="px-4 py-3 border truncate">{{ complaint.wilayah }}</td>
                            <td class="px-4 py-3 border truncate">{{ complaint.daerah }}</td>
                            <td class="px-4 py-3 border truncate">{{ complaint.judul }}</td>
                            <td class="px-4 py-3 border truncate max-w-xs">{{ complaint.deskripsi }}</td>

                            <td class="px-4 py-3 border text-center">
                                <!-- Loop through attachments and display images -->
                                <div v-if="complaint.lampirans.length > 0" class="flex justify-center space-x-2">
                                    <img v-for="(lampiran, i) in complaint.lampirans" :key="i" :src="lampiran.url"
                                        class="w-12 h-12 object-cover rounded-lg cursor-pointer hover:opacity-75"
                                        @click="openImage(lampiran.url)" />
                                </div>
                                <div v-else class="text-gray-500">-</div>
                            </td>

                            <td class="px-4 py-3 border truncate max-w-xs">{{ complaint.harapan }}</td>
                            <td class="px-4 py-3 border text-center">
                                <button @click="$router.push('/admin/pengaduan-suara-konsumen')"
                                    class="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    📝 Posting
                                </button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal for Image Preview -->
            <transition name="fade">
                <div v-if="imagePreview"
                    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div class="bg-white p-4 rounded-lg shadow-lg">
                        <img :src="imagePreview" class="max-w-full max-h-[80vh] rounded-lg" />
                        <button @click="imagePreview = null"
                            class="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Tutup</button>
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
            imagePreview: null,
            complaints: [
                {
                    nama: "John Doe",
                    email: "johndoe@example.com",
                    wilayah: "Jawa Barat",
                    daerah: "Bandung",
                    judul: "Layanan tidak memuaskan",
                    deskripsi: "Saya mengalami masalah dalam pelayanan customer service...",
                    lampirans: [{ url: "https://via.placeholder.com/100" }],
                    harapan: "Semoga layanan bisa lebih baik."
                },
                {
                    nama: "Jane Smith",
                    email: "janesmith@example.com",
                    wilayah: "DKI Jakarta",
                    daerah: "Jakarta Selatan",
                    judul: "Akses aplikasi error",
                    deskripsi: "Aplikasi sering error dan tidak bisa diakses...",
                    lampirans: [],
                    harapan: "Semoga bug segera diperbaiki."
                }
            ]
        };
    },
    methods: {
        openImage(url) {
            this.imagePreview = url;
        }
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>