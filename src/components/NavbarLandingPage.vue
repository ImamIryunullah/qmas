<template>
    <header :class="{ 'hidden-navbar': !isNavbarVisible }"
        class="bg-gradient-to-r from-[#6AA1DA] via-[#5B91CA] to-[#4C81BA] p-4 shadow-2xl fixed top-0 left-0 right-0 z-50 font-bold backdrop-blur-sm border-b border-white/10">


        <div class="bg-black/20 backdrop-blur-sm border-b border-white/10 py-2 px-6 hidden lg:block mb-1">
            <div class="container mx-auto flex justify-between items-center text-sm">
                <div class="flex items-center space-x-6 text-white/90">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-envelope text-blue-200"></i>
                        <span>info@qmas.com</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-phone text-blue-200"></i>
                        <span>+62 123 456 789</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-map-marker-alt text-blue-200"></i>
                        <span>Malang, Indonesia</span>
                    </div>
                </div>


                <div class="flex items-center space-x-4">
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-facebook-f text-lg"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-twitter text-lg"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-instagram text-lg"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-linkedin-in text-lg"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-youtube text-lg"></i>
                    </a>
                    <div class="w-px h-6 bg-white/20 mx-2"></div>
                </div>
            </div>
        </div>


        <div class="container mx-auto flex justify-between items-center relative">

            <router-link to="/" class="text-white text-3xl font-bold flex items-center group">
                <div
                    class="bg-white/10 backdrop-blur-sm p-3 rounded-xl mr-3 group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                    <div
                        class="w-8 h-8 bg-gradient-to-br from-white to-blue-200 rounded-lg flex items-center justify-center">
                        <span class="text-blue-600 font-black text-lg">Q</span>
                    </div>
                </div>
                <span class="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">QMAS</span>
            </router-link>


            <nav class="hidden lg:flex items-center space-x-8">
                <div class="flex items-center space-x-8">
                    <router-link to="/suara-konsumen"
                        class="nav-link text-white hover:text-blue-200 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <i
                            class="fas fa-newspaper text-blue-200 group-hover:scale-110 transition-transform duration-300"></i>
                        <span>News</span>
                    </router-link>

                    <router-link to="/pengaduan"
                        class="nav-link text-white hover:text-blue-200 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <i
                            class="fas fa-comment-alt text-blue-200 group-hover:scale-110 transition-transform duration-300"></i>
                        <span>Pengaduan</span>
                    </router-link>

                    <a href="/kontak-kami"
                        class="nav-link text-white hover:text-blue-200 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <i
                            class="fas fa-envelope text-blue-200 group-hover:scale-110 transition-transform duration-300"></i>
                        <span>Kontak</span>
                    </a>

                    <a href="/product-Qmas"
                        class="nav-link text-white hover:text-blue-200 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <i
                            class="fas fa-box-open text-blue-200 group-hover:scale-110 transition-transform duration-300"></i>
                        <span>Produk Kami</span>
                    </a>
                </div>

            </nav>


            <div class="flex items-center space-x-4 lg:hidden">

                <div class="flex items-center space-x-2">
                    <a href="#" class="text-white/80 hover:text-white text-sm">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white text-sm">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </div>
                <button @click="toggleMenu"
                    class="text-white focus:outline-none bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                    <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
                        class="text-xl transition-all duration-300"></i>
                </button>
            </div>
        </div>


        <div v-if="isMenuOpen"
            class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
            @click="toggleMenu"></div>

        <div v-if="isMenuOpen"
            class="fixed inset-y-0 right-0 w-80 max-w-full bg-gradient-to-b from-[#6AA1DA] via-[#5B91CA] to-[#4C81BA] text-white z-50 transform transition-all duration-300 ease-out shadow-2xl"
            :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }">


            <div class="flex justify-between items-center p-6 border-b border-white/20">
                <div class="flex items-center space-x-3">
                    <div class="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                        <div
                            class="w-6 h-6 bg-gradient-to-br from-white to-blue-200 rounded flex items-center justify-center">
                            <span class="text-blue-600 font-black text-sm">Q</span>
                        </div>
                    </div>
                    <span class="text-xl font-bold">QMAS</span>
                </div>
                <button @click="toggleMenu"
                    class="text-white bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                    <i class="fas fa-times text-lg"></i>
                </button>
            </div>

            <div class="p-6 space-y-2 flex-1 overflow-y-auto">
                <a href="/#about"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div class="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <i class="fas fa-info-circle text-blue-200"></i>
                    </div>
                    <span class="text-lg">Tentang</span>
                </a>

                <a href="/#services"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div class="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <i class="fas fa-cogs text-blue-200"></i>
                    </div>
                    <span class="text-lg">Layanan</span>
                </a>

                <a href="/#contact"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div class="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <i class="fas fa-envelope text-blue-200"></i>
                    </div>
                    <span class="text-lg">Kontak</span>
                </a>

                <a href="/product-Qmas"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div class="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <i class="fas fa-box-open text-blue-200"></i>
                    </div>
                    <span class="text-lg">Produk Kami</span>
                </a>

                <router-link to="/suara-konsumen"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div class="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <i class="fas fa-newspaper text-blue-200"></i>
                    </div>
                    <span class="text-lg">Suara Konsumen</span>
                </router-link>

                <router-link to="/pengaduan"
                    class="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div class="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <i class="fas fa-comment-alt text-blue-200"></i>
                    </div>
                    <span class="text-lg">Pengaduan</span>
                </router-link>
            </div>


            <div class="p-6 border-t border-white/20">
                <button
                    class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 mb-4">
                    <i class="fas fa-phone-alt"></i>
                    <span>Hubungi Kami</span>
                </button>


                <div class="flex justify-center space-x-6">
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-linkedin-in text-xl"></i>
                    </a>
                    <a href="#" class="text-white/80 hover:text-white hover:scale-110 transition-all duration-300">
                        <i class="fab fa-youtube text-xl"></i>
                    </a>
                </div>

                <div class="text-center mt-4 text-white/60 text-sm">
                    <p>&copy; 2024 QMAS. All rights reserved.</p>
                </div>
            </div>
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
            // Prevent body scroll when menu is open
            if (this.isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
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
            if (this.isMenuOpen) {
                this.isMenuOpen = false;
                document.body.style.overflow = 'auto';
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        document.body.style.overflow = 'auto';
    },
};
</script>

<style scoped>
.hidden-navbar {
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
}

.nav-link {
    position: relative;
    overflow: hidden;
}

.nav-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #fbbf24, #f59e0b);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-link:hover::before {
    width: 100%;
}

/* Custom scrollbar for mobile menu */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* Responsive adjustments */
@media (max-width: 480px) {
    .w-80 {
        width: 100%;
    }
}

@media (max-width: 768px) {
    header .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    header .container {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}

@media (min-width: 1025px) {
    header .container {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }
}

/* Animation for mobile menu */
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.mobile-menu-enter {
    animation: slideIn 0.3s ease-out;
}
</style>