<template>

  <div class="w-screen h-screen min-h-screen flex flex-col bg-gray-100">
    <NavbarAnggota />
    <div class="flex flex-col items-center justify-center p-10 h-full bg-gray-100 flex-grow">
      <div class="bg-white h-screen w-full max-w-xl p-10 pb-28 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-center mb-4">ID Card Anda</h3>
        <h3 class="text-sm font-semibold text-left mb-4">Jabatan : {{ data_anggota.jabatanStruktural.nama }}</h3>
        <h3 class="text-sm font-semibold text-left mb-4">Tingkat : {{ data_anggota.jabatanStruktural.tingkat }}</h3>
        <div class="w-full h-full" v-if="pdfUrl">
          <embed :src="pdfUrl" type="" class="w-full h-full">
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
        const response = await fetch(`http://192.168.10.2:3000/assets/${PDFName}.pdf`);
        if (!response.ok) {
          throw new Error('PDF not found or failed to load');

        }
        const pdfBuffer = await response.arrayBuffer();
        // Memuat PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);
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
          x: 64.4, // Sesuaikan posisi X
          y: 194, // Sesuaikan posisi Y
          width: 95, // Sesuaikan ukuran gambar
          height: 95, // Sesuaikan ukuran gambar
        });
        // Menambahkan nama lengkap (centering)
        const fullName = this.data_anggota.nama_lengkap.toUpperCase(); // Menggunakan nama dengan huruf besar
        const fullNameWidth = this.calculateTextWidth(fullName, 19);
        const pageWidth = page.getWidth();
        // Tentukan posisi X agar nama tetap berada di tengah
        let nameXPosition = (pageWidth - fullNameWidth) / 2;
        var fontpanjang = false;
        // Jika nama lebih panjang dari 30 karakter, geser ke kiri
        if (fullName.length > 20 && fullName.length < 25) {
          nameXPosition = 25; // Geser ke kiri agar tidak terlalu panjang
        } else if (fullName.length > 5 && fullName.length < 12) {
          nameXPosition = 90
        }
        else if (fullName.length <= 5) {
          nameXPosition = 95
        } else if (fullName.length > 25) {
          nameXPosition = 13
          fontpanjang = true
        }
        // Pecah nama menjadi beberapa baris jika panjangnya lebih dari 30 karakter
        const nameLines = this.wrapText(fullName, 30);
        let nameYPosition = 172; // Posisi Y nama
        nameLines.forEach((line) => {
          page.drawText(line, { x: nameXPosition, y: nameYPosition, size: fontpanjang ? 10 : 12, color: rgb(1, 1, 1) });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          nameYPosition -= 1;
        });
        // Menambahkan ID
        page.drawText("ID", { x: 22, y: 140, size: 12, color: rgb(1, 1, 1) });
        page.drawText(":", { x: 75, y: 140, size: 12, color: rgb(1, 1, 1) });
        page.drawText(this.kode_idcard, { x: 85, y: 139, size: 12, color: rgb(1, 1, 1) });

        // Menambahkan Jabatan
        const jabatan = this.data_anggota.jabatanStruktural.nama.toUpperCase()
        const jabatanLines = this.wrapText(jabatan, 18); // Memecah teks jabatan jika lebih dari 21 karakter
        let jabatanYPosition = nameYPosition - 50; // Menyesuaikan posisi Y berdasarkan nama

        jabatanLines.forEach((line, index) => {
          page.drawText(index === 0 ? "JABATAN" : "", { x: 20, y: jabatanYPosition, size: 10, color: rgb(1, 1, 1) });
          page.drawText(index === 0 ? ":" : "", { x: 75, y: jabatanYPosition, size: 10, color: rgb(1, 1, 1) });
          page.drawText(line, { x: 85, y: jabatanYPosition, size: 10, color: rgb(1, 1, 1) });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          jabatanYPosition -= 15;
        });

        // Menambahkan Alamat
        const alamat = this.data_anggota.alamat.toUpperCase();
        const alamatLines = this.wrapText(alamat, 21); // Memecah teks alamat jika lebih dari 21 karakter
        let alamatYPosition = jabatanYPosition - 0; // Menyesuaikan posisi Y berdasarkan jabatan

        alamatLines.forEach((line, index) => {
          page.drawText(index === 0 ? "ALAMAT" : "", { x: 20, y: alamatYPosition, size: 10, color: rgb(1, 1, 1) });
          page.drawText(index === 0 ? ":" : "", { x: 75, y: alamatYPosition, size: 10, color: rgb(1, 1, 1) });
          page.drawText(line, { x: 85, y: alamatYPosition, size: 10, color: rgb(1, 1, 1) });

          // Jika ada lebih dari satu baris, tambahkan jarak Y
          alamatYPosition -= 15;
        });
        page.drawText(this.tanggalBergabung.split('T')[0].split('-')[0], { x: 100, y: 10, size: 12, color: rgb(1, 1, 1) });

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
