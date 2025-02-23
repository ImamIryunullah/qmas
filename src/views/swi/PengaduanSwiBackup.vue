<template>

    <NavbarSwiLanding />
    <div class="bg-green-100 h-full flex justify-center items-center p-4">
        <div class="w-full max-w-3xl bg-green-300 rounded-lg shadow-xl p-6">

            <div class="bg-white w-full rounded-lg shadow-md p-8">
                <!-- Judul -->
                <div class="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
                    <h2
                        class="text-2xl md:text-3xl font-bold text-center text-gray-800 border-b-2 border-gray-300 pb-3">
                        <i class="fas fa-exclamation-circle text-yellow-500 mr-2"></i>
                        Form Pengaduan
                    </h2>
                    <p class="text-center text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
                        <i class="fas fa-info-circle text-gray-500 mr-2"></i>
                        Laporkan masalah atau keluhan Anda agar dapat segera ditindaklanjuti.
                        Kami berkomitmen untuk menjaga kenyamanan, keamanan, dan keadilan bagi semua pihak.
                    </p>
                </div>


                <form @submit.prevent="submitForm" class="space-y-6 mt-12">
                    <!-- Nama Pengadu -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label for="nama" class="text-sm font-semibold text-green-700">Nama Pengadu</label>
                        <input id="nama" v-model="form.nama" type="text" class="input-field col-span-2"
                            placeholder="Nama Pengadu" />
                    </div>

                    <!-- Email -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label for="email" class="text-sm font-semibold text-green-700">Email</label>
                        <input id="email" v-model="form.email" type="email" class="input-field col-span-2"
                            placeholder="Email Anda" />
                    </div>

                    <!-- Wilayah -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label class="text-sm font-semibold text-green-700">Provinsi</label>
                        <select v-model="form.wilayahId" @change="GetDaerahByWilayahId(form.wilayahId)"
                            class="input-field col-span-2">
                            <option :value=null selected disabled>Pilih Wilayah</option>
                            <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah"
                                :value="wilayah.id_wilayah">
                                {{ wilayah.kode_wilayah + " " + wilayah.nama_wilayah }}
                            </option>
                        </select>
                    </div>

                    <!-- Kota / Kabupaten -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label class="text-sm font-semibold text-green-700">Kota / Kabupaten</label>
                        <select v-model="form.daerahId" :disabled="form.wilayahId === 0" class="input-field col-span-2">
                            <option :value=null disabled hidden>Pilih Daerah</option>
                            <option v-for="daerah in daerahList" :key="daerah.id_daerah" :value="daerah.id_daerah">
                                {{ daerah.kode_daerah + " " + daerah.nama_daerah }}
                            </option>
                        </select>
                    </div>

                    <!-- Koordinat -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label for="koordinat" class="text-sm font-semibold text-green-700">Koordinat:</label>
                        <div class="col-span-2 text-gray-700 bg-gray-100 p-6 rounded-md">
                            {{ location ? `${location.latitude} , ${location.longitude}` : error }}
                        </div>
                    </div>

                    <!-- Kategori Pengaduan -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label for="kategori" class="text-sm font-semibold text-green-700">Kategori Pengaduan</label>
                        <select id="kategori" v-model="form.kategori" class="input-field col-span-2">
                            <option disabled value="">Pilih Kategori</option>
                            <option value="Layanan Pendidikan">Layanan Pendidikan</option>
                            <option value="Sertifikasi">Sertifikasi</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Masalah Administrasi">Masalah Administrasi</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    <!-- Deskripsi Pengaduan -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                        <label for="deskripsi" class="text-sm font-semibold text-green-700">Deskripsi Pengaduan</label>
                        <textarea id="deskripsi" v-model="form.deskripsi" class="input-field col-span-2"
                            placeholder="Jelaskan masalah anda" rows="4"></textarea>
                    </div>

                    <!-- Lampiran -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label for="lampiran" class="text-sm font-semibold text-green-700">Lampiran / Bukti</label>
                        <input id="lampiran" type="file" @change="handleFileUpload" class="input-field col-span-2"
                            multiple />
                    </div>

                    <!-- Harapan Penyelesaian -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                        <label for="harapan" class="text-sm font-semibold text-green-700">Harapan Penyelesaian</label>
                        <textarea id="harapan" v-model="form.harapan" class="input-field col-span-2"
                            placeholder="Harapan Penyelesaian" rows="4"></textarea>
                    </div>

                    <div class="flex flex-col space-y-1">
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" id="publish" v-model="form.publish" class="mr-2" />
                            <label for="publish" class="text-sm font-semibold text-green-700">
                                Apakah Bisa Kami Publish?
                            </label>
                        </div>
                        <p class="text-xs text-gray-600">
                            Dengan mencentang opsi ini, pengaduan Anda dapat kami unggah ke portal
                            <span class="font-semibold">Suara Konsumen</span> sebagai bagian dari berita untuk
                            meningkatkan kesadaran publik.
                        </p>
                    </div>


                    <!-- Submit Button -->
                    <div class="text-center">
                        <button type="submit"
                            class="w-full sm:w-1/2 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 transition-transform transform hover:scale-105">
                            Kirim Pengaduan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-auto">
            <i class="fas fa-check-circle text-green-600 text-4xl mb-4"></i>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Terima Kasih!</h3>
            <p class="text-lg text-gray-600 mb-4">
                Terimakasih telah meluangkan waktu untuk mengirim keluh kesah. Pengaduan Anda telah berhasil dikirim.
                Kami akan segera memprosesnya dan memberikan tindak lanjut.
            </p>
            <button @click="closeModal" class="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
                Tutup
            </button>
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
            form: {
                nama: '',
                email: '',
                wilayahId: '',
                daerahId: '',
                kategori: '',
                judul: '',
                deskripsi: '',
                harapan: '',
            },
            wilayahList: [],
            daerahList: [],
            fileName: '',
            file: null,
            showModal: false
        }
    },
    methods: {
        submitForm() {
            const formData = new FormData();
            formData.append('nama', this.form.nama);
            formData.append('email', this.form.email);
            formData.append('wilayah', this.form.wilayah);
            formData.append('daerah', this.form.daerah);
            formData.append('kategori', this.form.kategori);
            formData.append('judul', this.form.judul);
            formData.append('deskripsi', this.form.deskripsi);
            formData.append('harapan', this.form.harapan);
            this.showModal = true;
        },
        closeModal() {
            // Close the modal when the user clicks "Tutup"
            this.showModal = false;
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.fileName = file.name;
                this.file = file;
            }
        }
    }
};
</script>

<style scoped>
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
}

.input-field {
    @apply p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300;
    transition: all 0.3s ease-in-out;
}

button:hover {
    transition: all 0.3s ease-in-out;
}

button:active {
    transform: scale(0.98);
}

@media (max-width: 768px) {
    .input-field {
        padding-left: 16px;
        padding-right: 16px;
    }

    .w-full {
        width: 100% !important;
    }
}
</style>