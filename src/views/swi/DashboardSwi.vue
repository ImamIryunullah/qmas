<template>
    <NavbarSwiLanding />
    <div class="bg-green-100 w-full min-h-screen flex items-center justify-center p-6 mx-auto">
        <div class="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-extrabold text-gray-800">
                    Dashboard Data Diri
                </h1>
                <p class="text-lg text-gray-600 max-w-xl mx-auto mt-2">
                    Semua informasi yang perlu Anda ketahui tentang status dan data Anda sebagai Anggota SWI.
                </p>
            </div>

            <!-- Informasi Umum -->
            <div class="border rounded-xl p-6 bg-gray-50 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-user text-gray-600 mr-3"></i> Informasi Anggota
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="(value, key) in form" :key="key">
                        <div class="text-sm font-semibold text-gray-600">{{ formatLabel(key) }}</div>
                        <div class="text-lg font-medium text-gray-900">{{ value }}</div>
                    </div>
                </div>
            </div>

            <!-- Informasi Warung -->
            <div class="border rounded-xl p-6 bg-gray-50 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-store text-gray-600 mr-3"></i> Informasi Warung
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="(value, key) in warung" :key="key">
                        <div class="text-sm font-semibold text-gray-600">{{ formatLabel(key) }}</div>
                        <div class="text-lg font-medium text-gray-900">{{ value }}</div>
                    </div>
                </div>
            </div>

            <!-- Dokumen & Foto -->
            <div class="border rounded-xl p-6 bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-file text-gray-600 mr-3"></i> Dokumen & Foto
                </h2>
                <div class="grid grid-row-4 grid-cols-3 gap-8 border border-black">
                    <!-- File Uploads (e.g., KTP, SIUP, NPWP) -->
                    <div class="border border-b-2 p-2" v-for="(image, index) in imageUsers" :key="index">
                        <label class="text-sm text-gray-500 font-bold">{{ image.keterangan.replace(/-/g,
                            " ").toUpperCase() }}</label>
                        <img v-if="imageUsers[index]" :src="getFullpathImage(imageUsers[index].imageUrl)" alt="uploaded"
                            @click="openLightbox(index)"
                            class="w-auto items-center justify-center flex h-auto object-contain rounded-lg shadow-md mt-4">
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
            anggota: {
                nama: "John Doe",
                tempatLahir: "Jakarta",
                tanggalLahir: "01 Januari 1990",
                pekerjaan: "Pedagang",
                alamat: "Jl. Sudirman No. 10, Jakarta",
                nomorTelepon: "081234567890",
            },
            warung: {
                namaWarung: "Warung Maju Jaya",
                alamatWarung: "Jl. Merdeka No. 5, Jakarta",
                lokasiUsaha: "Jakarta Selatan",
            },
            imagePreviews: {
                KTP: "/@assets/qris.jpg",
                WarungDepan: "/@assets/ovo.png",
                WarungDalam: "/@assets/dana.png",
                BarangDagangan: "/@assets/citibank.png",
            },
            form: {
                daerahId: 0,
                wilayahId: 0,
                nama_lengkap: "",
                alamatRumah: "",
                tanggalLahir: "",
                tempatLahir: "",
                pekerjaan: "",
                alamatWarung: "",
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
                { folder: 'foto-siup', keterangan: "Foto SIUP", required: false },
                { folder: 'foto-npwp', keterangan: "Foto NPWP", required: false },
                { folder: 'foto-menu-harga', keterangan: "Daftar Menu dan Harga", required: false },
                { folder: 'pas-foto', keterangan: "Foto 4x6 Pemilik", required: false },
                { folder: 'foto-warung-depan', keterangan: "Foto Warung Tampak Depan", required: false },
                { folder: 'foto-warung-kiri', keterangan: "Foto Warung Samping Kiri", required: false },
                { folder: 'foto-warung-kanan', keterangan: "Foto Warung Samping Kanan", required: false },
                { folder: 'foto-ktp-belakang', keterangan: "Foto Warung Belakang", required: false }
            ],
            imageUrls: [],
            imageUsers: [],
            lightboxVisible: false,
            lightboxIndex: 0,
        };
    },
    mounted() {
        this.getDataUser()
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
            await swi.getUserDataSwi().then((res) => {
                this.form = res.data.data_swi;
                this.imageUsers = res.data.data_swi.imageUsers;
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        },
        formatLabel(key) {
            return key.replace(/([A-Z])/g, ' $1').trim();
        }
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
