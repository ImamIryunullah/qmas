<template>
  <div class="w-screen h-screen flex flex-col mt-12">
    <NavbarAnggota />
    <!-- Main Content Section -->
    <div class="flex flex-col items-center p-10 bg-gray-100 flex-grow">
      <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-[#03a980] text-center mb-6">Riwayat Pengajuan Pendaftaran Anggota</h2>

        <div v-if="riwayat.length > 0" class="space-y-4">
          <div v-for="(item, index) in riwayat" :key="index"
            class="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-300">
            <p><strong>Nama:</strong> {{ item.nama }}</p>
            <p><strong>Provinsi:</strong> {{ item.provinsi }}</p>
            <p><strong>Kota/Kabupaten:</strong> {{ item.kotaKabupaten }}</p>
            <p><strong>Jabatan:</strong> {{ item.Jabatan }}</p>
            <p><strong>Status:</strong> <span :class="getStatusClass(item.status)">{{ item.status }}</span></p>

            <!-- Only show the print ID card button if approved -->
            <div v-if="item.status === 'Disetujui' && item.anggotaType === 'Provinsi'">
              <button @click="generateIdCardLink(item)"
                class="mt-4 w-full bg-[#03a980] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#028a66] transition">
                Cetak ID Card Provinsi
              </button>
            </div>

            <!-- Show approved/rejected message -->
            <p v-if="item.status === 'Disetujui'">Status: <span class="text-green-500">Disetujui oleh pusat.</span></p>
            <p v-if="item.status === 'Ditolak'">Status: <span class="text-red-500">Ditolak oleh pusat.</span></p>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">Belum ada pengajuan pendaftaran anggota.</div>
      </div>
    </div>
  </div>

  <!-- Modal for ID Card generation -->
  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg w-96 max-w-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">Generate ID Card Provinsi</h3>
      <p><strong>Nama:</strong> {{ selectedPendaftaran.nama }}</p>
      <p><strong>Jenis Anggota:</strong> {{ selectedPendaftaran.anggotaType }}</p>

      <!-- Form for ID card details -->
      <div class="space-y-4 mb-4">
        <input v-model="nama" placeholder="Nama" class="input-field w-full" />
        <input v-model="id" placeholder="ID" class="input-field w-full" />
        <input v-model="jabatan" placeholder="Jabatan" class="input-field w-full" />
        <input v-model="alamat" placeholder="Alamat" class="input-field w-full" />
      </div>

      <!-- Button for generating ID Card -->
      <button @click="generatePdf"
        class="mt-4 w-full bg-[#03a980] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#028a66] transition">
        Generate ID Card
      </button>

      <button @click="closeModal"
        class="mt-2 w-full bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
        Close
      </button>
    </div>
  </div>
</template>
<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import { PDFDocument, rgb } from 'pdf-lib';

export default {
  components: {
    NavbarAnggota,
  },
  data() {
    return {
      riwayat: [
        {
          nama: "John Doe",
          provinsi: "Jawa Timur",
          kotaKabupaten: "Kota Malang",
          Jabatan: "Anggota Direktorat",
          status: "Diproses",
          anggotaType: "Provinsi",
        },
        {
          nama: "Jane Smith",
          provinsi: "NTB",
          Jabatan: "Anggota Direktorat",
          status: "Ditolak",
          anggotaType: "Provinsi",
        }
      ],
      isModalOpen: false,
      selectedPendaftaran: null,
      nama: '',
      id: '',
      jabatan: '',
      alamat: '',
    };
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
    openModal(pendaftaran) {
      this.selectedPendaftaran = pendaftaran;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    generateIdCardLink(pendaftaran) {
      // Periksa jika status pengguna sudah "Disetujui"
      if (pendaftaran.status === "Disetujui") {
        if (pendaftaran.anggotaType === "Provinsi") {
          this.$router.push('/User/generate-id-card'); // Arahkan ke halaman pembuatan ID Card Provinsi
        } else {
          console.log("User tidak disetujui untuk mencetak ID card.");
        }
      } else {
        alert('Pendaftaran Anda belum disetujui. Anda tidak dapat mencetak ID Card.');
      }
    },

    async generatePdf() {
      const existingPdfBytes = await fetch('/provinsihijau.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];
      page.drawText(this.nama, { x: 70, y: 170, size: 12, color: rgb(1, 1, 1) });
      page.drawText(this.id, { x: 105, y: 127, size: 12, color: rgb(1, 1, 1) });
      page.drawText(this.jabatan, { x: 105, y: 109, size: 12, color: rgb(1, 1, 1) });
      page.drawText(this.alamat, { x: 105, y: 92, size: 12, color: rgb(1, 1, 1) });
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'idcardprovinsi.pdf';
      link.click();

      this.closeModal();
    }
  }
};
</script>

<style scoped>
/* Styling untuk modal */
.fixed {
  position: fixed;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.6);
}

.bg-opacity-60 {
  opacity: 0.6;
}

/* Tailwind input styling for better user experience */
.input-field {
  @apply p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#03a980];
}
</style>
