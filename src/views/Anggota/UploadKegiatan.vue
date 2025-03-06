<template>
    <div class="w-screen min-h-screen h-full flex bg-gray-100">
        <NavbarAnggota />
        <div v-if="isMounted" class="flex justify-center items-center text-xl mt-20 mr-6 w-full h-full mb-12">

            <div class="flex flex-col justify-center items-center flex-1">
                <div class="bg-white w-full max-w-screen-md p-6 rounded-lg border box-border animate-fadeInUp ">
                    <h2
                        class="text-2xl md:text-3xl font-bold text-center text-gray-800 border-b-2 border-gray-300 pb-3">
                        <i class="fas fa-upload text-red-500 mr-2"></i>
                        Upload Kegiatan Anda
                    </h2>

                    <p class="text-center text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
                        <i class="fas fa-question-circle text-gray-500 mr-2 justify"></i>
                        Kami mengundang Anda untuk mengunggah kegiatan atau laporan yang Anda lakukan. Pastikan untuk
                        kegiatan
                        memberikan
                        deskripsi yang jelas dan melampirkan bukti kegiatan agar dapat segera diproses. Setiap laporan
                        kegiatan
                        yang Anda
                        unggah akan membantu kami dalam meningkatkan pelayanan dan memastikan bahwa semua kegiatan
                        tercatat dengan baik.
                    </p>

                    <form @submit.prevent="submitForm" class="space-y-6 mt-8">
                        <div class="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                            <label for="judul" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Judul
                                Kegiatan</label>
                            <input required id="judul" v-model="form.judul" type="text"
                                class="input-field w-full sm:w-2/3" placeholder="Judul Kegiatan" />
                        </div>
                        <div class="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                            <label for="deskripsi"
                                class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Deskripsi
                                Kegiatan</label>
                            <textarea required id="deskripsi" v-model="form.deskripsi"
                                class="input-field w-full sm:w-2/3" placeholder="Jelaskan Kegiatan Anda"
                                rows="4"></textarea>
                        </div>
                        <div class="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                            <label for="deskripsi"
                                class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Tanggal Kegiatan
                            </label>
                            <input type="date" class="input-field w-full sm:w-2/3" v-model="form.tanggal">
                        </div>
                        <div>
                            <div v-for="(image, index) in imageInputs" :key="index"
                                class="flex flex-col space-y-2 mb-4">
                                <div class="flex flex-col sm:flex-row items-center justify-between w-full">
                                    <label class="block text-sm font-semibold w-full sm:w-1/3 text-left"
                                        :class="index === 0 ? 'text-red-700' : 'text-gray-500'">
                                        Upload Foto Kegiatan {{ index + 1 }}
                                        <span v-if="index > 0" class="text-gray-400 text-xs">(Opsional)</span>
                                    </label>
                                    <input :required="index === 0" type="file" @change="handleFileUpload($event, index)"
                                        class="input-field w-full sm:w-2/3" />
                                </div>
                                <div class="flex flex-col items-end">
                                    <label v-if="imageUsers[index]"
                                        class="block text-center font-semibold text-red-700 text-sm w-full sm:w-auto">Foto
                                        Kegiatan
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
                        <div class="flex justify-center">
                            <button type="submit"
                                class="w-1/2 bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105">
                                Upload
                            </button>
                        </div>{{ }}
                    </form>

                </div>
                <vue-easy-lightbox :visible="lightboxVisible" :imgs="dataLengkap ? imageUrl : imageUsers"
                    :index="lightboxIndex" @hide="lightboxVisible = false" />
            </div>
        </div>
        <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="text-white text-lg">Sedang Memuat...</div>
            <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
        </div>
    </div>
</template>

<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import lpkni from '@/service/lpkni';
import Swal from 'sweetalert2';
import Compressor from 'compressorjs';
export default {
    components: {
        NavbarAnggota,
    },
    data() {
        return {
            fileList: [],
            fileNames: [],
            isLoading: false,
            error: null,
            isMounted: false,
            form: {
                judul: '',
                deskripsi: '',
                tanggal: '',
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
            lastIndexImage: []
        };
    },
    mounted() {
        this.isMounted = true;
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
            // Validasi tipe file (hanya gambar)
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Format File Tidak Didukung',
                    text: 'Gunakan File PNG, JPG, atau JPEG.',
                });
                return;
            }

            // Kompresi gambar sebelum menyimpannya
            new Compressor(file, {
                quality: 0.6, // Kualitas gambar dikurangi ke 60%
                maxWidth: 1024, // Batasi lebar maksimal 1024px
                maxHeight: 1024, // Batasi tinggi maksimal 1024px
                success: (compressedBlob) => {
                    // Konversi hasil Blob ke File agar bisa diterima backend
                    const compressedFile = new File([compressedBlob], file.name, {
                        type: compressedBlob.type,
                        lastModified: Date.now(),
                    });

                    // Validasi ukuran file setelah dikompresi
                    var sizeInMb = compressedFile.size / (1024 * 1024); // Konversi ke MB
                    var sizeLimit = 5; // Maksimal 5MB
                    if (sizeInMb > sizeLimit) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ukuran Gambar Terlalu Besar',
                            text: 'Ukuran Gambar Terlalu Besar, Maksimal 5 MB.',
                        });
                        return;
                    }
                    // Simpan hasil kompresi ke dalam form
                    this.form.file[index] = compressedFile;
                    this.imageUsers[index] = URL.createObjectURL(compressedFile);

                    // Tambahkan input baru jika diperlukan
                    if (this.imageUsers[index] && !this.lastIndexImage[index]) {
                        this.imageInputs.push({ keterangan: "", required: false });
                        this.lastIndexImage[index] = true;
                    }
                },
                error(err) {
                    console.error(err.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengompres Gambar',
                        text: 'Terjadi kesalahan saat mengompres gambar.',
                    });
                }
            });
        },
        openLightbox(index) {
            this.lightboxVisible = true;
            this.lightboxIndex = index;
        },
        async submitForm() {
            Swal.fire({
                title: "Informasi",
                text: 'Apakah Anda Yakin Data Sudah Benar?',
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
                this.isLoading = true
                await lpkni.CreateKegiatanAnggota(this.form).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Mengirim Kegiatan',
                        text: 'Kegiatan Anda telah berhasil dikirim.',
                    });
                    // this.resetForm();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengirim Kegiatan',
                        text: 'Terdapat kesalahan saat mengirim Kegiatan.',
                    }).finally(() => {
                        this.isLoading = false
                    });
                })
            })
        },
        resetForm() {
            this.form = {
                judul: '',
                deskripsi: '',
            };
        }
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

.input-field {
    padding: 1rem;
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