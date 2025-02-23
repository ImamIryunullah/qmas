<template>
  <div>
    <NavbarAdmin />
    <div class="bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-6">
      <!-- Dashboard Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">📋 DATA PENDAFTARAN ANGGOTA
        </h1>
        <button @click="exportToCSV"
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
        <table class="min-w-full h-full table-auto border-collapse">
          <thead class="bg-red-500 text-white">
            <tr>
              <th class="px-4 py-3 border text-left">Anggota ID</th>
              <th class="px-4 py-3 border text-left">Nama Lengkap</th>
              <th class="px-4 py-3 border text-left">Alamat Lengkap</th>
              <th class="px-4 py-3 border text-left">NIK</th>
              <th class="px-4 py-3 border text-left">Tempat Lahir</th>
              <th class="px-4 py-3 border text-left">Tanggal Lahir</th>
              <th class="px-4 py-3 border text-left">Pekerjaan</th>
              <th class="px-4 py-3 border text-left">Agama</th>
              <th class="px-4 py-3 border text-left">Provinsi</th>
              <th class="px-4 py-3 border text-left">Kota/Kab</th>
              <th class="px-4 py-3 border text-center">Foto KTP</th>
              <th class="px-4 py-3 border text-center">Pas Foto</th>
              <th class="px-4 py-3 border text-center">Status</th>
              <th class="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Dynamic Data Rows -->
            <tr v-for="(anggota, index) in listDataAnggota" :key="index"
              class="text-gray-700 hover:bg-gray-100 transition" :class="{ 'bg-gray-50': index % 2 === 0 }">
              <td class="px-4 py-3 border">{{ anggota.id_data_anggota }}</td>
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
                <div v-if="anggota.imageUsers.length > 0">
                  <img :src="getFullPathImage(anggota.imageUsers[0].imageUrl)" alt="Foto"
                    class="w-12 h-12 object-cover rounded-md shadow-md mx-auto cursor-pointer"
                    @click="openImagePreview(anggota.imageUsers[0].imageUrl, 'Foto')" />
                </div>
                <div v-else>
                  <label for="">Gambar Tidak Tersedia</label>
                </div>
              </td>

              <!-- Kolom KTP -->
              <td class="px-4 py-3 border text-center">
                <div v-if="anggota.imageUsers.length > 0">
                  <img :src="getFullPathImage(anggota.imageUsers[1].imageUrl)" alt="KTP"
                    class="w-12 h-12 object-cover rounded-md shadow-md mx-auto cursor-pointer"
                    @click="openImagePreview(anggota.imageUsers[1].imageUrl, 'KTP')" />
                </div>
                <div v-else>
                  <label for="">Gambar Tidak Tersedia</label>
                </div>

              </td>
              <td class="px-4 py-3 border">{{ anggota.status }}</td>
              <!-- Kolom Aksi -->
              <td class="px-4 py-3 border text-center">
                <button @click="updateStatusAnggota(anggota.id_data_anggota, `SUCCESS`)"
                  class="text-green-500 hover:text-green-700 font-semibold">Setujui</button> |
                <button @click="updateStatusAnggota(anggota.id_data_anggota, `PENDING`)"
                  class="text-yellow-500 hover:text-yellow-700 font-semibold">Pending</button> |
                <button @click="updateStatusAnggota(anggota.id_data_anggota, `CANCEL`)"
                  class="text-red-500 hover:text-red-700 font-semibold">Tolak</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <vue-easy-lightbox :visible="lightboxVisible" :imgs="imagePreview" :index="lightboxIndex"
      @hide="lightboxVisible = false" />
  </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import api from "@/service/lpkni";
import VueEasyLightbox from 'vue-easy-lightbox';
export default {
  components: {
    NavbarAdmin,
    VueEasyLightbox
  },
  data() {
    return {
      imageTitle: "",
      imagePreview: null,
      listDataAnggota: [],
      lightboxIndex: 0,
      lightboxVisible: false,
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
        window.location.reload
      }).catch(() => {
        this.$toast.error('Gagal mengambil Data Anggota')
      })
    },
    openImagePreview(imageUrl, title) {
      this.imagePreview = this.getFullPathImage(imageUrl);
      this.imageTitle = title;
      this.lightboxVisible = true
    },
    async updateStatusAnggota(id, data) {
      if (!confirm('Apakah Anda Yakin untuk mengupdate Status Anggota?')) {
        return
      }
      const form = {
        status: data
      }
      await api.UpdateStatusAnggota(id, form).then(() => {
        this.$toast.success('Status Berhasil Di-Rubah!')
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }).catch(() => {
        this.$toast.error('Gagal Mengupdate Status Anggota');
      })
    },
    exportToCSV() {
      const headers = ["No", "Nama Lengkap", "NIK", "Tempat Lahir", "Pekerjaan", "Agama", "Provinsi", "Kota/Kabupaten", "3x4 Foto", "KTP Foto"];
      const rows = this.listDataAnggota.map((anggota, index) => [
        index + 1,
        anggota.nama_lengkap,
        anggota.nik,
        anggota.tempatLahir,
        anggota.tanggalLahir.split('T')[0],
        anggota.pekerjaan,
        anggota.agama,
        anggota.wilayah.nama_wilayah,
        anggota.daerah.nama_daerah,
        anggota.imageUsers[0]?.imageUrl ? this.getFullPathImage(anggota.imageUsers[0].imageUrl) : "", // Foto 3x4
        anggota.imageUsers[1]?.imageUrl ? this.getFullPathImage(anggota.imageUsers[1].imageUrl) : ""  // Foto KTP

      ]);
      const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Buat link untuk mendownload file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data_daftarAnggota.csv";
      link.click();

    }
  }
};
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
