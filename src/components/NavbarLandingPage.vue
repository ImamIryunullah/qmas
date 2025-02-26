<template>
    <header :class="{ 'hidden-navbar': !isNavbarVisible }"
        class="bg-red-600 p-6 shadow-lg fixed top-0 left-0 right-0 z-50 font-bold">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <router-link to="/" class="text-white text-3xl font-bold flex items-center">
                <img src="@/assets/iconlpkni.png" alt="LPKNI" class="w-15 h-12 mr-3 mt-2" />
                LPKNI
            </router-link>
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
                                <router-link to="/auth/register-anggota" class="block px-4 py-2 text-sm hover:bg-gray-200">
                                    Anggota LPKNI</router-link>
                            </li>
                            <li>
                                <router-link to="/auth/swi/register"
                                    class="block px-4 py-2 text-sm hover:bg-gray-200">
                                    Standar Warung Indonesia</router-link>
                            </li>
                        </ul>
                    </div>

                </li>
                <li>
                    <a href="/#services" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-cogs"></i>
                        <span>Services</span>
                    </a>
                </li>
                <!-- Dropdown for Pendaftaran -->
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
                                <router-link to="/auth/login" class="block px-4 py-2 text-sm hover:bg-gray-200">
                                    LPKNI</router-link>
                            </li>
                            <li>
                                <router-link to="/auth/swi/login"
                                    class="block px-4 py-2 text-sm hover:bg-gray-200">
                                    Standar Warung Indonesia</router-link>
                            </li>
                        </ul>
                    </div>

                </li>
            </ul>

            <!-- Mobile Hamburger Button -->
            <div class="block md:hidden">
                <button @click="toggleMenu" class="text-white focus:outline-none">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="fixed inset-y-0 right-0 w-64 bg-red-700 text-white z-50 transform transition-transform duration-300"
            :class="{ 'translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }">

            <!-- Close Button -->
            <div class="flex justify-end p-4">
                <router-link to="/" class="text-white text-3xl font-bold flex items-center">
                    <img src="@/assets/iconlpkni.png" alt="LPKNI" class="w-13 h-10 mr-3 mt-2" />
                    <div class="mr-12">
                        LPKNI
                    </div>
                </router-link>

                <button @click="toggleMenu" class="text-white">
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
                            <router-link to="/auth/register-anggota" class="block px-4 py-2 text-sm hover:bg-gray-200">
                                LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/register" class="block px-4 py-2 text-sm hover:bg-gray-200">
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
                <li class="relative">
                    <button @click="toggleDropdownLogin"
                        class="flex items-center w-full justify-between hover:text-gray-300">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-clipboard-check w-5 h-5"></i>
                            <span>Login</span>
                        </div>
                        <i class="fas fa-chevron-down w-5 h-5 transition-transform"
                            :class="{ 'rotate-180': isDropdownOpen }"></i>
                    </button>

                    <ul v-show="isDropdownOpenLogin" class="mt-2 bg-white text-black rounded shadow-lg overflow-hidden">
                        <li>
                            <router-link to="/auth/login" class="block px-4 py-2 text-sm hover:bg-gray-200">
                                Anggota LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/login" class="block px-4 py-2 text-sm hover:bg-gray-200">
                                Standar Warung Indonesia</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    data() {

        return {
            isMenuOpen: false, // To toggle the mobile menu
            isNavbarVisible: true,
            lastScrollY: 0,
            isDropdownOpen: false,
            isDropdownOpenLogin : false
        };
    },
    methods: {
        closeMenu() {
            this.isMenuOpen = false;
        },
        toggleMenu() {
            this.isMenuOpen = true;
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        toggleDropdownLogin() {
            this.isDropdownOpenLogin = !this.isDropdownOpenLogin;
        },
        handleScroll() {
            const currentScrollY = window.scrollY;
            this.isNavbarVisible = currentScrollY < this.lastScrollY || currentScrollY < 50; // Navbar will show if scroll is upwards or at the top
            this.lastScrollY = currentScrollY;
            this.closeMenu()
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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

.relative.group {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Pusatkan tombol di tengah */
    position: relative;
}

.relative.group ul {
    left: 50%;
    transform: translateX(-50%);
    /* Memastikan dropdown tetap berada di tengah */
    width: max-content;
    /* Menyesuaikan lebar sesuai konten */
}


/* Ensure the sidebar is responsive */
@media (max-width: 640px) {
    header {
        padding-top: 1rem;
        /* Reduce padding on small screens */
    }

    .text-2xl {
        font-size: 1.5rem;
        /* Smaller font size on mobile */
    }
}
</style>