<template>
    <header :class="{ 'hidden-navbar': !isNavbarVisible }"
        class="bg-green-600 p-6 shadow-lg fixed top-0 left-0 right-0 z-50 font-bold">

        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <router-link to="/" class="text-white text-3xl font-bold flex items-center">
                <img src="@/assets/swiputih.png" alt="LPKNI" class="w-15 h-12 mr-3 mt-2">
            </router-link>

            <!-- headerbar Links for desktop -->
            <ul class="hidden md:flex space-x-6">
                <li>
                    <a href="/#about" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-info-circle"></i>
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a href="/#services" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-cogs"></i>
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="/#contact" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-phone-alt"></i>
                        <span>Contact</span>
                    </a>
                </li>

                <!-- Pendaftaran Dropdown -->
                <li class="relative group">
                    <button class="text-white hover:text-gray-300 flex items-center space-x-2 delay-100">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Pendaftaran</span>
                        <i class="fas fa-chevron-down ml-1"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <ul
                        class="absolute min-w-[150px]  bg-white text-black shadow-lg rounded-lg hidden group-hover:block z-10">
                        <li>

                            <router-link to="/auth/login"
                                class="fas fa-user-alt block px-4 py-2 text-sm hover:bg-gray-200"> Daftar
                                Anggota LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/login"
                                class="fas fa-store block px-4 py-2 text-sm hover:bg-gray-200">
                                Daftar
                                Standar Warung Indonesia</router-link>
                        </li>
                    </ul>
                </li>

                <!-- Suara Konsumen (Portal Berita) -->
                <li>
                    <router-link to="/suara-konsumen"
                        class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-newspaper"></i>
                        <span>Suara Konsumen</span>
                    </router-link>
                </li>

                <!-- Pengaduan (Direct ke Form Pengaduan) -->
                <li>
                    <router-link to="/pengaduan" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Pengaduan</span>
                    </router-link>
                </li>


            </ul>

            <!-- Mobile Hamburger Menu -->
            <div class="block md:hidden">
                <button @click="toggleMenu" class="text-white focus:outline-none">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Sidebar Menu -->
        <div v-show="isMenuOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
            <div class="flex justify-end p-6">
                <button @click="toggleMenu" class="text-white">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            <ul class="flex flex-col items-center text-white space-y-6">
                <li>
                    <a href="/#about" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-info-circle"></i>
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a href="/#services" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-cogs"></i>
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="/#contact" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-phone-alt"></i>
                        <span>Contact</span>
                    </a>
                </li>
                <li class="relative group">
                    <button class="text-white hover:text-gray-300 flex items-center space-x-2 delay-100">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Pendaftaran</span>
                        <i class="fas fa-chevron-down ml-1"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <ul
                        class="absolute left-0 min-w-[150px]  bg-white text-black shadow-lg rounded-lg hidden group-hover:block z-10">
                        <li>
                            <router-link to="/auth/register-anggota"
                                class="block px-4 py-2 text-sm hover:bg-gray-200">Daftar
                                Anggota LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/login" class="block px-4 py-2 text-sm hover:bg-gray-200">Daftar
                                Standar Warung Indonesia</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link to="/suara-konsumen"
                        class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-newspaper"></i>
                        <span>Suara Konsumen</span>
                    </router-link>
                </li>

                <!-- Pengaduan (Direct ke Form Pengaduan) -->
                <li>
                    <router-link to="/pengaduan" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Pengaduan</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false,
            lastScrollY: 0,
            isNavbarVisible: true
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
        }
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