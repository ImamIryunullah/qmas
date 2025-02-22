<template>
  <!-- Sidebar -->
  <div class="bg-red-600 text-white fixed top-0 left-0 z-50 transition-all duration-300"
    :class="sidebarOpen ? 'w-64  px-4 py-6 flex flex-col' : 'w-16 min-h-screen flex flex-col items-center py-6'">
    <!-- Logo & Hamburger Menu -->
    <div class="flex justify-between items-center mb-6 px-2">
      <div v-if="sidebarOpen" class="flex items-center space-x-3 ml-3">
        <img src="@/assets/iconlpkni.png" alt="LPKNI Icon" class="w-6 h-8" />
        <span class="text-gray-200 font-bold text-lg">HALO ADMIN</span>
      </div>

      <button @click="toggleSidebar" class="p-2 focus:outline-none text-white">
        <i class="fas" :class="sidebarOpen ? 'fa-angle-left' : 'fa-bars'"></i>
      </button>
    </div>


    <!-- Navigasi Menu -->
    <nav class="flex flex-col flex-grow space-y-2">
      <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
        class="flex items-center py-3 px-4 rounded-md transition-all duration-200 hover:bg-gray-700"
        :class="{ 'bg-grey-200 text-black': $route.path === item.path }">
        <i :class="item.icon" class="w-6 text-lg"></i>
        <span v-if="sidebarOpen" class="ml-3">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Profile & Logout -->
    <div class="mt-auto pt-6 border-t border-white">
      <div class="flex items-center py-3 px-4 rounded-md hover:bg-gray-700">
        <i class="fas fa-user-circle text-white text-2xl"></i>
        <span v-if="sidebarOpen" class="ml-3 font-semibold">ADMIN</span>
      </div>


      <!-- Display Current Date & Time -->
      <div v-if="sidebarOpen" class="text-white text-xs mt-4 ml-3">
        <p>{{ currentDate.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }}</p>
        <p>{{ currentDate.toLocaleTimeString('id-ID') }} WIB</p>
      </div>

      <!-- Logout Button -->
      <button @click="logout" class="flex items-center py-3 px-4 mt-4 rounded-md text-black hover:bg-gray-700 w-full">
        <i class="fas fa-sign-out-alt w-6"></i>
        <span v-if="sidebarOpen">Logout</span>
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <!-- <div class="flex-1 transition-all duration-300" :class="sidebarOpen ? 'ml-64 p-6' : 'ml-16 p-6'">
      <slot></slot>
    </div> -->

</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: window.innerWidth > 768,
      currentDate: new Date(),
      menuItems: [
        { label: "Dahshboard", path: "/admin/dashboard", icon: "fas fa-home" },
        { label: "Data Pendaftaran", path: "/admin/data-pendaftaran-anggota", icon: "fas fa-user-check" },
        { label: "Data Pembayaran", path: "/admin/data-pembayaran-anggota", icon: "fas fa-wallet" },
        { label: "Management Jabatan", path: "/admin/management-jabatan", icon: "fas fa-briefcase" },
        { label: "Data Pengaduan", path: "/admin/data-pengaduan", icon: "fas fa-exclamation-triangle" },
        { label: "Manage Portal Suara", path: "/admin/pengaduan-suara-konsumen", icon: "fas fa-newspaper" },
      ]
    };
  },
  methods: {
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