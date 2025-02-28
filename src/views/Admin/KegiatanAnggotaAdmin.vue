<template>
    <div>
        <NavbarAdmin />
        <div class=" bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-8 transition-all"
            :class="isSidebarOpen ? 'pl-72' : 'ml-0'">
            <div class="text-center mb-12 bg-white shadow-md p-5 rounded-md">
                <div class="flex justify-center items-center space-x-3">
                    <img src="@/assets/iconlpkni.png" alt="LPKNI Icon" class="mt-2 w-9 h-12" />
                    <h1 class="text-4xl font-extrabold text-gray-800">Activity Anggota LPKNI</h1>
                </div>
                <p class="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto mt-2">
                    Lembaga Perlindungan Konsumen Indonesia
                </p>
            </div>

            <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Daftar Kegiatan Anggota
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full border rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-center text-lg">No</th>
                                <th class="px-4 py-2 text-center text-lg">Judul Kegiatan</th>
                                <th class="px-4 py-2 text-center text-lg">Deskripsi</th>
                                <th class="px-4 py-2 text-center text-lg">Foto Kegiatan</th>
                                <th class="px-4 py-2 text-center text-lg">Nama Anggota</th>
                                <th class="px-4 py-2 text-center text-lg">Jabatan Anggota</th>
                                <th class="px-4 py-2 text-center text-lg">Tingkat Jabatan</th>
                                <th class="px-4 py-2 text-center text-lg">Provinsi</th>
                                <th class="px-4 py-2 text-center text-lg">Kota/Kab</th>
                                <th class="px-4 py-2 text-center text-lg">Tanggal</th>
                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(activity, index) in kegitanList" :key="index" class="border-t">
                                <td class="px-4 py-2 text-sm text-justify text-black border border-b-2">{{ index + 1 }}
                                </td>
                                <td class="px-4 py-2 text-sm text-justify text-black border border-b-2">{{
                                    activity.judul }}</td>
                                <td class="px-4 py-2 text-sm text-justify text-black border border-b-2">{{
                                    activity.deskripsi }}</td>
                                <td class="px-4 py-2 text-sm">
                                    <div v-if="activity.media.length > 0" class="flex space-x-2">
                                        <img :src="getfullpathImage(activity.media[0].imageUrl)" alt="file preview"
                                            class="w-16 h-16 object-cover rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
                                            @click="openLightbox(activity.media)" />
                                    </div>
                                </td>
                                <td class="px-4 py-2 text-sm text-gray border border-b-2 ">
                                    {{ activity.dataAnggota.nama_lengkap }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray border border-b-2">
                                    {{ activity.dataAnggota.jabatanStruktural.nama }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray border border-b-2">
                                    {{ activity.dataAnggota.jabatanStruktural.tingkat }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray border border-b-2">
                                    {{ activity.dataAnggota.wilayah.nama_wilayah }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray border border-b-2">
                                    {{ activity.dataAnggota.daerah.nama_daerah }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray border border-b-2">
                                    {{ activity.tanggal.split('T')[0] }}
                                </td>
                                <td class="px-4 py-2 text-center ">
                                    <div class="flex justify-center space-x-2 font-semibold">
                                        <button @click="TambahBerita(activity)"
                                            class="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200">
                                            <h1>Tambah Suara Konsumen
                                                <i class="fa-solid fa-plus"></i>
                                            </h1>
                                        </button>
                                        <button @click="deleteKegiatanAnggota(activity.id)"
                                            class="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <h1>Hapus
                                                <i class="fa-solid fa-trash"></i>
                                            </h1>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- No Activities Message -->
            <div v-if="kegitanList.length === 0" class="text-center text-gray-600 mt-6">
                <p>Belum ada kegiatan yang di-upload. Silakan tunggu hingga ada data yang masuk.</p>
            </div>
        </div>
        <!-- Lightbox -->
        <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUrls" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>
<script>
import NavbarAdmin from '@/components/NavbarAdmin.vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import Swal from "sweetalert2";
import api from "@/service/lpkni";
export default {
    components: {
        NavbarAdmin,
        VueEasyLightbox
    },
    data() {
        return {
            kegitanList: [],
            lightboxVisible: false,
            lightboxIndex: 0,
            imageUrls: [],
            form: {
                judul: '',
                daerahId: 0,
                tanggal: '',
                wilayahId: 0,
                kategori: '',
                deskripsi1: '',
                deskripsi2: '',
                deskripsi3: '',
                publish: false,
                file: [],
                keterangan: []
            },
            media: []
        };
    },
    mounted() {
        this.fetchActivities();
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    methods: {
        getfullpathImage(img) {
            return api.getfullpathImage(img)
        },
        async fetchActivities() {
            await api.getAllKegiatanAnggotaa().then((res) => {
                this.kegitanList = res.data
                this.media = this.kegitanList.map(item => item.media)
                console.log(this.kegitanList)
            }).catch(() => {

            })
        },
        openLightbox(index) {
            this.lightboxVisible = true;
            // this.lightboxIndex = index;
            this.imageUrls = index.map(item => this.getfullpathImage(item.imageUrl));
        },
        async deleteKegiatanAnggota(id) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin Ingin Menghapus Kegiatan Ini?',
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
                await api.DeleteKegiatan(id).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'berhasil Menghapus Kegiatan Anda!'
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);

                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: 'Gagal Menghapus Kegiatan Anda!'
                    })
                })
            })
        },
        async downloadImageAsBlob(imageUrl) {
            console.log(imageUrl);  // Menampilkan URL gambar

            try {
                const corsImageModified = new Image();
                corsImageModified.crossOrigin = "Anonymous";  // Menggunakan CORS

                return new Promise((resolve, reject) => {
                    corsImageModified.onload = () => {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        canvas.width = corsImageModified.width;
                        canvas.height = corsImageModified.height;

                        // Menggunakan requestAnimationFrame untuk menggambar gambar secara lebih efisien
                        const drawImage = () => {
                            ctx.drawImage(corsImageModified, 0, 0);
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    resolve(blob); // Mengembalikan Blob yang berhasil dibuat
                                } else {
                                    reject(new Error("Failed to create blob from canvas."));
                                }
                            }, "image/jpeg");  // Menyimpan file dalam format jpeg
                        };

                        // Meminta browser untuk menggambar gambar di frame berikutnya
                        window.requestAnimationFrame(drawImage);
                    };

                    corsImageModified.onerror = (error) => {
                        reject(new Error("Error loading image: " + error.message));
                    };

                    corsImageModified.src = imageUrl + "?not-from-cache-please";
                });

            } catch (error) {
                console.error("Error downloading image:", error);
                throw error;  // Lempar ulang error agar bisa ditangani lebih lanjut
            }
        }


        ,

        // Fungsi untuk mendapatkan ekstensi gambar
        getImageExtension(imageUrl) {
            const ext = imageUrl.split('.').pop().toLowerCase(); // Mendapatkan ekstensi file (menggunakan toLowerCase untuk menangani variasi huruf besar/kecil)
            return ext;
        },

        // Fungsi untuk menentukan MIME type berdasarkan ekstensi file
        getMimeType(extension) {
            const mimeTypes = {
                jpg: "image/jpg",
                jpeg: "image/jpeg",
                png: "image/png",
                JPG: "image/JPG",
                JPEG: "image/JPEG",
                PNG: "image/PNG"
            };
            return mimeTypes[extension] || "image/jpeg";  // Default ke "image/jpeg" jika ekstensi tidak dikenali
        },
        async TambahBerita(data) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin Ingin Menambahkan Kegiatan Ini Ke Suara Konsumen?',
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

                // Mengambil URL gambar dan deskripsi dari media
                const urlDownload = data.media.map(item => this.getfullpathImage(item.imageUrl));
                const deskripsi = data.media.map(item => item.deskripsi);

                try {
                    // Iterasi untuk mengunduh gambar satu per satu
                    for (let i = 0; i < urlDownload.length; i++) {
                        const url = urlDownload[i];
                        const desc = deskripsi[i];

                        // Unduh gambar sebagai Blob
                        const blob = await this.downloadImageAsBlob(url);
                        console.log(blob)
                        // Periksa apakah blob memiliki ukuran yang valid (lebih dari 0 byte)
                        if (blob.size === 0) {
                            console.error(`Error: Gambar ${desc} kosong atau rusak.`);
                            continue; // Lompat ke iterasi berikutnya jika file kosong
                        }
                        // Mendapatkan ekstensi file dan MIME type
                        const extension = this.getImageExtension(url); // Ambil ekstensi dari URL gambar
                        const mimeType = this.getMimeType(extension); // Tentukan MIME type berdasarkan ekstensi
                        // Periksa MIME type untuk memastikan file sesuai dengan jenis yang diharapkan
                        if (!blob.type.startsWith('image/')) {
                            console.error(`Error: ${desc} bukan gambar yang valid.`);
                            continue; // Lompat ke iterasi berikutnya jika file bukan gambar
                        }
                        // Membuat objek file dari Blob yang diunduh
                        const file = new File([blob], `${desc}.${extension}`, { type: mimeType });

                        // Menambahkan file yang diunduh ke dalam form.file
                        this.form.file[i] = file;

                        // Menambahkan deskripsi gambar ke dalam form.keterangan
                        this.form.keterangan[i] = desc;
                    }

                    // Memeriksa hasil file yang sudah diubah ke dalam array
                    this.form.judul = data.judul
                    this.form.deskripsi1 = data.deskripsi
                    this.form.tanggal = data.tanggal.split('T')[0]
                    this.form.wilayahId = data.dataAnggota.wilayahId
                    this.form.daerahId = data.dataAnggota.daerahId
                    this.form.kategori = 'Kegiatan Anggota LPKNI'
                    this.form.publish = false;
                    console.log(this.form);
                    // Setelah selesai, kirim data ke API atau lakukan tindakan lainnya
                    api.CreateSuaraKonsumenAdmin(this.form).then(() => {
                        this.$toast.success('Suara Konsumen Berhasil Di Tambahkan')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000);
                    }).catch(() => {
                        this.$toast.error('Suara Konsumen gagal Di Tambahkan')
                    })

                } catch (error) {
                    console.error("Error downloading or processing image:", error);
                }
            })
        },

    }

};
</script>

<style scoped>
.table-auto {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
}



td,
th {
    padding: 12px 16px;
    font-size: 14px;
}
</style>