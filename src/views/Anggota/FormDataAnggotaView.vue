<template>
  <div>
    <NavbarAnggota />
  </div>
  <div class="w-full h-full bg-gray-100 flex justify-center items-center animate-fadeInUp p-10">

    <div class="w-full  max-w-screen-md bg-white p-10 rounded-lg shadow-2xl border border-gray-200">
      <h2
        class="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-8">
        Data Diri
      </h2>

      <form @submit.prevent="SubmitData">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <!-- Nama Lengkap -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Nama Lengkap</label>
            <input v-model="userData.nama_lengkap" type="text" placeholder="Nama Lengkap"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required />
          </div>

          <!-- Alamat Lengkap -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Alamat Lengkap</label>
            <input v-model="userData.alamat" type="text" placeholder="Alamat Lengkap"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required />
          </div>

          <!-- NIK -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Nomor Induk Kependudukan</label>
            <input v-model="userData.nik" type="number" placeholder="NIK"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required />
          </div>

          <!-- Tempat Lahir -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Tempat Lahir</label>
            <input v-model="userData.tempatLahir" type="text" placeholder="Tempat Lahir"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required />
          </div>

          <!-- Tanggal Lahir -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Tanggal Lahir</label>
            <input v-model="userData.tanggalLahir" type="date" placeholder="Tanggal Lahir"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required />
          </div>

          <!-- Pekerjaan -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Pekerjaan</label>
            <input v-model="userData.pekerjaan" type="text" placeholder="Pekerjaan"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required />
          </div>

          <!-- Status Kawin -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Status Kawin</label>
            <select v-model="userData.statusPerkawinan"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2">
              <option value="" disabled>Pilih Status Kawin</option>
              <option value="Kawin">Kawin</option>
              <option value="Belum Kawin">Belum Kawin</option>
              <option value="Cerai Hidup">Cerai Hidup</option>
              <option value="Cerai Mati">Cerai Mati</option>
            </select>
          </div>

          <!-- Agama -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Agama</label>
            <select v-model="userData.agama"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2">
              <option value="" disabled>Pilih Agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen Protestan">Kristen Protestan</option>
              <option value="Kristen Katholik">Kristen Katholik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>

          <!-- Provinsi -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Provinsi</label>
            <select v-model="userData.wilayahId" @change="GetDaerahByWilayahId(userData.wilayahId)"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required>
              <option :value="0" selected disabled>Pilih Wilayah</option>
              <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah.id_wilayah">
                {{ wilayah.kode_wilayah + " " + wilayah.nama_wilayah }}
              </option>
            </select>
          </div>

          <!-- Kota / Kabupaten -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Kota / Kabupaten</label>
            <select v-model="userData.daerahId" :disabled="userData.wilayahId === 0"
              @change="GetJabatanByDaerahId(userData.daerahId)"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required>
              <option :value="0" disabled hidden>Pilih Daerah</option>
              <option :value=null>Anggota Wilayah</option>
              <option v-for="daerah in daerahList" :key="daerah.id_daerah" :value="daerah.id_daerah">
                {{ daerah.kode_daerah + " " + daerah.nama_daerah }}
              </option>
            </select>
          </div>


          <!-- Jabatan -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Jabatan</label>
            <select v-model="userData.jabatanStrukturalId"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required>
              <option disabled hidden :value="0">Pilih Jabatan</option>
              <option v-for="jabatan in jabatanList" :key="jabatan.id" :value="jabatan.id">{{ jabatan.wilayah &&
                !jabatan.daerah ?
                jabatan.wilayah.kode_wilayah + " " + jabatan.nama : jabatan.daerah.kode_daerah + " " + jabatan.nama }}
              </option>
            </select>
          </div>

          <!-- Upload Foto 3x4 -->

          <div class="">
            <label class="text-sm text-gray-500 font-bold mb-2">Detail Jabatan:</label>
            <input v-model="userData.jabatanStrukturalId" type="text" disabled
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105"
              required />
          </div>

          <!-- Upload Foto KTP -->
          <div class="">
            <label class="text-sm text-gray-500 font-bold">Upload Foto 3x4:</label>
            <input v-if="!userData.imageUsers" type="file" @change="handleFoto3x4Upload"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105"
              required />
            <img v-else :src="getFullpathImage(userData.imageUsers[0].imageUrl)" alt="KTP"
              class="w-full h-auto max-w-xs mx-auto rounded-lg shadow-md mt-4">
          </div>
          <!-- Upload Foto KTP -->
          <div class="">
            <label class="text-sm text-gray-500 font-bold">Upload Foto KTP:</label>
            <input v-if="!userData.imageUsers" type="file" @change="handleKtpUpload"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105"
              required />
            <img v-else :src="getFullpathImage(userData.imageUsers[1].imageUrl)" alt="KTP"
              class="w-full h-auto max-w-xs mx-auto rounded-lg shadow-md mt-4">
          </div>
          <!-- Submit Button -->

        </div>
        <button type="submit"
          class="mt-6 w-full bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">
          {{ !isLoading ? 'Submit Data' : 'Loading..' }}
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import ApiService from '@/service/api.js';

export default {
  components: {
    NavbarAnggota
  },
  data() {
    return {
      userData: {
        id_data_anggota: null,
        userId: null,
        daerahId: null,
        daerah: {
          id_daerah: null,
          nama_daerah: "",
          kode_daerah: "",
        },
        wilayahId: '',
        wilayah: {
          id_wilayah: null,
          nama_wilayah: "",
          kode_wilayah: "",
        },
        jabatanStrukturalId: null,
        jabatanStruktural: {
          id: null,
          nama: "",
          maksimumAnggota: null,
        },
        nama_lengkap: "",
        alamat: "",
        tanggalLahir: "",
        nik: "",
        tempatLahir: "",
        pekerjaan: "",
        statusPerkawinan: "",
        agama: "",
        status: "",
        foto3x4: null,
        fotoKtp: null,
        status_pembayaran: false
      },
      user: {},
      jabatanList: [],
      daerahList: [],
      wilayahList: [], // To store the list of provinces
      isLoading: false // Adding loading state
    };
  },
  computed: {

  },
  mounted() {
    this.GetUser();
    this.fetchWilayah();

    // this.GetJabatan();
  },
  methods: {
    getFullpathImage(img) {
      return ApiService.getfullpathImage(img)
    },
    handleFoto3x4Upload(event) {
      const file = event.target.files[0];
      if (file) {
        this.userData.foto3x4 = file;
      }
    },
    handleKtpUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.userData.fotoKtp = file;
      }
    },
    async GetDaerahByWilayahId(id) {
      this.userData.daerahId = 0
      await ApiService.getDaerahByWilayahId(id).then((response) => {
        this.daerahList = response.data;
        this.GetJabatanByWilayahId(id)
      }).catch((error) => {
        console.error(error);
      })
    },
    async fetchWilayah() {
      await ApiService.getAllWilayah().then((res) => {
        this.wilayahList = res.data
      }).catch(() => {

      })
    },
    async GetUser() {
      await ApiService.getUserData().then((response) => {
        this.user = response.data.user
        this.userData = response.data.data_anggota
        if (this.userData.nama_lengkap === '') {
          this.$toast.info('Lengkapi Data Diri!', { duration: 1000 })
          this.userData.daerahId = null
        } else {
          if (!this.userData.status_pembayaran) {
            this.$toast.info('Harap Melakukan Pembayaran!', { duration: 1000 })
          }
          this.userData.tanggalLahir = this.userData.tanggalLahir.split('T')[0]
          this.$toast.info(`Status : ${this.userData.status}`, { duration: 1000 })
          this.$toast.success('Data Diri Lengkap!', { duration: 1000 })
          this.GetDaerahByWilayahId(this.userData.wilayah.id_wilayah)

        }

        this.userData.userId = this.user.id_user;
        if (this.user.nama_belakang) { this.userData.nama_lengkap = `${this.user.nama_depan} ${this.user.nama_belakang}` }
        else { this.userData.nama_lengkap = this.user.nama_depan }


      }).catch((error) => {
        console.log(error)
      })
    },
    async GetJabatanByWilayahId(id) {
      this.userData.jabatanStrukturalId = 0
      await ApiService.GetJabatanByWilayahId(id).then((res) => {
        this.jabatanList = res.data
      }).catch((error) => {
        console.log(error)
      })
      console.log(this.jabatanList)
    },
    async GetJabatanByDaerahId(id) {
      this.userData.jabatanStrukturalId = 0
      console.log(id)
      if (id === 0 || id === null) {
        this.GetJabatanByWilayahId(this.userData.wilayahId)
      } else {
        await ApiService.GetJabatanByDaerahId(id).then((res) => {
          this.jabatanList = res.data
        }).catch((error) => {
          console.log(error)
        })
      }
      console.log(this.jabatanList)

    },
    async SubmitData() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("userId", this.userData.userId);
      formData.append("daerahId", this.userData.daerahId);
      formData.append("wilayahId", this.userData.wilayahId);
      formData.append("jabatanStrukturalId", this.userData.jabatanStrukturalId);
      formData.append("nama_lengkap", this.userData.nama_lengkap);
      formData.append("alamat", this.userData.alamat);
      formData.append("tanggalLahir", this.userData.tanggalLahir);
      formData.append("nik", this.userData.nik);
      formData.append("tempatLahir", this.userData.tempatLahir);
      formData.append("pekerjaan", this.userData.pekerjaan);
      formData.append("statusPerkawinan", this.userData.statusPerkawinan);
      formData.append("agama", this.userData.agama);
      formData.append("status", "PENDING");

      if (this.userData.foto3x4) {
        formData.append("fileFoto3x4", this.userData.foto3x4);
        formData.append("keteranganFoto3x4", "Foto 3x4");
      }
      if (this.userData.fotoKtp) {
        formData.append("fileFotoKtp", this.userData.fotoKtp);
        formData.append("keteranganFotoKtp", "Foto KTP");
      }
      try {
        this.isLoading = true;
        const response = await ApiService.CreateDataUserImage(formData);
        console.log(response)
        this.$toast.success('Berhasil Menambahkan Data!');
        this.$router.push(this.$route.path);
      } catch (error) {
        console.error("Pendaftaran gagal:", error);
        alert("Pendaftaran gagal. Silakan coba lagi.");
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
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
</style>