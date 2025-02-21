<template>
  <NavbarAnggota />
  <div class="w-screen h-screen flex flex-col bg-gray-100 mt-12">
    <!-- Main Content Section -->
    <div class="flex flex-col items-center p-10 bg-gray-100 flex-grow">
      <div class="bg-white w-full max-w-xl p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-[#03a980] text-center mb-6">Generate ID Card</h2>

        <!-- Form for Input -->
        <div class="space-y-4">
          <input v-model="nama" placeholder="Nama" class="input-field w-full" />
          <input v-model="id" placeholder="ID" class="input-field w-full" />
          <input v-model="jabatan" placeholder="Jabatan" class="input-field w-full" />
          <input v-model="alamat" placeholder="Alamat" class="input-field w-full" />
        </div>

        <!-- Generate Button -->
        <button @click="generatePdf"
          class="mt-6 w-full bg-[#03a980] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#028a66] transition">
          Download
        </button>

        <!-- PDF Preview Section -->
        <div v-if="pdfUrl" class="mt-6 w-full max-w-2xl">
          <h3 class="text-xl text-center mb-4">Preview PDF</h3>
          <iframe :src="pdfUrl" class="w-full h-96" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import { PDFDocument, rgb } from 'pdf-lib'; // Import rgb from pdf-lib

export default {
  components: {
    NavbarAnggota,
  },
  computed: {
    getUserStatus() {
      return this.$store.state.user.data_anggota.status;
    },
  },
  mounted() {
    if (this.getUserStatus !== 'SUCCESS') {
      this.$toast.info('Data Masih Dalam Proses Verifikasi')
      this.$router.back()
    } else if (this.getUserStatus === '') {
      this.$router.push('/anggota/data-diri')
    }
  },
  data() {
    return {
      nama: '',
      id: '',
      jabatan: '',
      alamat: '',
      pdfUrl: null,  // URL of the generated PDF for preview
    };
  },
  methods: {
    async generatePdf() {
      const existingPdfBytes = await fetch('/provinsihijau.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];

      // Add text into the ID card at specified coordinates
      page.drawText(this.nama, { x: 70, y: 170, size: 12, color: rgb(1, 1, 1) });
      page.drawText(this.id, { x: 105, y: 127, size: 12, color: rgb(1, 1, 1) });
      page.drawText(this.jabatan, { x: 105, y: 109, size: 12, color: rgb(1, 1, 1) });
      page.drawText(this.alamat, { x: 105, y: 92, size: 12, color: rgb(1, 1, 1) });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Create an object URL for the generated PDF
      this.pdfUrl = URL.createObjectURL(pdfBlob);
    },
  },
};
</script>

<style scoped>
/* Tailwind input styling for better user experience */
.input-field {
  @apply p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#03a980];
}
</style>
