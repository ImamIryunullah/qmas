<template>

  <div class="w-screen h-screen min-h-screen flex flex-col bg-gray-100 p-6 ">
    <NavbarAnggota />
    <div class="flex flex-col items-center justify-center p-10 h-full bg-gray-100 flex-grow">
      <div class="bg-white h-screen w-full max-w-xl p-10 pb-28 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-center mb-4">ID Card Anda</h3>
        <div class="w-full h-full" v-if="pdfUrl">
          <embed :src="pdfUrl" type="">
          <!-- <iframe :src="pdfUrl" class="w-full h-full" frameborder="0"></iframe> -->
        </div>
        <div class="w-full flex items-center justify-center" v-else>
          Harap Tekan Cetak ID Card
        </div>
        <div class="flex items-center justify-center">
          <button @click="generatePdf"
            class="w-full p-5 m-5 md:w-auto flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
            <i class="fas fa-id-card mr-2"></i> Cetak ID Card
          </button>
        </div>
      </div>
    </div>
    <!-- Overlay loading -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="text-white text-lg">Sedang Memuat...</div>
      <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
    </div>
  </div>

</template>

<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import { PDFDocument, rgb } from 'pdf-lib'; // Import rgb from pdf-lib
import lpkni from '@/service/lpkni';
import Swal from 'sweetalert2';
// import pusatmerah from 'public/pusatmerah.pdf'

export default {
  components: {
    NavbarAnggota,
  },
  computed: {
    getStatusUserLpkni() {
      return this.$store.state.storeLpkni.userLpkni.data_anggota.status;
    },
    getUserLpkni() {
      return this.$store.state.storeLpkni.userLpkni.data_anggota.id_data_anggota;
    },
  },
  mounted() {
    if (this.getStatusUserLpkni !== 'SUCCESS' && this.getUserLpkni !== 0) {
      Swal.fire({
        icon: "info",
        title: "Informasi!",
        text: "Data Masih Dalam Proses Verifikasi!",
        showConfirmButton: true,
      })
      this.$router.push('/anggota/dashboard')
    } else if (this.getUserLpkni === 0) {
      this.$router.push('/anggota/data-diri')
    }
    this.getGetUserData();

  },
  data() {
    return {
      data_anggota: {
        id_data_anggota: 0,
        nama_lengkap: "",
        alamat: "",
        tanggalLahir: "",
        nik: "",
        tempatLahir: "",
        pekerjaan: "",
        statusPerkawinan: "",
        agama: "",
        status: "",
        daerah: {
          nama_daerah: "",
          kode_daerah: ""
        },
        wilayah: {
          nama_wilayah: "",
          kode_wilayah: ""
        },
        jabatanStruktural: {
          nama: "",
          maksimumAnggota: 0
        },
        imageUsers: [
          { imageUrl: "", keterangan: "" },
          { imageUrl: "", keterangan: "" }
        ]
      },
      user: {
        email: "",
        no_hp: "",
        nama_depan: "",
        nama_belakang: "",
        role: ""
      },
      kode_idcard: '',
      pdfUrl: '',
      loading: false,
      errorpdf: false,
      existingPdfBytes: null
    };
  },
  methods: {
    async getGetUserData() {
      try {
        const res = await lpkni.getUserData();
        const userData = res.data;
        console.log(userData);
        this.user = userData.user
        this.data_anggota = userData.data_anggota
        this.kode_idcard = this.data_anggota.daerah.kode_daerah + this.data_anggota.id_data_anggota
        // setTimeout(() => {

        // }, 1000);

      } catch (error) {
        console.log(error)
      }


    },
    getFullPathImage(img) {
      return lpkni.getfullpathImage(img)
    },
    async cropImageToCircle(imageUrl) {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.crossOrigin = "192.168.1.39:8080"; // Pastikan bisa diakses dari domain lain
        img.onload = () => {
          const size = Math.min(img.width, img.height); // Ukuran terkecil untuk membuat lingkaran
          canvas.width = size;
          canvas.height = size;

          // Buat lingkaran sebagai area pemotongan
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip(); // Gunakan clip untuk memotong gambar

          // Gambar image dalam lingkaran
          ctx.drawImage(img, 0, 0, size, size);

          // Konversi ke blob agar bisa digunakan di PDF
          canvas.toBlob(blob => {
            resolve(blob);
          }, "image/png");
        };

        img.onerror = (error) => reject(error);
        img.src = imageUrl;
      });
    }
    ,
    async generatePdf() {
      try {
        this.loading = true;
        this.existingPdfBytes = await fetch('/pusatmerah.pdf').then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(this.existingPdfBytes);
        const page = pdfDoc.getPages()[0];

        // Ambil URL gambar asli dari backend
        const imageUrl = this.getFullPathImage(this.data_anggota.imageUsers[1].imageUrl);

        // ✅ Crop gambar agar berbentuk lingkaran
        const circleImageBlob = await this.cropImageToCircle(imageUrl);

        // ✅ Konversi Blob ke ArrayBuffer agar bisa digunakan di PDF-lib
        const circleImageBytes = await circleImageBlob.arrayBuffer();

        // ✅ Gunakan `embedPng()` karena hasil cropping berbentuk PNG
        const image = await pdfDoc.embedPng(circleImageBytes);

        // ✅ Tambahkan gambar bulat ke dalam PDF
        page.drawImage(image, {
          x: 62, // Sesuaikan posisi X
          y: 191, // Sesuaikan posisi Y
          width: 100, // Sesuaikan ukuran gambar
          height: 100, // Sesuaikan ukuran gambar
        });

        // ✅ Tambahkan teks ke dalam PDF

        page.drawText(":", { x: 75, y: 140, size: 12, color: rgb(1, 1, 1) });
        page.drawText(":", { x: 75, y: 123, size: 12, color: rgb(1, 1, 1) });
        page.drawText(":", { x: 75, y: 107, size: 12, color: rgb(1, 1, 1) });
        page.drawText("ID", { x: 22, y: 140, size: 12, color: rgb(1, 1, 1) });
        page.drawText(this.kode_idcard, { x: 50, y: 140, size: 12, color: rgb(1, 1, 1) });
        page.drawText("Jabatan", { x: 20, y: 123, size: 12, color: rgb(1, 1, 1) });
        page.drawText("Alamat", { x: 20, y: 107, size: 12, color: rgb(1, 1, 1) });
        page.drawText("ID", { x: 22, y: 140, size: 12, color: rgb(1, 1, 1) });
        // ✅ Simpan PDF
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        // ✅ Buat URL objek untuk ditampilkan di frontend
        this.pdfUrl = URL.createObjectURL(pdfBlob);
      } catch (error) {

        console.error("Gagal membuat PDF:", error);
        this.$toast.error("Gagal membuat PDF. Silakan coba lagi.");
      } finally {
        this.loading = false
      }
    }

  },
};
</script>

<style scoped>
/* Tailwind input styling for better user experience */
.input-field {
  @apply p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#03a980];
}



/* Tailwind CSS untuk spinner */
.spinner-border {
  border-color: transparent;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
