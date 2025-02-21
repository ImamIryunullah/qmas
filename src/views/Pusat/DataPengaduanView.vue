<template>
  <div class="w-screen bg-green-100 flex">
    <NavbarPusat />
    <div class="flex flex-col items-center p-4 sm:p-6 md:p-10 bg-green-100 flex-grow ml-50">
      <div class="bg-white w-full max-w-4xl p-4 sm:p-6 rounded-lg shadow-md">
        <h2 class="text-xl sm:text-2xl font-semibold text-[#03a980] text-center mb-4 sm:mb-6">Layanan Pengaduan - Pusat
        </h2>

        <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="p-2 bg-green-300 text-gray-700 rounded-md disabled:opacity-50">Previous</button>
          <span class="my-2 sm:my-0">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="p-2 bg-green-300 text-gray-700 rounded-md disabled:opacity-50">Next</button>
        </div>

        <div v-if="paginatedComplaints.length > 0" class="space-y-4">
          <div v-for="(complaint, index) in paginatedComplaints" :key="index"
            class="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-300">
            <p><strong>ID Pengaduan:</strong> {{ complaint.id }}</p>
            <p><strong>Nama Pengadu:</strong> {{ complaint.NamaPengadu }}</p>
            <p><strong>Daerah:</strong> {{ complaint.daerah }}</p>
            <p><strong>Kategori:</strong> {{ complaint.kategori }}</p>
            <p><strong>Judul:</strong> {{ complaint.judul }}</p>
            <p><strong>Deskripsi:</strong> {{ complaint.deskripsi }}</p>
            <p><strong>Harapan Penyelesaian:</strong> {{ complaint.harapan }}</p>
            <p><strong>Status:</strong> <span :class="getStatusClass(complaint.status)">{{ complaint.status }}</span>
            </p>
            <p v-if="complaint.lampiran" class="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
              <a :href="complaint.lampiran" target="_blank">Lihat Lampiran</a>
            </p>
            <div class="flex flex-col sm:flex-row sm:space-x-2 mt-4">
              <select v-model="complaint.status" @change="updateComplaintStatus(complaint)"
                class="p-2 bg-[#03a980] text-white rounded-md mb-2 sm:mb-0">
                <option value="Diproses">Diproses</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Ditolak">Ditolak</option>
              </select>
              <button @click="deleteComplaint(complaint.id)"
                class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">Hapus</button>
            </div>

            <div class="mt-4">
              <textarea v-model="complaint.tanggapan"
                class="w-full p-5 border border-gray-300 rounded-lg resize-vertical"
                placeholder="Tanggapan untuk pengaduan ini"></textarea>
              <button @click="sendResponse(complaint)"
                class="mt-2 w-full bg-[#03a980] text-white p-3 rounded-lg font-semibold hover:bg-[#028a66] transition">
                Kirim Tanggapan
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">Tidak ada pengaduan yang masuk.</div>
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
      complaints: [
        {
          id: "001",
          daerah: "Malang",
          kategori: "Layanan Pendidikan",
          NamaPengadu: "Johnnn",
          judul: "Keterlambatan Sertifikat",
          deskripsi: "Sertifikat saya terlambat diterima meskipun sudah menyelesaikan pelatihan.",
          harapan: "Saya berharap sertifikat dapat diterima segera.",
          status: "Diproses",
          lampiran: "https://via.placeholder.com/150",
          tanggapan: ""
        },
        {
          id: "002",
          NamaPengadu: "Tqaaa",
          daerah: "Gresik",
          kategori: "Fasilitas",
          judul: "Fasilitas Tidak Memadai",
          deskripsi: "Kelas yang saya hadiri memiliki fasilitas yang sangat buruk, AC tidak berfungsi.",
          harapan: "Perbaikan fasilitas di ruang kelas.",
          status: "Diproses",
          lampiran: "",
          tanggapan: ""
        }
      ],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.complaints.length / this.itemsPerPage);
    },
    paginatedComplaints() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.complaints.slice(start, end);
    }
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case "Diproses": return "text-yellow-500";
        case "Disetujui": return "text-green-500";
        case "Ditolak": return "text-red-500";
        default: return "text-gray-500";
      }
    },
    updateComplaintStatus(complaint) {
      console.log("Updated status:", complaint);
    },
    sendResponse(complaint) {
      if (complaint.tanggapan.trim() !== "") {
        console.log("Sent response:", complaint.tanggapan);
        alert("Tanggapan telah dikirim!");
        complaint.tanggapan = "";
      } else {
        alert("Tanggapan tidak boleh kosong!");
      }
    },
    deleteComplaint(id) {
      this.complaints = this.complaints.filter(complaint => complaint.id !== id);
      alert('Pengaduan berhasil dihapus!');
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  }
};
</script>