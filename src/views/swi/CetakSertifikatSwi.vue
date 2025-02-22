<template>

    <NavbarSwiLanding />
    <div class="bg-green-100 w-full min-h-screen flex items-center justify-center p-6 mx-auto">
        <!-- Container Sertifikat -->
        <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg text-center border border-gray-300 
                    mx-auto overflow-hidden">
            <h2 class="text-2xl font-bold text-gray-700 mb-4">SERTIFIKAT STANDARISASI WARUNG INDONESIA</h2>

            <!-- Sertifikat Preview -->
            <div id="certificate" class="border-4 border-gray-400 p-6 bg-white rounded-md shadow-md">
                <!-- Logo -->
                <div class="flex justify-center mb-4">
                    <img src="@/assets/logoswi.png" alt="Logo SWI" class="w-24 h-24">
                </div>

                <!-- Header -->
                <h3 class="text-xl font-bold text-gray-700">Diberikan Kepada</h3>
                <p class="text-lg font-semibold text-gray-800 mt-2">{{ user.nama }}</p>
                <p class="text-md text-gray-600">Pemilik Warung: {{ user.namaWarung }}</p>

                <!-- Informasi Sertifikat -->
                <div class="mt-4">
                    <p class="text-sm text-gray-600">Alamat Warung: {{ user.alamatWarung }}</p>
                    <p class="text-sm text-gray-600">Lokasi Usaha: {{ user.lokasiUsaha }}</p>
                    <p class="text-sm text-gray-600">Tanggal Pendaftaran: {{ user.tanggalPendaftaran }}</p>
                </div>

                <!-- Tanda Tangan -->
                <div class="mt-8 flex flex-col md:flex-row justify-between px-6">
                    <div class="text-center mb-4 md:mb-0">
                        <p class="text-sm text-gray-600">Mengetahui,</p>
                        <p class="text-md font-semibold mt-4">[ Nama Ketua SWI ]</p>
                        <p class="text-sm text-gray-600">Ketua SWI</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-600">Diberikan pada:</p>
                        <p class="text-md font-semibold mt-4">{{ new Date().toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>

            <!-- Tombol Cetak -->
            <button @click="printCertificate"
                class="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition">
                Cetak Sertifikat
            </button>
        </div>
    </div>
</template>


<script>
// import NavbarSwiLanding from '@/components/NavbarSwiLanding.vue';
import NavbarSwiLanding from '@/components/NavbarSwiLanding.vue';
export default {
    components: {
        // NavbarSwiLanding
        NavbarSwiLanding
    },
    data() {
        return {
            user: {
                nama: "Budi Santoso",
                namaWarung: "Warung Makan Sejahtera",
                alamatWarung: "Jl. Merdeka No. 45, Jakarta",
                lokasiUsaha: "Jakarta Pusat",
                tanggalPendaftaran: "01 Januari 2025"
            }
        };
    },
    methods: {
        printCertificate() {
            window.print();
        }
    }
};
</script>

<style scoped>
/* Mengatasi pemotongan warna di mode mobile */
html,
body {
    overflow-x: hidden;
    background-color: #f0fdf4;
    /* Warna hijau muda */
}

/* Pastikan konten tidak tertutup sidebar di layar besar */
@media (min-width: 1024px) {
    .content {
        margin-left: 16rem;
    }
}
</style>
