<template>
  <div class="w-screen min-h-screen h-full flex bg-gray-100">
    <NavbarAnggota />

    <div class="flex justify-center items-center text-xl mt-16 mr-6 w-full h-full mb-6">
      <div class="w-full max-w-sm sm:max-w-xl p-3 sm:p-10 pb-20">
        <h3 class="text-lg sm:text-xl font-semibold text-center mb-2">Surat Keputusan (SK) LPKNI</h3>
        <p class="text-sm sm:text-base text-center text-gray-600 mb-4">
          Dokumen resmi sebagai syarat pengangkatan & pengakuan dalam LPKNI.
        </p>


        <!-- Informasi Konteks SK -->
        <div class="bg-gray-100 p-4 rounded-md text-sm sm:text-base text-gray-700 mb-6">
          <p><strong>SK LPKNI</strong> adalah dokumen legal yang menyatakan bahwa anggota telah diakui dan memiliki hak
            serta kewajiban dalam organisasi.</p>
          <p class="mt-2">Syarat untuk diakui:</p>
          <ul class="list-disc list-inside ml-2">
            <li>Telah menyelesaikan pendaftaran & verifikasi</li>
            <li>Memiliki status keanggotaan aktif</li>
            <li>Menyetujui kode etik & peraturan organisasi</li>
          </ul>
        </div>
        <!-- Tampilan SK -->
        <div
          class="w-full min-h-[150px] sm:min-h-[200px] overflow-hidden flex justify-center items-center bg-gray-200 rounded-md">
          <canvas ref="pdfCanvas" class="w-full h-full"></canvas>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full">
          <div class="flex flex-col items-center sm:items-start">
            <button @click="generatePdf"
              class="w-full sm:w-auto flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
              <i class="fas fa-file-alt mr-2"></i> Cetak
            </button>
            <p class="text-xs sm:text-sm text-gray-600 mt-1 text-center sm:text-left">
              Buat dokumen SK dalam format PDF.
            </p>
          </div>
          <div class="flex flex-col items-center sm:items-start">
            <button v-if="pdfUrl" @click="downloadPdf"
              class="w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
              <i class="fas fa-download mr-2"></i> Unduh
            </button>
            <p v-if="pdfUrl" class="text-xs sm:text-sm text-gray-600 mt-1 text-center sm:text-left">
              Simpan dokumen SK ke perangkat Anda.
            </p>
          </div>
          <div class="flex flex-col items-center sm:items-start">
            <button v-if="pdfUrl" @click="renderPdf(1)"
              class="w-full sm:w-auto flex items-center justify-center bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
              <i class="fas fa-eye mr-2"></i> Detail SK
            </button>
            <p v-if="pdfUrl" class="text-xs sm:text-sm text-gray-600 mt-1 text-center sm:text-left">
              Tampilkan isi dokumen SK.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Overlay Loading -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="text-white text-lg">Sedang Memuat...</div>
      <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-12 h-12 ml-2"></div>
    </div>

    <!-- Lightbox untuk melihat SK -->
    <div v-if="lightboxVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div class="bg-white p-5 rounded-lg shadow-lg max-w-3xl w-full">
        <button @click="lightboxVisible = false" class="absolute top-5 right-5 text-gray-600 hover:text-black text-2xl">
          &times;
        </button>
        <h3 class="text-lg font-semibold text-center mb-4">Pratinjau SK</h3>
        <iframe v-if="pdfUrl" :src="pdfUrl" class="w-full h-[500px]" frameborder="0"></iframe>
      </div>
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
        updatedAt: "",
        daerah: {
          nama_daerah: "",
          kode_daerah: "",
          kode_daerah_lpkni: ""
        },
        wilayah: {
          nama_wilayah: "",
          kode_wilayah: "",
          kode_wilayah_lpkni: ''
        },
        jabatanStruktural: {
          nama: "",
          maksimumAnggota: 0,
          tingkat: '',
          uidJabatan: ''

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
      Kota: "",
      romanMonth: ""
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
        this.tanggalBergabung = this.data_anggota.updatedAt
        this.Kota = this.data_anggota.daerah.nama_daerah
        if (this.data_anggota.jabatanStruktural.tingkat === "Provinsi") {
          await this.generatePdfProvinsi();
        }
        else if (this.data_anggota.jabatanStruktural.tingkat === "Kota/Kab") {
          await this.generatePdfKotaKab();
        }
        else if (this.data_anggota.jabatanStruktural.tingkat === "Pusat") {
          await this.generatePdfPusat();
        }
        else if (this.data_anggota.jabatanStruktural.tingkat === "Region 1") {
          await this.generatePdfRegional1();
        }
        else if (this.data_anggota.jabatanStruktural.tingkat === "Region 2") {
          await this.generatePdfRegional2();
        }
        this.renderPdf(1)
      } catch (error) {
        console.log(error)
      }
    },
    downloadPdf() {
      if (!this.pdfUrl) return;

      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.download = "Surat_SK.pdf"; // Nama file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getFullPathImage(img) {
      return lpkni.getfullpathImage(img)
    },
    convertMonthToRoman(tanggal) {
      const month = new Date(tanggal).getMonth() + 1; // Ambil bulan (1-12)
      return month ? this.toRoman(month) : 'Format tanggal tidak valid';
    },
    toRoman(num) {
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
      return romanNumerals[num - 1]; // Mengembalikan simbol Romawi berdasarkan indeks
    },
    async cropImageToCircle(imageUrl) {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.crossOrigin = "Anonymous"; // Pastikan bisa diakses dari domain lain
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
        img.src = imageUrl + "?not-from-cache-please";
      });
    }
    ,
    calculateTextWidth(text, fontSize) {
      const charWidth = fontSize * 1; // Perkiraan lebar per karakter
      console.log(text.length * charWidth)
      return text.length * charWidth;
    },
    calculateTextlength(text) {
      console.log(text.length)
      return text.length;
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
    async generatePdfRegional1() {
      try {
        this.loading = true;
        let PDFName = ""
        switch (this.data_anggota.jabatanStruktural.tingkat) {
          case "Pusat":
            PDFName = "SK_PUSAT";
            break;
          case "Kota/Kab":
            PDFName = "SK_KOTA_KAB";
            break;
          case "Provinsi":
            PDFName = "SK_PROVINSI";
            break;
          case "Region 1":
            PDFName = "SK_REGIONAL";
            break;
          case "Region 2":
            PDFName = "SK_REGIONAL";
            break;
          default:
            break;
        }

        console.log(PDFName);
        const response = await fetch(`https://lpkni.id/assets/${PDFName}.pdf`);
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');
        }

        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Register fontkit agar custom font bisa di-embed
        pdfDoc.registerFontkit(fontkit);

        // Misalnya, ambil file CourierNew.ttf dari server atau local
        const courierNewUrl = '/font/courbd.ttf'; // Ubah path sesuai lokasi file Anda
        const courierNewUrls = '/font/cour.ttf'; // Ubah path sesuai lokasi file Anda
        const courierFontBytes = await fetch(courierNewUrl).then(res => res.arrayBuffer());
        const courierFontBytess = await fetch(courierNewUrls).then(res => res.arrayBuffer());

        const textColor2 = rgb(0, 0, 0);
        // Embed font ke dalam pdfDoc yang sudah dimuat
        const courierNewFont = await pdfDoc.embedFont(courierFontBytes);
        const courierNewFonts = await pdfDoc.embedFont(courierFontBytess);
        const text =
          "SURAT PENGANGKATAN PEJABAT LPKNI REGIONAL 1"
        const page = pdfDoc.getPages()[0];
        const midIndex = Math.floor(text.length / 2);
        const firstPart = text.substring(0, midIndex);
        const secondPart = text.substring(midIndex);
        const centerX = page.getWidth() / 2; // atau bisa Anda tentukan sesuai kebutuhan
        console.log(firstPart);
        console.log(secondPart);

        let xPosText1 = centerX;
        const yPosText1 = 742;
        const fontSize1 = 12;

        let xPosText2 = xPosText1 + 7;
        const yPosText2 = 742;

        // Offset vertikal untuk underline, misal 2 satuan di bawah teks
        const underlineOffset = 2.5;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = firstPart.length - 1; i >= 0; i--) {
          const char = firstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText1,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFont, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText1 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText1 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1 -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < secondPart.length; i++) {
          const char = secondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText2,
            size: fontSize1,
            color: textColor2,
            font: courierNewFont,
          });

          // Hitung lebar karakter
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText2 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText2 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2 += charWidth;
        }

        // const NoSK = `${this.data_anggota.id_data_anggota}.${this.data_anggota.jabatanStruktural.uidJabatan}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const NoSK = `${this.data_anggota.wilayah.kode_wilayah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}.${this.data_anggota.id_data_anggota}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);
        const yPosTextSK = 727;
        let xPosText1SK = centerX;
        let xPosText2SK = xPosText1SK + 7;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = SKfirstPart.length - 1; i >= 0; i--) {
          const char = SKfirstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFonts, // pastikan font sudah didefinisikan
          });

          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          xPosText1SK -= charWidth;
        }
        for (let i = 0; i < SKsecondPart.length; i++) {
          const char = SKsecondPart[i];
          const currentX = xPosText2SK;
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2,
            font: courierNewFonts,
          });
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          xPosText2SK += charWidth;
        }

        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const namaPosx = 68
        page.drawText("Nama", { x: namaPosx, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(":", { x: namaPosx + 100, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(fullName, { x: namaPosx + 120, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        const JabatanaPosx = 68
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let jabatanYPosition = 305; // Menyesuaikan posisi Y berdasarkan jabatan

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Jabatan" : "", { x: JabatanaPosx, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 100, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 120, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 15;
        });
        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = 285; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat" : "", { x: JabatanaPosx, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 100, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 120, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          alamatYPosition -= 15;
        });
        const alamatkantor = this.data_anggota.alamatkantor.toUpperCase();
        const alamatkantorLines = this.wrapText(alamatkantor, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatkantorYPosition = 266; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatkantorLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat Kantor" : "", { x: JabatanaPosx, y: alamatkantorYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 100, y: alamatkantorYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 120, y: alamatkantorYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          alamatkantorYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0], { x: 420, y: 153, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText("Malang", { x: 420, y: 168, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(pdfBlob);
      } catch (error) {
        console.error("Gagal membuat PDF:", error);
        this.$toast.error("Gagal membuat PDF. Silakan coba lagi.");
      } finally {
        this.loading = false;
      }
    },
    async generatePdfRegional2() {
      try {
        this.loading = true;
        let PDFName = ""
        switch (this.data_anggota.jabatanStruktural.tingkat) {
          case "Pusat":
            PDFName = "SK_PUSAT";
            break;
          case "Kota/Kab":
            PDFName = "SK_KOTA_KAB";
            break;
          case "Provinsi":
            PDFName = "SK_PROVINSI";
            break;
          case "Region 1":
            PDFName = "SK_REGIONAL";
            break;
          case "Region 2":
            PDFName = "SK_REGIONAL";
            break;
          default:
            break;
        }

        console.log(PDFName);
        const response = await fetch(`https://lpkni.id/assets/${PDFName}.pdf`);
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');
        }

        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Register fontkit agar custom font bisa di-embed
        pdfDoc.registerFontkit(fontkit);

        // Misalnya, ambil file CourierNew.ttf dari server atau local
        const courierNewUrl = '/font/courbd.ttf'; // Ubah path sesuai lokasi file Anda
        const courierNewUrls = '/font/cour.ttf'; // Ubah path sesuai lokasi file Anda
        const courierFontBytes = await fetch(courierNewUrl).then(res => res.arrayBuffer());
        const courierFontBytess = await fetch(courierNewUrls).then(res => res.arrayBuffer());

        const textColor2 = rgb(0, 0, 0);
        // Embed font ke dalam pdfDoc yang sudah dimuat
        const courierNewFont = await pdfDoc.embedFont(courierFontBytes);
        const courierNewFonts = await pdfDoc.embedFont(courierFontBytess);
        const text =
          "SURAT PENGANGKATAN PEJABAT LPKNI REGIONAL 2"
        const page = pdfDoc.getPages()[0];
        const midIndex = Math.floor(text.length / 2);
        const firstPart = text.substring(0, midIndex);
        const secondPart = text.substring(midIndex);
        const centerX = page.getWidth() / 2; // atau bisa Anda tentukan sesuai kebutuhan
        console.log(firstPart);
        console.log(secondPart);

        let xPosText1 = centerX;
        const yPosText1 = 742;
        const fontSize1 = 12;

        let xPosText2 = xPosText1 + 7;
        const yPosText2 = 742;

        // Offset vertikal untuk underline, misal 2 satuan di bawah teks
        const underlineOffset = 2.5;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = firstPart.length - 1; i >= 0; i--) {
          const char = firstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText1,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFont, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText1 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText1 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1 -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < secondPart.length; i++) {
          const char = secondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText2,
            size: fontSize1,
            color: textColor2,
            font: courierNewFont,
          });
          // Hitung lebar karakter
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText2 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText2 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });
          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2 += charWidth;
        }
        // const NoSK = `${this.data_anggota.id_data_anggota}.${this.data_anggota.jabatanStruktural.uidJabatan}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const NoSK = `${this.data_anggota.daerah.kode_daerah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}.${this.data_anggota.id_data_anggota}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);
        const yPosTextSK = 727;
        let xPosText1SK = centerX;
        let xPosText2SK = xPosText1SK + 7;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = SKfirstPart.length - 1; i >= 0; i--) {
          const char = SKfirstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFonts, // pastikan font sudah didefinisikan
          });

          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          xPosText1SK -= charWidth;
        }
        for (let i = 0; i < SKsecondPart.length; i++) {
          const char = SKsecondPart[i];
          const currentX = xPosText2SK;
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2,
            font: courierNewFonts,
          });
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          xPosText2SK += charWidth;
        }

        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const namaPosx = 68
        page.drawText("Nama", { x: namaPosx, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(":", { x: namaPosx + 100, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(fullName, { x: namaPosx + 120, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        const JabatanaPosx = 68
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let jabatanYPosition = 305; // Menyesuaikan posisi Y berdasarkan jabatan

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Jabatan" : "", { x: JabatanaPosx, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 100, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 120, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 15;
        });
        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = 285; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat" : "", { x: JabatanaPosx, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 100, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 120, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          alamatYPosition -= 15;
        });
        const alamatkantor = this.data_anggota.alamatkantor.toUpperCase();
        const alamatkantorLines = this.wrapText(alamatkantor, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatkantorYPosition = 266; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatkantorLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat Kantor" : "", { x: JabatanaPosx, y: alamatkantorYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 100, y: alamatkantorYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 120, y: alamatkantorYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          alamatkantorYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0], { x: 420, y: 153, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText("Malang", { x: 420, y: 168, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(pdfBlob);
      } catch (error) {
        console.error("Gagal membuat PDF:", error);
        this.$toast.error("Gagal membuat PDF. Silakan coba lagi.");
      } finally {
        this.loading = false;
      }
    },
    async generatePdfPusat() {
      try {
        this.loading = true;
        let PDFName = ""
        switch (this.data_anggota.jabatanStruktural.tingkat) {
          case "Pusat":
            PDFName = "SK_PUSAT";
            break;
          case "Kota/Kab":
            PDFName = "SK_KOTA_KAB";
            break;
          case "Provinsi":
            PDFName = "SK_PROVINSI";
            break;
          case "Regional 1":
            PDFName = "SK_REGIONAL1";
            break;
          case "Regional 2":
            PDFName = "Kota-Kab";
            break;
          default:
            break;
        }

        console.log(PDFName);
        const response = await fetch(`https://lpkni.id/assets/${PDFName}.pdf`);
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');
        }

        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Register fontkit agar custom font bisa di-embed
        pdfDoc.registerFontkit(fontkit);

        // Misalnya, ambil file CourierNew.ttf dari server atau local
        const courierNewUrl = '/font/courbd.ttf'; // Ubah path sesuai lokasi file Anda
        const courierNewUrls = '/font/cour.ttf'; // Ubah path sesuai lokasi file Anda
        const courierFontBytes = await fetch(courierNewUrl).then(res => res.arrayBuffer());
        const courierFontBytess = await fetch(courierNewUrls).then(res => res.arrayBuffer());

        const textColor2 = rgb(0, 0, 0);
        // Embed font ke dalam pdfDoc yang sudah dimuat
        const courierNewFont = await pdfDoc.embedFont(courierFontBytes);
        const courierNewFonts = await pdfDoc.embedFont(courierFontBytess);
        const text =
          "SURAT PENGANGKATAN PEJABAT LPKNI PUSAT"
        const page = pdfDoc.getPages()[0];
        const midIndex = Math.floor(text.length / 2);
        const firstPart = text.substring(0, midIndex);
        const secondPart = text.substring(midIndex);
        const centerX = page.getWidth() / 2; // atau bisa Anda tentukan sesuai kebutuhan
        console.log(firstPart);
        console.log(secondPart);

        let xPosText1 = centerX;
        const yPosText1 = 742;
        const fontSize1 = 12;

        let xPosText2 = xPosText1 + 7;
        const yPosText2 = 742;

        // Offset vertikal untuk underline, misal 2 satuan di bawah teks
        const underlineOffset = 2.5;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = firstPart.length - 1; i >= 0; i--) {
          const char = firstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText1,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFont, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText1 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText1 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1 -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < secondPart.length; i++) {
          const char = secondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText2,
            size: fontSize1,
            color: textColor2,
            font: courierNewFont,
          });

          // Hitung lebar karakter
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText2 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText2 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2 += charWidth;
        }

        const NoSK = `${this.data_anggota.id_data_anggota}/SKEP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);
        const yPosTextSK = 727;
        let xPosText1SK = centerX;
        let xPosText2SK = xPosText1SK + 7;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = SKfirstPart.length - 1; i >= 0; i--) {
          const char = SKfirstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFonts, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);

          // // Gambar garis underline di bawah karakter
          // page.drawLine({
          //   start: { x: currentX, y: yPosTextSK - underlineOffset },
          //   end: { x: currentX + charWidth, y: yPosTextSK - underlineOffset },
          //   thickness: 1.2,
          //   color: textColor2,
          // });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1SK -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < SKsecondPart.length; i++) {
          const char = SKsecondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2,
            font: courierNewFonts,
          });
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          xPosText2SK += charWidth;
        }

        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const namaPosx = 68
        page.drawText("Nama", { x: namaPosx, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(":", { x: namaPosx + 60, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(fullName, { x: namaPosx + 100, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        const JabatanaPosx = 68
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let jabatanYPosition = 305; // Menyesuaikan posisi Y berdasarkan jabatan

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Jabatan" : "", { x: JabatanaPosx, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 15;
        });
        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = 285; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat" : "", { x: JabatanaPosx, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          alamatYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0], { x: 420, y: 160, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText("Malang", { x: 420, y: 175, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(pdfBlob);
      } catch (error) {
        console.error("Gagal membuat PDF:", error);
        this.$toast.error("Gagal membuat PDF. Silakan coba lagi.");
      } finally {
        this.loading = false;
      }
    },
    async generatePdfProvinsi() {
      try {
        this.loading = true;
        let PDFName = ""
        switch (this.data_anggota.jabatanStruktural.tingkat) {
          case "Pusat":
            PDFName = "SK_PUSAT";
            break;
          case "Kota/Kab":
            PDFName = "SK_KOTA_KAB";
            break;
          case "Provinsi":
            PDFName = "SK_PROVINSI";
            break;
          case "Region 1":
            PDFName = "SK_REGIONAL1";
            break;
          case "Region 2":
            PDFName = "Kota-Kab";
            break;
          default:
            break;
        }

        console.log(PDFName);
        const response = await fetch(`https://lpkni.id/assets/${PDFName}.pdf`);
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');
        }

        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Register fontkit agar custom font bisa di-embed
        pdfDoc.registerFontkit(fontkit);

        // Misalnya, ambil file CourierNew.ttf dari server atau local
        const courierNewUrl = '/font/courbd.ttf'; // Ubah path sesuai lokasi file Anda
        const courierNewUrls = '/font/cour.ttf'; // Ubah path sesuai lokasi file Anda
        const courierFontBytes = await fetch(courierNewUrl).then(res => res.arrayBuffer());
        const courierFontBytess = await fetch(courierNewUrls).then(res => res.arrayBuffer());

        const textColor2 = rgb(0, 0, 0);
        // Embed font ke dalam pdfDoc yang sudah dimuat
        const courierNewFont = await pdfDoc.embedFont(courierFontBytes);
        const courierNewFonts = await pdfDoc.embedFont(courierFontBytess);
        const text =
          "SURAT PENGANGKATAN PEJABAT LPKNI CABANG " + this.data_anggota.wilayah.nama_wilayah;
        const page = pdfDoc.getPages()[0];
        const midIndex = Math.floor(text.length / 2);
        const firstPart = text.substring(0, midIndex);
        const secondPart = text.substring(midIndex);
        const centerX = page.getWidth() / 2; // atau bisa Anda tentukan sesuai kebutuhan
        console.log(firstPart);
        console.log(secondPart);

        let xPosText1 = centerX;
        const yPosText1 = 742;
        const fontSize1 = 12;

        let xPosText2 = xPosText1 + 7;
        const yPosText2 = 742;

        // Offset vertikal untuk underline, misal 2 satuan di bawah teks
        const underlineOffset = 2.5;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = firstPart.length - 1; i >= 0; i--) {
          const char = firstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText1,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFont, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText1 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText1 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1 -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < secondPart.length; i++) {
          const char = secondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText2,
            size: fontSize1,
            color: textColor2,
            font: courierNewFont,
          });

          // Hitung lebar karakter
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText2 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText2 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2 += charWidth;
        }
        const kepala = this.data_anggota.jabatanStruktural.nama.toLowerCase().includes('kepala');
        const NoSK = kepala ? `${this.data_anggota.wilayah.kode_wilayah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}` :
          `${this.data_anggota.wilayah.kode_wilayah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}.${this.data_anggota.id_data_anggota}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);
        const yPosTextSK = 727;
        let xPosText1SK = centerX;
        let xPosText2SK = xPosText1SK + 7;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = SKfirstPart.length - 1; i >= 0; i--) {
          const char = SKfirstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFonts, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);

          // // Gambar garis underline di bawah karakter
          // page.drawLine({
          //   start: { x: currentX, y: yPosTextSK - underlineOffset },
          //   end: { x: currentX + charWidth, y: yPosTextSK - underlineOffset },
          //   thickness: 1.2,
          //   color: textColor2,
          // });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1SK -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < SKsecondPart.length; i++) {
          const char = SKsecondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2,
            font: courierNewFonts,
          });
          // Hitung lebar karakter
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          // // Gambar garis underline di bawah karakter
          // page.drawLine({
          //   start: { x: currentX, y: yPosTextSK - underlineOffset },
          //   end: { x: currentX + charWidth, y: yPosTextSK - underlineOffset },
          //   thickness: 1.2,
          //   color: textColor2,
          // });
          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2SK += charWidth;
        }
        const text1 = "Bahwa dalam ikut berpartisipasi dalam membangun perkembangan hukum perlindungan konsumen, Presiden LPKNI Perlu mengangkat Pimpinan dan pengurus LPKNI Provinsi " + this.data_anggota.wilayah.nama_wilayah
        const text1line = this.wrapText(text1, 45); // Memecah teks jabatan jika lebih dari 21 karakter
        let text1pos = 700; // Menyesuaikan posisi Y berdasarkan nama
        text1line.forEach((line) => {
          // page.drawText(index === 0 ? "" : "", { x: 200, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // page.drawText(index === 0 ? "" : "", { x: 200, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: 220, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // Jika ada lebih dari satu baris, tambahkan jarak Y
          text1pos -= 15;
        });
        const text2 = "Bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a, Presiden LPKNI perlu untuk mengeluarkan Surat Pengangkatan Pejabat di LPKNI Perwakilan Provinsi Jawa Timur untuk menyelenggarakan acara atau kegiatan di wilayah hukum LPKNI Perwakilan Provinsi " + this.data_anggota.wilayah.nama_wilayah
        const text2line = this.wrapText(text2, 45); // Memecah teks jabatan jika lebih dari 21 karakter
        let text2pos = 635; // Menyesuaikan posisi Y berdasarkan nama
        text2line.forEach((line) => {

          page.drawText(line, { x: 220, y: text2pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // Jika ada lebih dari satu baris, tambahkan jarak Y
          text2pos -= 15;
        });


        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const namaPosx = 68
        page.drawText("Nama", { x: namaPosx, y: 300, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(":", { x: namaPosx + 60, y: 300, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(fullName, { x: namaPosx + 100, y: 300, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        const JabatanaPosx = 68
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let jabatanYPosition = 280; // Menyesuaikan posisi Y berdasarkan jabatan

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Jabatan" : "", { x: JabatanaPosx, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 15;
        });
        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = 260; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat" : "", { x: JabatanaPosx, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          alamatYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0], { x: 420, y: 173, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText("Malang", { x: 420, y: 187, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

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
    },
    async generatePdfKotaKab() {
      try {
        this.loading = true;
        let PDFName = ""
        switch (this.data_anggota.jabatanStruktural.tingkat) {
          case "Pusat":
            PDFName = "SK_PUSAT";
            break;
          case "Kota/Kab":
            PDFName = "SK_KOTA_KAB";
            break;
          case "Provinsi":
            PDFName = "SK_PROVINSI";
            break;
          case "Region 1":
            PDFName = "SK_REGIONAL1";
            break;
          case "Region 2":
            PDFName = "Kota-Kab";
            break;
          default:
            break;
        }

        console.log(PDFName);
        const response = await fetch(`https://lpkni.id/assets/${PDFName}.pdf`);
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');
        }

        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Register fontkit agar custom font bisa di-embed
        pdfDoc.registerFontkit(fontkit);

        // Misalnya, ambil file CourierNew.ttf dari server atau local
        const courierNewUrl = '/font/courbd.ttf'; // Ubah path sesuai lokasi file Anda
        const courierNewUrls = '/font/cour.ttf'; // Ubah path sesuai lokasi file Anda
        const courierFontBytes = await fetch(courierNewUrl).then(res => res.arrayBuffer());
        const courierFontBytess = await fetch(courierNewUrls).then(res => res.arrayBuffer());

        const textColor2 = rgb(0, 0, 0);
        // Embed font ke dalam pdfDoc yang sudah dimuat
        const courierNewFont = await pdfDoc.embedFont(courierFontBytes);
        const courierNewFonts = await pdfDoc.embedFont(courierFontBytess);
        const text =
          "SURAT PENGANGKATAN PEJABAT LPKNI CABANG " + this.Kota;
        const page = pdfDoc.getPages()[0];
        const midIndex = Math.floor(text.length / 2);
        const firstPart = text.substring(0, midIndex);
        const secondPart = text.substring(midIndex);
        const centerX = page.getWidth() / 2; // atau bisa Anda tentukan sesuai kebutuhan
        console.log(firstPart);
        console.log(secondPart);

        let xPosText1 = centerX;
        const yPosText1 = 742;
        const fontSize1 = 12;

        let xPosText2 = xPosText1 + 7;
        const yPosText2 = 742;

        // Offset vertikal untuk underline, misal 2 satuan di bawah teks
        const underlineOffset = 2.5;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = firstPart.length - 1; i >= 0; i--) {
          const char = firstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText1,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFont, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText1 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText1 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1 -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < secondPart.length; i++) {
          const char = secondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosText2,
            size: fontSize1,
            color: textColor2,
            font: courierNewFont,
          });

          // Hitung lebar karakter
          const charWidth = courierNewFont.widthOfTextAtSize(char, fontSize1);

          // Gambar garis underline di bawah karakter
          page.drawLine({
            start: { x: currentX, y: yPosText2 - underlineOffset },
            end: { x: currentX + charWidth, y: yPosText2 - underlineOffset },
            thickness: 1.2,
            color: textColor2,
          });

          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2 += charWidth;
        }
        const kepala = this.data_anggota.jabatanStruktural.nama.toLowerCase().includes('kepala');
        // const NoSK = `${this.data_anggota.wilayah.kode_wilayah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}.${this.data_anggota.id_data_anggota}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const NoSK = kepala ? `${this.data_anggota.daerah.kode_daerah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}` :
          `${this.data_anggota.daerah.kode_daerah_lpkni}.${this.data_anggota.jabatanStruktural.uidJabatan}.${this.data_anggota.id_data_anggota}/SPP/LPKNI/${this.convertMonthToRoman(this.data_anggota.updatedAt)}/${this.data_anggota.updatedAt.split("T")[0].split("-")[0]}`
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);
        const yPosTextSK = 727;
        let xPosText1SK = centerX;
        let xPosText2SK = xPosText1SK + 7;
        // Menggambar text1 dari kanan ke kiri (loop mundur)
        for (let i = SKfirstPart.length - 1; i >= 0; i--) {
          const char = SKfirstPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText1SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2, // misalnya warna yang diinginkan
            font: courierNewFonts, // pastikan font sudah didefinisikan
          });

          // Hitung lebar karakter menggunakan properti font
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);

          // // Gambar garis underline di bawah karakter
          // page.drawLine({
          //   start: { x: currentX, y: yPosTextSK - underlineOffset },
          //   end: { x: currentX + charWidth, y: yPosTextSK - underlineOffset },
          //   thickness: 1.2,
          //   color: textColor2,
          // });

          // Geser posisi x ke kiri sesuai lebar karakter
          xPosText1SK -= charWidth;
        }
        // Menggambar text2 dari kiri ke kanan (loop normal)
        for (let i = 0; i < SKsecondPart.length; i++) {
          const char = SKsecondPart[i];
          // Simpan posisi x karakter saat ini
          const currentX = xPosText2SK;

          // Gambar karakter
          page.drawText(char, {
            x: currentX,
            y: yPosTextSK,
            size: fontSize1,
            color: textColor2,
            font: courierNewFonts,
          });
          // Hitung lebar karakter
          const charWidth = courierNewFonts.widthOfTextAtSize(char, fontSize1);
          // // Gambar garis underline di bawah karakter
          // page.drawLine({
          //   start: { x: currentX, y: yPosTextSK - underlineOffset },
          //   end: { x: currentX + charWidth, y: yPosTextSK - underlineOffset },
          //   thickness: 1.2,
          //   color: textColor2,
          // });
          // Geser posisi x ke kanan sesuai lebar karakter
          xPosText2SK += charWidth;
        }
        // page.drawText(this.data_anggota.daerah.nama_daerah, { x: 418, y: 651.9, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        // page.drawText(this.data_anggota.daerah.nama_daerah + " untuk menyelenggarakan acara atau kegiatan di wilayah hukum LPKNI Cabang", { x: 332, y: 588.5, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        // Menambahkan Jabatan
        const text1 = "Bahwa dalam ikut berpartisipasi dalam membangun perkembangan hukum perlindungan konsumen, Presiden LPKNI Perlu mengangkat Pimpinan dan pengurus LPKNI " + this.data_anggota.daerah.nama_daerah
        const text1line = this.wrapText(text1, 45); // Memecah teks jabatan jika lebih dari 21 karakter
        let text1pos = 700; // Menyesuaikan posisi Y berdasarkan nama
        text1line.forEach((line) => {
          // page.drawText(index === 0 ? "" : "", { x: 200, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // page.drawText(index === 0 ? "" : "", { x: 200, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: 220, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // Jika ada lebih dari satu baris, tambahkan jarak Y
          text1pos -= 15;
        });

        const text2 = "Bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a, Presiden LPKNI perlu untuk mengeluarkan Surat Pengangkatan Pejabat di LPKNI Cabang Kota Malang untuk menyelenggarakan acara atau kegiatan di wilayah hukum LPKNI Cabang " + this.data_anggota.daerah.nama_daerah
        const text2line = this.wrapText(text2, 45); // Memecah teks jabatan jika lebih dari 21 karakter
        let text2pos = 635; // Menyesuaikan posisi Y berdasarkan nama
        text2line.forEach((line) => {
          // page.drawText(index === 0 ? "" : "", { x: 200, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // page.drawText(index === 0 ? "" : "", { x: 200, y: text1pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: 220, y: text2pos, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          // Jika ada lebih dari satu baris, tambahkan jarak Y
          text2pos -= 15;
        });


        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const namaPosx = 68
        page.drawText("Nama", { x: namaPosx, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(":", { x: namaPosx + 60, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(fullName, { x: namaPosx + 100, y: 325, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        const JabatanaPosx = 68
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let jabatanYPosition = 305; // Menyesuaikan posisi Y berdasarkan jabatan

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Jabatan" : "", { x: JabatanaPosx, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: jabatanYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 15;
        });
        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = 285; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat" : "", { x: JabatanaPosx, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          alamatYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0], { x: 420, y: 187, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText("Malang", { x: 420, y: 200, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

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
    },
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
