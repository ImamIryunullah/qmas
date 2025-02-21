<template>
  <header
    class=" flex w-full h-[80px] px-[24px] md:px-[72px] justify-start items-center border-b border-[#028a66] bg-[#03a980] fixed top-0 left-0 right-0 z-50">

    <!-- Left Side: Logo -->
    <div>
      <div class="flex items-start gap-2">
        <!-- Hamburger Menu (Mobile) -->

        <div class="md:hidden flex items-start justify-start">
          <button @click="toggleMobileMenu" class="text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <!-- <img src="@/assets/swiputih.png" alt="SWI Logo" class="w-10 h-10 object-contain" /> -->
      </div>
      <a href="/" class="text-[20px] font-Jet text-white">Lembaga Perlindungan Konsumen Indonesia</a>
    </div>
    <!-- Navbar Links (Desktop) -->

    <nav class="hidden md:flex gap-8 text-[16px] font-medium mx-auto">

      <a href="/" class="text-white font-Jet hover:text-[#028a66] transition">Beranda</a>
      <a href="#" class="text-white hover:text-[#028a66] transition">Terbaru</a>
      <a href="#" class="text-white hover:text-[#028a66] transition">Wilayah</a>
      <a href="#" class="text-white hover:text-[#028a66] transition">Daerah</a>
      <a href="/tentang-kami" class="text-white hover:text-[#028a66] transition">Tentang Kami</a>
    </nav>

    <!-- Right Side: Date Display and Login Icon -->
    <!-- <div class="flex items-center gap-10">
      <div class="text-white hidden md:block font-medium ">
        {{ currentDate }}
      </div>
      <div class="flex items-center gap-2">
        <a href="/login" class="text-white font-Jet hover:text-[#028a66] transition">
          <i class="fa fa-user-circle text-2xl"></i> Login
        </a>
      </div>
    </div> -->

    <!-- Mobile Menu Links -->
    <div v-if="mobileMenuOpen" @click.self="toggleMobileMenu"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start">
      <div
        class="absolute top-[80px] left-0 right-0 bg-[#03a980] py-8 px-6 flex flex-col items-start space-y-6 rounded-xl shadow-lg z-50 transform transition-all duration-300 ease-in-out">
        <a href="/"
          class="text-white text-lg font-Jet w-full text-center py-3 hover:bg-[#028970] transition-all duration-300 rounded-md hover:scale-105 transform">
          Beranda
        </a>
        <a href="#"
          class="text-white text-lg font-Jet w-full text-center py-3 hover:bg-[#028970] transition-all duration-300 rounded-md hover:scale-105 transform">
          Terbaru
        </a>
        <a href="#"
          class="text-white text-lg font-Jet w-full text-center py-3 hover:bg-[#028970] transition-all duration-300 rounded-md hover:scale-105 transform">
          Ekonomi
        </a>
        <a href="#"
          class="text-white text-lg font-Jet w-full text-center py-3 hover:bg-[#028970] transition-all duration-300 rounded-md hover:scale-105 transform">
          Nasional
        </a>
        <a href="#"
          class="text-white text-lg font-Jet w-full text-center py-3 hover:bg-[#028970] transition-all duration-300 rounded-md hover:scale-105 transform">
          Internasional
        </a>
        <a href="/tentang-kami"
          class="text-white text-lg font-Jet w-full text-center py-3 hover:bg-[#028970] transition-all duration-300 rounded-md hover:scale-105 transform">
          Tentang Kami
        </a>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  data() {
    return {
      currentDate: "",  // Store the current date
      mobileMenuOpen: false,  // Toggle the mobile menu visibility
    };
  },
  mounted() {
    this.updateDate();
    setInterval(this.updateDate, 1000);
  },
  methods: {
    updateDate() {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, "0");
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const year = today.getFullYear();
      this.currentDate = `${day}/${month}/${year}`;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
  }
};
</script>

<style scoped>
/* Fixed header styling */
header {
  position: fixed;
  /* Fixes the header at the top */
  top: 0;
  /* Positions it at the top of the screen */
  left: 0;
  /* Ensures it stays left-aligned */
  right: 0;
  /* Ensures it stays right-aligned */
  z-index: 50;
  /* Keeps it above other content */
}

body {
  margin-top: 80px;
  /* Adds space for the fixed header */
}

/* Mobile responsive styling */
@media (max-width: 100px) {
  header {
    flex-direction: column;
    padding: 16px;
  }

  nav {
    display: none;
  }

  .md:hidden {
    display: block;
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Styling for the mobile menu */
  .mobile-menu-links {
    width: 50%;
  }

  .mobile-menu-links a {
    padding: 10px;
  }

  /* Ensures mobile menu items align properly to the left and take up full width */
  .absolute {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
