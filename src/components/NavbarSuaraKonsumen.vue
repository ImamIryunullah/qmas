<template>
  <!-- Social Media Section -->
  <section class="bg-gray-900 py-2">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- Hashtags on the Left -->
      <div class="text-white text-sm sm:text-xs">
        <span>#lpknipusat #perlindungankonsumen #konsumen #konsumencerdas</span>
      </div>

      <!-- Social Media Icons on the Right -->
      <div class="flex space-x-6 text-white sm:space-x-4">
        <a href="https://facebook.com/lpkni.pusat/" target="_blank" class="hover:text-gray-400">
          <i class="fab fa-facebook fa-sm sm:fa-xs"></i>
        </a>
        <a href="https://www.instagram.com/lpkni_official/" target="_blank" class="hover:text-gray-400">
          <i class="fab fa-instagram fa-sm sm:fa-xs"></i>
        </a>
        <a href="https://www.facebook.com/lpkni.pusat" target="_blank" class="hover:text-gray-400">
          <i class="fab fa-linkedin fa-sm sm:fa-xs"></i>
        </a>
        <a href="https://www.youtube.com/@channellpkni" target="_blank" class="hover:text-gray-400">
          <i class="fab fa-youtube fa-sm sm:fa-xs"></i>
        </a>
      </div>
    </div>
  </section>
  <!-- Header Section -->
  <header class="bg-red-600 shadow-md py-5 w-full">
    <div class="container mx-auto flex flex-wrap justify-between items-center px-4">
      <!-- Logo and Navigation -->
      <div class="flex items-center w-full sm:w-auto sm:flex-row flex-col">
        <router-link to="/" class="text-white text-xl font-bold flex items-center">
          <img src="@/assets/iconlpkni.png" alt="LPKNI" class="w-15 h-12 mr-3 mt-2">
          LPKNI
        </router-link>

        <span class="text-white font-extrabold ml-2 sm:ml-4 hidden sm:inline-block"> | </span>
        <div class="flex items-center w-full sm:w-auto sm:flex-row flex-col ml-2 sm:ml-4">
          <router-link to="/suara-konsumen" class="text-white text-xl font-bold flex items-center">
            Suara Konsumen
          </router-link>
        </div>
      </div>


      <!-- Date Section -->
      <div class="text-white w-full sm:w-auto mt-2 sm:mt-0">
        <span>{{ currentDay }}, {{ currentDate }}</span>
      </div>

      <!-- Search Section -->
      <div class="flex space-x-6 items-center w-full sm:w-auto mt-2 sm:mt-0">
        <div class="relative w-full sm:w-auto">
          <input type="text"
            class="pl-10 pr-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none w-full"
            placeholder="Search..." />
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>
    </div>
  </header>

  <nav class="bg-white py-6 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Scrollable Container -->
      <div class="flex space-x-3 overflow-x-auto whitespace-nowrap scrollbar-hide py-2 px-2">
        <button v-for="wilayah in wilayahList" :key="wilayah.id_wilayah" @click="routeWilayah(wilayah.id_wilayah)"
          class="bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition flex-shrink-0">
          {{ wilayah.nama_wilayah }}
        </button>
      </div>
    </div>
  </nav>

</template>

<script>
// import router from "@/router";
import api from "@/service/lpkni";
export default {
  data() {
    return {
      isMenuOpen: false,
      dropdownOpen: false,
      currentDate: this.formatDate(new Date()),
      currentDay: this.getDayInIndonesian(new Date()),
      wilayahList: [
      ]
    };
  },
  mounted() {
    this.fetchWilayah()
  },
  methods: {
    async routeWilayah(id) {
      await this.$router.push(`/suara-konsumen/wilayah/${id}`)
      window.location.reload()
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async fetchWilayah() {
      await api.getAllWilayah()
        .then((res) => {
          this.wilayahList = res.data;
        })
        .catch(() => { });
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getDayInIndonesian(date) {
      const daysInIndonesian = [
        'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu',
      ];
      return daysInIndonesian[date.getDay()];
    },
  },
};
</script>

<style scoped>
/* Adjust Navbar for smaller devices */
@media (max-width: 768px) {
  nav ul {
    flex-wrap: nowrap;
    /* Prevent navbar from wrapping */
    overflow-x: auto;
    /* Allow horizontal scroll on smaller screens */
    justify-content: flex-start;
    /* Align items to the left */
    padding-left: 4px;
    padding-right: 4px;
  }

  .text-sm {
    font-size: 0.75rem;
    /* Smaller text on mobile */
  }

  .fa-sm {
    font-size: 1rem;
    /* Smaller icons on mobile */
  }
}
</style>