<template>

    <div class="bg-gray-100 w-screen h-full min-h-screen pl-16">
        <NavbarAnggota />
        <div class="container mx-auto pl-12 p-2">

            <!-- Dashboard Header -->
            <div class="text-center mb-12 py-6">
                <!-- Heading with classic, clean font and prominent size -->
                <h1 class="text-3xl font-normal text-gray-800 mb-4">Dashboard Anggota LPKNI</h1>

                <!-- Description with a more subtle, classic font size and spacing -->
                <p class="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto">
                    Akses lengkap untuk melihat informasi terkait anggota dan pengguna. Temukan segala hal yang perlu
                    Anda ketahui tentang status dan data pengguna Anda.
                </p>
            </div>

            <!-- Anggota Details -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <i class="fas fa-user text-gray-600 mr-3"></i>
                    Informasi Anggota
                </h2>

                <!-- Grid Layout -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <!-- Nama Lengkap -->
                    <div>
                        <div class="font-medium text-gray-600">Nama Lengkap:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.nama_lengkap }}</div>
                    </div>

                    <!-- Pekerjaan -->
                    <div>
                        <div class="font-medium text-gray-600">Pekerjaan:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.pekerjaan }}</div>
                    </div>

                    <!-- Tanggal Lahir -->
                    <div>
                        <div class="font-medium text-gray-600">Tanggal Lahir:</div>
                        <div class="text-lg text-gray-800">{{ new Date(data_anggota.tanggalLahir).toLocaleDateString()
                        }}</div>
                    </div>

                    <!-- Tempat Lahir -->
                    <div>
                        <div class="font-medium text-gray-600">Tempat Lahir:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.tempatLahir }}</div>
                    </div>

                    <!-- Alamat -->
                    <div class="md:col-span-2">
                        <div class="font-medium text-gray-600">Alamat:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.alamat }}</div>
                    </div>

                    <!-- Status Perkawinan -->
                    <div>
                        <div class="font-medium text-gray-600">Status Perkawinan:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.statusPerkawinan }}</div>
                    </div>

                    <!-- Status -->
                    <div>
                        <div class="font-medium text-gray-600">Status:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.status }}</div>
                    </div>
                </div>
            </div>

            <!-- Daerah and Wilayah -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <i class="fas fa-map-marker-alt text-gray-600 mr-3"></i>
                    Daerah dan Wilayah
                </h2>

                <!-- Grid Layout -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <!-- Nama Daerah -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Nama Daerah:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.daerah.nama_daerah }}</div>
                    </div>

                    <!-- Kode Daerah -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Kode Daerah:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.daerah.kode_daerah }}</div>
                    </div>

                    <!-- Nama Wilayah -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Nama Wilayah:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.wilayah.nama_wilayah }}</div>
                    </div>

                    <!-- Kode Wilayah -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Kode Wilayah:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.wilayah.kode_wilayah }}</div>
                    </div>
                </div>
            </div>



            <!-- Jabatan Struktural -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <i class="fas fa-user-tie text-gray-600 mr-3"></i>
                    Jabatan Struktural
                </h2>

                <!-- Grid Layout -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- Nama Jabatan -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Nama Jabatan:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.jabatanStruktural.nama }}</div>
                    </div>

                    <!-- Maksimum Anggota -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Maksimum Anggota:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{
                            data_anggota.jabatanStruktural.maksimumAnggota }}</div>
                    </div>

                    <!-- Tingkat Jabatan -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Tingkat:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.jabatanStruktural.tingkat }}
                        </div>
                    </div>

                    <!-- Jumlah Terisi -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Terisi:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ data_anggota.jabatanStruktural.terisi }}
                        </div>
                    </div>
                </div>
            </div>


            <!-- User Information -->
            <!-- User Information -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <i class="fas fa-user text-gray-600 mr-3"></i>
                    Data User
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Email -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Email:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ user.email }}</div>
                    </div>

                    <!-- Nomor HP -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Nomor HP:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ user.no_hp }}</div>
                    </div>

                    <!-- Nama Depan -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Nama Depan:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ user.nama_depan }}</div>
                    </div>

                    <!-- Nama Belakang -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Nama Belakang:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ user.nama_belakang }}</div>
                    </div>

                    <!-- Role -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Role:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ user.role }}</div>
                    </div>
                </div>
            </div>

            <!-- Image Uploads -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2
                    class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                    <!-- Font Awesome Icon for Photo -->
                    <i class="fas fa-camera text-gray-600 mr-3"></i>
                    Foto
                </h2>

                <!-- Grid Layout for Images -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                            <p class="text-sm text-gray-600 text-center">{{ data_anggota.imageUsers[0].keterangan }}</p>
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
                            <p class="text-sm text-gray-600 text-center">{{ data_anggota.imageUsers[1].keterangan }}</p>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Informasi Transaksi -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <i class="fas fa-credit-card text-gray-600 mr-3"></i>
                    Informasi Transaksi
                </h2>

                <!-- Grid Layout -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <!-- Metode Pembayaran -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Metode Pembayaran:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ transaksi.method }}</div>
                    </div>

                    <!-- Status Pembayaran -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Status Pembayaran:</div>
                        <div class="flex items-center space-x-2">
                            <i v-if="transaksi.status === 'Lunas'" class="fas fa-check text-green-500"></i>
                            <i v-else class="fas fa-exclamation-triangle text-yellow-500"></i>
                            <div class="text-lg font-semibold" :class="{
                                'text-green-600': transaksi.status === 'Lunas',
                                'text-yellow-600': transaksi.status === 'Belum Lunas'
                            }">
                                {{ transaksi.status }}
                            </div>
                        </div>
                    </div>

                    <!-- Waktu Pembayaran -->
                    <div>
                        <div class="text-sm font-medium text-gray-600">Waktu Pembayaran:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ transaksi.waktupembayaran }}</div>
                    </div>
                </div>
            </div>


        </div>
        <!-- Lightbox Modal -->
        <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUrls" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>

<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import api from '../../service/lpkni';
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
    components: {
        NavbarAnggota,
        VueEasyLightbox
    },
    data() {
        return {
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
                ]
            },
            user: {
                email: "",
                no_hp: "",
                nama_depan: "",
                nama_belakang: "",
                role: ""
            },
            transaksi: {
                method: "Bank Transfer (Mandiri)",
                status: "Belum Lunas",
                jumlahpembayaran: "600.000",
                waktupembayaran: "12 Jan 2024"
            },
            imageUrls: [],
            lightboxVisible: false,
            lightboxIndex: 0,
        };
    },
    computed: {
        getUserLpkni() {
            return this.$store.state.storeLpkni.userLpkni.data_anggota.id_data_anggota;
        },
    },
    mounted() {
        if (this.getUserLpkni === 0) {
            this.$router.push('/anggota/data-diri')
            return
        }
        this.getGetUserData();
    },
    methods: {
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
                console.log(userData);
                this.user = userData.user
                this.data_anggota = userData.data_anggota
            } catch (error) {
                console.log(error)
            }

        }
    }

};
</script>

<style scoped>
/* Add custom styles here for better mobile experience */
@media (max-width: 640px) {
    .container {
        padding-left: 0;
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
@media (max-width: 640px) {
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
