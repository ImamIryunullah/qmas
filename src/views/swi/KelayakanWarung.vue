<template>
    <div>
        <NavbarSwiLanding />
    </div>

    <div class="bg-green-100 w-full min-h-screen flex items-center justify-center p-6 mx-auto">
        <div class="w-full max-w-5xl bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <div
                class="w-full max-w-5xl bg-white p-6 md:p-8 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center">
                <!-- Gambar di Sisi Kiri -->
                <div class="md:w-1/3 flex justify-center">
                    <img src="@/assets/logoswi.png" alt="SWI Logo" class="w-20 md:w-36 lg:w-44 object-contain">
                </div>

                <!-- Teks di Sisi Kanan -->
                <div class="md:w-2/3 text-center md:text-left mt-4 md:mt-0">
                    <h2 class="text-2xl md:text-3xl font-bold text-green-700 uppercase tracking-wide">
                        Form Audit Kelayakan Warung
                    </h2>
                    <p class="text-gray-600 mt-2 md:mt-3 font-semibold text-base md:text-lg">
                        DASAR UU PERLINDUNGAN KONSUMEN
                    </p>
                    <p class="text-red-600 font-semibold text-base md:text-sm">
                        NO 8 TAHUN 1999 PASAL 4
                    </p>
                    <p class="text-gray-600 font-medium text-sm md:text-base leading-relaxed mt-1 md:mt-2 italic">
                        "Hak atas Kenyamanan, Keamanan, Keselamatan dalam mengkonsumsi barang dan/atau jasa."
                    </p>

                </div>
            </div>



            <form @submit.prevent="SubmitData">
                <!-- Informasi Warung -->

                <h3 class="text-xl font-semibold text-gray-600 mt-6 mb-4 border-b-2 border-gray-300 pb-2">
                    Informasi Warung
                </h3>
                <div class="flex justify-end mt-4">
                    <button
                        class="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
                        <i class="fas fa-file-pdf mr-2"></i> Export to PDF
                    </button>
                </div>


                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="form-label">Nama Warung</label>
                        <input v-model="form.namaWarung" type="text" placeholder="Nama Warung Anda" class="form-input"
                            required />
                    </div>
                    <div>
                        <label class="form-label">Nama Pemilik</label>
                        <input v-model="form.namaPemilik" type="text" placeholder="Nama Pemilik" class="form-input"
                            required />
                    </div>
                    <div>
                        <label class="form-label">Alamat Warung</label>
                        <input v-model="form.alamatWarung" type="text" placeholder="Alamat Lengkap Warung"
                            class="form-input" required />
                    </div>
                    <div>
                        <label class="form-label">No. HP / WhatsApp Pemilik</label>
                        <input v-model="form.noHp" type="text" placeholder="Nomor HP Aktif" class="form-input"
                            required />
                    </div>
                    <div>
                        <label class="form-label">Kota / Kabupaten</label>
                        <input v-model="form.kota" type="text" placeholder="Kota/Kabupaten" class="form-input"
                            required />
                    </div>
                    <div>
                        <label class="form-label">Kode Pos</label>
                        <input v-model="form.kodePos" type="text" placeholder="Kode Pos" class="form-input" required />
                    </div>
                    <div>
                        <label class="form-label">Email</label>
                        <input v-model="form.email" type="email" placeholder="Alamat Email" class="form-input"
                            required />
                    </div>
                    <div>
                        <label class="form-label">Tanggal</label>
                        <input v-model="form.tanggal" type="date" class="form-input" required />
                    </div>
                </div>

                <!-- Audit Kriteria -->
                <h3 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Audit Kriteria</h3>
                <div v-for="(section, index) in auditSections" :key="index" class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">{{ section.title }}</h4>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <div v-for="(item, i) in section.items" :key="i"
                            class="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2 space-y-2 sm:space-y-0">

                            <!-- Nama Kriteria -->
                            <span class="text-gray-700 flex-1">{{ item.name }}</span>

                            <!-- Radio Button YA/TIDAK -->
                            <div class="flex items-center space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" :name="'audit-' + index + '-' + i" v-model="item.value"
                                        value="Ya" class="radio">
                                    <span class="ml-2 text-green-600">Ya</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" :name="'audit-' + index + '-' + i" v-model="item.value"
                                        value="Tidak" class="radio">
                                    <span class="ml-2 text-red-600 mr-2">No</span>
                                </label>
                            </div>

                            <!-- Input Keterangan -->
                            <input v-model="item.keterangan" type="text"
                                class="w-full sm:w-1/2 p-2 border rounded-md focus:ring focus:ring-green-300 text-sm"
                                placeholder="Keterangan (Opsional)">
                        </div>
                    </div>
                </div>
                <!-- Modal Konfirmasi -->
                <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h3 class="text-lg font-semibold text-gray-800">Konfirmasi Pengiriman</h3>
                        <p class="text-gray-600 mt-2">
                            Sebelum mengirim, Anda bertanggung jawab atas konsekuensi dan risiko yang timbul akibat data
                            yang Anda berikan.
                            Pastikan semua informasi sudah benar dan sesuai. Apakah Anda yakin ingin melanjutkan?
                        </p>
                        <div class="mt-4 flex justify-center space-x-4">
                            <button @click="showModal = false"
                                class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                                Batal
                            </button>
                            <button @click="submitForm"
                                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800">
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tombol Kirim -->
                <div class="flex justify-center mt-6">
                    <button @click="showModal = true"
                        class="w-1/2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition">
                        Kirim
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import NavbarSwiLanding from '@/components/NavbarSwiLanding.vue';
export default {
    components: {
        NavbarSwiLanding
    },
    data() {
        return {
            showModal: false,
            form: {
                namaWarung: "",
                namaPemilik: "",
                alamatWarung: "",
                noHp: "",
                kota: "",
                kodePos: "",
                email: "",
                tanggal: "",
            },
            auditSections: [
                {
                    title: "Bagian Depan",
                    items: [
                        { name: "Cuci tangan", value: "" },
                        { name: "Tissu (tidak untuk toilet)", value: "" },
                        { name: "Sabun", value: "" },
                        { name: "Kran air", value: "" },
                        { name: "Saluran air pembuangan", value: "" },
                        { name: "Tempat sampah minimum 3 Jenis", value: "" },
                        { name: "Cermin", value: "" },
                        { name: "Toilet duduk", value: "" },

                    ],
                },
                {
                    title: "Ruang Makan",
                    items: [
                        { name: "Meja", value: "" },
                        { name: "Tempat tisu, tusuk gigi", value: "" },
                        { name: "Kursi", value: "" },
                        { name: "Toilet khusus laki-laki", value: "" },
                        { name: "Harga di menu memakai rupiah", value: "" },
                        { name: "Dibuat komposisi makanan (di buku menu)", value: "" },
                        { name: "Dibuat komposisi minuman (di buku menu)", value: "" }
                    ],
                },
                {
                    title: "Dapur",
                    items: [
                        { name: "Kebersihan dapur", value: "" },
                        { name: "Kebersihan peralatan - peralatan", value: "" },
                        { name: "Sirkulasi udara (exhaust fan)", value: "" },
                        { name: "Tempat sampah minimum 3 jenis", value: "" },
                        { name: "Tempat sisa makanan, plastik, kertas, kaleng, baterai", value: "" },
                        { name: "Tempat bekas penggorengan", value: "" },
                    ],
                },
                {
                    title: "Fasilitas Pendukung",
                    items: [
                        { name: "APAR (Alat Pemadam Api Ringan)", value: "" },
                        { name: "Tempat merokok", value: "" },
                        { name: "Tempat rileks", value: "" },
                        { name: "Parkir", value: "" },
                        { name: "Toilet minimal 2", value: "" },
                        { name: "Musola", value: "" },
                    ],
                },
                {
                    title: "Fasilitas Tambahan",
                    items: [
                        { name: "Wifi", value: "" },
                        { name: "Satpam", value: "" },
                        { name: "Trolly pengantar makanan", value: "" },
                        { name: "Seragam", value: "" },
                        { name: "Penerangan", value: "" },
                        { name: "Pesanan melalui online / aplikasi", value: "" },
                        { name: "Pencantuman PPN di Nota", value: "" },
                        { name: "Pencantuman SNI dan Halal SWI", value: "" },
                        { name: "Setfikat / piagam yang dimiliki", value: "" },
                        { name: "Kursi Balita", value: "" },
                        { name: "Tempat Bermain Anak", value: "" },
                    ],
                },
            ],
        };
    },
    methods: {
        submitForm() {
            this.showModal = false;
            this.$toast.success("Berhasil Dikirim");
        }
    },
};
</script>

<style scoped>
.form-label {
    @apply text-sm font-bold text-gray-700;
}

.form-input {
    @apply w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2;
}

.radio {
    @apply w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500;
}
</style>