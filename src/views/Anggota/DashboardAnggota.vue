<template>
    <NavbarAnggota />
    <div class="bg-gray-100 w-full h-full min-h-screen pl-28">
        <div class="container mx-auto p-8">
            <!-- Dashboard Header -->
            <div class="text-center mb-12 py-6">
                <!-- Heading with classic, clean font and prominent size -->
                <h1 class="text-3xl font-normal text-gray-800 mb-4">Dashboard Anggota</h1>

                <!-- Description with a more subtle, classic font size and spacing -->
                <p class="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto">
                    Akses lengkap untuk melihat informasi terkait anggota dan pengguna. Temukan segala hal yang perlu
                    Anda ketahui tentang status dan data pengguna Anda.
                </p>
            </div>

            <!-- Anggota Details -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">

                <h2
                    class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                    <!-- Font Awesome User Icon -->
                    <i class="fas fa-user text-gray-600 mr-3"></i>
                    Informasi Anggota
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Name and Job -->
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Nama Lengkap:</div>
                        <div class="text-gray-800">{{ data_anggota.nama_lengkap }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Pekerjaan:</div>
                        <div class="text-gray-800">{{ data_anggota.pekerjaan }}</div>
                    </div>

                    <!-- Birth Date and Place -->
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Tanggal Lahir:</div>
                        <div class="text-gray-800">{{ new Date(data_anggota.tanggalLahir).toLocaleDateString() }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Tempat Lahir:</div>
                        <div class="text-gray-800">{{ data_anggota.tempatLahir }}</div>
                    </div>

                    <!-- Address and Status -->
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Alamat:</div>
                        <div class="text-gray-800">{{ data_anggota.alamat }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Status Perkawinan:</div>
                        <div class="text-gray-800">{{ data_anggota.statusPerkawinan }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="font-medium text-gray-600">Status:</div>
                        <div class="text-gray-800">{{ data_anggota.status }}</div>
                    </div>
                </div>
            </div>
            <!-- Daerah and Wilayah -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2
                    class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                    <!-- Font Awesome Location Icon -->
                    <i class="fas fa-map-marker-alt text-gray-600 mr-3"></i>
                    Daerah dan Wilayah
                </h2>


                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Nama Daerah -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Nama Daerah:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.daerah.nama_daerah === '' ? 'Anggota Wilayah'
                            :
                            data_anggota.daerah.nama_daerah }}
                        </div>
                    </div>

                    <!-- Kode Daerah -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Kode Daerah:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.daerah.nama_daerah === '' ? '-'
                            :
                            data_anggota.daerah.nama_daerah }}</div>
                    </div>

                    <!-- Nama Wilayah -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Nama Wilayah:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.wilayah.nama_wilayah }}</div>
                    </div>

                    <!-- Kode Wilayah -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Kode Wilayah:</div>
                        <div class="text-lg text-gray-800">{{ data_anggota.wilayah.kode_wilayah }}</div>
                    </div>
                </div>
            </div>


            <!-- Jabatan Struktural -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2
                    class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                    <!-- Font Awesome Icon for Job/Position -->
                    <i class="fas fa-user-tie text-gray-600 mr-3"></i>
                    Jabatan Struktural
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    <!-- Nama Jabatan -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Nama Jabatan:</div>
                        <div class="w-full text-gray-800">{{ data_anggota.jabatanStruktural.nama }}</div>
                    </div>

                    <!-- Maksimum Anggota -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Maksimum Anggota:</div>
                        <div class="w-full text-gray-800">{{ data_anggota.jabatanStruktural.maksimumAnggota }}</div>
                    </div>
                </div>
            </div>

            <!-- User Information -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2
                    class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                    <!-- Font Awesome Icon for User Data -->
                    <i class="fas fa-user text-gray-600 mr-3"></i>
                    Data User
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Email -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Email:</div>
                        <div class="w-full text-gray-800">{{ user.email }}</div>
                    </div>

                    <!-- Nomor HP -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Nomor HP:</div>
                        <div class="w-full text-gray-800">{{ user.no_hp }}</div>
                    </div>

                    <!-- Nama Depan -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Nama Depan:</div>
                        <div class="w-full text-gray-800">{{ user.nama_depan }}</div>
                    </div>

                    <!-- Nama Belakang -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Nama Belakang:</div>
                        <div class="w-full text-gray-800">{{ user.nama_belakang }}</div>
                    </div>

                    <!-- Role -->
                    <div class="flex flex-col items-start">
                        <div class="w-full font-medium text-gray-600">Role:</div>
                        <div class="w-full text-gray-800">{{ user.role }}</div>
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
                        <div class="w-50 h-32 overflow-hidden rounded-lg border-2 border-gray-300 mb-2">
                            <img :src="getFullpathImage(data_anggota.imageUsers[0].imageUrl)" alt="Foto 3x4"
                                class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                @click="openLightbox(0)" />
                        </div>
                        <p class="text-sm text-gray-600 text-center">{{ data_anggota.imageUsers[0].keterangan }}</p>
                    </div>

                    <!-- Second Image Block -->
                    <div class="flex flex-col items-center">
                        <div class="w-50 h-32 overflow-hidden rounded-lg border-2 border-gray-300 mb-2">
                            <img :src="getFullpathImage(data_anggota.imageUsers[1].imageUrl)" alt="Foto KTP"
                                class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                @click="openLightbox(1)" />
                        </div>
                        <p class="text-sm text-gray-600 text-center">{{ data_anggota.imageUsers[1].keterangan }}</p>
                    </div>
                </div>
            </div>

            <!-- Transaction Information -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2
                    class="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-start sm:justify-center md:justify-start">
                    <!-- Font Awesome Icon for Transaction -->
                    <i class="fas fa-credit-card text-gray-600 mr-3"></i>
                    Informasi Transaksi
                </h2>


                <!-- Payment Method -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Payment Method -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Metode Pembayaran:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ transaksi.method }}</div>
                    </div>

                    <!-- Payment Status -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Status Pembayaran:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ transaksi.status }}</div>
                    </div>

                    <!-- Payment Status -->
                    <div class="flex flex-col items-start">
                        <div class="text-sm font-medium text-gray-600">Status Pembayaran:</div>

                        <!-- Conditional rendering based on payment status -->
                        <div class="flex items-center space-x-2">
                            <!-- Checkmark Icon for 'Lunas' -->
                            <i v-if="transaksi.status === 'Lunas'" class="fas fa-check text-green-500"></i>

                            <!-- Exclamation Icon for 'Belum Lunas' -->
                            <i v-if="transaksi.status === 'Belum Lunas'"
                                class="fas fa-exclamation-triangle text-yellow-500"></i>

                            <!-- Payment status text -->
                            <div class="text-lg font-semibold" :class="{
                                'text-green-600': transaksi.status === 'Lunas',
                                'text-yellow-600': transaksi.status === 'Belum Lunas'
                            }">
                                {{ transaksi.status }}
                            </div>
                        </div>
                    </div>


                    <!-- Payment Time -->
                    <div class="flex flex-col items-start">
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
import api from '../../service/api';
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
        getUser() {
            return this.$store.state.user.data_anggota.id_data_anggota;
        },
    },
    mounted() {
        if (this.getUser === 0) {
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
