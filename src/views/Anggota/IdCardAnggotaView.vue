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
import { PDFDocument, rgb } from 'pdf-lib'; // Import rgb from pdf-lib
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
        this.tanggalBergabung = this.data_anggota.createdAt
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
      const charWidth = fontSize * 0.5; // Perkiraan lebar per karakter
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
        const response = await fetch(`http://192.168.10.2:3000/assets/${PDFName}.pdf` + "?not-from-cache-please");
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
        page.drawText(this.tanggalBergabung.split('T')[0].split('-')[0], { x: 100, y: 30, size: 12, color: rgb(1, 1, 1), font: courierNewFonts });

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
