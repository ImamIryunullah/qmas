<template>
    <NavbarSwiLanding />
    <div class="bg-green-100 w-full min-h-screen flex items-center justify-center p-6 mx-auto">
        <div class="bg-white w-full max-w-4xl p-8 rounded-2xl">
            <!-- Modal Success -->
            <div v-if="showSuccessModal"
                class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div
                    class="bg-white px-4 py-5 md:px-6 md:py-6 rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-w-sm md:max-w-md lg:max-w-lg transform scale-95 animate-fadeIn">
                    <h2 class="text-lg md:text-2xl font-semibold text-gray-800 text-center mt-4">Selamat!</h2>
                    <p class="text-sm md:text-base text-gray-600 text-center mt-2">
                        Anda telah resmi menjadi bagian dari <span class="font-semibold text-red-600">Standarisasi
                            Warung Indonesia</span>.
                        Selamat menikmati layanan kami!
                    </p>
                    <div class="flex justify-center mt-6">
                        <button @click="closeSuccessModal"
                            class="px-5 py-2 md:px-6 md:py-2 bg-green-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-green-600">
                            OK
                        </button>
                    </div>
                </div>
            </div>

            <!-- Header -->
            <div
                class="text-center mb-8 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white p-8 rounded-xl animate-fadeIn">
                <h1 class="sm:text-4xl text-3xl font-extrabold">
                    Dashboard Data Diri
                </h1>
                <p class="text-lg max-w-2xl mx-auto mt-2">
                    Semua informasi yang perlu Anda ketahui tentang status dan data Anda sebagai Anggota SWI.
                </p>
            </div>

            <div class="border rounded-xl p-6 bg-gray-50 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-user text-gray-600 mr-3"></i> Informasi Anggota
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- Nama Lengkap -->
                    <div>
                        <div class="font-medium text-gray-600">Nama Lengkap:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ dataUser.nama_lengkap }}</div>
                    </div>

                    <!-- Alamat Rumah -->
                    <div>
                        <div class="font-medium text-gray-600">Alamat Rumah:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ dataUser.alamatRumah }}</div>
                    </div>

                    <!-- Tanggal Lahir -->
                    <div>
                        <div class="font-medium text-gray-600">Tanggal Lahir:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ dataUser.tanggalLahir.split('T')[0] }}</div>
                    </div>

                    <!-- Tempat Lahir -->
                    <div>
                        <div class="font-medium text-gray-600">Tempat Lahir:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ dataUser.tempatLahir }}</div>
                    </div>

                    <!-- Pekerjaan -->
                    <div>
                        <div class="font-medium text-gray-600">Pekerjaan:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ dataUser.pekerjaan }}</div>
                    </div>

                    <!-- No HP -->
                    <div>
                        <div class="font-medium text-gray-600">No HP:</div>
                        <div class="text-lg text-gray-800 font-semibold">{{ dataUser.noHp }}</div>
                    </div>
                    <div>
                        <div class="font-medium text-gray-600">Status</div>
                        <div class="text-lg text-gray-800 font-semibold flex items-center" :class="{
                            'text-yellow-500': dataUser.status === 'PENDING',  // Apply yellow color if status is 'PENDING'
                            'text-green-500': dataUser.status === 'SUCCESS',  // Apply green color if status is 'SUCCESS'
                            'text-gray-800': dataUser.status !== 'PENDING' && dataUser.status !== 'SUCCESS'  // Default color for other statuses
                        }">
                            <!-- Conditional icons for 'PENDING' and 'SUCCESS' -->
                            <i v-if="dataUser.status === 'PENDING'" class="fas fa-clock text-yellow-500 mr-2"></i>
                            <i v-if="dataUser.status === 'SUCCESS'" class="fas fa-check-circle text-green-500 mr-2"></i>
                            {{ dataUser.status }}
                        </div>
                    </div>


                </div>
            </div>

            <!-- Informasi Warung -->
            <div class="border rounded-xl p-6 sm:p-8 bg-white mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-store text-green-500 mr-3"></i> Informasi Warung
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <div class="font-medium text-gray-600 border-l-4 border-green-500 pl-4">Nama Warung:</div>
                        <div class="text-lg text-gray-800 font-semibold mt-1">{{ dataUser.namaWarung }}</div>
                    </div>
                    <div>
                        <div class="font-medium text-gray-600 border-l-4 border-green-500 pl-4">Alamat Warung:</div>
                        <div class="text-lg text-gray-800 font-semibold mt-1">{{ dataUser.alamatWarung }}</div>
                    </div>
                    <div class="sm:col-span-2">
                        <div class="font-medium text-gray-600 border-l-4 border-green-500 pl-4">Lokasi Usaha:</div>
                        <div class="text-lg text-gray-800 font-semibold mt-1">{{ dataUser.lokasiUsaha }}</div>
                    </div>
                </div>
            </div>


            <!-- Pernyataan -->
            <div class="border rounded-xl p-6 sm:p-8 bg-white mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-3"></i> Pernyataan
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg font-medium text-gray-900">
                    <div class="border-l-4 border-green-500 pl-4">
                        Pernyataan Halal: <span class="font-semibold">{{ dataUser.pernyataanHalal ? 'Ya' : 'Tidak'
                        }}</span>
                    </div>
                    <div class="border-l-4 border-green-500 pl-4">
                        Pernyataan Bahan Kimia: <span class="font-semibold">{{ dataUser.pernyataanBahanKimia ? 'Ya' :
                            'Tidak' }}</span>
                    </div>
                    <div class="border-l-4 border-green-500 pl-4">
                        Pernyataan Fasilitas Standar: <span class="font-semibold">{{ dataUser.pernyataanFasilitasStandar
                            ? 'Ya' : 'Tidak' }}</span>
                    </div>
                    <div class="border-l-4 border-green-500 pl-4">
                        Pernyataan Keabsahan Data: <span class="font-semibold">{{ dataUser.pernyataanKeabsahanData ?
                            'Ya' : 'Tidak' }}</span>
                    </div>
                </div>
            </div>
            <!-- Dokumen & Foto -->
            <div class="border rounded-xl p-6 bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-file text-gray-600 mr-3"></i> Dokumen & Foto
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div v-for="(image, index) in imageUsers" :key="index"
                        class="border rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
                        <label class="text-sm font-semibold text-gray-700 text-center mb-2">
                            {{ image.keterangan.replace(/-/g, "").toUpperCase() }}
                        </label>
                        <img v-if="image" :src="getFullpathImage(image.imageUrl)" alt="uploaded"
                            @click="openLightbox(index)"
                            class="w-full h-auto rounded-lg shadow-md aspect-[4/3] object-cover cursor-pointer transition-transform hover:scale-105">
                    </div>
                </div>
            </div>
        </div>
        <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUrls" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>


<script>
import NavbarSwiLanding from '@/components/NavbarSwiLanding.vue';
import swi from '@/service/swi';
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
    components: {
        NavbarSwiLanding,
        VueEasyLightbox
    },
    data() {
        return {
            showSuccessModal: false,
            anggota: {
                nama_lengkap: "",
                tempatLahir: "",
                tanggalLahir: "",
                alamatRumah: "",
                pekerjaan: "",
                alamat: "",
                nomorTelepon: "",
            },
            dataUser: {
                daerahId: 0,
                wilayahId: 0,
                nama_lengkap: "",
                alamatRumah: "",
                tanggalLahir: "",
                tempatLahir: "",
                pekerjaan: "",
                alamatWarung: "",
                status: "",
                namaWarung: "",
                lokasiUsaha: "",
                koordinat: '',
                noHp: null,
                pernyataanHalal: false,
                pernyataanBahanKimia: false,
                pernyataanFasilitasStandar: false,
                pernyataanKeabsahanData: false,
                file: [],
                folder: []
            },
            imageInputs: [
                { folder: 'foto-ktp', keterangan: "Foto KTP", required: false },
                { folder: 'Foto Warung Belakang"', keterangan: "Foto Warung Belakang", required: false },
                { folder: 'foto-siup', keterangan: "Foto SIUP", required: false },
                { folder: 'foto-npwp', keterangan: "Foto NPWP", required: false },
                { folder: 'foto-menu-harga', keterangan: "Daftar Menu dan Harga", required: false },
                { folder: 'pas-foto', keterangan: "Foto 4x6 Pemilik", required: false },
                { folder: 'foto-warung-depan', keterangan: "Foto Warung Tampak Depan", required: false },
                { folder: 'foto-warung-kiri', keterangan: "Foto Warung Samping Kiri", required: false },
                { folder: 'foto-warung-kanan', keterangan: "Foto Warung Samping Kanan", required: false },

            ],
            imageUrls: [],
            imageUsers: [],
            lightboxVisible: false,
            lightboxIndex: 0,
        };
    },
    computed: {
        getUserDataSwi() {
            return this.$store.state.storeswi.userSwi.data_swi.id_data_swi;
        },
        getUserStatusSWI() {
            return this.$store.state.storeswi.userSwi.data_swi.status;// if GetgetUserStatusLpkni === SUCCESS
        },
    },
    watch: {
        getUserStatusSwi(newStatus) {
            if (newStatus === "SUCCES") {
                this.showSuccessModal = true;
            } else {
                this.showSuccessModal = false;
            }
        },
    },
    mounted() {
        this.getDataUser().then(() => {
            if (this.getUserStatusSWI === "SUCCES") {
                this.showSuccessModal = true;
            }
        });

    },

    methods: {
        openLightbox(index) {
            this.lightboxIndex = index;
            this.imageUrls = this.imageUsers.map(image => this.getFullpathImage(image.imageUrl)); // Menyiapkan array URL gambar
            this.lightboxVisible = true; // Menampilkan lightbox
        },
        getFullpathImage(img) {
            return swi.getfullpathImageSwi(img)
        },
        async getDataUser() {
            try {
                const response = await swi.getUserDataSwi(); // Assuming swi.getUserDataSwi is the correct API call to fetch the data
                const data = response.data;

                // Assuming data.data_swi contains the details you want to store
                this.dataUser = data.data_swi;
                this.imageUsers = data.data_swi.imageUsers || []; // Handle if imageUsers is empty or null

                // Log the response for debugging
                console.log(data);

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        },

        formatLabel(key) {
            return key.replace(/([A-Z])/g, ' $1').trim();
        },
        closeSuccessModal() {
            this.showSuccessModal = false;
        },
    }
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

/* Animasi Halus */
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
