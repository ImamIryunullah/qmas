<template>
  <div class="w-screen bg-gray-100 min-h-screen h-full flex">
    <div class="bg-gray-100 text-white">
      <NavbarAnggota />
    </div>
    <div class="flex-1 flex justify-center items-center bg-gray-100 mr-6 mt-20 mb-12">
      <div
        class="justify-center items-center w-full h-full min-h-screen max-w-2xl bg-white p-6 rounded-lg shadow-xl animate-fadeInUp mt-12 mb-12">
        <div class="text-center mb-8">
          <h2
            class="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-black to-black mb-4 flex items-center justify-center space-x-2">
            <i class="fas fa-user-circle text-3xl text-black mt-2"></i>
            <span>Data Diri</span>
          </h2>

          <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto justify">
            Informasi ini diperlukan untuk melengkapi data Anda dan memastikan kelengkapan proses verifikasi.
          </p>
        </div>
        <form @submit.prevent="dataLengkap ? UpdatData() : SubmitData()">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="text-sm text-gray-500 font-bold">Nama Lengkap</label>
              <input v-model="userData.nama_lengkap" type="text" placeholder="Nama Lengkap"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required />
            </div>
            <div>
              <label class="text-sm text-gray-500 font-bold">Alamat Lengkap</label>
              <input v-model="userData.alamat" type="text" placeholder="Alamat Lengkap"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required />
            </div>
            <div>
              <label class="text-sm text-gray-500 font-bold">Nomor Induk Kependudukan</label>
              <input v-model="userData.nik" type="number" placeholder="NIK"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required />
            </div>


            <div>
              <label class="text-sm text-gray-500 font-bold">Tempat Lahir</label>
              <input v-model="userData.tempatLahir" type="text" placeholder="Tempat Lahir"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required />
            </div>


            <div>
              <label class="text-sm text-gray-500 font-bold">Tanggal Lahir</label>
              <input v-model="userData.tanggalLahir" type="date" placeholder="Tanggal Lahir"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required />
            </div>


            <div>
              <label class="text-sm text-gray-500 font-bold">Pekerjaan</label>
              <input v-model="userData.pekerjaan" type="text" placeholder="Pekerjaan"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required />
            </div>


            <div>
              <label class="text-sm text-gray-500 font-bold">Status Kawin</label>
              <select v-model="userData.statusPerkawinan" required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2">
                <option value="" disabled>Pilih Status Kawin</option>
                <option value="Kawin">Kawin</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>


            <div>
              <label class="text-sm text-gray-500 font-bold">Agama</label>
              <select v-model="userData.agama"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required>
                <option value="" disabled>Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen Protestan">Kristen Protestan</option>
                <option value="Kristen Katholik">Kristen Katholik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>


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



            <div>
              <label class="text-sm text-gray-500 font-bold">Tingkat</label>
              <select v-model="userData.jabatanStruktural.tingkat" :disabled="!userData.daerahId"
                @change="filterJabatanTingkat()"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required>
                <option disabled hidden :value="''">Pilih Tingkat</option>
                <option value="Pusat">Pusat</option>
                <option value="Provinsi">Provinsi</option>
                <option value="Kota/Kab">Kota/Kab</option>
                <option value="Region 1">Region 1</option>
                <option value="Region 2">Region 2</option>
              </select>
            </div>

            <div>
              <label class="text-sm text-gray-500 font-bold">Jabatan</label>
              <select v-model="userData.jabatanStrukturalId" :disabled="!userData.daerahId"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2"
                required>
                <option disabled hidden :value="0">Pilih Jabatan</option>
                <option v-for="jabatan in filterJabatanList" :key="jabatan.id" :value="jabatan.id">{{ jabatan.wilayah &&
                  !jabatan.daerah ?
                  jabatan.wilayah.kode_wilayah + " - " + jabatan.nama : jabatan.daerah.kode_daerah + " - " +
                  jabatan.nama
                  }}
                </option>
              </select>
            </div>
            <div v-for="(image, index) in imageInputs" :key="index">
              <label class="text-sm text-gray-500 font-bold">{{ image.keterangan }}</label>
              <input :required="!UpdateGambar ? image.required : false" type="file"
                @change="handleFileUpload($event, index)"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105" />
              <p class="text-xs text-gray-500 mt-1">Max: 3MB | Format: jpg, jpeg, png</p>
              <img v-if="imageUsers[index]"
                :src="dataLengkap && !UpdateGambar[index] ? getFullpathImage(imageUsers[index].imageUrl) : imageUsers[index]"
                alt="uploaded" @click="openLightbox(index)"
                class="w-40 h-auto items-start object-contain rounded-lg shadow-md mt-4">
            </div>

          </div>
          <div class="items-center justify-center flex">
            <button type="submit"
              class="mt-12 w-1/2 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">
              {{ dataLengkap ? 'Update Data' : 'Submit Data' }}
            </button>
          </div>
        </form>
      </div>
      <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="text-white text-lg">Sedang Memuat...</div>
        <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
      </div>

      <vue-easy-lightbox :visible="lightboxVisible"
        :imgs="dataLengkap && !UpdateGambar.length > 0 ? imageUrl : imageUsers" :index="lightboxIndex"
        @hide="lightboxVisible = false" />
    </div>
  </div>
</template>


<script>
import NavbarAnggota from '@/components/NavbarAnggota.vue';
import lpkni from '@/service/lpkni.js';
import ApiService from '@/service/lpkni.js';
import VueEasyLightbox from 'vue-easy-lightbox';
import Swal from 'sweetalert2';
export default {
  components: {
    NavbarAnggota,
    VueEasyLightbox
  },
  data() {
    return {
      showSuccessModal: false,
      dataLengkap: false,
      UpdateGambar: [],
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
        { folder: 'pas-foto', keterangan: "Foto 3x4", required: true },
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
      const files = event.target.files[0];
      if (!files) {
        this.$toast.error('Tidak ada file yang dipilih!');
        return;
      }
      // Validasi ukuran file
      var sizeInMb = files.size / 1024;
      var sizeLimit = 1024 * 5;
      if (sizeInMb > sizeLimit) {
        this.$toast.error('Ukuran Gambar Terlalu Besar! Maksimal 5MB.');
        return;
      }
      // Validasi tipe file (hanya gambar)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(files.type)) {
        this.$toast.error('Format file tidak didukung! Harap unggah gambar dalam format JPG atau PNG.');
        return;
      }
      if (this.dataLengkap) {
        this.UpdateGambar[index] = true
      }
      if (files) {
        this.userData.file[index] = files
        this.userData.folder[index] = this.imageInputs[index].folder
        this.imageUsers[index] = URL.createObjectURL(files);
      }
    },
    openLightbox(index) {
      if (this.dataLengkap)
        this.imageUrl = this.imageUsers.map(image => this.getFullpathImage(image.imageUrl));
      this.lightboxIndex = index;
      this.lightboxVisible = true;
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
      this.isLoading = true;
      await ApiService.getUserData().then(async (response) => {
        this.user = response.data.user
        if (response.data.data_anggota.userId === 0) {
          this.dataLengkap = false;
          this.showSuccessModal = true;
        } else {
          this.dataLengkap = true;
        }
        this.userData.userId = this.user.id_user;
        if (this.user.nama_belakang) { this.userData.nama_lengkap = `${this.user.nama_depan} ${this.user.nama_belakang}` }
        else { this.userData.nama_lengkap = this.user.nama_depan }
        if (this.dataLengkap) {
          this.userData = response.data.data_anggota
          this.imageUsers = response.data.data_anggota.imageUsers
          this.userData.tanggalLahir = this.userData.tanggalLahir.split('T')[0]
          if (this.userData.status !== "SUCCESS") {
            Swal.fire({
              icon: "info",
              title: "Informasi!",
              text: "Data Belum Terverifikasi, Harap Menyelesaikan Pembayaran.!",
              showConfirmButton: true,
              confirmButtonColor: '#22c55e',
            })
          }
          await this.GetDaerahByWilayahId(this.userData.wilayahId)
          await this.getJabatanBywilayahAndDaerah(this.userData.wilayahId, this.userData.daerahId)
          this.filterJabatanList = this.jabatanList
        }
        console.log(this.userData)
        this.userData.file = []
        this.userData.folder = []
        if (this.showSuccessModal) {
          Swal.fire({
            icon: "warning",
            title: "Informasi!",
            text: "Harap Lengkapi Data Diri Anda!",
            showConfirmButton: true,
            confirmButtonColor: '#22c55e',
          })
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.isLoading = false;
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
      Swal.fire({
        title: "Informasi",
        text: 'Apakah Anda Yakin Data Sudah Benar?',
        showDenyButton: true,
        confirmButtonText: "Ya",
        reverseButtons: false,
        denyButtonText: `Tidak`,
        confirmButtonColor: '#22c55e',
        icon: 'info',

      }).then(async (result) => {
        if (result.isDenied || !result.isConfirmed || result.isDismissed) {
          return
        }
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
        this.isLoading = true;
        try {
          const response = await ApiService.CreateDataUserImage(forms);
          console.log(response)
          Swal.fire({
            icon: "success",
            title: "Informasi!",
            text: "Berhasil Menambahkan Data!",
            confirmButtonColor: '#22c55e',
            showConfirmButton: true,
          })
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Informasi!",
            text: "Gagal Menambahkan Data!",
            confirmButtonColor: '#22c55e',
            showConfirmButton: true,
          })
          console.log(error)
        } finally {
          this.isLoading = false;
        }
      })
    },
    async UpdatData() {
      Swal.fire({
        title: "Informasi",
        text: 'Apakah Anda Yakin ingin Memperbarui Data?',
        showDenyButton: true,
        confirmButtonText: "Ya",
        denyButtonText: `Tidak`,
        confirmButtonColor: '#22c55e',
        icon: 'info',

      }).then(async (result) => {
        if (result.isDenied || !result.isConfirmed || result.isDismissed) {
          return
        }
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

        await lpkni.UpdateDataUserImage(forms).then(() => {
          Swal.fire({
            icon: "success",
            title: "Informasi!",
            text: "Data Berhasil Di Perbarui!",
            confirmButtonColor: '#22c55e',
            showConfirmButton: true,
          })
        }).catch(() => {
          Swal.fire({
            icon: "error",
            title: "Informasi!",
            text: "Gagal Memperbarui Data!",
            confirmButtonColor: '#22c55e',
            showConfirmButton: true,
          })
        }).finally(() => {
          this.isLoading = false;
        })
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