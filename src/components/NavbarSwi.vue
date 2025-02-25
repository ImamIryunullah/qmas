<template>
    <header :class="{ 'hidden-navbar': !isNavbarVisible }"
        class="bg-white p-6 shadow-lg fixed top-0 left-0 right-0 z-50 font-bold">

        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <router-link to="/" class="text-white text-3xl font-bold flex items-center">
                <img :src="getfullPathImage('assets/logoswi.png')" alt="LPKNI" class="w-15 h-12 mr-3 mt-2">
            </router-link>

            <!-- headerbar Links for desktop -->
            <ul class="hidden md:flex space-x-6">
                <li>
                    <a href="/#about" class="text-green-600 hover:text-green-800 flex items-center space-x-2">
                        <i class="fas fa-info-circle"></i>
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a href="/#services" class="text-green-600 hover:text-green-800 flex items-center space-x-2">
                        <i class="fas fa-cogs"></i>
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="/#contact" class="text-green-600 hover:text-green-800 flex items-center space-x-2">
                        <i class="fas fa-phone-alt"></i>
                        <span>Contact</span>
                    </a>
                </li>

                <!-- Pendaftaran Dropdown -->
                <li class="relative group">
                    <button class="text-green-600 hover:text-green-800 flex items-center space-x-2 delay-100">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Pendaftaran</span>
                        <i class="fas fa-chevron-down ml-1"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <ul
                        class="absolute min-w-[150px]  bg-white text-green-600 shadow-lg rounded-lg hidden group-hover:block z-10">
                        <li>

                            <router-link to="/auth/login"
                                class="fas fa-user-alt block px-4 py-2 text-sm hover:bg-white"> Daftar
                                Anggota LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/login"
                                class="fas fa-store block px-4 py-2 text-sm hover:bg-white">
                                Daftar
                                Standar Warung Indonesia</router-link>
                        </li>
                    </ul>
                </li>

                <!-- Suara Konsumen (Portal Berita) -->
                <li>
                    <router-link to="/suara-konsumen"
                        class="text-green-600 hover:text-green-800 flex items-center space-x-2">
                        <i class="fas fa-newspaper"></i>
                        <span>Suara Konsumen</span>
                    </router-link>
                </li>

                <!-- Pengaduan (Direct ke Form Pengaduan) -->
                <li>
                    <router-link to="/pengaduan"
                        class="text-green-600 hover:text-green-800 flex items-center space-x-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Pengaduan</span>
                    </router-link>
                </li>


            </ul>

            <!-- Mobile Hamburger Menu -->
            <div class="block md:hidden">
                <button @click="toggleMenu" class="text-green-600 focus:outline-none">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <div class="fixed inset-y-0 right-0 w-64 bg-white text-black z-50 transform transition-transform duration-300"
            :class="{ 'translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }">

            <!-- Close Button -->
            <div class="flex justify-end p-4">
                <router-link to="/" class="text-black text-3xl font-bold flex items-center">
                    <img :src="getfullPathImage('assets/logoswi.png')" alt="LPKNI" class="w-15 h-12 mr-12 mt-2">
                </router-link>

                <button @click="toggleMenu" class="text-black">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>

            </div>

            <!-- Menu Items -->
            <ul class="space-y-6 p-6">
                <li>
                    <a href="/#about" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-info-circle w-5 h-5"></i>
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a href="/#services" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-cogs w-5 h-5"></i>
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="/#contact" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-phone-alt w-5 h-5"></i>
                        <span>Contact</span>
                    </a>
                </li>

                <!-- Dropdown Pendaftaran -->
                <li class="relative">
                    <button @click="toggleDropdown"
                        class="flex items-center w-full justify-between hover:text-gray-300">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-clipboard-check w-5 h-5"></i>
                            <span>Pendaftaran</span>
                        </div>
                        <i class="fas fa-chevron-down w-5 h-5 transition-transform"
                            :class="{ 'rotate-180': isDropdownOpen }"></i>
                    </button>

                    <ul v-show="isDropdownOpen" class="mt-2 bg-white text-black rounded shadow-lg overflow-hidden">
                        <li>
                            <router-link to="/auth/login" class="block px-4 py-2 text-sm hover:bg-gray-200">Daftar
                                Anggota LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/login" class="block px-4 py-2 text-sm hover:bg-gray-200">Daftar
                                Standar Warung Indonesia</router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <router-link to="/suara-konsumen" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-newspaper w-5 h-5"></i>
                        <span>Suara Konsumen</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pengaduan" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-exclamation-triangle w-5 h-5"></i>
                        <span>Pengaduan</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import swi from '@/service/swi';
export default {
    data() {
        return {
            isMenuOpen: false,
            lastScrollY: 0,
            isNavbarVisible: true,
            isDropdownOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        handleScroll() {
            const currentScrollY = window.scrollY;
            this.isNavbarVisible = currentScrollY < this.lastScrollY || currentScrollY < 50; // Jika scroll ke atas atau posisi dekat atas
            this.lastScrollY = currentScrollY;
        },

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },

        getfullPathImage(img) {
            return swi.getfullpathImageSwi(img)
        },
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style scoped>
/* Fix dropdown hover issue */
header {
    transition: transform 0.3s ease-in-out;
}

.hidden-navbar {
    transform: translateY(-100%);
}

.group:hover ul {
    display: block;
}
</style>