<template>
    <header :class="{ 'hidden-navbar': !isNavbarVisible }"
        class="bg-red-600 p-6 shadow-lg fixed top-0 left-0 right-0 z-50 font-bold">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="text-white text-2xl font-bold flex items-center">
                <img src="@/assets/iconlpkni.png" alt="LPKNI" class="w-9 h-12 mr-1 mt-1" />
                LPKNI
            </router-link>
            <div class="block md:hidden">
                <button @click="toggleMenu" class="text-white focus:outline-none">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
            <ul class="hidden md:flex space-x-6">
                <li>
                    <router-link to="/suara-konsumen"
                        class="text-white hover:text-gray-300 flex items-center space-x-1">
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
                    <a href="/#contact" class="text-white hover:text-gray-300 flex items-center space-x-2">
                        <i class="fas fa-phone-alt"></i>
                        <span>Kontak</span>
                    </a>
                </li>
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
                        <span>Masuk</span>
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

            </ul>
        </div>
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
                        <span>Tentang</span>
                    </a>
                </li>
                <li>
                    <a href="/#services" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-cogs w-5 h-5"></i>
                        <span>Layanan</span>
                    </a>
                </li>
                <li>
                    <a href="/#contact" class="flex items-center space-x-2 hover:text-gray-300">
                        <i class="fas fa-phone-alt w-5 h-5"></i>
                        <span>Kontak</span>
                    </a>
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
                <li class="relative">
                    <button @click="toggleDropdownLogin"
                        class="flex items-center w-full justify-between hover:text-gray-300">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-clipboard-check w-5 h-5"></i>
                            <span>Masuk</span>
                        </div>
                        <i class="fas fa-chevron-down w-5 h-5 transition-transform"
                            :class="{ 'rotate-180': isDropdownOpenLogin }"></i>
                    </button>
                    <ul v-show="isDropdownOpenLogin" class="mt-2 bg-white text-black rounded shadow-lg overflow-hidden">
                        <li>
                            <router-link to="/auth/login"
                                class="block px-4 py-2 text-sm hover:bg-gray-200">LPKNI</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/swi/login" class="block px-4 py-2 text-sm hover:bg-gray-200">Standar
                                Warung Indonesia</router-link>
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
            isMenuOpen: false,
            isNavbarVisible: true,
            lastScrollY: 0,
            isDropdownOpen: false,
            isDropdownOpenLogin: false
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen; 
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen; 
        },
        toggleDropdownLogin() {
            this.isDropdownOpenLogin = !this.isDropdownOpenLogin; 
        },
        handleScroll() {
            const currentScrollY = window.scrollY;
            this.isNavbarVisible = currentScrollY < this.lastScrollY || currentScrollY < 50;
            this.lastScrollY = currentScrollY;
            this.closeMenu(); 
        },
        closeMenu() {
            this.isMenuOpen = false; 
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll); 
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<style scoped>

.hidden-navbar {
    transform: translateY(-100%);
}

@media (max-width: 480px) {
    .text-2xl {
        font-size: 1.2rem;
    }
    .text-3xl {
        font-size: 1.8rem;
    }
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .text-2xl {
        font-size: 1rem;
    }

    .text-3xl {
        font-size: 1rem;
    }

    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .text-2xl {
        font-size: 1.75rem;
    }

    .text-3xl {
        font-size: 2.25rem;
    }

    .container {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}

@media (min-width: 1025px) {
    .text-2xl {
        font-size: 2rem;

    }

    .text-3xl {
        font-size: 2.5rem;

    }

    .container {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }
}

@media (max-width: 768px) {

    header .text-white {
        font-size: 0.5rem;
    }

    header i {
        font-size: 0.625rem;
    }

    header .container {
        padding: 0 5px;
    }

    .block.md\:hidden button {
        font-size: 1rem;
    }

    header .md\:hidden .space-x-6 {
        flex-direction: column;
    }

    .md\:hidden .w-64 {
        width: 100%;
    }

    header button {
        padding: 3px 6px;
    }
}

@media (max-width: 820px) {

    header .text-white {
        font-size: 0.375rem;
    }
    header i {
        font-size: 0.5rem;
    }
    header .container {
        padding: 0 3px;
    }

    .block.md\:hidden button {
        font-size: 0.875rem;
    }
    header .md\:hidden .space-x-6 {
        flex-direction: column;
    }
    .md\:hidden .w-64 {
        width: 100%;
    }
    header button {
        padding: 3px 5px;
    }
}

@media (max-width: 1024px) {
    header .text-white {
        font-size: 0.875rem;
    }

    header i {
        font-size: 1.25rem;
    }

    header .container {
        padding: 0 20px;

    }

    .block.md\:hidden button {
        font-size: 1.25rem;
    }

    header .md\:hidden .space-x-6 {
        flex-direction: column;
    }

    .md\:hidden .w-64 {
        width: 100%;
    }
}
</style>
