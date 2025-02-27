<template>
  <div class="w-screen bg-gray-100 min-h-screen h-full flex">
    <NavbarAnggota />
    <div class="w-screen min-h-screen bg-gray-100 h-full flex justify-center items-center">
      <div class="w-full h-full max-w-2xl bg-white p-6 mr-8 mt-12 mb-12 rounded-lg shadow-xl">
        <!-- Subscription Info Section -->
        <section class="text-center mb-8 py-8 bg-red-600 rounded-lg shadow-xl flex flex-col justify-between h-full">
          <p class="text-sm font-semibold text-white uppercase tracking-wide sm:text-base mb-2">
            Jumlah Pembayaran
          </p>
          <p class="text-2xl font-extrabold text-white my-4 sm:text-4xl">
            Rp 600.000,00
          </p>
          <p class="text-xs text-white sm:text-base">
            Segera lakukan pembayaran untuk melanjutkan proses pendaftaran.
          </p>
          <p class="text-xs text-white sm:text-base mb-1">
            Sebagai Syarat Wajib Menjadi Bagian Dari Anggota LPKNI
          </p>
          <p class="text-xs text-white font-semibold sm:text-base mb-1">
            ( Masa Berlaku 5 Tahun )
          </p>
          <div class="space-y-4 p-6 font-mono">
            <div class="flex flex-col sm:flex-row">
              <div class="flex items-center mb-4 sm:mb-0">
                <label class="block text-sm font-medium text-white mr-3 text-left">
                  No Rekening: <strong>{{ banks[0].accountNumber }}</strong>
                </label>
                <button @click="copyToClipboard(banks[0].accountNumber)"
                  class="text-gray-500 hover:text-gray-700 transition-all duration-200 ease-in-out items-left">
                  <i class="fa fa-copy text-yellow-500 text-lg"></i>
                </button>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row">
              <div class="flex items-center mb-4 sm:mb-0">
                <label class="block text-sm font-medium text-white text-left mr-3">
                  Atas Nama : <strong>{{ banks[0].accountHolderName }}</strong>
                </label>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row">
              <div class="flex items-center">
                <label class="block text-sm font-medium text-white mr-3">
                  BANK : <strong>BCA</strong>
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- Form Section -->
        <section class="space-y-6 mb-6">
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">Upload Bukti Pembayaran</label>
            <div class="relative mt-2">
              <!-- Input File dengan posisi relative dan z-index yang tepat -->
              <div
                class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer border-2 border-gray-300 p-6 rounded-lg text-gray-500 transition-all duration-300 ease-in-out z-10 relative">
                <input type="file" class="input-field w-full opacity-0 absolute top-0 left-0 z-0"
                  @change="handleFileChange" required />
                <span class="mr-2 text-lg">📎</span>
                <span class="text-sm font-medium">Upload File</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Max: 3MB | Format: jpg, jpeg, png</p>
              <div v-if="fileName" class="mt-2 text-2xl font-bold text-gray-700">
                <!-- <strong>Nama File :</strong> {{ fileName }} -->
                <div v-if="fileType.startsWith('image')">
                  <img :src="fileUrl" alt="Uploaded Image" class="mt-4 w-32 h-32 object-cover rounded-lg"
                    @click="ope()" />
                </div>
              </div>
            </div>

            <div class="border-b-2 pt-2 pb-2 p-2">
              <label class="block text-sm font-medium text-gray-700">Input Jumlah Pembayaran</label>
              <div class="relative mt-2">
                <input v-model="jumlahPembayaranDisplay" @input="formatInputAmount"
                  class="input-field w-full p-3 bg-white border font-semibold border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  type="text" placeholder="Rp." required />
              </div>
            </div>
          </div>
        </section>

        <!-- Submit Button -->
        <div v-if="selectedPaymentMethod">
          <button type="submit" @click="submitForm()"
            class="w-full bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300 ease-in-out">
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
  <vue-easy-lightbox :visible="lightboxVisible" :imgs="fileUrl" @hide="lightboxVisible = false" />
</template>


<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import lpkni from '@/service/lpkni';
import api from '@/service/lpkni';
import Swal from 'sweetalert2';
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
  components: {
    NavbarAnggota,
    VueEasyLightbox
  },
  data() {
    return {
      jumlahPembayaran: null,
      jumlahPembayaranDisplay: 'Rp',  // this will hold the formatted amount with 'Rp.'
      fileType: '',
      fileUrl: '',
      fileName: '',
      lightboxVisible: false,
      selectedVendor: { label: 'Transfer Bank', value: 'BCA' },
      selectedPaymentMethod: 'Transfer Bank',
      isDropdownOpen: false,
      file: null,
      banks: [
        { value: "BCA", label: "BCA", icon: "assets/bca.png", accountNumber: '0623176999 ', accountHolderName: 'PT LPKNI' },
      ],
    };
  },
  computed: {
    getUserLpkni() {
      return this.$store.state.storeLpkni.userLpkni.data_anggota.id_data_anggota;
    },
  },
  mounted() {
    if (this.getUserLpkni === 0) {
      this.$router.push('/anggota/data-diri')
      return
    }
  },
  methods: {
    openLightbox() {
      this.lightboxVisible = true;
    },
    formatInputAmount() {
      // Remove non-numeric characters and only keep digits
      let formattedAmount = this.jumlahPembayaranDisplay.replace(/[^\d]/g, '');

      // Format number with dots as thousands separator
      formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Add 'Rp' at the beginning of the formatted number
      formattedAmount = 'Rp ' + formattedAmount;

      // Update the display value with the formatted number
      this.jumlahPembayaranDisplay = formattedAmount;

      // Save the raw number (without formatting) for actual submission
      this.jumlahPembayaran = parseInt(formattedAmount.replace(/[^\d]/g, ''), 10);
    },
    handleFileChange(event) {
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
        this.fileName = file.name;
        this.fileType = file.type;
        this.fileUrl = URL.createObjectURL(file);
        this.file = file;
      }
    },
    getpathfullimage(img) {
      return api.getfullpathImage(img);
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    submitForm() {
      if (!this.file) {
        Swal.fire({
          icon: 'info',
          title: 'Harap Upload Bukti Pembayaran',
          text: 'Silakan upload bukti pembayaran untuk melanjutkan.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#22c55e',
        });
        return;
      }

      if (!this.jumlahPembayaran) {
        Swal.fire({
          icon: 'info',
          title: 'Harap Masukkan Jumlah Pembayaran',
          text: 'Silakan masukkan jumlah pembayaran Anda.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#22c55e',
        });
        return;
      }
      if (this.jumlahPembayaran > 600000) {
        Swal.fire({
          icon: 'info',
          title: 'Jumlah Pembayaran Tidak Valid!',
          text: 'Silakan masukkan jumlah pembayaran Sesuai dengan Nomimal Tercantum!',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#22c55e',
        });
        return;
      }
      Swal.fire({
        title: "Informasi",
        text: 'Apakah Anda Yakin Data Sudah Benar?',
        showDenyButton: true,
        confirmButtonText: "Ya",
        reverseButtons: false,
        denyButtonText: `Tidak`,
        icon: 'info',
        confirmButtonColor: '#22c55e',

      }).then(async (result) => {
        if (result.isDenied || !result.isConfirmed || result.isDismissed) {
          return
        }
        const formPembayaran = {
          jumlahPembayaran: this.jumlahPembayaran,
          metodePembayaran: this.selectedPaymentMethod,
          vendorPembayaran: this.selectedVendor.value,
          file: this.file
        };

        lpkni.CreatePembayaranAnggota(formPembayaran).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Pembayaran Berhasil!',
            text: 'Pembayaran Anda telah berhasil diproses.',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#22c55e',
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Pembayaran Gagal!',
            text: 'Terjadi kesalahan saat memproses pembayaran.',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#22c55e',
          });
        });
      })



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
  @apply p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500;
}

.payment-button {
  @apply p-3 bg-gray-200 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-300 transition w-full;
}
</style>
