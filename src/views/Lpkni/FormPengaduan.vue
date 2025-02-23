<template>
    <div class="mb-20">
        <NavbarLandingPage />
    </div>
    <div v-if="isMounted" class="w-full min-h-screen flex flex-col bg-white text-xl">
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
                            placeholder="Nama Pengadu" required />
                    </div>

                    <!-- Email -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="email"
                            class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Email</label>
                        <input id="email" v-model="form.email" type="email" class="input-field w-full sm:w-2/3"
                            placeholder="Email Anda" required />
                    </div>

                    <!-- Wilayah -->
                    <!-- Provinsi -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Provinsi</label>
                        <select required v-model="form.wilayahId" @change="GetDaerahByWilayahId(form.wilayahId)"
                            class="input-field w-full sm:w-2/3">
                            <option :value=null selected disabled>Pilih Provinsi</option>
                            <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah"
                                :value="wilayah.id_wilayah">
                                {{ wilayah.kode_wilayah + " " + wilayah.nama_wilayah }}
                            </option>
                        </select>
                    </div>

                    <!-- Kota / Kabupaten -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Kota / Kabupaten</label>
                        <select required v-model="form.daerahId" :disabled="form.wilayahId === 0"
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
                    <div class="flex flex-col space-y-4 mb-4">
                        <!-- Kategori & Judul dalam satu baris -->
                        <div class="flex items-center space-x-4">
                            <!-- Kategori Pengaduan -->
                            <label for="kategori"
                                class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Kategori
                                Pengaduan</label>
                            <select required id="kategori" v-model="form.kategori" class="input-field w-full sm:w-2/3">
                                <option disabled :value=null>Pilih Kategori</option>
                                <option value="Layanan Pendidikan">Layanan Pendidikan</option>
                                <option value="Sertifikasi">Sertifikasi</option>
                                <option value="Fasilitas">Fasilitas</option>
                                <option value="Masalah Administrasi">Masalah Administrasi</option>
                                <option value=''>Lainnya</option>
                            </select>
                        </div>

                        <!-- Input Keterangan jika pilih "Lainnya" -->
                        <div v-if="form.kategori === ''" class="flex items-center space-x-4">
                            <label for="keterangan-lainnya"
                                class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">
                                Keterangan Lainnya
                            </label>
                            <input required id="keterangan-lainnya" v-model="kategori_lainnya" type="text"
                                class="input-field w-full sm:w-2/3"
                                placeholder="Jelaskan kategori pengaduan lainnya..." />
                        </div>

                    </div>

                    <!-- Judul Pengaduan -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="judul" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Judul
                            Pengaduan</label>
                        <input required id="judul" v-model="form.judul" type="text" class="input-field w-full sm:w-2/3"
                            placeholder="Judul Pengaduan" />
                    </div>

                    <!-- Deskripsi Pengaduan -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="deskripsi"
                            class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Deskripsi Pengaduan</label>
                        <textarea required id="deskripsi" v-model="form.deskripsi" class="input-field w-full sm:w-2/3"
                            placeholder="Jelaskan pengaduan Anda" rows="4"></textarea>
                    </div>

                    <!-- Lampiran -->
                    <div>
                        <div v-for="(image, index) in imageInputs" :key="index" class="flex flex-col space-y-2 mb-4">
                            <!-- Wrapper untuk Label dan Input agar sejajar -->
                            <div class="flex items-center justify-between w-full">
                                <!-- Label di sebelah kiri -->
                                <label class="block text-sm font-semibold w-1/3 text-left"
                                    :class="index === 0 ? 'text-red-700' : 'text-gray-500'">
                                    Lampiran Bukti {{ index + 1 }}
                                    <span v-if="index > 0" class="text-gray-400 text-xs">(Opsional)</span>
                                </label>

                                <!-- Input File di sebelah kanan -->
                                <input :required="index === 0" type="file" @change="handleFileUpload($event, index)"
                                    class="input-field w-2/3" />
                            </div>

                            <!-- Pratinjau Gambar & Input Keterangan -->
                            <div class="flex flex-col items-end">
                                <label v-if="imageUsers[index]"
                                    class="block text-center font-semibold text-red-700 text-sm w-full sm:w-auto">
                                    Bukti {{ index + 1 }}
                                </label>
                                <!-- Gambar di bawah input -->
                                <img v-if="imageUsers[index]" :src="imageUsers[index]" alt="uploaded"
                                    @click="openLightbox(index)"
                                    class="w-40 h-auto object-contain rounded-lg shadow-md mt-2">
                                <!-- Input Keterangan -->
                                <input v-if="imageUsers[index]" v-model="form.keterangan[index]" type="text"
                                    placeholder="Masukkan keterangan"
                                    class="input-field w-full sm:w-2/3 mt-2 p-2 border border-gray-300 rounded-lg shadow-sm" />
                            </div>
                        </div>
                    </div>




                    <!-- Harapan Penyelesaian -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="harapan" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Harapan
                            Penyelesaian</label>
                        <textarea required id="harapan" v-model="form.harapan" type="text"
                            class="input-field w-full sm:w-2/3" placeholder="Harapan Penyelesaian"></textarea>
                    </div>

                    <!-- Tindak Lanjut -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label for="publish" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">
                            Apakah Bisa Kami Publish?
                        </label>
                        <!-- Selector untuk opsi publikasi -->
                        <select required id="publish" v-model="form.publish" class="input-field w-full sm:w-2/3">
                            <option :value="true">Ya, bisa dipublikasikan</option>
                            <option :value="false">Tidak, jangan publikasikan</option>
                        </select>
                        <div></div>
                    </div>
                    <p class="text-xs text-gray-500 italic font-extrabold text-left">
                        Dengan memilih "Ya", Anda mengizinkan informasi ini untuk dipublikasikan secara umum.
                    </p>



                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105">
                        Kirim Pengaduan
                    </button>
                </form>
            </div>
            <vue-easy-lightbox :visible="lightboxVisible" :imgs="dataLengkap ? imageUrl : imageUsers"
                :index="lightboxIndex" @hide="lightboxVisible = false" />
        </div>
        <FooterLandingPage />
    </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox';
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';
import FooterLandingPage from '@/components/FooterLandingPage.vue';
import api from '@/service/lpkni';
import lpkni from '@/service/lpkni';

export default {
    components: {
        NavbarLandingPage,
        FooterLandingPage,
        VueEasyLightbox
    },
    data() {
        return {
            fileList: [],
            fileNames: [],
            location: null,
            error: null,
            isMounted: false,
            form: {
                nama: '',
                email: '',
                judul: '',
                publish: false,
                daerahId: null,
                wilayahId: null,
                kategori: null,
                deskripsi: '',
                harapan: '',
                latitude: null,
                longitude: null,
                kategori_lainnya: '',
                file: [],
                keterangan: []
            },
            imageInputs: [
                { keterangan: "", required: true },
            ],
            imageUsers: [],
            imageUrl: [],
            lightboxVisible: false,
            lightboxIndex: 0,
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
        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (!file) {
                this.$toast.error('Tidak ada file yang dipilih!');
                return;
            }
            // Validasi ukuran file
            var sizeInMb = file.size / 1024;
            var sizeLimit = 1024 * 5;
            if (sizeInMb > sizeLimit) {
                this.$toast.error('Ukuran Gambar Terlalu Besar! Maksimal 5MB.');
                return;
            }
            // Validasi tipe file (hanya gambar)
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                this.$toast.error('Format file tidak didukung! Harap unggah gambar dalam format JPG atau PNG.');
                return;
            }
            if (file) {
                this.form.file.push(file)
                this.imageUsers[index] = URL.createObjectURL(file);
                this.imageInputs.push({ keterangan: "", required: false })
            }
        },
        openLightbox(index) {
            this.lightboxVisible = true;
            this.lightboxIndex = index;
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
            await lpkni.CreatePengaduanKonsumen(this.form).then(() => {
                this.$toast.success('Berhasil Mengirim Pangaduan')
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }).catch(() => {
                this.$toast.success('Gagal Mengirim Pangaduan')
            })
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
                daerahId: '',
                wilayahId: '',
            };
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