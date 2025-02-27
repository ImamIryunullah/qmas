<template>
    <div>
        <NavbarAdmin />

        <div class="bg-gray-100 min-h-screen p-6 ml-11" :class="isSidebarOpen ? 'pl-56' : 'ml-0'">
            <!-- Page Header -->
            <div class="w-auto mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                            📌 Daftar Suara Konsumen Saat Ini
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Suara Konsumen untuk tingkat Provinsi dan Kota/Kabupaten.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Create/Edit News Post Section -->
            <div class="w-auto mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Daftar Suara Konsumen
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full border rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-center">ID Suara Konsumen</th>
                                <th class="px-4 py-2 text-center">Judul</th>
                                <th class="px-4 py-2 text-center">Provinsi</th>
                                <th class="px-4 py-2 text-center">Kota / Kab</th>
                                <th class="px-4 py-2 text-center">Kategori</th>
                                <th class="px-4 py-2 text-center">Deskripsi 1</th>
                                <th class="px-4 py-2 text-center">Deskripsi 2</th>
                                <th class="px-4 py-2 text-center">Deskripsi 3</th>
                                <th class="px-4 py-2 text-center">Sudah Di Publish</th>

                                <th class="px-4 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in beritaList" :key="index" class="border-t">
                                <td class="px-4 py-2 text-center border border-b-2 ">{{ data.id }}</td>
                                <td class="px-4 py-2 border border-b-2  ">{{ data.judul }}</td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.wilayah ? data.wilayah.nama_wilayah : "-" }}
                                </td>
                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.daerah ? data.daerah.nama_daerah : "-" }}
                                </td>

                                <td class="px-4 py-2 border border-b-2">
                                    {{ data.kategori ? data.kategori : "-" }}
                                </td>
                                <td class="px-4 py-2 text-left border border-b-2">
                                    {{ data.deskripsi1 ? getTruncatedDescription(data.deskripsi1, 100) : "-" }}
                                </td>
                                <td class="px-4 py-2 text-left border border-b-2">
                                    {{ data.deskripsi2 ? getTruncatedDescription(data.deskripsi2, 100) : "-" }}
                                </td>
                                <td class="px-4 py-2 text-left border border-b-2">
                                    {{ data.deskripsi3 ? getTruncatedDescription(data.deskripsi3, 100) : "-" }}
                                </td>
                                <td class="px-4 py-2 text-left border border-b-2">
                                    {{ data.publish ? 'Ya' : "Tidak" }}
                                </td>
                                <td class="px-4 py-2 text-center ">
                                    <div class="flex justify-center space-x-2 font-semibold">
                                        <button @click="openModal(data.media)"
                                            class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                                            <h1>Lihat Gambar
                                                <i class="fa-solid fa-bars"></i>
                                            </h1>

                                        </button>
                                        <button @click="updateSuaraKonsumen(data.id)"
                                            class="flex items-center space-x-1 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-yellow-600 transition duration-200">
                                            <h1>Update
                                                <i class="fa-solid fa-pen"></i>
                                            </h1>

                                        </button>
                                        <button @click="DeleteSuaraKonsumen(data.id)"
                                            class="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200">
                                            <h1>Delete
                                                <i class="fa-solid fa-trash"></i>
                                            </h1>

                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
            beritaList: [],
            lastIndexImage: []
        };
    },
    mounted() {
        this.fetchWilayah()
        this.GetAllDataberita()
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    methods: {
        getfullpathImage(img) {
            return api.getfullpathImage(img)
        },
        openModal(media) {
            this.imageUsers = []
            this.lightboxVisible = true;
            this.lightboxIndex = 0;
            this.imageUsers = media.map(item => this.getfullpathImage(item.imageUrl))
            console.log(this.imageUsers)
        },
        updateSuaraKonsumen(id) {
            this.$router.push(`/admin/edit-suara-konsumen/${id}`)
        },
        DeleteSuaraKonsumen(id) {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin ingin Mengahapus Berita?',
                showDenyButton: true,
                confirmButtonText: "Ya",
                confirmButtonColor: '#22c55e',
                denyButtonText: `Tidak`,
                icon: 'warning',

            }).then(async (result) => {
                if (result.isDenied || !result.isConfirmed || result.isDismissed) {
                    return
                }
                api.DeleteSuaraKonsumen(id).then(() => {
                    this.$toast.success('Delete Berita Berhasil!')
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);

                }).catch(() => {
                    this.$toast.error('Delete Berita Gagal!')
                })
            })

        },
        getTruncatedDescription(text, karakter) {
            if (text.length > karakter) {
                return text.slice(0, karakter) + '...';
            }
            return text;
        },
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
        async GetAllDataberita() {
            await api.getAllSuaraKonsumen().then((res) => {
                this.beritaList = res.data
                console.log(this.beritaList)
            }).then(() => {

            })
        }
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