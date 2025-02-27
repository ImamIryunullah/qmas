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
        { title: "Data Pendaftaran Anggota", total: "0", icon: "fas fa-user-plus", bgColor: "bg-purple-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Jabatan Tingkat Pusat", total: "11", icon: "fas fa-landmark", bgColor: "bg-green-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Jabatan Tingkat Kota/Kabupaten", total: "11", icon: "fas fa-city", bgColor: "bg-yellow-500", link: '/admin/management-jabatan' },
        { title: "Jabatan Tingkat Provinsi", total: "11", icon: "fas fa-landmark", bgColor: "bg-green-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Total Jabatan Seluruh Indonesia", total: "6028", icon: "fas fa-globe", bgColor: "bg-red-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Total Pendaftaran Disetujui", total: "15", icon: "fas fa-check-circle", bgColor: "bg-blue-500", link: '/admin/data-pendaftaran-anggota' },
        { title: "Total Pengaduan", total: "3", icon: "fas fa-exclamation-triangle", bgColor: "bg-purple-500", link: '/admin/data-pengaduan' },
        // { title: "Tim Pusat", total: "15", icon: "fas fa-users", bgColor: "bg-red-400", link: '/admin/data-pendaftaran-anggota' },
        { title: "Data Transaksi", total: "13", icon: "fas fa-wallet", bgColor: "bg-gray-900", link: '/admin/data-pendaftaran-anggota' }
      ],
      listDataAnggota: [] // To store the list of members
    }
  },
  mounted() {
    this.getAllAnggota();
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
    async getAllAnggota() {
      try {
        const response = await lpkni.getAllUserData();
        this.listDataAnggota = response.data;
        console.log(this.listDataAnggota);
        this.$toast.success('Berhasil mengambil Data Anggota');
        this.dashboardData[0].total = this.listDataAnggota.length;
      } catch (error) {
        this.$toast.error('Gagal mengambil Data Anggota');
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