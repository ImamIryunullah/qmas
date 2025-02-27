<template>
    <div class="relative flex">
        <!-- Tombol Hamburger -->
        <button v-if="!sidebarOpen || isDesktop" @click="toggleSidebar" type="button"
            class="fixed top-4 left-4 z-50 p-4 text-gray-800 rounded-lg sm:left-64 sm:hidden">
            <span class="sr-only">Open sidebar</span>
            <i class="fa fa-bars fa-2x"></i>
        </button>
        <!-- Sidebar -->
        <aside
            :class="{ 'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen, 'sm:w-64 sm:translate-x-0': sidebarOpen || isDesktop }"
            class="fixed top-0 left-0 z-40 w-64 h-screen bg-emerald-600 text-white shadow-lg transition-transform sm:translate-x-0 flex flex-col">

            <div class="px-4 py-5 bg-emerald-600 flex items-center justify-between">
                <div class="flex flex-col space-y-1 ml-2">
                    <div class="flex items-center space-x-3">
                        <img :src="getfullPathImage('assets/logoswi.png')" alt="Logo SWI" class="w-10 h-10 ml-20" />
                    </div>
                    <p class="text-extrabold text-black">Standarisasi Warung Indonesia</p>
                </div>
                <!-- Tombol close -->
                <button @click="toggleSidebar" class="text-white text-2xl sm:hidden">
                    <i class="fa fa-angle-left"></i>
                </button>
            </div>

            <!-- Menu Navigasi -->
            <nav class="flex-1 overflow-y-auto">
                <ul class="space-y-2 font-medium px-3 py-2">
                    <li v-for="item in menuItems" :key="item.path">
                        <router-link :to="item.path"
                            class="flex items-center p-3 rounded-lg bg-emerald-450 hover:bg-emerald-900 transition">
                            <i :class="item.icon" class="w-6"></i>
                            <span class="ml-3">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>

            <!-- Waktu Sekarang -->
            <div class="text-center text-sm font-medium p-3 border-b border-green-600">
                {{ currentTime }}
            </div>

            <!-- Tombol Logout -->
            <div class="p-4 border-t border-green-600">
                <button @click="logout"
                    class="flex items-center py-3 px-4 w-full rounded-md bg-white hover:bg-emerald-200 transition">
                    <i class="fas fa-sign-out-alt w-6 text-emerald-700"></i>
                    <span class="ml-3 text-emerald-700 text-extrabold">Logout</span>
                </button>
            </div>
        </aside>

        <!-- Overlay untuk menutup sidebar ketika di mode mobile -->
        <div v-if="sidebarOpen && !isDesktop" @click="toggleSidebar"
            class="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"></div>

    </div>
</template>

<script>
import swi from '@/service/swi';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            sidebarOpen: false,
            isDesktop: window.innerWidth >= 768,
            currentTime: "",
            menuItems: [
                { label: "Dashboard", path: "/swi/dashboard", icon: "fas fa-home" },
                { label: "Data Diri & Warung", path: "/swi/data-diri", icon: "fas fa-user-check" },
                { label: "Kelayakan Warung", path: "/swi/kelayakan-warung", icon: "fas fa-store-alt" },
                { label: "Pembayaran", path: "/swi/pembayaran", icon: "fas fa-money" },
                { label: "Pengaduan", path: "/swi/pengaduan", icon: "fas fa-exclamation-triangle" },
                { label: "Cetak Sertifikat", path: "/swi/cetak-sertifikat", icon: "fas fa-id-card" },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        async logout() {
            try {
                await this.$store.dispatch("storeswi/logoutSwi");
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Logout',
                });
                await this.$router.push("/auth/swi/login");
            } catch (e) {
                console.log(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Gagal',
                });
                return;
            }
        },
        getfullPathImage(img) {
            return swi.getfullpathImageSwi(img)
        },
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        },
        checkScreenSize() {
            this.isDesktop = window.innerWidth >= 768;
            if (this.isDesktop) {
                this.sidebarOpen = true;
            } else {
                this.sidebarOpen = false;
            }
        }
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000); // Perbarui waktu setiap detik
        this.checkScreenSize();
        window.addEventListener("resize", this.checkScreenSize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkScreenSize);
    }
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

/* Sidebar */
aside {
    width: 16rem;
}

/* Animasi Halus */
.transition-all {
    transition: all 0.9s ease-in-out;
}

/* Menghindari overflow di mode mobile */
html,
body {
    overflow-x: hidden;
}
</style>
