<template>
  <div>
    <NavbarAdmin />
    <div class="bg-gray-100 min-h-screen p-6 transition-all" :class="isSidebarOpen ? 'pl-72' : 'pl-20'">
      <!-- Page Header -->
      <div class="max-w-8xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
              📌 Management Anggota
            </h1>
            <p class="text-gray-600 mt-2">
              Kelola Anggota tingkat Provinsi dan Kota/Kabupaten.
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Filter Anggota
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
          <label class="text-gray-700 font-medium">Provinsi :</label>
          <select v-model="selectedWilayah" class="p-2 border rounded-md w-auto">
            <option :value="''">Pilih Provinsi</option>
            <option v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" :value="wilayah">
              {{ wilayah.nama_wilayah }}
            </option>
          </select>
          <label class="text-gray-700 font-medium">Kota/Kab : </label>
          <select v-model="selectedDaerah" class="p-2 border rounded-md w-auto">
            <option disabled :value="''">Pilih Daerah</option>
            <option v-for="daerah in selectedWilayah.daerah" :key="daerah.id_daerah" :value="daerah.id_daerah">
              {{ daerah.nama_daerah }}
            </option>
          </select>
          <label class="text-gray-700 font-medium">Status Anggota : </label>
          <select v-model="selectedStatus" class="p-2 border rounded-md w-auto">
            <option disabled value="">Pilih Status</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCEL">CANCEL</option>
          </select>
        </div>
      </div>
      <!-- Table Section -->
      <div class="max-w-8xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Daftar Anggota
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border rounded-lg">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="px-4 py-2 text-left">ID Anggota</th>
                <th class="px-4 py-2 text-left">Nama Lengkap</th>
                <th class="px-4 py-2 text-left">Provinsi</th>
                <th class="px-4 py-2 text-left">Kota / Kab</th>
                <th class="px-4 py-2 text-left">Jabatan</th>
                <th class="px-4 py-2 text-left">Tingkat</th>
                <th class="px-4 py-2 text-left">Alamat Kantor</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2 text-left">Keterangan Status</th>
                <th class="px-4 py-2 text-center">Tampilkan Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in listDataAnggota" :key="data.id" class="border-t">
                <td class="px-4 py-2 border border-b-2">{{ data.daerah.kode_daerah
                  + '.' + data.id_data_anggota }}</td>
                <td class="px-4 py-2 border border-b-2">{{ data.nama_lengkap }}</td>
                <td class="px-4 py-2 border border-b-2">
                  {{ data.wilayah ? data.wilayah.nama_wilayah : "-" }}
                </td>
                <td class="px-4 py-2 border border-b-2">
                  {{ data.daerah ? data.daerah.nama_daerah : "-" }}
                </td>
                <td class="px-4 py-2 border border-b-2">
                  {{ data.jabatanStruktural ?
                    data.jabatanStruktural.nama :
                    "-" }}
                </td>
                <td class="px-4 py-2 border border-b-2">{{ data.jabatanStruktural ?
                  data.jabatanStruktural.tingkat :
                  "-" }}</td>
                <td class="px-4 py-2 border border-b-2">{{ data.alamatkantor ?
                  data.alamatkantor :
                  "-" }}</td>
                <td class="px-4 py-2 border border-b-2 text-center font-semibold">
                  <!-- Conditional Rendering of Status with Icon and Color -->
                  <span :class="{
                    'text-yellow-500': data.status === 'PENDING',
                    'text-green-500': data.status === 'SUCCESS',
                    'text-red-500': data.status === 'CANCEL'
                  }">
                    <!-- PENDING Status with Icon -->
                    <i v-if="data.status === 'PENDING'" class="fas fa-hourglass-half"></i> <!-- Icon for PENDING -->
                    <!-- SUCCESS Status with Icon -->
                    <i v-if="data.status === 'SUCCESS'" class="fas fa-check-circle"></i> <!-- Icon for SUCCESS -->
                    <!-- CANCEL Status with Icon -->
                    <i v-if="data.status === 'CANCEL'" class="fas fa-times-circle"></i> <!-- Icon for CANCEL -->
                  </span>
                  <span :class="{
                    'text-yellow-500': data.status === 'PENDING',
                    'text-green-500': data.status === 'SUCCESS',
                    'text-red-500': data.status === 'CANCEL'
                  }">
                    {{ data.status }}
                  </span>
                </td>

                <td class="px-4 py-2 border border-b-2">{{ data.keterangan ?
                  data.keterangan :
                  "-" }}</td>
                <td class="px-4 py-2 border border-b-2 text-center">
                  <div class="flex justify-center space-x-2">
                    <button @click="openModal(data)"
                      class="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200">
                      <h1>Lihat</h1>
                      <i class="fa-solid fa-bars"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

        <div class="bg-white p-6 rounded-lg shadow-lg max-w-screen-3xl w-full">
          <div class="flex justify-end">
            <button @click="closeModal" class="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Data Anggota</h3>

          <div class="overflow-x-auto">

            <table class="w-full border rounded-lg">
              <thead class="bg-gray-200 text-gray-700">
                <tr class="border-t">
                  <th class="px-4 py-2 border border-b-2  ">NIK</th>
                  <th class="px-4 py-2 border border-b-2 ">alamat</th>
                  <th class="px-4 py-2 border border-b-2 ">Agama</th>
                  <th class="px-4 py-2 border border-b-2 ">pekerjaan</th>
                  <th class="px-4 py-2 border border-b-2 ">Tempat Lahir</th>
                  <th class="px-4 py-2 border border-b-2 ">Tanggal Lahir</th>
                  <th class="px-4 py-2 border border-b-2 ">Status Kawin</th>
                  <th class="px-4 py-2 border border-b-2 ">Total Bayar</th>
                  <th class="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t">
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.nik }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.alamat
                    }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.agama }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.pekerjaan }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.tempatLahir }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.tanggalLahir.split('T')[0] }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ SelecteAnggota.statusPerkawinan }}</td>
                  <td class="px-4 py-2 border border-b-2 ">{{ totalPembayaran }}</td>
                  <td class="px-4 py-2 border border-b-2  text-center">
                    <div class="flex justify-center space-x-2">
                      <button @click="updateStatusAnggota(SelecteAnggota.id_data_anggota, 'SUCCESS', SelecteAnggota)"
                        class="bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600">
                        <i class="fa-regular fa-circle-check"></i>
                        <h1 for="">Sukses
                        </h1>
                      </button>
                      <button @click="updateStatusAnggota(SelecteAnggota.id_data_anggota, 'PENDING', SelecteAnggota)"
                        class="bg-yellow-500 text-white p-3 rounded-md font-semibold hover:bg-yellow-600">
                        <i class="fa-solid fa-clock"></i>
                        <h1 for="">Pending
                        </h1>
                      </button>
                      <button @click="updateStatusAnggota(SelecteAnggota.id_data_anggota, 'CANCEL', SelecteAnggota)"
                        class="bg-red-500 text-white p-3 rounded-md font-semibold  hover:bg-red-600">
                        <i class="fa-solid fa-ban"></i>
                        <h1 for="">Cancel
                        </h1>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10 border border-b-2 p-5">
              <!-- Gambar pertama -->
              <div class="flex flex-col items-center justify-center text-center">
                <label><strong>{{ SelecteAnggota.imageUsers[0].keterangan }}</strong></label>
                <img @click="openImagePreview(SelecteAnggota.imageUsers[0].imageUrl)"
                  :src="getFullPathImage(SelecteAnggota.imageUsers[0].imageUrl)" alt=""
                  class="w-48 h-48 object-contain rounded-md mt-4 hover:cursor-pointer" />
              </div>

              <!-- Gambar kedua -->
              <div class="flex flex-col items-center justify-center text-center">
                <label><strong>{{ SelecteAnggota.imageUsers[1].keterangan }}</strong></label>
                <img :src="getFullPathImage(SelecteAnggota.imageUsers[1].imageUrl)" alt=""
                  class="w-48 h-48 object-contain rounded-md mt-4 hover:cursor-pointer"
                  @click="openImagePreview(SelecteAnggota.imageUsers[1].imageUrl)" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
  <vue-easy-lightbox :visible="lightboxVisible" :imgs="imagePreview" :index="lightboxIndex"
    @hide="lightboxVisible = false" />
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import api from "@/service/lpkni";
import VueEasyLightbox from 'vue-easy-lightbox';
import Swal from "sweetalert2";
export default {
  components: {
    NavbarAdmin,
    VueEasyLightbox
  },
  data() {
    return {
      selectedWilayah: '',
      selectedDaerah: '',
      transaksiList: [],
      wilayahList: [],
      daerahList: [],
      imageTitle: "",
      imagePreview: null,
      listDataAnggota: [],
      lightboxIndex: 0,
      lightboxVisible: false,
      selectedStatus: '',
      SelecteAnggota: {},
      isModalOpen: false,
      payments: []
    };
  },
  mounted() {
    this.GetAllAnggota()
    this.fetchWilayah()
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.storeSidebar.isSidebarOpen;
    },
    totalPembayaran() {
      return this.payments.reduce((total, payment) => {
        return total + payment.jumlahPembayaran;
      }, 0);
    }
  },
  methods: {
    async fetchWilayah() {
      await api.getAllWilayah()
        .then((res) => {
          this.wilayahList = res.data;
        })
        .catch(() => { });
    },
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
      this.lightboxVisible = true
    },
    openModal(data) {
      this.payments = data.transaksiAnggota ? data.transaksiAnggota : [{ jumlahPembayaran: 0 }];
      this.SelecteAnggota = data;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async updateStatusAnggota(id, data, dataAnggota) {
      this.payments = dataAnggota.transaksiAnggota;
      if (!dataAnggota.transaksiAnggota && data === "SUCCESS") {
        Swal.fire({
          icon: "warning",
          title: "Informasi!",
          text: "Anggota Ini Belum Melakukan Transaksi Sama Sekali!",
          showConfirmButton: true,
          confirmButtonColor: '#22c55e',
        })
        return
      } else if (this.totalPembayaran < 600000 && data === "SUCCESS") {
        Swal.fire({
          icon: "warning",
          title: "Informasi!",
          text: "Anggota Ini Belum Menyelesaikan Pembayaran!",
          showConfirmButton: true,
          confirmButtonColor: '#22c55e',
        })
        return
      }
      var keterangan = ""
      Swal.fire({
        title: "Info",
        text: `Apakah Anda Yakin Ingin Merubah Status Anggota ke ${data}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#22c55e',
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: 'Tidak',
        reverseButtons: false,
        inputPlaceholder: 'Keterangan Status',
        input: "text",
        inputValidator: (value) => {
          if (!value) {
            return "Harap Mengisi Keterangan Status";
          }
          keterangan = value
        }

      }).then(async (result) => {
        if (result.isDenied || !result.isConfirmed || result.isDismissedd) {
          return
        }
        const form = {
          status: data,
          keterangan: keterangan
        }
        await api.UpdateStatusAnggota(id, form).then(() => {
          this.$toast.success('Status Berhasil Di-Rubah!')
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }).catch(() => {
          this.$toast.error('Gagal Mengupdate Status Anggota');
        })
      });
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
/* Tailwind CSS untuk sidebar yang mengambang */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>