<template>
    <div>
        <NavbarSwiLanding />
    </div>
    <div class="bg-green-100 w-full min-h-screen flex items-center justify-center p-6 mx-auto">

        <div class="w-full  max-w-screen-md bg-white p-10 rounded-lg shadow-2xl border border-gray-200">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-green-700">
                    Lembaga Perlindungan Konsumen Indonesia
                </h2>
                <p class="text-lg text-gray-600 mt-4 max-w-lg mx-auto leading-relaxed">
                    <span class="block font-semibold text-gray-600 text-xl underline decoration-3 decoration-green-600">
                        Lengkapi Data Diri Untuk Melanjutkan
                    </span>
                </p>
            </div>
            <form @submit.prevent="SubmitData">
                <div>

                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <!-- Nama Lengkap -->
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Nama Lengkap</label>
                        <input v-model="form.nama_lengkap" type="text" placeholder="Nama Lengkap"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>
                    <!-- Tempat Lahir -->
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Tempat Lahir</label>
                        <input v-model="form.tempatLahir" type="text" placeholder="Tempat Lahir"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>

                    <!-- Tanggal Lahir -->
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Tanggal Lahir</label>
                        <input v-model="form.tanggalLahir" type="date" placeholder="Tanggal Lahir"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>

                    <div>
                        <label class="text-sm text-gray-500 font-bold">Pekerjaan</label>
                        <input v-model="form.pekerjaan" type="text" placeholder="Pekerjaan"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>
                    <!-- Alamat Lengkap -->
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Alamat Rumah</label>
                        <input v-model="form.alamatRumah" type="text" placeholder="Alamat Rumah"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>


                    <div>
                        <label class="text-sm text-gray-500 font-bold">Nomor Telepon *aktif</label>
                        <input v-model="form.noHp" type="number" placeholder="No Telepon"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>

                    <div>
                        <label class="text-sm text-gray-500 font-bold">Alamat Warung</label>
                        <input v-model="form.alamatWarung" type="text" placeholder="Alamat Lengkap Warung"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>

                    <!-- Pekerjaan -->
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Nama Warung</label>
                        <input v-model="form.namaWarung" type="text" placeholder="Nama Warung"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>

                    <div>
                        <label class="text-sm text-gray-500 font-bold">Lokasi Usaha</label>
                        <input v-model="form.lokasiUsaha" type="text" placeholder="Lokasi Usaha"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            required />
                    </div>
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Koordinat</label>
                        <input :v-model="location" type="text" placeholder="Koordinat"
                            :value="errorLocation ? location : 'Tidak Tersedia'"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out mt-2"
                            disabled />
                    </div>

                    <div>
                        <label class="text-sm text-gray-500 font-bold">Provinsi</label>
                        <select v-model="form.wilayahId" @change="GetDaerahByWilayahId(form.wilayahId)"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                            required>
                            <option :value="0" selected disabled>Pilih Wilayah</option>
                            <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah"
                                :value="wilayah.id_wilayah">
                                {{ wilayah.kode_wilayah + " - " + wilayah.nama_wilayah }}
                            </option>
                        </select>
                    </div>


                    <div>
                        <label class="text-sm text-gray-500 font-bold">Kota / Kabupaten</label>
                        <select v-model="form.daerahId" :disabled="form.wilayahId === 0"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                            required>
                            <option :value="0" selected disabled>Pilih Daerah</option>
                            <option v-for="daerah in daerahList" :key="daerah.id_daerah" :value="daerah.id_daerah">
                                {{ daerah.kode_daerah + " - " + daerah.nama_daerah }}
                            </option>
                        </select>
                    </div>
                    <!-- File Uploads (e.g., KTP, SIUP, NPWP) -->
                    <div v-for="(image, index) in imageInputs" :key="index">
                        <label class="text-sm text-gray-500 font-bold">{{ image.keterangan }}</label>
                        <input :required="image.required" type="file" @change="handleFileUpload($event, index)"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105" />
                        <img v-if="imageUsers[index]"
                            :src="dataLengkap ? getFullpathImage(imageUsers[index].imageUrl) : imageUsers[index]"
                            alt="uploaded" @click="openLightbox(index)"
                            class="w-40 h-auto items-start object-contain rounded-lg shadow-md mt-4">
                    </div>
                </div>
                <div class="mt-6">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Pernyataan & Persetujuan</h3>
                    <table class="rounded-lg">
                        <tbody>
                            <tr class="border-b">
                                <td class="w-12 p-3 text-center">
                                    <input type="checkbox" v-model="form.pernyataanHalal">
                                </td>
                                <td class="p-3 text-gray-700 font-medium">
                                    Saya menyatakan bahwa bahan baku yang digunakan halal.
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="w-12 p-3 text-center">
                                    <input type="checkbox" v-model="form.pernyataanBahanKimia">
                                </td>
                                <td class="p-3 text-gray-700 font-medium">
                                    Saya menyatakan bahwa warung tidak menggunakan bahan kimia berbahaya.
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="w-12 p-3 text-center">
                                    <input type="checkbox" v-model="form.pernyataanFasilitasStandar">
                                </td>
                                <td class="p-3 text-gray-700 font-medium">
                                    Saya bersedia melengkapi fasilitas sesuai standarisasi warung.
                                </td>
                            </tr>
                            <tr>
                                <td class="w-12 p-3 text-center">
                                    <input type="checkbox" v-model="form.pernyataanKeabsahanData">
                                </td>
                                <td class="p-3 text-gray-700 font-medium">
                                    Saya memahami bahwa data ini benar dan bersedia menerima konsekuensi hukum jika
                                    terdapat kesalahan.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-center mt-2">
                    <button
                        class="w-1/2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition">
                        Kirim
                    </button>
                </div>
            </form>
        </div>
        <vue-easy-lightbox :visible="lightboxVisible" :imgs="dataLengkap ? imageUrl : imageUsers" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>
<script>
import NavbarSwiLanding from '@/components/NavbarSwiLanding.vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import swi from '@/service/swi';
export default {
    components: {
        NavbarSwiLanding,
        VueEasyLightbox
    },
    data() {
        return {
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
            imageUsers: [],
            imageUrl: [],
            location: { latitude: null, longitude: null },
            errorLocation: null,
            lightboxVisible: false,
            lightboxIndex: 0,
            isLoading: false,
            daerahList: [],
            wilayahList: [], // To store the list of provinces
            dataLengkap: false
        }
    },
    mounted() {
        this.getLocation()
        this.fetchWilayah()
        this.getDataUser()
    },
    methods: {

        async getDataUser() {
            await swi.getUserDataSwi().then((res) => {
                if (res.data.data_swi.userId !== 0) {
                    this.dataLengkap = true;
                    this.form = res.data.data_swi;
                    this.GetDaerahByWilayahId(this.form.wilayahId)
                    this.imageUsers = res.data.data_swi.imageUsers;
                }
                console.log(res.data)
            }).catch(() => {

            })
        },
        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (file) {
                this.form.file[index] = file
                this.form.folder[index] = this.imageInputs[index].folder
                this.imageUsers[index] = URL.createObjectURL(file);
            }
        },
        async GetDaerahByWilayahId(id) {
            if (!this.dataLengkap)
                this.form.daerahId = 0;
            await swi.getDaerahByWilayahId(id).then((response) => {
                this.daerahList = response.data;
            }).catch(() => {
            })
        },
        async fetchWilayah() {
            await swi.getAllWilayah().then((res) => {
                this.wilayahList = res.data
            }).catch(() => {

            })
        },
        async SubmitData() {
            this.isLoading = true;
            console.log(this.form)
            try {
                this.isLoading = true;
                const response = await swi.CreateDataUserImage(this.form);
                console.log(response)
                this.$toast.success('Berhasil Menambahkan Data!');
                this.$router.push(this.$route.path);
            } catch (error) {
                console.log("Pendaftaran gagal:", error);
                alert("Pendaftaran gagal. Silakan coba lagi.");
                this.isLoading = false;
            } finally {
                this.isLoading = false;
            }
        },

        getFullpathImage(imageUrl) {
            return swi.getfullpathImageSwi(imageUrl);
        },
        openLightbox(index) {
            if (this.dataLengkap)
                this.imageUrl = this.imageUsers.map(image => this.getFullpathImage(image.imageUrl)); // Menyiapkan array URL gambar
            this.lightboxVisible = true;
            this.lightboxIndex = index;
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.successCallback,
                    this.errorCallback
                );
            } else {
                this.errorLocation = "Geolocation is not supported by this browser.";
            }
        },
        successCallback(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.location = { latitude, longitude };
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
</style>