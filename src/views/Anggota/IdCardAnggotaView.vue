<template>
  <div class="w-screen min-h-screen h-full flex bg-gray-100">
    <NavbarAnggota />
    <!-- Wrapper utama agar tidak gepeng -->
    <div class="flex flex-grow justify-center items-center text-xl mt-14 mr-8 w-full h-full mb-12">
      <div class="w-full h-full max-w-sm sm:max-w-xl p-5 sm:p-10 pb-20 ">
        <div class="w-full py-8 px-4 sm:px-8">
          <h3 class="text-2xl sm:text-3xl font-semibold text-center text-red-700 mb-4">
            ID Card LPKNI
          </h3>
          <p class="text-lg sm:text-xl text-gray-700 mb-3 text-justify">
            Kartu identitas resmi anggota LPKNI adalah bukti keanggotaan yang sah, yang berfungsi sebagai:
          </p>


        </div>
        <div
          class="w-full min-h-[150px] sm:min-h-[200px] overflow-hidden flex justify-center items-center bg-gray-200 rounded-md">
          <canvas ref="pdfCanvas" class="w-full h-auto"></canvas>
        </div>

        <div class="mt-6">
          <!-- Responsive grid layout with adjusted spacing -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-6">
            <!-- Button Cetak -->
            <div class="flex flex-col items-center">
              <button @click="generatePdf"
                class="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md w-full sm:w-auto min-w-[140px]">
                <i class="fas fa-id-card mr-2"></i> Cetak
              </button>
              <p class="text-xs sm:text-sm text-gray-600 mt-1 text-center">Buat dokumen ID Card dalam format PDF.</p>
            </div>
            <!-- Button Unduh -->
            <div class="flex flex-col items-center">
              <button v-if="pdfUrl" @click="downloadPdf"
                class="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md w-full sm:w-auto min-w-[140px]">
                <i class="fas fa-download mr-2"></i> Unduh
              </button>
              <p v-if="pdfUrl" class="text-xs sm:text-sm text-gray-600 mt-1 text-center">Simpan ID Card dalam perangkat
                Anda.</p>
            </div>
            <!-- Button Depan -->
            <div class="flex flex-col items-center">
              <button v-if="pdfUrl" @click="renderPdf(1)"
                class="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md w-full sm:w-auto min-w-[140px]">
                <i class="fas fa-eye mr-2"></i> Depan
              </button>
              <p v-if="pdfUrl" class="text-xs sm:text-sm text-gray-600 mt-1 text-center">Tampilan Depan ID Card.</p>
            </div>
            <!-- Button Belakang -->
            <div class="flex flex-col items-center">
              <button v-if="pdfUrl" @click="renderPdf(2)"
                class="flex items-center justify-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md w-full sm:w-auto min-w-[140px]">
                <i class="fas fa-eye mr-2"></i> Belakang
              </button>
              <p v-if="pdfUrl" class="text-xs sm:text-sm text-gray-600 mt-1 text-center">Tampilan Belakang ID Card.</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-sm sm:text-base text-gray-600 mb-4 mx-4 sm:mx-12">
              <ul class="list-disc pl-5 text-justify">
                <li>Validasi keanggotaan di organisasi LPKNI.</li>
                <li>Akses layanan dan program yang disediakan oleh LPKNI.</li>
                <li>Pengenalan identitas anggota saat mengikuti kegiatan atau event.</li>
                <li>Dokumen resmi yang dapat digunakan dalam proses verifikasi anggota di berbagai kesempatan.</li>
                <li>Mempermudah akses dan otentikasi anggota di berbagai layanan
                  dan kegiatan yang diadakan oleh LPKNI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="lightboxVisible" class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div class="relative w-full h-full flex justify-center items-center">
        <!-- Tombol Close -->
        <button @click="lightboxVisible = false"
          class="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition">
          &times;
        </button>
        <iframe v-if="pdfUrl" :src="pdfUrl" class="w-full h-full border-none"></iframe>
      </div>
    </div>
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="text-white text-lg">Sedang Memuat...</div>
      <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-12 h-12 ml-2"></div>
    </div>
  </div>
</template>
<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import lpkni from '@/service/lpkni';
import Swal from 'sweetalert2';
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/webpack";
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
      lightboxVisible: false,
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
          maksimumAnggota: 0,
          tingkat: ''
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
      existingPdfBytes: null,
      tanggalBergabung: "",
      currentPage: 1, // Halaman saat ini
    };
  },
  methods: {
    async renderPdf(pages) {
      try {
        const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pages); // Render hanya halaman pertama
        const scale = window.innerWidth < 768 ? 0.8 : 1.5; // Skala berbeda untuk mobile & desktop
        const viewport = page.getViewport({ scale });

        const canvas = this.$refs.pdfCanvas;
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport });

        console.log("PDF berhasil dirender ke canvas!");
      } catch (error) {
        console.error("Gagal merender PDF:", error);
      }
    },
    async getGetUserData() {
      try {
        const res = await lpkni.getUserData();
        const userData = res.data;
        console.log(userData);
        this.user = userData.user
        this.data_anggota = userData.data_anggota
        this.kode_idcard = this.data_anggota.daerah.kode_daerah + "." + this.data_anggota.id_data_anggota
        this.tanggalBergabung = this.data_anggota.createdAt
        await this.generatePdf();
        await this.renderPdf(1)
      } catch (error) {
        console.log(error)
      }
    },
    downloadPdf() {
      if (!this.pdfUrl) return;
      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.download = "ID_Card.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getFullPathImage(img) {
      return lpkni.getfullpathImage(img)
    },
    async cropImageToCircle(imageUrl) {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, 0, 0, size, size);
          canvas.toBlob(blob => {
            resolve(blob);
          }, "image/png");
        };
        img.onerror = (error) => reject(error);
        img.src = imageUrl + "?not-from-cache-please";
      });
    },
    calculateTextWidth(text, fontSize) {
      const charWidth = fontSize * 0.5;
      return text.length * charWidth;
    },
    wrapText(text, maxLength) {
      const lines = [];
      let start = 0;
      while (start < text.length) {
        lines.push(text.substring(start, start + maxLength));
        start += maxLength;
      }
      return lines;
    },
    camelize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    async generatePdf() {
      try {
        this.loading = true;
        let PDFName = ""
        switch (this.data_anggota.jabatanStruktural.tingkat) {
          case "Pusat":
            PDFName = "Pusat";
            break;
          case "Kota/Kab":
            PDFName = "Kota-Kab";
            break;
          case "Provinsi":
            PDFName = "Provinsi";
            break;
          case "Region 1":
            PDFName = "Provinsi";
            break;
          case "Region 2":
            PDFName = "Kota-Kab";
            break;
          default:
            break;
        }
        console.log(PDFName)
        const response = await fetch(`https://lpkni.id/assets/${PDFName}.pdf` + "?not-from-cache-please");
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');

        }

        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        pdfDoc.registerFontkit(fontkit);
        const page = pdfDoc.getPages()[0];
        const courierNewUrls = '/font/courbd.ttf'; // Ubah path sesuai lokasi file Anda
        const courierFontBytess = await fetch(courierNewUrls).then(res => res.arrayBuffer());
        const courierNewFonts = await pdfDoc.embedFont(courierFontBytess);
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
          x: 185, // Sesuaikan posisi X
          y: 545, // Sesuaikan posisi Y
          width: 252, // Sesuaikan ukuran gambar
          height: 255, // Sesuaikan ukuran gambar
        });
        // Ambil titik tengah halaman
        const centerX = page.getWidth() / 2;
        const yPosTextSK = 500;
        const fontSize = 35;
        const NoSK = this.data_anggota.nama_lengkap;
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);

        console.log(SKfirstPart);
        console.log(SKsecondPart);

        // Embed font yang digunakan
        // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Hitung lebar total SKfirstPart dan SKsecondPart
        const widthFirstPart = courierNewFonts.widthOfTextAtSize(SKfirstPart, fontSize);
        const widthSecondPart = courierNewFonts.widthOfTextAtSize(SKsecondPart, fontSize);

        // Jika Anda ingin keseluruhan teks (gabungan kedua bagian) terpusat, hitung total lebar:
        const totalTextWidth = widthFirstPart + widthSecondPart;
        const startX = centerX - totalTextWidth / 2 - 10;

        // Untuk SKfirstPart yang digambar dari kanan ke kiri, posisi awal harus di akhir bagian pertama:
        let xPosText1SK = startX + widthFirstPart;

        // Untuk SKsecondPart yang digambar dari kiri ke kanan, mulai dari posisi akhir SKfirstPart:
        let xPosText2SK = startX + widthFirstPart + 20;

        // --- Menggambar SKfirstPart (kanan ke kiri) ---
        for (let i = SKfirstPart.length - 1; i >= 0; i--) {
          const char = SKfirstPart[i];
          const currentX = xPosText1SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize,
            color: rgb(1, 1, 1),
            font: courierNewFonts
          });

          // Hitung lebar karakter dan geser posisi ke kiri
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize);
          xPosText1SK -= charWidth;
        }

        // --- Menggambar SKsecondPart (kiri ke kanan) ---
        for (let i = 0; i < SKsecondPart.length; i++) {
          const char = SKsecondPart[i];
          const currentX = xPosText2SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize,
            color: rgb(1, 1, 1),
            font: courierNewFonts
          });

          // Hitung lebar karakter dan geser posisi ke kanan
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize);
          xPosText2SK += charWidth;
        }


        let nameYPosition = 400; // Posisi Y nama
        const posxAll = 80
        page.drawText("ID", { x: posxAll, y: nameYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
        page.drawText(":", { x: posxAll + 160, y: nameYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
        page.drawText(this.kode_idcard, { x: posxAll + 180, y: nameYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });

        // Menambahkan Jabatan
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 18); // Memecah teks jabatan jika lebih dari 21 karakter
        let jabatanYPosition = nameYPosition - 30; // Menyesuaikan posisi Y berdasarkan nama

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "JABATAN" : "", { x: posxAll, y: jabatanYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
          page.drawText(index === 0 ? ":" : "", { x: posxAll + 160, y: jabatanYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
          page.drawText(line, { x: posxAll + 180, y: jabatanYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 24;
        });

        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 18); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = jabatanYPosition - 5; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "ALAMAT" : "", { x: posxAll, y: alamatYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
          page.drawText(index === 0 ? ":" : "", { x: posxAll + 160, y: alamatYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
          page.drawText(line, { x: posxAll + 180, y: alamatYPosition, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          alamatYPosition -= 24;
        });
        page.drawText(this.tanggalBergabung.split('T')[0].split('-')[0], { x: centerX - 25, y: 30, size: 30, color: rgb(1, 1, 1), font: courierNewFonts });
        // ✅ Simpan PDF
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        // ✅ Buat URL objek untuk ditampilkan di frontend
        this.pdfUrl = URL.createObjectURL(pdfBlob);
      } catch (error) {
        console.error("Gagal membuat PDF:", error);
        this.$toast.error("Gagal membuat PDF. Silakan coba lagi.");
      } finally {
        this.loading = false;
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
