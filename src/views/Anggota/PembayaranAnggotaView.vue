<template>

  <div class="bg-gray-100 min-h-screen flex justify-center items-center p-6 ml-12">

    <div class="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl">
      <NavbarAnggota />
      <!-- Subscription Info Section -->
      <section
        class="text-center mb-8 rounded-lg py-12 bg-gradient-to-r from-red-700 to-red-500 shadow-xl flex flex-col justify-between h-full">
        <!-- Description Text (Top) -->
        <p class="text-sm font-semibold text-white uppercase tracking-wide sm:text-base mb-2">
          Jumlah Pembayaran</p>
        <!-- Total Amount -->
        <p class="text-3xl font-extrabold text-white my-4 sm:text-4xl">Rp 600.000,00</p>
        <!-- Additional Text: Contextual Explanation (Bottom) -->
        <p class="text-sm text-white sm:text-base mb-1">Segera lakukan pembayaran untuk melanjutkan proses pendaftaran.

        </p>
        <p class="text-sm text-white font-semibold sm:text-base mb-1"> ( Masa Berlaku 5 Tahun )

        </p>
      </section>

      <section class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-4">Payment Method:</label>
        <!-- Payment Method Buttons (Responsive Layout) -->
        <div class="flex flex-wrap justify-center gap-6 mt-4">
          <!-- Bank Button -->
          <button type="button" :class="{
            'bg-red-500 text-white': selectedPaymentMethod === 'Transfer Bank',
            'bg-gray-200': selectedPaymentMethod !== 'Transfer Bank'
          }" @click="selectPaymentMethod('Transfer Bank')"
            class="payment-button flex items-center justify-center space-x-3 p-4 w-full sm:w-36 md:w-40 lg:w-44 rounded-xl hover:bg-red-600 transition-all duration-150 ease-in-out shadow-lg transform hover:scale-90">
            <i class="fa fa-exchange text-yellow-500 text-lg"></i>
            <span class="text-sm font-semibold">Bank</span>
          </button>
        </div>
      </section>

      <!-- Bank Payment Details -->
      <section v-if="selectedPaymentMethod === 'Transfer Bank'" class="space-y-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mt-3">Pilih Jenis Bank</label>
          <div class="relative">
            <button
              class="input-field w-full flex justify-between items-center p-3 bg-white border border-gray-300 rounded-lg"
              @click="toggleDropdown">
              <span>{{ selectedVendor.label || 'Pilih Bank' }}</span>
              <i class="fa fa-chevron-down"></i>
            </button>
            <div v-if="isDropdownOpen"
              class="absolute z-10 w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg">
              <ul>
                <li v-for="bank in banks" :key="bank.label" @click="selectBank(bank)"
                  class="flex items-center p-3 cursor-pointer hover:bg-gray-100">
                  <img :src="getpathfullimage(bank.icon)" alt=" icon" class="w-6 h-6 mr-2" />
                  {{ bank.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="selectedVendor" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <!-- Account Number Section -->
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <label class="block text-sm font-medium text-gray-700 mr-3">
                No Rekening: <strong>{{ selectedVendor.accountNumber }}</strong>
              </label>
              <button @click="copyToClipboard(selectedVendor.accountNumber)"
                class="text-gray-500 hover:text-gray-700 transition-all duration-200 ease-in-out">
                <i class="fa fa-copy text-yellow-500 text-lg"></i>
              </button>
            </div>
          </div>
          <!-- Account Holder Name Section -->
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">
              An: <strong>{{ selectedVendor.accountHolderName }}</strong>
            </label>
          </div>
        </div>
        <!-- File Upload -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700">Upload Bukti Pembayaran</label>
          <div class="relative mt-2">
            <input type="file" class="input-field w-full opacity-0 absolute top-0 left-0" @change="handleFileChange"
              required />
            <div
              class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer border-2 border-gray-300 p-6 rounded-lg text-gray-500 transition-all duration-300 ease-in-out">
              <span class="mr-2 text-lg">📎</span>
              <span class="text-sm font-medium">Upload File</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Max: 3MB | Format: jpg, jpeg, png</p>
            <div v-if="fileName" class="mt-2 text-2xl font-bold text-gray-700">
              <strong>Nama File :</strong> {{ fileName }}
              <div v-if="fileType.startsWith('image')">
                <img :src="fileUrl" alt="Uploaded Image" class="mt-4 w-32 h-32 object-cover rounded-lg" />
              </div>
            </div>
          </div>
          <div class="border border-b-2 pt-2 pb-2 p-2">
            <label class="block text-sm font-medium text-gray-700">Input Jumlah Pembayaran</label>
            <div class="relative mt-2">
              <input v-model="jumlahPembayaran"
                class="input-field w-full flex justify-between items-center p-3 bg-white border border-gray-300 rounded-lg"
                type="number" placeholder="Rp." required>
            </div>
          </div>

        </div>
      </section>

      <!-- Submit Button -->
      <div v-if="selectedPaymentMethod">
        <button type="submit" @click="submitForm()"
          class="w-full bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
          Bayar Sekarang
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import lpkni from '@/service/lpkni';
import api from '@/service/lpkni';

export default {
  components: {
    NavbarAnggota
  },
  data() {
    return {
      jumlahPembayaran: null,
      fileType: '',
      fileUrl: '',
      fileName: '',
      selectedVendor: { label: '', value: '' },
      selectedPaymentMethod: null,
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
      this.selectedVendor = { label: '', value: '' };
    },
    submitForm() {
      if (this.selectedVendor.value === '' && this.selectedPaymentMethod !== 'Qris') {
        this.$toast.info(`Silahkan Pilih Jenis ${this.selectedPaymentMethod}`);
        return
      }

      if (!this.file) {
        this.$toast.info('Harap Upload Bukti Pembayaran')
        return
      }
      if (!this.jumlahPembayaran) {
        this.$toast.info('Harap Masukkan Jumlah Pembayaran')
        return
      }
      this.$toast.success(`Metode Pembayaran: ${this.selectedPaymentMethod}`);
      this.$toast.success(`Vendor: ${this.selectedVendor.value}`);
      const formPembayaran = {
        jumlahPembayaran: this.jumlahPembayaran,
        metodePembayaran: this.selectedPaymentMethod,
        vendorPembayaran: this.selectedVendor.value,
        file: this.file
      }
      lpkni.CreatePembayaranAnggota(formPembayaran).then(() => {
        this.$toast.info('Pembayaran Berhasil!')
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(() => {
        this.$toast.error('Pembayaran Gagal!')
      })
      console.log(formPembayaran)
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectBank(bank) {
      this.selectedVendor = bank;
      this.isDropdownOpen = false;
    },
    selectEWallet(wallet) {
      this.selectedVendor = wallet;
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
      this.$toast.success('Berhasil Di Salin');
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
