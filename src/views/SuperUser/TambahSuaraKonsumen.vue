<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 min-h-screen p-6 ml-11" :class="isSidebarOpen ? 'ml-52' : 'ml-0'">
            <!-- Page Header -->
            <div class="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Management Suara Konsumen
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Kelola Suara Konsumen untuk tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Create/Edit News Post Section -->
            <div class="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold text-gray-700 mb-6">📰 Posting Ke Suara Konsumen</h2>
                <form @submit.prevent="TambahBerita" class="space-y-6">
                    <!-- Judul Berita -->
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Judul Berita</label>
                        <input type="text" v-model="form.judul"
                            class="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Masukkan judul berita..." required />
                    </div>
                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Kategori Berita</label>
                        <input type="text" v-model="form.kategori"
                            class="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Masukkan Kategori berita..." required />
                    </div>
                    <!-- Provinsi & Daerah (Grid Layout) -->
                    <div>
                        <label class="text-sm text-gray-500 font-bold">Provinsi</label>
                        <select v-model="form.wilayahId" @change="GetDaerahByWilayahId(form.wilayahId)"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                            required>
                            <option :value="0" selected disabled>Pilih Provinsi</option>
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
                    <!-- Deskripsi Utama -->
                    <div>
                        <label for="deskripsi" class="block text-gray-600 font-medium mb-1">Deskripsi (1)</label>
                        <textarea v-model="form.deskripsi1" id="deskripsi"
                            class="w-full p-3 border rounded-md bg-white resize-none focus:ring focus:ring-blue-300"
                            placeholder="Masukkan deskripsi utama..." rows="4" required></textarea>
                    </div>
                    <!-- Deskripsi Opsional -->
                    <div>
                        <label for="deskripsi2" class="block text-gray-600 font-medium mb-1">Deskripsi (2)
                        </label>
                        <textarea v-model="form.deskripsi2" id="deskripsi2"
                            class="w-full p-3 border rounded-md bg-white resize-none focus:ring focus:ring-blue-300"
                            placeholder="Tambahkan deskripsi tambahan (jika ada)..." rows="4"></textarea>
                    </div>
                    <div>
                        <label for="deskripsi3" class="block text-gray-600 font-medium mb-1">Deskripsi (3)
                        </label>
                        <textarea v-model="form.deskripsi3" id="deskripsi3"
                            class="w-full p-3 border rounded-md bg-white resize-none focus:ring focus:ring-blue-300"
                            placeholder="Tambahkan deskripsi tambahan (jika ada)..." rows="4"></textarea>
                    </div>
                    <!-- Tanggal Publikasi -->

                    <div>
                        <label class="block text-gray-600 font-medium mb-1">Tanggal Publikasi</label>
                        <input type="date" v-model="form.tanggal"
                            class="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" required />
                    </div>

                    <!-- Upload Gambar -->
                    <div>
                        <div v-for="(image, index) in imageInputs" :key="index" class="flex flex-col space-y-2 mb-4">
                            <div class="flex flex-col sm:flex-row items-center justify-between w-full">
                                <label class="block text-sm font-semibold w-full sm:w-1/3 text-left"
                                    :class="index === 0 ? 'text-red-700' : 'text-gray-500'">
                                    Lampiran Gambar {{ index + 1 }}
                                    <span v-if="index > 0" class="text-gray-400 text-xs">(Opsional)</span>
                                </label>
                                <input :required="index === 0" type="file" @change="handleFileUpload($event, index)"
                                    class="input-field w-full sm:w-2/3" />
                            </div>
                            <p class="text-xs text-gray-500 mt-1">Max: 3MB | Format: jpg, jpeg, png</p>
                            <div class="flex flex-col items-end">
                                <label v-if="imageUsers[index]"
                                    class="block text-center font-semibold text-red-700 text-sm w-full sm:w-auto">Gambar
                                    {{ index + 1
                                    }}</label>
                                <img v-if="imageUsers[index]" :src="imageUsers[index]" alt="uploaded"
                                    @click="openLightbox(index)"
                                    class="w-40 h-auto object-contain rounded-lg shadow-md mt-2">
                                <input v-if="imageUsers[index]" v-model="form.keterangan[index]" type="text"
                                    placeholder="Masukkan keterangan" required
                                    class="input-field w-full sm:w-2/3 mt-2 p-2 border border-gray-300 rounded-lg shadow-sm" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mt-3">
                        <input type="checkbox" v-model="form.publish" required
                            class="mr-2 transform transition duration-200 ease-in-out cursor-pointer " />
                        <label class="text-sm text-gray-500 font-bold">Apakah Sudah Bisa Di Publish?</label>
                    </div>
                    <!-- Tombol Aksi -->
                    <div class="flex items-center space-x-4">
                        <button type="submit"
                            class="flex items-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition duration-300 shadow-md">
                            <i class="fas fa-upload mr-2"></i> Posting
                        </button>
                        <button type="button" @click="cancelPost"
                            class="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-300 shadow-md">
                            <i class="fas fa-times mr-2"></i> Batal
                        </button>
                    </div>
                </form>
            </div>

        </div>
        <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUsers" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import Swal from "sweetalert2";
import api from "@/service/lpkni"
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
    components: {
        NavbarAdmin,
        VueEasyLightbox
    },
    data() {
        return {
            form: {
                judul: '',
                daerahId: 0,
                tanggal: '',
                wilayahId: 0,
                kategori: '',
                deskripsi1: '',
                deskripsi2: '',
                deskripsi3: '',
                publish: false,
                file: [],
                keterangan: []
            },
            imageInputs: [
                { keterangan: "", required: true },
            ],
            imageUsers: [],
            lightboxVisible: false,
            lightboxIndex: 0,
            daerahList: [],
            wilayahList: [], // To store the list of provinces
            lastIndexImage: []
        };
    },
    mounted() {
        this.fetchWilayah()
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    methods: {
        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (!file) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tidak ada file yang dipilih!',
                    text: 'Silakan pilih file untuk diunggah.',
                });
                return;
            }
            // Validasi ukuran file
            var sizeInMb = file.size / 1024;
            var sizeLimit = 1024 * 5;
            if (sizeInMb > sizeLimit) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ukuran Gambar Terlalu Besar',
                    text: 'Ukuran Gambar Terlalu Besar, Maksimal 5 MB',
                });
                return;
            }
            // Validasi tipe file (hanya gambar)
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Format File Tidak Didukung',
                    text: 'Gunakan File Png, Jpg, atau Jpeg',
                });
                return;
            }

            if (file) {
                this.form.file[index] = file
                this.imageUsers[index] = URL.createObjectURL(file);
                if (this.imageUsers[index] && !this.lastIndexImage[index]) {
                    this.imageInputs.push({ keterangan: "", required: false })
                    this.lastIndexImage[index] = true
                }
            }
        },
        openLightbox(index) {
            this.lightboxVisible = true;
            this.lightboxIndex = index;
        },
        GetDaerahByWilayahId(id) {
            this.form.daerahId === 0
            api.getDaerahByWilayahId(id).then((response) => {
                this.form.daerahId = 0
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
        async TambahBerita() {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin Ingin Semuanya Sudah Benar?',
                showDenyButton: true,
                confirmButtonText: "Ya",
                reverseButtons: false,
                denyButtonText: `Tidak`,
                confirmButtonColor: '#22c55e',
                icon: 'info',

            }).then(async (result) => {
                if (result.isDenied || !result.isConfirmed || result.isDismissed) {
                    return
                }
                console.log(this.form)
                api.CreateSuaraKonsumenAdmin(this.form).then(() => {
                    this.$toast.success('Suara Konsumen Berhasil Di Tambahkan')
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }).catch(() => {
                    this.$toast.error('Suara Konsumen gagal Di Tambahkan')
                })
            })
        },
    },
};
</script>

<style scoped>
/* Add custom styles if needed */
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
</style>