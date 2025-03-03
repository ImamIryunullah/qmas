<template>
  <div class="flex h-screen">
    <!-- Sidebar untuk Desktop -->
    <aside class="w-64 bg-red-600 text-white p-4 hidden md:flex flex-col fixed h-full z-20">
      <div class="text-xl font-bold text-center mb-6">Anggota LPKNI</div>
      <nav class="flex-grow">
        <ul>
          <li v-for="item in menuItems" :key="item.path" class="mb-4 font-semibold">
            <router-link :to="item.path" :class="{ 'bg-grey-200 text-black bg-red-700': $route.path === item.path }"
              class="flex items-center space-x-3 p-3 hover:bg-red-700 rounded">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- Profile & Logout Buttons -->
      <div class="mt-auto">
        <button @click="goToProfile"
          :class="{ 'bg-grey-200 text-black bg-red-700': $route.path === '/anggota/profile' }"
          class="flex items-center py-3 px-4 mb-2 font-semibold rounded-md w-full bg-red-600 hover:bg-red-800">
          <i class="fas fa-user mr-2"></i>
          <span>{{ Name }}</span>
        </button>
        <button @click="logout"
          class="flex font-semibold items-center py-3 px-4 rounded-md w-full bg-red-600 hover:bg-red-800">
          <i class="fas fa-sign-out-alt mr-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Navbar untuk Mobile -->
    <nav class="bg-red-600 text-white p-4 flex justify-between items-center md:hidden fixed w-full top-0 z-50">
      <button @click="toggleSidebar" class="text-white text-2xl">
        <i class="fas fa-bars"></i>
      </button>
      <span class="text-xl font-bold">Anggota LPKNI</span>
      <button @click="goToProfile">
        <i class="fas fa-user"></i>
      </button>
    </nav>

    <!-- Sidebar Overlay untuk Mobile -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40" @click="toggleSidebar"></div>

    <!-- Sidebar untuk Mobile -->
    <aside v-if="isSidebarOpen"
      class="fixed top-0 left-0 w-64 h-full bg-red-600 text-white p-4 transition-all transform md:hidden flex flex-col z-50"
      :class="{ 'translate-x-0 opacity-100': isSidebarOpen, 'translate-x-full opacity-0': !isSidebarOpen }">
      <button @click="toggleSidebar" class="text-white text-2xl mb-4">
        <i class="fas fa-times"></i>
      </button>
      <nav class="flex-grow">
        <ul>
          <li v-for="item in menuItems" :key="item.path" class="mb-4">
            <router-link :to="item.path" class="flex items-center space-x-3 p-3 hover:bg-red-700 rounded">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Profile & Logout Buttons -->
      <div class="mt-auto">
        <button @click="goToProfile"
          class="flex items-center py-3 px-4 mb-2 rounded-md w-full bg-red-600 hover:bg-red-800">
          <i class="fas fa-user mr-2"></i>
          <span>Profile</span>
        </button>
        <button @click="logout" class="flex items-center py-3 px-4 rounded-md w-full bg-red-600 hover:bg-red-800">
          <i class="fas fa-sign-out-alt mr-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Konten Utama -->
    <main class="flex-1 p-6 md:ml-64 mt-12 md:mt-0 z-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isSidebarOpen: false,
      currentDate: new Date(),
      Name: this.$store.state.storeLpkni.userLpkni.user.nama_depan,
      menuItems: [
        { label: "Dashboard", path: "/anggota/dashboard", icon: "fas fa-home" },
        { label: "Data Diri", path: "/anggota/data-diri", icon: "fas fa-user-check" },
        { label: "Pembayaran", path: "/anggota/pembayaran", icon: "fas fa-money" },
        { label: "ID Card", path: "/anggota/id-card", icon: "fas fa-id-card" },
        { label: "SK Pengangkatan", path: "/anggota/sk", icon: "fas fa-address-card-o" },
        { label: "Kegiatan", path: "/anggota/upload-kegiatan", icon: "fas fa-calendar-alt" },
        { label: "Lapor", path: "/anggota/pengaduan", icon: "fas fa-exclamation-triangle" },
      ],
    };
  },
  computed: {
    routerPath() {
      return this.$route.path
    },

  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    goToProfile() {
      this.$router.push("/anggota/profile");
    },
    async logout() {
      try {
        await this.$store.dispatch("logoutLpkni");
        await this.$router.push("/auth/login");
        Swal.fire({
          icon: "success",
          title: "Berhasil Logout",
          showConfirmButton: false,
          timer: 1500,
        });

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
  },
};
</script>

<style scoped>
.transition-all {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
