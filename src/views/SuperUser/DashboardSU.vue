<template>
  <div>
    <NavbarAdmin />
    <div class="bg-gray-100 w-full h-full  min-h-screen pl-28 mx-auto p-8 transition-all"
      :class="isSidebarOpen ? 'pl-72' : 'ml-0'">
      <!-- Dashboard Header -->
      <div class="text-center mb-12">
        <div class="flex justify-center items-center space-x-3">
          <img src="@/assets/iconlpkni.png" alt="LPKNI Icon" class="mt-2 w-9 h-12" />
          <h1 class="text-4xl font-extrabold text-gray-800">Admin Dashboard LPKNI</h1>
        </div>
        <p class="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto mt-2">
          Lembaga Perlindungan Konsumen Indonesia
        </p>
      </div>
      <!-- Dashboard Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
        <div v-for="(item, index) in dashboardData" :key="index" @click="Tolink(item.link)"
          class="p-6 bg-white rounded-xl shadow-md transition transform hover:cursor-pointer hover:scale-105 hover:shadow-lg flex flex-col items-center min-h-[10rem]">
          <!-- Icon Container -->
          <div class="w-14 h-14 flex items-center justify-center rounded-full" :class="item.bgColor">
            <i :class="item.icon" class="text-white text-2xl"></i>
          </div>
          <!-- Title & Data -->
          <h3 class="text-lg md:text-xl font-semibold text-gray-800 mt-4 text-center">
            {{ item.title }}
          </h3>
          <p class="text-lg text-gray-600 font-medium">{{ item.total }}</p>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="text-white text-lg">Sedang Memuat...</div>
      <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
    </div>
  </div>
</template>
<script>
import NavbarAdmin from '@/components/NavbarAdmin.vue';
import lpkni from '@/service/lpkni'; // Importing the lpkni service

export default {
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      dashboardData: [
        { title: "Data Pendaftaran Anggota", total: 0, icon: "fas fa-user-plus", bgColor: "bg-purple-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Jabatan Tingkat Pusat", total: 0, icon: "fas fa-landmark", bgColor: "bg-green-500", link: '/admin/management-jabatan' },
        { title: "Jabatan Tingkat Kota/Kabupaten", total: 0, icon: "fas fa-city", bgColor: "bg-yellow-500", link: '/admin/management-jabatan' },
        { title: "Jabatan Tingkat Provinsi", total: 0, icon: "fas fa-landmark", bgColor: "bg-green-500", link: '/admin/management-jabatan' },
        { title: "Total Jabatan Seluruh Indonesia", total: "6028", icon: "fas fa-globe", bgColor: "bg-red-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Total Pendaftaran Disetujui", total: 0, icon: "fas fa-check-circle", bgColor: "bg-blue-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Total Pengaduan", total: 0, icon: "fas fa-exclamation-triangle", bgColor: "bg-purple-500", link: '/admin/data-pengaduan' },
        // { title: "Tim Pusat", total: "15", icon: "fas fa-users", bgColor: "bg-red-400", link: '/admin/data-pendaftaran-anggota' },
        { title: "Data Transaksi Pending", total: 0, icon: "fas fa-wallet", bgColor: "bg-yellow-400", link: '/admin/data-pembayaran-anggota' },
        { title: "Data Transaksi Succes", total: 0, icon: "fas fa-wallet", bgColor: "bg-green-600", link: '/admin/data-pembayaran-anggota' },
        { title: "Data Pendaftaran Anggota Pending", total: 0, icon: "fas fa-user-plus", bgColor: "bg-yellow-500", link: '/admin/data-pendaftaran-anggota' },

        { title: "Data Pendaftaran Anggota Cancel", total: 0, icon: "fas fa-user-plus", bgColor: "bg-red-800", link: '/admin/data-pendaftaran-anggota' },
        { title: "Data Transaksi Cancel", total: 0, icon: "fas fa-wallet", bgColor: "bg-red-600", link: '/admin/data-pembayaran-anggota' },

      ],
      listDataAnggota: [],
      JabatanList: [],
      listDataPengaduan: [],
      TransaksiList: [],
      isLoading: false
    }
  },
  mounted() {
    this.getAllPengaduan()
    this.getAllAnggota();
    this.getAllJabatan();
    this.GetAllTransaksi()

  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.storeSidebar.isSidebarOpen;
    }
  },
  methods: {
    Tolink(link) {
      this.$router.push(link)
    },
    async GetAllTransaksi() {
      await lpkni.GetTransaksiByStatus("SUCCESS").then((res) => {
        this.TransaksiList = res.data
        this.dashboardData[8].total = res.data.length
      }).catch((error) => {
        console.log(error)
      })
      await lpkni.GetTransaksiByStatus("PENDING").then((res) => {
        this.TransaksiList = res.data
        this.dashboardData[7].total = res.data.length
      }).catch((error) => {
        console.log(error)
      })
      await lpkni.GetTransaksiByStatus("CANCEL").then((res) => {
        this.TransaksiList = res.data
        this.dashboardData[11].total = res.data.length
      }).catch((error) => {
        console.log(error)
      })
    },
    async getAllAnggota() {
      this.isLoading = true
      try {
        const response = await lpkni.getAllUserData();
        this.listDataAnggota = response.data;
        this.$toast.success('Berhasil mengambil Data Anggota');
        this.dashboardData[0].total = this.listDataAnggota.length;
        const setuju = this.listDataAnggota.map(item => item.status === "SUCCESS")
        const pending = this.listDataAnggota.map(item => item.status === "PENDING")
        const cancel = this.listDataAnggota.map(item => item.status === "CANCEL")
        this.dashboardData[5].total = setuju.filter(item => item === true).length
        this.dashboardData[9].total = pending.filter(item => item === true).length
        this.dashboardData[10].total = cancel.filter(item => item === true).length
      } catch (error) {
        this.$toast.error('Gagal mengambil Data Anggota');
      } finally {
        this.isLoading = false
      }
    },
    async getAllPengaduan() {
      this.isLoading = true
      try {
        const response = await lpkni.GetAllPengaduanAdmin();
        this.listDataPengaduan = response.data;
        this.$toast.success('Berhasil mengambil Data Pengaduan');
        this.dashboardData[6].total = this.listDataPengaduan.length
      } catch (error) {
        this.$toast.error('Gagal mengambil Data Pengaduan');
      } finally {
        this.isLoading = false
      }
    },
    async getAllJabatan() {
      this.isLoading = true
      try {
        const response = await lpkni.GetallJabatan();
        this.JabatanList = response.data;
        this.$toast.success('Berhasil mengambil Data Jabatan');
        this.dashboardData[4].total = this.JabatanList.length;
        const jabatanPusat = this.JabatanList.map(item => item.tingkat === "Pusat");
        const jabatanKota_Kab = this.JabatanList.map(item => item.tingkat === "Kota/Kab");
        const jabatanProvinsi = this.JabatanList.map(item => item.tingkat === "Provinsi");
        this.dashboardData[1].total = jabatanPusat.filter(item => item === true).length
        this.dashboardData[2].total = jabatanKota_Kab.filter(item => item === true).length
        this.dashboardData[3].total = jabatanProvinsi.filter(item => item === true).length

      } catch (error) {
        this.$toast.error('Gagal mengambil Data Jabatan');
      } finally {
        this.isLoading = false
      }
    }
  }
};

</script>

<style>
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>