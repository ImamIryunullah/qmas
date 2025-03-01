<template>

  <div class="w-screen h-screen min-h-screen flex flex-col bg-gray-100">
    <NavbarAnggota />
    <div class="flex flex-col items-center justify-center p-10 h-full bg-gray-100 flex-grow">
      <div class="bg-white h-screen w-full max-w-xl p-10 pb-28 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-center mb-4">ID Card Anda</h3>
        <!-- <h3 class="text-sm font-semibold text-left mb-4">Jabatan : {{ data_anggota.jabatanStruktural.nama }}</h3> -->
        <!-- <h3 class="text-sm font-semibold text-left mb-4">Tingkat : {{ data_anggota.jabatanStruktural.tingkat }}</h3> -->
        <div class="w-full h-full" v-if="pdfUrl">
          <!-- <embed :src="pdfUrl" type="" class="w-full h-full"> -->
          <iframe loading="lazy" :src="pdfUrl" class="w-full h-full" frameborder="0"></iframe>
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
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
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
      Kota: ""
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
        this.kode_idcard = this.data_anggota.daerah.kode_daerah + "." + this.data_anggota.id_data_anggota
        this.tanggalBergabung = this.data_anggota.updatedAt
        this.Kota = this.data_anggota.daerah.nama_daerah

        // setTimeout(() => {

        // }, 1000);
        await this.generatePdf();
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
    async generatePdf() {
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
            PDFName = "Provinsi";
            break;
          case "Region 2":
            PDFName = "Kota-Kab";
            break;
          default:
            break;
        }

        console.log(PDFName);
        const response = await fetch(`http://192.168.10.2:3000/assets/${PDFName}.pdf`);
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
        const yPosText1 = 740;
        const fontSize1 = 12;

        let xPosText2 = xPosText1 + 7;
        const yPosText2 = 740;

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

        const NoSK = `060.1/SPP/LPKNI/II/2025`
        const SkIndex = Math.floor(NoSK.length / 2);
        const SKfirstPart = NoSK.substring(0, SkIndex);
        const SKsecondPart = NoSK.substring(SkIndex);
        const yPosTextSK = 725;
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

        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const namaPosx = 68
        page.drawText("Nama", { x: namaPosx, y: 330, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(":", { x: namaPosx + 60, y: 330, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        page.drawText(fullName, { x: namaPosx + 100, y: 330, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        // Menambahkan Jabatan
        // const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const JabatanaPosx = 68
        // page.drawText("Jabatan", { x: JabatanaPosx, y: 310, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        // page.drawText(":", { x: JabatanaPosx + 60, y: 310, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
        // page.drawText(jabatan, { x: JabatanaPosx + 100, y: 310, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 50); // Memecah teks alamat jika lebih dari 21 karakter
        let jabatanYPosition = 310; // Menyesuaikan posisi Y berdasarkan jabatan

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
        let alamatYPosition = 290; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "Alamat" : "", { x: JabatanaPosx, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(index === 0 ? ":" : "", { x: JabatanaPosx + 60, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
          page.drawText(line, { x: JabatanaPosx + 100, y: alamatYPosition, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          alamatYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0], { x: 420, y: 186.5, size: 12, color: rgb(0, 0, 0), font: courierNewFonts, });
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
