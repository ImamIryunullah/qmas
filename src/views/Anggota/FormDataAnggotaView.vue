<template>
  <div class="bg-gray-100 min-h-screen flex justify-center items-center p-6 ml-12">
    <div class="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl">
      <NavbarAnggota />
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
                {{ wilayah.kode_wilayah + " - " + wilayah.nama_wilayah }}
              </option>
            </select>
          </div>

          <!-- Kota / Kabupaten -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Kota / Kabupaten</label>
            <select v-model="userData.daerahId" :disabled="userData.wilayahId === 0"
              @change="getJabatanBywilayahAndDaerah(userData.wilayahId, userData.daerahId)"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required>
              <option :value="0" selected disabled>Pilih Daerah</option>
              <option v-for="daerah in daerahList" :key="daerah.id_daerah" :value="daerah.id_daerah">
                {{ daerah.kode_daerah + " - " + daerah.nama_daerah }}
              </option>
            </select>
          </div>


          <!-- Tingkat -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Tingkat</label>
            <select v-model="userData.jabatanStruktural.tingkat" :disabled="!userData.daerahId"
              @change="filterJabatanTingkat()"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required>
              <option disabled hidden :value="''">Pilih Tingkat</option>
              <option value="Wilayah">Wilayah</option>
              <option value="Daerah">Daerah</option>
            </select>
          </div>
          <!-- Jabatan -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Jabatan</label>
            <select v-model="userData.jabatanStrukturalId" :disabled="!userData.daerahId"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
              required>
              <option disabled hidden :value="0">Pilih Jabatan</option>
              <option v-for="jabatan in filterJabatanList" :key="jabatan.id" :value="jabatan.id">{{ jabatan.wilayah &&
                !jabatan.daerah ?
                jabatan.wilayah.kode_wilayah + " - " + jabatan.nama : jabatan.daerah.kode_daerah + " - " + jabatan.nama
                }}
              </option>
            </select>
          </div>

          <!-- Upload Foto KTP -->
          <!-- File Uploads (e.g., KTP, SIUP, NPWP) -->
          <div v-for="(image, index) in imageInputs" :key="index">
            <label class="text-sm text-gray-500 font-bold">{{ image.keterangan }}</label>
            <input :required="image.required" type="file" @change="handleFileUpload($event, index)"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105" />
            <img v-if="imageUsers[index]"
              :src="dataLengkap ? getFullpathImage(imageUsers[index].imageUrl) : imageUsers[index]" alt="uploaded"
              @click="openLightbox(index)" class="w-40 h-auto items-start object-contain rounded-lg shadow-md mt-4">
          </div>
          <!-- Submit Button -->

        </div>
        <button type="submit"
          class="mt-6 w-full bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">
          {{ !isLoading ? 'Submit Data' : 'Loading..' }}
        </button>
      </form>
    </div>
    <vue-easy-lightbox :visible="lightboxVisible" :imgs="dataLengkap ? imageUrl : imageUsers" :index="lightboxIndex"
      @hide="lightboxVisible = false" />
  </div>

</template>


<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import ApiService from '@/service/lpkni.js';
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
  components: {
    NavbarAnggota,
    VueEasyLightbox
  },
  data() {
    return {
      dataLengkap: false,
      userData: {
        id_data_anggota: 0,
        userId: null,
        daerahId: 0,
        daerah: {
          id_daerah: null,
          nama_daerah: "",
          kode_daerah: "",
        },
        wilayahId: 0,
        wilayah: {
          id_wilayah: null,
          nama_wilayah: "",
          kode_wilayah: "",
        },
        jabatanStrukturalId: 0,
        jabatanStruktural: {
          id: null,
          nama: "",
          maksimumAnggota: null,
          tingkat: ''
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
        status_pembayaran: false,
        file: [],
        folder: [],
      },
      user: {},
      imageInputs: [
        { folder: 'foto-ktp', keterangan: "Foto KTP", required: true },
        { folder: 'pas-foto', keterangan: "Foto 3x4", required: false },
      ],
      imageUsers: [],
      imageUrl: [],
      jabatanList: [],
      filterJabatanList: [],
      daerahList: [],
      wilayahList: [], // To store the list of provinces
      isLoading: false,// Adding loading state
      lightboxIndex: 0,
      lightboxVisible: false,
    };
  },
  computed: {
  }
  ,
  mounted() {
    this.GetUser();
    this.fetchWilayah();
    // this.GetJabatan();
  },
  methods: {
    handleFileUpload(event, index) {
      const file = event.target.files[0];
      if (file) {
        this.userData.file[index] = file
        this.userData.folder[index] = this.imageInputs[index].folder
        this.imageUsers[index] = URL.createObjectURL(file);
      }
    },
    openLightbox(index) {
      if (this.dataLengkap)
        this.imageUrl = this.imageUsers.map(image => this.getFullpathImage(image.imageUrl)); // Menyiapkan array URL gambar
      this.lightboxIndex = index;
      this.lightboxVisible = true; // Menampilkan lightbox
    },
    getFullpathImage(img) {
      return ApiService.getfullpathImage(img)
    },
    filterJabatanTingkat() {
      const filteredJabatan = this.jabatanList.filter(jabatan =>
        jabatan.tingkat === this.userData.jabatanStruktural.tingkat);
      this.filterJabatanList = filteredJabatan
    },
    async GetDaerahByWilayahId(id) {
      if (!this.dataLengkap) {
        this.userData.daerahId = 0
        this.userData.jabatanStrukturalId = 0
      }
      await ApiService.getDaerahByWilayahId(id).then((response) => {
        this.daerahList = response.data;
      }).catch(() => {
      })
    },
    async fetchWilayah() {
      await ApiService.getAllWilayah().then((res) => {
        this.wilayahList = res.data
      }).catch(() => {

      })
    },
    async GetUser() {
      await ApiService.getUserData().then(async (response) => {
        this.user = response.data.user
        if (response.data.data_anggota.userId === 0) {
          this.dataLengkap = false;
          this.$toast.info('Lengkapi Data Diri!', { duration: 1000 })
        } else {
          this.dataLengkap = true;
          if (!this.userData.status_pembayaran) {
            this.$toast.info('Harap Melakukan Pembayaran!', { duration: 1000 })
          }
          this.userData.tanggalLahir = this.userData.tanggalLahir.split('T')[0]
          this.$toast.info(`Status : ${this.userData.status}`, { duration: 1000 })
          this.$toast.success('Data Diri Lengkap!', { duration: 1000 })
        }
        this.userData.userId = this.user.id_user;
        if (this.user.nama_belakang) { this.userData.nama_lengkap = `${this.user.nama_depan} ${this.user.nama_belakang}` }
        else { this.userData.nama_lengkap = this.user.nama_depan }
        if (this.dataLengkap) {
          this.userData = response.data.data_anggota
          this.imageUsers = response.data.data_anggota.imageUsers
          await this.GetDaerahByWilayahId(this.userData.wilayahId)
          await this.getJabatanBywilayahAndDaerah(this.userData.wilayahId, this.userData.daerahId)
          this.filterJabatanList = this.jabatanList
        }
        console.log(this.userData)
      }).catch((error) => {
        console.log(error)
      })
    },
    async GetJabatanByWilayahId(id) {
      if (!this.dataLengkap)
        this.userData.jabatanStrukturalId = 0
      await ApiService.GetJabatanByWilayahId(id).then((res) => {
        this.jabatanList = res.data
      }).catch((error) => {
        console.log(error)
      })

    },
    async getJabatanBywilayahAndDaerah(id_wilayah, id_daerah) {
      if (!this.dataLengkap)
        this.userData.jabatanStrukturalId = 0
      await ApiService.GetJabatanByWilayahDaerahId(id_wilayah, id_daerah).then((res) => {
        this.jabatanList = res.data
      }).catch((error) => {
        console.log(error)
      })

    },
    async SubmitData() {
      this.isLoading = true;
      const forms = {
        daerahId: this.userData.daerahId,
        wilayahId: this.userData.wilayahId,
        jabatanStrukturalId: this.userData.jabatanStrukturalId,
        nama_lengkap: this.userData.nama_lengkap,
        alamat: this.userData.alamat,
        tanggalLahir: this.userData.tanggalLahir,
        tempatLahir: this.userData.tempatLahir,
        nik: this.userData.nik,
        pekerjaan: this.userData.pekerjaan,
        statusPerkawinan: this.userData.statusPerkawinan,
        agama: this.userData.agama,
        file: this.userData.file,
        keterangan: this.userData.folder,
      }
      try {
        this.isLoading = true;
        const response = await ApiService.CreateDataUserImage(forms);
        console.log(response)
        this.$toast.success('Berhasil Menambahkan Data!');
        this.$router.push(this.$route.path);
      } catch (error) {
        this.$toast.error('Gagal Menambahkan Data!');
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