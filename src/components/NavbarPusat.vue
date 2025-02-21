<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="bg-[#03a980] text-white fixed top-0 left-0 z-50 transition-all duration-300"
      :class="sidebarOpen ? 'w-64 min-h-screen px-4 py-6 flex flex-col' : 'w-16 min-h-screen flex flex-col items-center py-6'">
      <!-- Logo & Hamburger Menu -->
      <div class="flex justify-between items-center mb-6 px-2">
        <span v-if="sidebarOpen" class="ml-3 text-gray-200 font-bold text-lg">PUSAT LPKNI</span>
        <button @click="toggleSidebar" class="p-2 focus:outline-none text-white">
          <i class="fas" :class="sidebarOpen ? 'fa-angle-left' : 'fa-bars'"></i>
        </button>
      </div>

      <!-- Navigasi Menu -->
      <nav class="flex flex-col flex-grow space-y-2">
        <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
          class="flex items-center py-3 px-4 rounded-md transition-all duration-200"
          :class="{ 'bg-green-500 text-black': $route.path === item.path, 'hover:bg-gray-700': $route.path !== item.path }">
          <i :class="item.icon" class="w-6 text-lg"></i>
          <span v-if="sidebarOpen" class="ml-3">{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- Profile & Logout -->
      <div class="mt-auto pt-6 border-t border-gray-600">
        <router-link to="/profile" class="flex items-center py-3 px-4 rounded-md hover:bg-gray-700">
          <img src="@/assets/profile-icon.png" alt="Profile" class="w-8 h-8 rounded-full border border-white" />
          <span v-if="sidebarOpen" class="ml-3 font-semibold">PUSAT LPKNI</span>
        </router-link>

        <div v-if="sidebarOpen" class="text-white-400 text-xs mt-4 ml-3">
          <p>{{ currentDate.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }}</p>
          <p>{{ currentDate.toLocaleTimeString('id-ID') }} WIB</p>
        </div>

        <!-- Logout Button -->
        <button @click="logout"
          class="flex items-center py-3 px-4 mt-4 rounded-md text-red-500 hover:bg-gray-700 w-full">
          <i class="fas fa-sign-out-alt w-6"></i>
          <span v-if="sidebarOpen">Logout</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300" :class="sidebarOpen ? 'ml-64 p-6' : 'ml-16 p-6'">
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
        { label: "Verifikasi", path: "/Pusat/dataregistrasi", icon: "fas fa-user-check" },
        { label: "Kelola Berita", path: "/Pusat/kelola-berita", icon: "fas fa-newspaper" },
        { label: "Keuangan", path: "/Pusat/datakeuangan", icon: "fas fa-wallet" },
        { label: "Data Transaksi", path: "/Pusat/data-transaksi", icon: "fas fa-exchange-alt" },
        { label: "Customer Services", path: "/Pusat/customerservices", icon: "fas fa-headset" },
        { label: "Data Pengaduan", path: "/Pusat/data-pengaduan", icon: "fas fa-comments" },
        { label: "Cetak ID-CARD", path: "/Pusat/generate-id-card", icon: "fas fa-id-card" },
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    logout() {
      this.$router.push('/login');
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