<template>
  <!-- Sidebar -->
  <div class="bg-red-600 text-white fixed top-0 left-0 z-50 transition-all duration-300"
    :class="isSidebarOpen ? 'w-64 min-h-full px-4 py-6 flex flex-col' : 'w-16 min-h-full flex flex-col items-center py-6'">
    <!-- Logo & Hamburger Menu -->
    <div class="flex justify-between items-center mb-6 px-2">
      <div v-if="isSidebarOpen" class="flex items-center space-x-3 ml-3">
        <img src="@/assets/iconlpkni.png" alt="LPKNI Icon" class="w-6 h-8" />
        <span class="text-gray-200 font-bold text-lg text-center">Admin
          <span class="text-center">Dashboard</span>
        </span>

      </div>

      <button @click="toggleSidebar" class="p-2 focus:outline-none text-white">
        <i class="fas" :class="isSidebarOpen ? 'fa-angle-left' : 'fa-bars'"></i>
      </button>
    </div>


    <!-- Navigasi Menu -->
    <nav class="flex flex-col flex-grow space-y-1">
      <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
        class="flex items-center py-2 px-4 rounded-md transition-all duration-200 hover:bg-red-700 font-semibold"
        :class="{ 'bg-grey-200 text-black bg-red-700': $route.path === item.path }">
        <i :class="item.icon" class="w-6 text-lg"></i>
        <span v-if="isSidebarOpen" class="ml-3">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Profile & Logout -->
    <div class="mt-auto pt-6 border-t border-white">
      <router-link :to="`/admin/profile`">
        <div class="flex items-center py-3 px-4 rounded-md hover:bg-red-700"
          :class="{ 'bg-grey-200 text-black bg-red-700': $route.path === `/admin/profile` }">
          <i class="fas fa-user-circle text-white text-2xl"></i>
          <span v-if="isSidebarOpen" class="ml-3 font-semibold">{{ Name }}</span>

        </div>
      </router-link>

      <!-- Display Current Date & Time -->
      <div v-if="isSidebarOpen" class="text-white text-xs mt-4 ml-3">
        <p>{{ currentDate.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          }}</p>
        <p>{{ currentDate.toLocaleTimeString('id-ID') }} WIB</p>
      </div>

      <!-- Logout Button -->
      <button @click="logout" class="flex items-center py-3 px-4 mt-4 rounded-md text-black hover:bg-gray-700 w-full">
        <i class="fas fa-sign-out-alt w-6"></i>
        <span v-if="isSidebarOpen">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      currentDate: new Date(),
      Name: this.$store.state.storeLpkni.userLpkni.user.nama_depan,
      menuItems: [
        { label: "Dashboard", path: "/admin/dashboard", icon: "fas fa-home" },
        { label: "Data Anggota", path: "/admin/data-pendaftaran-anggota", icon: "fas fa-user-check" },
        { label: "Data Pembayaran", path: "/admin/data-pembayaran-anggota", icon: "fas fa-wallet" },
        { label: "Management Jabatan", path: "/admin/management-jabatan", icon: "fas fa-briefcase" },
        { label: "Management Provinsi", path: "/admin/management-Provinsi", icon: "fa-solid fa-city" },
        { label: "Management Kota/Kab", path: "/admin/management-Kota-Kab", icon: "fa-solid fa-city" },
        { label: "Data Pengaduan", path: "/admin/data-pengaduan", icon: "fas fa-exclamation-triangle" },
        { label: "Tambah Berita/Suara Konsumen", path: "/admin/pengaduan-suara-konsumen", icon: "fas fa-newspaper" },
        { label: "Daftar Berita/Suara Konsumen", path: "/admin/daftar-suara-konsumen", icon: "fas fa-newspaper" },
        { label: "Laporan Kegiatan Anggota", path: "/admin/laporan-kegiatan", icon: "fas fa-calendar-alt" },
      ]
    };
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.storeSidebar.isSidebarOpen;
    },
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('storeSidebar/toggleSidebar');
    },
    async logout() {
      try {
        await this.$store.dispatch("logoutLpkni");
        Swal.fire({
          icon: "success",
          title: "Berhasil Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.$router.push("/auth/login");
      } catch (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Gagal Logout",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    handleResize() {
      this.isSidebarOpen = window.innerWidth > 768;
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    setInterval(() => {
      this.currentDate = new Date();  // Update tanggal dan waktu
    }, 1000);  // 1000 ms = 1 detik
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
/* Untuk memastikan sidebar tetap full height */
.fixed {
  height: 100vh;
}

/* Responsif */
@media (max-width: 768px) {
  .fixed {
    position: fixed;
    z-index: 50;
  }
}

/* Add smooth transition for the sidebar */
.transition-all {
  transition: all 0.3s ease;
}

/* Adjust the profile section */
.ml-3 {
  margin-left: 0.75rem;
}

.text-gray-400 {
  color: #B0B0B0;
}

.text-gray-200 {
  color: #E4E4E4;
}

.text-black {
  color: #000;
}
</style>