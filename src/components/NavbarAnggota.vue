<template>
  <div class="">
    <!-- Sidebar -->
    <div class="bg-red-600 text-white fixed top-0 left-0 z-50 transition-all duration-300"
      :class="sidebarOpen ? 'w-64 min-h-full px-4 py-6 flex flex-col' : 'w-16 min-h-full flex flex-col items-center py-6'">
      <!-- Logo & Hamburger Menu -->
      <div class="flex justify-between items-center mb-6 px-2">
        <span v-if="sidebarOpen" class="ml-3 text-gray-200 font-bold text-lg">Anggota LPKNI</span>
        <button @click="toggleSidebar" class="p-2 focus:outline-none text-white">
          <i class="fas" :class="sidebarOpen ? 'fa-angle-left' : 'fa-bars'"></i>
        </button>
      </div>

      <!-- Navigasi Menu -->
      <nav class="flex flex-col flex-grow space-y-2">
        <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
          class="flex items-center py-3 px-4 rounded-md transition-all duration-200 font-bold"
          :class="{ 'bg-red-700 text-black': $route.path === item.path, 'hover:bg-red-700': $route.path !== item.path }">
          <i :class="item.icon" class="w-6 text-lg"></i>
          <span v-if="sidebarOpen" class="ml-3">{{ item.label }}</span>
        </router-link>
      </nav>
      <!-- Profile & Logout -->
      <div class="mt-auto pt-6  border-red-600">
        <router-link to="/anggota/profile"
          class="flex justify-center items-center py-3 px-3 rounded-md transition-all duration-200"
          :class="{ 'bg-red-700 text-black': $route.path === '/anggota/profile', 'hover:bg-red-700': $route.path !== '/anggota/profile' }">
          <i class="fas fa-user"></i>
          <span v-if="sidebarOpen" class="ml-3 font-semibold">Profile</span>
        </router-link>
        <div v-if="sidebarOpen" class="text-white-400 text-xs mt-4 ml-3 font-bold">
          <p>{{ currentDate.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          }}</p>
          <p>{{ currentDate.toLocaleTimeString('id-ID') }} WIB</p>
        </div>
        <!-- Logout Button -->
        <button @click="logout"
          class="flex items-center py-3 px-4 mt-4 rounded-md text-white  hover:bg-red-700 w-full font-bold">
          <i class="fas fa-sign-out-alt w-6"></i>
          <span v-if="sidebarOpen">Logout</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300" :class="sidebarOpen ? 'mr-64 p-6' : 'mr-16 p-6'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: window.innerWidth > 768,
      currentDate: new Date(),
      menuItems: [
        { label: "Dashboard", path: "/anggota/dashboard", icon: "fas fa-home" },
        { label: "Data Diri", path: "/anggota/data-diri", icon: "fas fa-user-check" },
        { label: "Pembayaran", path: "/anggota/pembayaran", icon: "fas fa-money" },
        { label: "ID Card dan SK", path: "/anggota/id-card", icon: "fas fa-id-card" },
        { label: "Pengaduan Ke Pusat", path: "/anggota/pengaduan", icon: "fas fa-exclamation-triangle" },
      ]
    };
  },
  computed: {
  },
  methods: {
    goToProfile() {
      this.$router.push('/anggota/profile');
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$toast.success("Successfully logged out.", { position: "top-right", duration: 1000 });
        await this.$router.push("/auth/login");
      } catch (e) {
        console.log(e);
        this.$toast.error("Couldn't log out.", { position: "top-right", duration: 1000 });
      }
    },
    handleResize() {
      this.sidebarOpen = window.innerWidth > 768;
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
  },
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
</style>