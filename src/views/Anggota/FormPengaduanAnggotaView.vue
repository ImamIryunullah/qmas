<template>
  <NavbarAnggota />
  <div class="p-10 w-full h-full flex flex-col bg-gray-100">
    <div class="flex flex-col items-center p-6 bg-gray-100 flex-grow mt-10">
      <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg animate-fadeInUp">
        <h2
          class="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-10">
          Form Pengaduan
        </h2>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Nama Pengadu -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="nama" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Nama
              Pengadu</label>
            <input id="nama" v-model="form.nama" type="text" class="input-field w-full sm:w-2/3"
              placeholder="Nama Pengadu" />
          </div>

          <!-- Email -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="email" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Email</label>
            <input id="email" v-model="form.email" type="email" class="input-field w-full sm:w-2/3"
              placeholder="Email Anda" />
          </div>

          <!-- Wilayah -->
          <!-- Provinsi -->
          <div class="flex items-center space-x-4 mb-4">
            <label class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Provinsi</label>
            <select v-model="form.wilayahId" @change="GetDaerahByWilayahId(form.wilayahId)"
              class="input-field w-full sm:w-2/3">
              <option :value=null selected disabled>Pilih Wilayah</option>
              <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah.id_wilayah">
                {{ wilayah.kode_wilayah + " " + wilayah.nama_wilayah }}
              </option>
            </select>
          </div>

          <!-- Kota / Kabupaten -->
          <div class="flex items-center space-x-4 mb-4">
            <label class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Kota / Kabupaten</label>
            <select v-model="form.daerahId" :disabled="form.wilayahId === 0" class="input-field w-full sm:w-2/3">
              <option :value=null disabled hidden>Pilih Daerah</option>
              <option v-for="daerah in daerahList" :key="daerah.id_daerah" :value="daerah.id_daerah">
                {{ daerah.kode_daerah + " " + daerah.nama_daerah }}
              </option>
            </select>
          </div>
          <div class="flex items-center space-x-4 mb-4">
            <label for="koordinat" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Koordinat :
              lat,long</label>

            <label class="input-field w-full sm:w-2/3" placeholder="Kota atau Kabupaten"> {{
              location ?
                `${location.latitude} , ${location.longitude}` : error
            }}
            </label>
          </div>

          <!-- Kategori Pengaduan -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="kategori" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Kategori
              Pengaduan</label>
            <select id="kategori" v-model="form.kategori" class="input-field w-full sm:w-2/3">
              <option disabled value="">Pilih Kategori</option>
              <option value="Layanan Pendidikan">Layanan Pendidikan</option>
              <option value="Sertifikasi">Sertifikasi</option>
              <option value="Fasilitas">Fasilitas</option>
              <option value="Masalah Administrasi">Masalah Administrasi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <!-- Judul Pengaduan -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="judul" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Judul
              Pengaduan</label>
            <input id="judul" v-model="form.judul" type="text" class="input-field w-full sm:w-2/3"
              placeholder="Judul Pengaduan" />
          </div>

          <!-- Deskripsi Pengaduan -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="deskripsi" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Deskripsi
              Pengaduan</label>
            <textarea id="deskripsi" v-model="form.deskripsi" class="input-field w-full sm:w-2/3"
              placeholder="Jelaskan pengaduan Anda" rows="4"></textarea>
          </div>

          <!-- Lampiran -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="lampiran" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Lampiran
              / Bukti</label>
            <input id="lampiran" type="file" @change="handleFileUpload" class="input-field w-full sm:w-2/3" multiple />

          </div>


          <!-- Harapan Penyelesaian -->
          <div class="flex items-center space-x-4 mb-4">
            <label for="harapan" class="block text-sm font-semibold text-red-700 w-full sm:w-1/3">Harapan
              Penyelesaian</label>
            <input id="harapan" v-model="form.harapan" type="text" class="input-field w-full sm:w-2/3"
              placeholder="Harapan Penyelesaian" />
          </div>

          <!-- Tindak Lanjut -->
          <div class="flex items-center space-x-4 mb-4">
            <input type="checkbox" id="publish" v-model="form.publish" class="mr-2" />
            <label for="publish" class="text-sm font-semibold text-red-700">Apakah Bisa Kami
              Publish?</label>
          </div>

          <!-- Submit Button -->
          <button type="submit"
            class="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105">
            Kirim Pengaduan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import api from '@/service/api';
import axios from "axios";

export default {
  components: {
    NavbarAnggota
  },
  data() {
    return {
      form: {
        nama: '',
        email: '',
        wilayahId: '',
        daerahId: '',
        kategori: '',
        judul: '',
        deskripsi: '',
        harapan: '',
      },
      wilayahList: [],
      daerahList: [],
      fileName: '',
      file: null
    };
  },
  mounted() {
    this.getAllWilayah()
  },
  methods: {
    GetDaerahByWilayahId(id) {
      api.getDaerahByWilayahId(id).then((response) => {
        this.daerahList = response.data;
      }).catch((error) => {
        console.error(error);
      })
    },
    async getAllWilayah() {
      try {
        const response = await api.getAllWilayah();
        this.wilayahList = response.data.data
        console.log(this.wilayahList)
      } catch (error) {
        console.log(error)
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.file = file;
      }
    },
    submitForm() {
      const formData = new FormData();
      formData.append('nama', this.form.nama);
      formData.append('email', this.form.email);
      formData.append('wilayah', this.form.wilayah);
      formData.append('daerah', this.form.daerah);
      formData.append('kategori', this.form.kategori);
      formData.append('judul', this.form.judul);
      formData.append('deskripsi', this.form.deskripsi);
      formData.append('harapan', this.form.harapan);

      if (this.file) {
        formData.append('lampiran', this.file);
      }
      axios.post('http://192.168.1.11:5000/pengaduan', formData)
        .then(response => {
          console.log(response);
          alert("Pengaduan Anda telah dikirimkan.");
          this.$router.push('/');
        })
        .catch(error => {
          console.error("Error:", error.response ? error.response.data : error.message);
          alert("Terjadi kesalahan saat mengirim pengaduan.");
        });
    }
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.input-field {
  @apply p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03a980];
  transition: all 0.3s ease-in-out;
}

button:hover {
  transition: all 0.3s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .input-field {
    padding-left: 16px;
    padding-right: 16px;
  }

  .w-full {
    width: 100% !important;
  }
}
</style>