<template>
  <div>
    <NavbarAdmin />
    <div class="bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-8">
      <!-- Dashboard Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">📋 DATA PENDAFTARAN ANGGOTA
        </h1>
        <button
          class="w-full md:w-auto flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
          <i class="fas fa-file-csv mr-2"></i> Export CSV
        </button>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
        <!-- Filters -->
        <div class="flex justify-between items-center p-4 border-b bg-gray-50">
          <div class="flex space-x-4">
            <select class="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200">
              <option value="100">Show 100</option>
              <option value="50">Show 50</option>
              <option value="25">Show 25</option>
            </select>
            <select class="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200">
              <option value="all">Semua Data</option>
              <option value="science">Provinsi</option>
              <option value="arts">Kota Kabupaten</option>
            </select>
          </div>
          <div class="flex items-center space-x-4 relative">
            <i class="fas fa-search absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input type="text"
              class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 w-64"
              placeholder="Cari Anggota" />
          </div>

        </div>

        <!-- Table -->
        <table class="min-w-full table-auto border-collapse">
          <thead class="bg-red-500 text-white">
            <tr>
              <th class="px-4 py-3 border text-left">No.</th>
              <th class="px-4 py-3 border text-left">Nama Lengkap</th>
              <th class="px-4 py-3 border text-left">Alamat Lengkap</th>
              <th class="px-4 py-3 border text-left">NIK</th>
              <th class="px-4 py-3 border text-left">Tempat Lahir</th>
              <th class="px-4 py-3 border text-left">Tanggal Lahir</th>
              <th class="px-4 py-3 border text-left">Pekerjaan</th>
              <th class="px-4 py-3 border text-left">Agama</th>
              <th class="px-4 py-3 border text-left">Provinsi</th>
              <th class="px-4 py-3 border text-left">Kota/Kab</th>
              <th class="px-4 py-3 border text-center">3x4 Foto</th>
              <th class="px-4 py-3 border text-center">KTP Foto</th>
              <th class="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Dynamic Data Rows -->
            <tr v-for="(anggota, index) in listDataAnggota" :key="index"
              class="text-gray-700 hover:bg-gray-100 transition" :class="{ 'bg-gray-50': index % 2 === 0 }">
              <td class="px-4 py-3 border">{{ index + 1 }}</td>
              <td class="px-4 py-3 border">{{ anggota.nama_lengkap }}</td>
              <td class="px-4 py-3 border">{{ anggota.alamat }}</td>
              <td class="px-4 py-3 border">{{ anggota.nik }}</td>
              <td class="px-4 py-3 border">{{ anggota.tempatLahir }}</td>
              <td class="px-4 py-3 border">{{ anggota.tanggalLahir.split('T')[0] }}</td>
              <td class="px-4 py-3 border">{{ anggota.pekerjaan }}</td>
              <td class="px-4 py-3 border">{{ anggota.agama }}</td>
              <td class="px-4 py-3 border">{{ anggota.wilayah.nama_wilayah }}</td>
              <td class="px-4 py-3 border">{{ anggota.daerah.nama_daerah }}</td>
              <td class="px-4 py-3 border text-center">
                <img :src="getFullPathImage(anggota.imageUsers[0].imageUrl)" alt="Foto"
                  class="w-12 h-12 object-cover rounded-md shadow-md mx-auto cursor-pointer"
                  @click="openImagePreview(anggota.imageUsers[0].imageUrl, 'Foto')" />
              </td>

              <!-- Kolom KTP -->
              <td class="px-4 py-3 border text-center">
                <img :src="getFullPathImage(anggota.imageUsers[0].imageUrl)" alt="KTP"
                  class="w-12 h-12 object-cover rounded-md shadow-md mx-auto cursor-pointer"
                  @click="openImagePreview(anggota.imageUsers[0].imageUrl, 'KTP')" />
              </td>

              <!-- Kolom Aksi -->
              <td class="px-4 py-3 border text-center">
                <button class="text-blue-500 hover:text-blue-700 font-semibold">Setujui</button> |
                <button class="text-red-500 hover:text-red-700 font-semibold">Tolak</button>
              </td>
            </tr>
          </tbody>
        </table>
        <transition name="fade">
          <div v-if="imagePreview" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div class="bg-white p-4 rounded-lg shadow-lg relative">
              <h2 class="text-center font-semibold mb-2">{{ imageTitle }}</h2>
              <img :src="imagePreview" class="max-w-full max-h-[80vh] rounded-lg" />

              <!-- Tombol Tutup -->
              <button @click="imagePreview = null"
                class="absolute top-5 right-4 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
                X
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import api from "@/service/api";

export default {
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      imageTitle: "",
      imagePreview: null,
      listDataAnggota: [
      ]
    };
  },
  mounted() {
    this.GetAllAnggota()
  },
  methods: {
    getFullPathImage(img) {
      return api.getfullpathImage(img)
    },
    GetAllAnggota() {
      api.getAllUserData().then((response) => {
        this.listDataAnggota = response.data
        console.log(this.listDataAnggota)
        this.$toast.success('Berhasil mengambil Data Anggota')
      }).catch(() => {
        this.$toast.error('Gagal mengambil Data Anggota')
      })
    },
    openImagePreview(imageUrl, title) {
      this.imagePreview = this.getFullPathImage(imageUrl);
      this.imageTitle = title;
    }
  }
};
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
