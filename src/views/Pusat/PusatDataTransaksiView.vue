<template>
  <div class="flex bg-green-100">
    <NavbarPusat />

    <div class="flex flex-col items-center p-6 md:p-10 bg-green-100 flex-grow mt-12">
      <div class="bg-white w-full max-w-6xl p-6 md:p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-[#03a980] text-center mb-7">Daftar Transaksi Pengguna</h2>

        <!-- Filter Transaksi -->
        <div class="flex flex-wrap justify-center gap-4 mb-6">
          <button @click="filterTransactions('all')" :class="getButtonClass('all')">Semua Transaksi</button>
          <button @click="filterTransactions('transacted')" :class="getButtonClass('transacted')">Sudah
            Transaksi</button>
          <button @click="filterTransactions('not_transacted')" :class="getButtonClass('not_transacted')">Belum
            Transaksi</button>
          <button @click="filterTransactions('cancel')" :class="getButtonClass('cancel')">Dibatalkan</button>
        </div>

        <!-- Tabel Transaksi -->
        <div v-if="filteredTransactions.length > 0" class="overflow-x-auto">
          <table class="w-full table-auto border-collapse text-lg">
            <thead class="bg-[#028a66] text-white">
              <tr>
                <th class="px-6 py-4 text-left">Nama Pengguna</th>
                <th class="px-6 py-4 text-left">Metode Pembayaran</th>
                <th class="px-6 py-4 text-left">Jenis Bank</th>
                <th class="px-6 py-4 text-left">Status Transaksi</th>
                <th class="px-6 py-4 text-left">Tanggal Transaksi</th>
                <th class="px-6 py-4 text-left">Bukti Transaksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in filteredTransactions" :key="index" class="border-b hover:bg-gray-100">
                <td class="px-6 py-4">{{ transaction.userName }}</td>
                <td class="px-6 py-4">{{ transaction.paymentMethod }}</td>
                <td class="px-6 py-4">{{ transaction.bank }}</td>
                <td class="px-6 py-4">
                  <span :class="getTransactionStatusClass(transaction.status)">{{ transaction.status }}</span>
                </td>
                <td class="px-6 py-4">{{ transaction.date }}</td>
                <td class="px-6 py-4">
                  <button v-if="transaction.proofUrl" @click="openModal(transaction.proofUrl)"
                    class="text-blue-500 hover:underline">Lihat Bukti</button>
                  <span v-else class="text-gray-400">Tidak Ada</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center text-gray-500 mt-4">Tidak ada data transaksi yang ditemukan.</div>
      </div>
    </div>

    <!-- Modal Bukti Transaksi -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-600 hover:text-gray-900">✕</button>
        <h3 class="text-xl font-semibold text-center mb-4">Bukti Transaksi</h3>
        <div class="flex justify-center">
          <img :src="selectedImage" alt="Bukti Transaksi" class="max-w-full h-auto rounded-lg shadow-md" />
        </div>
        <button @click="closeModal"
          class="mt-4 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPusat from '@/components/NavbarPusat.vue';
export default {
  components: { NavbarPusat },
  data() {
    return {
      selectedFilter: 'all',
      isModalOpen: false,
      selectedImage: '',
      transactions: [
        { userName: "John Doe", bank: "BCA", paymentMethod: "Transfer Bank", status: "Cancel", date: "2023-08-01", proofUrl: "@/assets/linkaja.jpg" },
        { userName: "Jane Smith", bank: "Mandiri", paymentMethod: "QRIS", status: "Cancel", date: "2023-08-02", proofUrl: "/assets/proof_2.jpg" },
        { userName: "Ahmad Rahman", bank: "BNI", paymentMethod: "E-Wallet", status: "Berhasil", date: "2023-08-05", proofUrl: "/assets/proof_3.jpg" },
        { userName: "Siti Nurhaliza", bank: null, paymentMethod: null, status: "Belum Melakukan Pembayaran", date: "-", proofUrl: null }
      ]
    };
  },
  computed: {
    filteredTransactions() {
      if (this.selectedFilter === 'all') return this.transactions;
      if (this.selectedFilter === 'transacted') return this.transactions.filter(t => t.status !== 'Belum Melakukan Pembayaran' && t.status !== 'Cancel');
      if (this.selectedFilter === 'not_transacted') return this.transactions.filter(t => t.status === 'Belum Melakukan Pembayaran');
      if (this.selectedFilter === 'cancel') return this.transactions.filter(t => t.status === 'Cancel');
      return this.transactions;
    }
  },
  methods: {
    filterTransactions(filter) { this.selectedFilter = filter; },
    getButtonClass(filter) { return ['filter-button', this.selectedFilter === filter ? 'bg-[#03a980] text-white' : 'bg-gray-200 text-gray-700']; },
    getTransactionStatusClass(status) {
      switch (status) {
        case 'Berhasil': return 'text-green-500 font-semibold';
        case 'Cancel': return 'text-red-500 font-semibold';
        case 'Diproses': return 'text-yellow-500 font-semibold';
        case 'Belum Melakukan Pembayaran': return 'text-gray-500 italic';
        default: return 'text-gray-500';
      }
    },
    openModal(imageUrl) { this.selectedImage = imageUrl; this.isModalOpen = true; },
    closeModal() { this.isModalOpen = false; this.selectedImage = ''; }
  }
};
</script>

<style scoped>
.filter-button {
  @apply px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 16px;
}

th {
  background-color: #028a66;
  color: white;
}

td {
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>