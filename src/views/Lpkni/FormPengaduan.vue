<template>
    <div class="mb-20">
        <NavbarLandingPage />
    </div>
    <div v-if="isMounted" class="w-full min-h-screen flex flex-col bg-white">
        <!-- Form Container -->
        <div class="flex flex-col items-center p-6 flex-grow mt-10">
            <div class="bg-white w-full max-w-screen-md p-6 rounded-lg shadow-2xl border box-border animate-fadeInUp ">
                <h2 class="text-3xl font-semibold text-red-600 text-center mb-6">Form Pengaduan</h2>
                <form @submit.prevent="submitForm" class="space-y-6">
                    <!-- Nama Pengadu -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="nama" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Nama
                            Pengadu</label>
                        <input id="nama" v-model="form.nama" type="text" class="input-field w-full sm:w-2/3"
                            placeholder="Nama Pengadu" />
                    </div>

                    <!-- Email -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="email"
                            class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Email</label>
                        <input id="email" v-model="form.email" type="email" class="input-field w-full sm:w-2/3"
                            placeholder="Email Anda" />
                    </div>

                    <!-- Wilayah -->
                    <!-- Provinsi -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Provinsi</label>
                        <select v-model="form.wilayahId" @change="GetDaerahByWilayahId(form.wilayahId)"
                            class="input-field w-full sm:w-2/3">
                            <option :value=null selected disabled>Pilih Wilayah</option>
                            <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah"
                                :value="wilayah.id_wilayah">
                                {{ wilayah.kode_wilayah + " " + wilayah.nama_wilayah }}
                            </option>
                        </select>
                    </div>

                    <!-- Kota / Kabupaten -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Kota / Kabupaten</label>
                        <select v-model="form.daerahId" :disabled="form.wilayahId === 0"
                            class="input-field w-full sm:w-2/3">
                            <option :value=null disabled hidden>Pilih Daerah</option>
                            <option v-for="daerah in daerahList" :key="daerah.id_daerah" :value="daerah.id_daerah">
                                {{ daerah.kode_daerah + " " + daerah.nama_daerah }}
                            </option>
                        </select>
                    </div>
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="koordinat"
                            class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Koordinat :
                            lat,long</label>

                        <label class="input-field w-full sm:w-2/3" placeholder="Kota atau Kabupaten"> {{
                            location ?
                                `${location.latitude} , ${location.longitude}` : error
                        }}
                        </label>
                    </div>

                    <!-- Kategori Pengaduan -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="kategori" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Kategori
                            Pengaduan</label>
                        <select id="kategori" v-model="form.kategori" class="input-field w-full sm:w-2/3">
                            <option disabled value="">Pilih Kategori</option>
                            <option value="Layanan Pendidikan">Layanan Pendidikan</option>
                            <option value="Sertifikasi">Sertifikasi</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Masalah Administrasi">Masalah Administrasi</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    <!-- Judul Pengaduan -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="judul" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Judul
                            Pengaduan</label>
                        <input id="judul" v-model="form.judul" type="text" class="input-field w-full sm:w-2/3"
                            placeholder="Judul Pengaduan" />
                    </div>

                    <!-- Deskripsi Pengaduan -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="deskripsi"
                            class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Deskripsi Pengaduan</label>
                        <textarea id="deskripsi" v-model="form.deskripsi" class="input-field w-full sm:w-2/3"
                            placeholder="Jelaskan pengaduan Anda" rows="4"></textarea>
                    </div>

                    <!-- Lampiran -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="lampiran" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Lampiran
                            / Bukti</label>
                        <input id="lampiran" type="file" @change="handleFileUpload" class="input-field w-full sm:w-2/3"
                            multiple />

                    </div>


                    <!-- Harapan Penyelesaian -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="harapan" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Harapan
                            Penyelesaian</label>
                        <input id="harapan" v-model="form.harapan" type="text" class="input-field w-full sm:w-2/3"
                            placeholder="Harapan Penyelesaian" />
                    </div>

                    <!-- Tindak Lanjut -->
                    <div class="flex items-center space-x-4 mb-4">
                        <input type="checkbox" id="publish" v-model="form.publish" class="mr-2" />
                        <label for="publish" class="text-sm font-semibold text-red-700">Apakah Bisa Kami
                            Publish?</label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105">
                        Kirim Pengaduan
                    </button>
                </form>
            </div>
        </div>

        <FooterLandingPage />
    </div>
</template>

<script>
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';
import FooterLandingPage from '@/components/FooterLandingPage.vue';
import api from '@/service/api';

export default {
    components: {
        NavbarLandingPage,
        FooterLandingPage
    },
    data() {
        return {
            fileList: [],
            fileNames: [],
            location: null,
            error: null,
            isMounted: false,
            form: {
                wilayahId: null,
                daerahId: null,
                nama: '',
                email: '',
                kategori: '',
                judul: '',
                deskripsi: '',
                harapan: '',
                publish: false,
                latitude: null,
                longitude: null,
            },
            file: null,
            fileName: '',
            daerahList: [],
            wilayahList: [], // To store the list of provinces
        };
    },
    mounted() {
        this.isMounted = true;
        this.getLocation()
        this.fetchWilayah()
    },
    methods: {
        handleFileUpload(event) {
            const selectedFiles = event.target.files;

            if (selectedFiles.length + this.fileList.length > 5) {
                alert("Maksimal hanya boleh mengupload 5 file.");
                return;
            }

            // Menambahkan file yang dipilih ke dalam array fileList
            for (let i = 0; i < selectedFiles.length; i++) {
                this.fileList.push(selectedFiles[i]);
                this.fileNames.push(selectedFiles[i].name);
            }

            // Jika lebih dari 5 file dipilih, batasi hanya 5 file
            if (this.fileList.length > 5) {
                this.fileList = this.fileList.slice(0, 5);
                this.fileNames = this.fileNames.slice(0, 5);
            }
        },
        GetDaerahByWilayahId(id) {
            api.getDaerahByWilayahId(id).then((response) => {
                this.form.daerahId = null
                this.daerahList = response.data;
            }).catch((error) => {
                console.error(error);
            })
        },
        async fetchWilayah() {
            await api.getAllWilayah().then((res) => {
                this.wilayahList = res.data
            }).catch(() => {
            })
        },
        async submitForm() {
            if (!this.validateForm()) {
                alert('Mohon lengkapi semua data dengan benar!');
                return;
            }
            console.log(this.form)

        },
        validateForm() {
            return (
                this.form.nama &&
                this.form.email &&
                this.form.wilayahId &&
                this.form.daerahId &&
                this.form.kategori &&
                this.form.judul &&
                this.form.deskripsi &&
                this.form.harapan
            );
        },
        resetForm() {
            this.form = {
                nama: '',
                email: '',
                wilayah: '',
                daerah: '',
                kategori: '',
                judul: '',
                deskripsi: '',
                harapan: '',
                publish: false,
            };
            this.file = null;
            this.fileName = '';
        }
        ,
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.successCallback,
                    this.errorCallback
                );
            } else {
                this.error = "Geolocation is not supported by this browser.";
            }
        },
        successCallback(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.location = { latitude, longitude };
            this.form.latitude = latitude;
            this.form.longitude = longitude;
        },
        errorCallback(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    this.error = "Anda menolak permintaan untuk mengakses lokasi.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    this.error = "Informasi lokasi tidak tersedia.";
                    break;
                case error.TIMEOUT:
                    this.error = "Permintaan untuk mendapatkan lokasi pengguna telah waktunya habis.";
                    break;
                case error.UNKNOWN_ERROR:
                    this.error = "Terjadi kesalahan yang tidak diketahui.";
                    break;
            }
        },
    }
};
</script>

<style scoped>
.input-field {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.375rem;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #f87171;
}

button:hover {
    background-color: #dc2626;
}

.animate-fadeInUp {
    animation: fadeInUp 0.5s ease-in-out;
}

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
</style>