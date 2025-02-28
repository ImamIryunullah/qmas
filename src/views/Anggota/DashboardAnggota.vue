<template>
    <div class="w-screen min-h-screen h-full flex bg-gray-100">
        <NavbarAnggota />
        <div class="bg-gray-100 w-full min-h-screen h-full transition-all mt-10 mr-12 mb-12">
            <div class="container mx-auto">
                <div class="text-center py-2">
                    <h1 class="text-3xl font-normal text-gray-800">Halo! {{ data_anggota.nama_lengkap }}</h1>
                    <p class="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto justify-center">
                        Akses lengkap untuk melihat informasi terkait data diri kamu {{ data_anggota.nama_lengkap }}.
                    </p>
                </div>

                <!-- Anggota Details -->
                <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-8">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-user text-blue-500 mr-3"></i> Informasi Anggota
                    </h2>

                    <!-- Grid Layout -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <!-- Nama Lengkap -->
                        <div>
                            <div class="font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Nama Lengkap:</div>
                            <div class="text-lg text-gray-800 font-semibold mt-1">{{ data_anggota.nama_lengkap }}</div>
                        </div>

                        <!-- Pekerjaan -->
                        <div>
                            <div class="font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Pekerjaan:</div>
                            <div class="text-lg text-gray-800 mt-1">{{ data_anggota.pekerjaan }}</div>
                        </div>

                        <!-- Tanggal Lahir -->
                        <div>
                            <div class="font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Tanggal Lahir:</div>
                            <div class="text-lg text-gray-800 mt-1">{{ new
                                Date(data_anggota.tanggalLahir).toLocaleDateString('en-CA') }}</div>
                        </div>

                        <!-- Tempat Lahir -->
                        <div>
                            <div class="font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Tempat Lahir:</div>
                            <div class="text-lg text-gray-800 mt-1">{{ data_anggota.tempatLahir }}</div>
                        </div>

                        <!-- Status Perkawinan -->
                        <div>
                            <div class="font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Status Perkawinan:
                            </div>
                            <div class="text-lg text-gray-800 mt-1">{{ data_anggota.statusPerkawinan }}</div>
                        </div>

                        <!-- Status -->
                        <div>
                            <div class="font-medium text-gray-600 border-l-4 pl-4" :class="{
                                'border-gray-500': data_anggota.status === 'CANCEL',
                                'border-yellow-500': data_anggota.status === 'PENDING',
                                'border-green-500': data_anggota.status === 'SUCCESS'
                            }">
                                Status:
                            </div>
                            <div class="text-lg mt-1 flex items-center relative group">
                                <!-- Conditional rendering for icon and status text color -->
                                <span v-if="data_anggota.status === 'CANCEL'" class="text-gray-600 mr-2">
                                    <i class="fas fa-times-circle"></i> <!-- Icon for CANCEL -->
                                </span>
                                <span v-if="data_anggota.status === 'PENDING'" class="text-yellow-500 mr-2">
                                    <i class="fas fa-clock"></i> <!-- Icon for PENDING -->
                                </span>
                                <span v-if="data_anggota.status === 'SUCCESS'" class="text-green-500 mr-2">
                                    <i class="fas fa-check-circle"></i> <!-- Icon for SUCCESS -->
                                </span>

                                <!-- Status Text -->
                                <span :class="{
                                    'text-gray-600': data_anggota.status === 'CANCEL',
                                    'text-yellow-500': data_anggota.status === 'PENDING',
                                    'text-green-500': data_anggota.status === 'SUCCESS'
                                }" class="cursor-pointer" :title="statusTooltip">
                                    {{ data_anggota.status }}
                                </span>

                                <!-- Tooltip Text -->
                                <div v-if="data_anggota.status === 'PENDING'"
                                    class="absolute left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs rounded-md px-3 py-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Tunggu hingga tim kami memverifikasi data anda
                                </div>
                                <div v-if="data_anggota.status === 'SUCCESS'"
                                    class="absolute left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs rounded-md px-2 py-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Anda sudah menjadi bagian dari tim LPKNI
                                </div>
                                <div v-if="data_anggota.status === 'CANCEL'"
                                    class="absolute left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs rounded-md px-2 py-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Pembatalan status. Hubungi kami untuk informasi lebih lanjut
                                </div>
                            </div>
                        </div>

                        <!-- Alamat (span 3 kolom untuk tampilan lebar) -->
                        <div class="md:col-span-3">
                            <div class="font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Alamat:</div>
                            <div class="text-lg text-gray-800 mt-1">{{ data_anggota.alamat }}</div>
                        </div>
                    </div>
                </div>

                <!-- Daerah and Wilayah -->
                <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-8">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-map-marker-alt text-blue-500 mr-3"></i> Daerah dan Wilayah
                    </h2>

                    <!-- Grid Layout -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <!-- Nama Daerah -->
                        <div>
                            <div class="text-sm font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Nama Daerah:
                            </div>
                            <div class="text-lg text-gray-800 font-semibold mt-1">{{ data_anggota.daerah.nama_daerah }}
                            </div>
                        </div>

                        <!-- Kode Daerah -->
                        <div>
                            <div class="text-sm font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Kode Daerah:
                            </div>
                            <div class="text-lg text-gray-800 font-semibold mt-1">{{ data_anggota.daerah.kode_daerah }}
                            </div>
                        </div>

                        <!-- Nama Wilayah -->
                        <div>
                            <div class="text-sm font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Nama Wilayah:
                            </div>
                            <div class="text-lg text-gray-800 font-semibold mt-1">{{ data_anggota.wilayah.nama_wilayah
                                }}
                            </div>
                        </div>

                        <!-- Kode Wilayah -->
                        <div>
                            <div class="text-sm font-medium text-gray-600 border-l-4 border-blue-500 pl-4">Kode Wilayah:
                            </div>
                            <div class="text-lg text-gray-800 font-semibold mt-1">{{ data_anggota.wilayah.kode_wilayah
                                }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Jabatan Struktural -->
                <div class="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-user-tie text-blue-500 mr-3"></i> Jabatan Struktural
                    </h2>

                    <!-- Grid Layout -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <!-- Nama Jabatan -->
                        <div class="border-l-4 border-blue-500 pl-4">
                            <div class="text-sm font-medium text-gray-500">Nama Jabatan:</div>
                            <div class="text-lg text-gray-900 font-semibold">{{ data_anggota.jabatanStruktural.nama }}
                            </div>
                        </div>

                        <!-- Maksimum Anggota -->
                        <div class="border-l-4 border-blue-500 pl-4">
                            <div class="text-sm font-medium text-gray-500">Maksimum Anggota:</div>
                            <div class="text-lg text-gray-900 font-semibold">{{
                                data_anggota.jabatanStruktural.maksimumAnggota }}</div>
                        </div>

                        <!-- Tingkat Jabatan -->
                        <div class="border-l-4 border-blue-500 pl-4">
                            <div class="text-sm font-medium text-gray-500">Tingkat:</div>
                            <div class="text-lg text-gray-900 font-semibold">{{ data_anggota.jabatanStruktural.tingkat
                                }}
                            </div>
                        </div>

                        <!-- Jumlah Terisi -->
                        <!-- <div class="border-l-4 border-blue-500 pl-4">
                        <div class="text-sm font-medium text-gray-500">Terisi:</div>
                        <div class="text-lg text-gray-900 font-semibold">{{ data_anggota.jabatanStruktural.terisi }}
                        </div>
                    </div> -->
                    </div>
                </div>
                <!-- User Information -->
                <div class="bg-white p-6 rounded-2xl shadow-md mt-8">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-user text-gray-600 mr-3"></i>
                        Data User
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                        <!-- Email -->
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <div class="text-sm font-medium text-gray-500 border-b pb-2 mb-2">Email</div>
                            <div class="text-lg text-gray-800 font-semibold">{{ user.email }}</div>
                        </div>
                        <!-- Nomor HP -->
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <div class="text-sm font-medium text-gray-500 border-b pb-2 mb-2">Nomor HP</div>
                            <div class="text-lg text-gray-800 font-semibold">{{ user.no_hp }}</div>
                        </div>
                        <!-- Nama Depan -->
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <div class="text-sm font-medium text-gray-500 border-b pb-2 mb-2">Nama Depan</div>
                            <div class="text-lg text-gray-800 font-semibold">{{ user.nama_depan }}</div>
                        </div>
                        <!-- Nama Belakang -->
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <div class="text-sm font-medium text-gray-500 border-b pb-2 mb-2">Nama Belakang</div>
                            <div class="text-lg text-gray-800 font-semibold">{{ user.nama_belakang }}</div>
                        </div>
                    </div>
                </div>
                <!-- Image Uploads -->
                <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                    <h2
                        class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                        <!-- Font Awesome Icon for Photo -->
                        <i class="fas fa-camera text-gray-600 mr-3"></i>
                        Foto Dan Dokumen
                    </h2>

                    <!-- Grid Layout for Images -->
                    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                        <!-- First Image Block -->
                        <div class="flex flex-col items-center">
                            <div v-if="data_anggota.imageUsers.length > 0"
                                class="w-50 h-32 overflow-hidden rounded-lg border-2 border-gray-300 mb-2">
                                <img :src="getFullpathImage(data_anggota.imageUsers[0].imageUrl)" alt="Foto 3x4"
                                    class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                    @click="openLightbox(0)" />
                            </div>
                            <div v-else>
                                <label for="">Gambar Tidak Tersedia</label>
                            </div>
                            <div v-if="data_anggota.imageUsers.length > 0">
                                <p class="text-sm text-gray-600 text-center">{{ data_anggota.imageUsers[0].keterangan }}
                                </p>
                            </div>
                        </div>
                        <!-- Second Image Block -->
                        <div class="flex flex-col items-center">
                            <div v-if="data_anggota.imageUsers.length > 0"
                                class="w-50 h-32 overflow-hidden rounded-lg border-2 border-gray-300 mb-2">
                                <img :src="getFullpathImage(data_anggota.imageUsers[1].imageUrl)" alt="Foto KTP"
                                    class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                    @click="openLightbox(1)" />
                            </div>
                            <div v-else>
                                <label for="">Gambar Tidak Tersedia</label>
                            </div>
                            <div v-if="data_anggota.imageUsers.length > 0">
                                <p class="text-sm text-gray-600 text-center">{{ data_anggota.imageUsers[1].keterangan }}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="bg bg-red-500 w-32 p-1 rounded-md">

                                <button @click="downloadFile()"
                                    class="w-full px-1 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200">
                                    Download AD ART
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Informasi Kegiatan -->
                <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-credit-card text-gray-600 mr-3"></i>
                        Informasi Transaksi
                    </h2>
                    <div v-if="transaksiAnggota">
                        <div v-for="(transaksi, index) in transaksiAnggota" :key="transaksi.id"
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

                            <!-- Metode Pembayaran -->
                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Metode Pembayaran:</div>
                                <div class="text-lg text-gray-800 font-semibold">{{ transaksi.metodePembayaran }}</div>
                            </div>

                            <!-- Vendor Pembayaran -->
                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Vendor Pembayaran:</div>
                                <div class="text-lg text-gray-800 font-semibold">{{ transaksi.vendorPembayaran }}</div>
                            </div>

                            <!-- Status Pembayaran -->
                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Status Pembayaran:</div>
                                <div class="flex items-center space-x-2">
                                    <i v-if="transaksi.statusPembayaran === 'SUCCESS'"
                                        class="fas fa-check text-green-500"></i>
                                    <i v-else class="fas fa-exclamation-triangle text-yellow-500"></i>
                                    <div class="text-lg font-semibold" :class="{
                                        'text-green-600': transaksi.statusPembayaran === 'SUCCESS',
                                        'text-yellow-600': transaksi.statusPembayaran === 'PENDING'
                                    }">
                                        {{ transaksi.statusPembayaran }}
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Jumlah Pembayaran :</div>
                                <div class="text-lg text-gray-800 font-semibold">{{
                                    formatRupiah(transaksi.jumlahPembayaran)
                                    }}</div>
                            </div>
                            <!-- Bukti Pembayaran -->
                            <div class="flex flex-col items-center ">
                                <div class="text-sm font-medium text-gray-600">Bukti Pembayaran:</div>
                                <div class="flex flex-col items-center">
                                    <div v-if="transaksi.imageUsers"
                                        class="w-48 h-32 overflow-hidden rounded-lg border-2 border-gray-300 mb-2">
                                        <img :src="getFullpathImage(transaksi.imageUsers.imageUrl)"
                                            alt="Foto Bukti Pembayaran"
                                            class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                            @click="openLightbox(index + 2)" />
                                    </div>
                                    <div v-else>
                                        <label class="text-gray-500">Gambar Tidak Tersedia</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Waktu Pembayaran -->
                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Waktu Pembayaran:</div>
                                <div class="text-lg text-gray-800 font-semibold">{{
                                    transaksi.tanggalPembayaran.split('T')[0] }}
                                </div>
                            </div>
                            <!-- <div class="divide-x-8"></div> -->
                        </div>

                    </div>
                    <div v-else>
                        <h1>Belum Ada Transaksi Yang Anda Lakukan!</h1>
                    </div>
                    <!-- Grid Layout -->
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                        <i class="	fas fa-calendar-alt text-gray-600 mr-3"></i>
                        Data Kegitan {{ data_anggota.nama_lengkap }}
                    </h2>
                    <div v-if="kegiatanAnggota">
                        <div v-for="(Kegiatan) in kegiatanAnggota" :key="Kegiatan.id"
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Judul Kegiatan:</div>
                                <div class="text-lg text-gray-800 font-semibold">{{ Kegiatan.judul }}</div>
                            </div>

                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Deskripsi Kegiatan :</div>
                                <div class="text-lg text-gray-800 font-semibold">
                                    {{ Kegiatan.deskripsi }}
                                </div>
                            </div>

                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Tangal Kegiatan :</div>
                                <div class="text-lg text-gray-800 font-semibold">{{
                                    Kegiatan.tanggal.split('T')[0]
                                    }}</div>
                            </div>
                            <div class="flex flex-col items-center ">
                                <div class="text-sm font-medium text-gray-600">Bukti Kegiatan:</div>
                                <div v-if="Kegiatan.media" class=" flex flex-col items-center">
                                    <div v-for="media in Kegiatan.media" :key="media.id"
                                        class="w-48 h-32 overflow-hidden rounded-lg border-2 border-gray-300 mb-2">
                                        <img :src="getFullpathImage(media.imageUrl)" alt="Foto Bukti Pembayaran"
                                            class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                            @click="openLightboxKegiatan(media.imageUrl)" />
                                    </div>
                                </div>
                                <div v-else>
                                    <label class="text-gray-500">Gambar Tidak Tersedia</label>
                                </div>
                            </div>
                            <div class="">
                                <div class="text-sm font-medium text-gray-600">Aksi :</div>
                                <button @click="deleteKegiatanAnggota(Kegiatan.id)"
                                    class="bg-red-600 items-center text-white font-semibold justify-center rounded-md  w-20 h-20">Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h1>Belum Ada Kegiatan Yang Anda Lakukan!</h1>
                    </div>
                    <!-- Grid Layout -->
                </div>
            </div>
            <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUrls" :index="lightboxIndex"
                @hide="lightboxVisible = false" />
        </div>
    </div>
</template>

<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import api from '../../service/lpkni';
import VueEasyLightbox from 'vue-easy-lightbox';
import Swal from 'sweetalert2';
export default {
    components: {
        NavbarAnggota,
        VueEasyLightbox
    },
    data() {
        return {
            showSuccessModal: false,
            data_anggota: {
                id_data_anggota: 0,
                nama_lengkap: "",
                alamat: "",
                tanggalLahir: "",
                nik: "",
                tempatLahir: "",
                pekerjaan: "",
                statusPerkawinan: "",
                agama: "",
                status: "",
                daerah: {
                    nama_daerah: "",
                    kode_daerah: ""
                },
                wilayah: {
                    nama_wilayah: "",
                    kode_wilayah: ""
                },
                jabatanStruktural: {
                    nama: "",
                    maksimumAnggota: 0
                },
                imageUsers: [
                    { imageUrl: "", keterangan: "" },
                    { imageUrl: "", keterangan: "" }
                ],
            },
            user: {
                email: "",
                no_hp: "",
                nama_depan: "",
                nama_belakang: "",
                role: ""
            },
            kegiatanAnggota: [{ judul: '', deskripsi: '', tanggal: '', media: [{ imageUrl: '', deskripsi: '' }] }],
            FotoKegiatan: [],
            imageUrls: [],
            lightboxVisible: false,
            lightboxIndex: 0,
            transaksiAnggota: [{ tanggalPembayaran: ' ' }]
        };
    },
    computed: {
        getUserLpkni() {
            return this.$store.state.storeLpkni.userLpkni.data_anggota.id_data_anggota;
        },
        getUserStatusLpkni() {
            return this.$store.state.storeLpkni.userLpkni.data_anggota.status;// if GetgetUserStatusLpkni === SUCCESS
        },

    },

    mounted() {
        if (this.getUserLpkni === 0) {
            this.$router.push('/anggota/data-diri');
            return;
        }
        this.getGetUserData().then(() => {
            if (this.getUserStatusLpkni === "SUCCESS") {
                Swal.fire({
                    icon: 'success',
                    title: 'Selamat!',
                    text: 'Anda Sekarang Menjadi Bagian Dari Anggota LPKNI!'
                })
                this.showSuccessModal = true;
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Informasi!",
                    text: "Data Belum Terverifikasi, Harap Menyelesaikan Pembayaran! Jika Sudah Melakukan Pembayaran, Abaikan Pesan ini",
                    showConfirmButton: true,
                    confirmButtonColor: '#22c55e',
                })
            }
        });
    },
    methods: {
        getTruncatedDescription(text, karakter) {
            if (text.length > karakter) {
                return text.slice(0, karakter) + '...'; // Menambahkan elipsis (...) jika lebih dari 200 karakter
            }
            return text;
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
        async downloadFile() {
            const fileUrl = "http://192.168.10.2:3000/assets/adart.pdf";
            try {
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch file");
                }
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = "adart.pdf";
                link.click();
            } catch (error) {
                console.error("Gagal mengunduh file:", error);
            }
        },
        formatTanggal(tanggal) {
            const [day, month, year] = tanggal.split('/');
            const formattedDate = new Date(year, month - 1, day);
            return formattedDate.toISOString().split('T')[0];
        },
        formatRupiah(angka) {
            if (typeof angka !== 'number' || isNaN(angka)) {
                return 'nilai tidak valid';
            }
            return "Rp " + angka.toLocaleString('id-ID');
        },
        openLightboxKegiatan(url) {
            this.lightboxVisible = true; // Menampilkan lightbox
            // this.lightboxIndex = index;
            this.imageUrls = api.getfullpathImage(url)
        },
        openLightbox(index) {
            this.lightboxIndex = index;
            this.imageUrls = this.data_anggota.imageUsers.map(image => this.getFullpathImage(image.imageUrl)); // Menyiapkan array URL gambar
            this.lightboxVisible = true; // Menampilkan lightbox
        },
        getFullpathImage(img) {
            return api.getfullpathImage(img)
        },
        async getGetUserData() {
            try {
                const res = await api.getUserData();
                const userData = res.data;
                // console.log(userData);
                this.user = userData.user
                this.data_anggota = userData.data_anggota
                this.transaksiAnggota = userData.data_anggota.transaksiAnggota
                this.kegiatanAnggota = userData.data_anggota.kegiatanAnggota
                console.log(this.kegiatanAnggota)
            } catch (error) {
                console.log(error)
            }

        },
        closeSuccessModal() {
            this.showSuccessModal = false;
        },

    }

};
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}

/* Add custom styles here for better mobile experience */
@media (max-width: 100px) {
    .container {
        padding-left: 12;
        /* Remove padding on smaller screens */
    }

    .flex {
        flex-direction: column;
    }

    .w-full {
        width: 100%;
    }
}

h1 {

    font-weight: normal;
    /* Classic, less bold font weight */
}

p {

    color: #4A4A4A;
    /* Dark gray for subtlety */
    line-height: 1.6;
    /* Improve readability */
    font-size: 1.125rem;
    /* Slightly smaller font for classic feel */
}

/* Centering content */
.text-center {
    text-align: center;
    padding-top: 2rem;
}

.mb-12 {
    margin-bottom: 3rem;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 100px) {
    h1 {
        font-size: 2.5rem;
        /* Slightly smaller on mobile */
    }

    p {
        font-size: 1rem;
        /* Make text more compact on mobile */
    }
}

img {
    transition: transform 0.3s ease;
}

img:hover {
    transform: scale(1.05);
}
</style>
