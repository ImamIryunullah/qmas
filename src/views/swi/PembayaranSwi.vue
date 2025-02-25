<template>

    <NavbarSwiLanding />

    <div class="bg-white min-h-screen flex justify-center items-center p-6 h-full w-full">

        <div class="w-full max-w-2xl p-8 ">

            <section
                class="text-center mb-8 rounded-lg py-8 bg-gradient-to-r from-green-700 to-green-500 shadow-xl flex flex-col justify-between h-full">
                <p class="text-sm font-semibold text-white uppercase tracking-wide sm:text-base mb-2">
                    Jumlah Pembayaran
                </p>
                <p class="text-2xl font-extrabold text-white my-4 sm:text-4xl">Rp 600.000,00</p>
                <p class="text-xs sm:text-sm md:text-base lg:text-lg text-white mb-1">
                    Lakukan pembayaran untuk melanjutkan proses pendaftaran.
                </p>

                <p class="text-xs  text-white font-semibold sm:text-base mb-1">( Masa Berlaku 5 Tahun )</p>
                <div class="space-y-4 p-6 font-mono">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <label class="block text-sm font-medium text-white  mr-3">
                                No Rekening: <strong>{{ banks[0].accountNumber }}</strong>
                            </label>

                            <button @click="copyToClipboard(banks[0].accountNumber)"
                                class="text-gray-500 hover:text-gray-700 transition-all duration-200 ease-in-out">
                                <i class="fa fa-copy text-yellow-500 text-lg"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <label class="block text-sm font-medium text-white">
                                Atas Nama : <strong>{{ banks[0].accountHolderName }}</strong>
                            </label>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex justify-between items-center">
                            <label class="block text-sm font-medium text-white  mr-3">
                                BANK : <strong>BCA</strong>
                            </label>
                        </div>
                    </div>

                </div>
            </section>
            <section class="space-y-6 mb-6">
                <div class="space-y-4">
                    <label class="block text-sm font-medium text-gray-700">Upload Bukti Pembayaran</label>
                    <div class="relative mt-2">
                        <input type="file" class="input-field w-full opacity-0 absolute top-0 left-0"
                            @change="handleFileChange" required />
                        <div
                            class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer border-2 border-gray-300 p-6 rounded-lg text-gray-500 transition-all duration-300 ease-in-out">
                            <span class="mr-2 text-lg">📎</span>
                            <span class="text-sm font-medium">Upload File</span>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Max: 3MB | Format: jpg, jpeg, png</p>
                        <div v-if="fileName" class="mt-2 text-sm text-gray-700">
                            <p>Nama File :</p> {{ fileName }}
                            <div v-if="fileType.startsWith('image')">
                                <img :src="fileUrl" alt="Uploaded Image"
                                    class="mt-4 w-32 h-32 object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>


                    <div class="border-b-2 pt-2 pb-2 p-2">
                        <label class="block text-sm font-medium text-gray-700">Input Jumlah Pembayaran</label>
                        <div class="relative mt-2">
                            <input v-model="jumlahPembayaran"
                                class="input-field w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                type="number" placeholder="Rp." required />
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex items-center justify-center">
                <button type="submit" @click="submitForm()"
                    class="w-1/2 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                    Bayar Sekarang
                </button>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-auto">
            <i class="fas fa-check-circle text-green-600 text-4xl mb-4"></i>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Terima Kasih Telah Melakukan Pembayaran</h3>
            <p class="text-lg text-gray-600 mb-4">
                Terimakasih telah melakukan pembayaran, proses anda akan mencapai tahapan terakhir tunggu hingga proses
                verifikasi dari tim kami!
            </p>
            <button @click="closeModal" class="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
                Tutup
            </button>
        </div>
    </div>
</template>

<script>
import NavbarSwiLanding from '@/components/NavbarSwiLanding.vue';
import api from '@/service/lpkni';
import Swal from 'sweetalert2';

export default {
    components: {
        NavbarSwiLanding
    },
    data() {
        return {
            jumlahPembayaran: null,
            fileType: '',
            fileUrl: '',
            fileName: '',
            selectedVendor: { label: 'Transfer Bank', value: 'BCA' },
            selectedPaymentMethod: 'Transfer Bank',
            isDropdownOpen: false,
            file: null,
            banks: [
                { value: "BCA", label: "BCA", icon: "assets/bca.png", accountNumber: '0623176999 ', accountHolderName: 'PT LPKNI' },
            ],
        };
    },
    mounted() {
        if (this.getUserLpkni === 0) {
            this.$router.push('')
            return
        }
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (!file) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tidak File Yang Dipilih',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            // Validasi ukuran file
            var sizeInMb = file.size / 1024;
            var sizeLimit = 1024 * 5;
            if (sizeInMb > sizeLimit) {
                Swal.fire({
                    icon: 'error',
                    title: 'Berhasil Login',
                });
                return;
            }
            // Validasi tipe file (hanya gambar)
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Format file tidak didukung!',
                    text: 'Harap unggah gambar dalam format JPG atau PNG.',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            this.file = file;
            if (file) {
                this.fileName = file.name;
                this.fileType = file.type;
                this.fileUrl = URL.createObjectURL(file);
            }
        },
        getpathfullimage(img) {
            return api.getfullpathImage(img);
        },
        selectPaymentMethod(method) {
            this.selectedPaymentMethod = method;
            this.selectedVendor = { label: '', value: '' };
        },
        submitForm() {
            if (this.selectedPaymentMethod === '') {
                this.selectedVendor.value = this.selectedPaymentMethod;
            }

            if (!this.file) {
                Swal.fire({
                    icon: 'info',
                    title: 'Upload Bukti Pembayaran',
                    text: 'Harap Upload Bukti Pembayaran',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            this.showModal = true;

            Swal.fire({
                icon: 'success',
                title: 'Pembayaran Dimulai!',
                text: `Metode Pembayaran: ${this.selectedPaymentMethod}`,
                confirmButtonText: 'Ok'
            });

            Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil',
                text: `Vendor: ${this.selectedVendor.value}`,
                confirmButtonText: 'Ok'
            });
        },

        closeModal() {
            // Close the modal when the user clicks "Tutup"
            this.showModal = false;
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectBank(bank) {
            this.selectedVendor = bank;
            this.isDropdownOpen = false;
        },
        copyToClipboard(text) {
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = text;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            this.showCopySuccessMessage();
        },
        showCopySuccessMessage() {
            Swal.fire({
                icon: 'success',
                title: 'Nomor Rekening Disalin!',
                text: 'Nomor rekening berhasil disalin ke clipboard.',
            });
        }
    }
};
</script>

<style scoped>
.input-field {
    @apply p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500;
}

.payment-button {
    @apply p-3 bg-gray-200 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-300 transition w-full;
}
</style>
