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
                                        <div class="flex justify-center space-x-2 font-semibold">
                                            <button @click="openModal(data)"
                                                class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                                                <h1>Lihat</h1>
                                                <i class="fa-solid fa-bars"></i>
                                            </button>
                                            <button @click="TambahBerita(data)"
                                                class="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200">
                                                <h1>Tambah Suara Konsumen
                                                    <i class="fa-solid fa-plus"></i>
                                                </h1>
                                            </button>
                                            <button @click="DeletePengaduan(data.id)"
                                                class="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                                <h1>Hapus
                                                    <i class="fa-solid fa-trash"></i>
                                                </h1>
                                            </button>
                                        </div>
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
            <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full sm:w-4/5 md:w-3/4 lg:w-1/2 relative">
                    <!-- Close Button -->
                    <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                        &times;
                    </button>

                    <!-- Modal Header -->
                    <h3 class="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Detail Pengaduan</h3>

                    <!-- Modal Content: Pengaduan Details -->
                    <div class="space-y-4 text-gray-700">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p><strong>Judul:</strong> {{ selectedPengaduan.judul }}</p>
                            <p><strong>Kategori:</strong> {{ selectedPengaduan.kategori }}</p>
                            <p><strong>Publikasi:</strong> {{ selectedPengaduan.publish ? 'Ya' : 'Tidak' }}</p>
                            <p><strong>Tindak Lanjut:</strong> {{ selectedPengaduan.tindak_lanjut }}</p>
                            <p><strong>Pengaduan Dari:</strong> {{ selectedPengaduan.data_anggota ? 'Anggota' :
                                'Konsumen' }}</p>
                            <p><strong>Email Pengadu:</strong> {{ selectedPengaduan.email }}</p>
                            <p><strong>Wilayah:</strong> {{ selectedPengaduan.wilayah.nama_wilayah }}</p>
                            <p><strong>Daerah:</strong> {{ selectedPengaduan.daerah.nama_daerah }}</p>
                            <div v-if="selectedPengaduan.data_anggota">
                                <p><strong>Alamat Pengadu:</strong> {{ selectedPengaduan.data_anggota.alamat }}</p>
                            </div>
                            <p><strong>Status Pengadu:</strong> <span class="px-2 py-1 rounded-md" :class="{
                                'bg-green-500 text-white': selectedPengaduan.status === 'Selesai',
                                'bg-yellow-500 text-white': selectedPengaduan.status === 'Diproses',
                                'bg-red-500 text-white': selectedPengaduan.status === 'Ditolak'
                            }">
                                    {{ selectedPengaduan.status }}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-600"><strong>Deskripsi:</strong></p>
                            <div class="p-4 bg-gray-100 rounded-md">{{ selectedPengaduan.deskripsi }}</div>
                        </div>

                    </div>
                    <!-- Container Bukti Pengaduan -->
                    <div class="items-center flex justify-center bg-gray-500 rounded-lg p-4">
                        <div v-if="selectedPengaduan.media && selectedPengaduan.media.length > 0" class="w-full">
                            <h4 class="text-lg font-semibold text-white mb-3 text-center">Bukti Pengaduan:</h4>
                            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                <div v-for="(media, index) in selectedPengaduan.media" :key="index"
                                    class="flex flex-col items-center">
                                    <img :src="getfullPathImage(media.imageUrl)" alt="Image"
                                        class="w-32 h-32 object-cover rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer"
                                        @click="openPreview(media.imageUrl)">
                                    <p class="text-xs text-center text-white">{{ media.deskripsi }}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Display Images Associated with Pengaduan -->


                    <!-- Close Modal Button -->
                    <div class="mt-6 flex justify-center">
                        <button @click="closeModal"
                            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all">
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
            selectedPengaduan: {},
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
        ,
        async DeletePengaduan(id) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin Ingin Menghapus Pengaduan Ini?',
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
                await api.DeletePengaduan(id).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'berhasil Menghapus Pengaduan Anda!'
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);

                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: 'Gagal Menghapus Pengaduan Anda!'
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
        },
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
                const urlDownload = data.media.map(item => this.getfullPathImage(item.imageUrl));
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
                    this.form.tanggal = data.created_at.split('T')[0]
                    this.form.wilayahId = data.wilayah_id
                    this.form.daerahId = data.daerah_id
                    this.form.kategori = 'Pengaduan Anggota/Konsumen'
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
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
