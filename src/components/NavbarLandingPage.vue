<template>
    <header :class="{ 'hidden-navbar': !isNavbarVisible }"
        class="bg-red-600 p-6 shadow-lg fixed top-0 left-0 right-0 z-50 font-bold">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <router-link to="/" class="text-white text-3xl font-bold flex items-center">
                <img src="@/assets/iconlpkni.png" alt="LPKNI" class="w-15 h-12 mr-3 mt-2" />
                LPKNI
            </router-link>

            <!-- Mobile Hamburger Button -->
            <div class="block md:hidden">
                <button @click="toggleMenu" class="text-white focus:outline-none">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>

            <!-- Desktop Header Links -->
            <ul class="hidden md:flex space-x-6">
                <li class="relative group">
                    <button class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Daftar</span>
                        <i class="fas fa-chevron-down ml-1"></i>
                    </button>
                    <div class="">
                        <ul
                            class="absolute min-w-[150px] bg-white text-black shadow-md rounded-md hidden group-hover:block z-10">
                            <li>
                                <router-link to="/auth/register-anggota"
                                    class="block px-4 py-2 text-sm hover:bg-gray-200">
                                    Anggota LPKNI</router-link>
                            </li>
                            <li>
                                <router-link to="/auth/swi/register" class="block px-4 py-2 text-sm hover:bg-gray-200">
                                    Standar Warung Indonesia</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="relative group">
                    <button class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Login</span>
                        <i class="fas fa-chevron-down ml-1"></i>
                    </button>
                    <div class="">
                        <ul
                            class="absolute min-w-[150px] bg-white text-black shadow-md rounded-md hidden group-hover:block z-10">
                            <li>
                                <router-link to="/auth/login"
                                    class="block px-4 py-2 text-sm hover:bg-gray-200">LPKNI</router-link>
                            </li>
                            <li>
                                <router-link to="/auth/swi/login"
                                    class="block px-4 py-2 text-sm hover:bg-gray-200">Standar Warung
                                    Indonesia</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <router-link to="/suara-konsumen"
                        class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-newspaper"></i>
                        <span>Suara Konsumen</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pengaduan" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Pengaduan</span>
                    </router-link>
                </li>
                <li>
                    <a href="/#services" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-cogs"></i>
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="/#about" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-info-circle"></i>
                        <span>About</span>
                    </a>
                </li>

                <li>
                    <a href="/#contact" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-phone-alt"></i>
                        <span>Contact</span>
                    </a>
                </li>
            </ul>
        </div>

        <!-- Sidebar for Mobile Menu -->
        <div v-if="isMenuOpen" class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleMenu"></div>
        <div v-if="isMenuOpen"
            class="fixed inset-y-0 right-0 w-64 bg-red-700 text-white z-50 transform transition-all ease-in-out"
            :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }">
            <div class="flex justify-end p-4">
                <router-link to="/" class="text-white text-3xl font-bold flex items-center">
                    <img src="@/assets/iconlpkni.png" alt="LPKNI" class="w-13 h-10 mr-3 mt-2" />
                    LPKNI
                </router-link>
                <button @click="toggleMenu" class="text-white">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>
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
                            <router-link to="/auth/register-anggota"
                                class="block px-4 py-2 text-sm hover:bg-gray-200">LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/register"
                                class="block px-4 py-2 text-sm hover:bg-gray-200">Standar Warung Indonesia</router-link>
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
export default {
    data() {
        return {
            isMenuOpen: false,
            isNavbarVisible: true,
            lastScrollY: 0,
            isDropdownOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen; // Toggle mobile menu visibility
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
        },
        handleScroll() {
            const currentScrollY = window.scrollY;
            this.isNavbarVisible = currentScrollY < this.lastScrollY || currentScrollY < 50;
            this.lastScrollY = currentScrollY;
            this.closeMenu(); // Close mobile menu when scrolling
        },
        closeMenu() {
            this.isMenuOpen = false; // Close menu
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll); // Detect scroll position
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll); // Cleanup scroll event listener
    },
};
</script>

<style scoped>
/* Navbar transition styles */
.hidden-navbar {
    transform: translateY(-100%);
}

/* Mobile devices (Portrait) */
@media (max-width: 480px) {
    .text-2xl {
        font-size: 1.2rem;
        /* Adjust font size for mobile phones */
    }

    .text-3xl {
        font-size: 1.8rem;
        /* Adjust font size for larger mobile devices */
    }

    /* Adjust padding for small screens */
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

/* Small tablets (like iPad portrait) */
@media (min-width: 481px) and (max-width: 768px) {
    .text-2xl {
        font-size: 1.5rem;
        /* Adjust font size for tablets */
    }

    .text-3xl {
        font-size: 2rem;
        /* Adjust for iPad screens */
    }

    .container {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}

/* Larger Tablets (iPad landscape, small laptops) */
@media (min-width: 769px) and (max-width: 1024px) {
    .text-2xl {
        font-size: 1.75rem;
        /* Slightly larger for landscape tablets */
    }

    .text-3xl {
        font-size: 2.25rem;
        /* Adjust for tablet landscape */
    }

    .container {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}

/* Large screens (Desktops, Large Tablets in landscape) */
@media (min-width: 1025px) {
    .text-2xl {
        font-size: 2rem;
        /* Larger screens, keep font size large */
    }

    .text-3xl {
        font-size: 2.5rem;
        /* Large font size for desktops */
    }

    .container {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }
}
</style>
