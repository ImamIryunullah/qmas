import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";
const ProdukQmas = () => import("@/views/produkQmas.vue");
const Dashboard = () => import("@/views/LandingPage.vue");
const FormPengaduan = () => import("@/views/FormPengaduan.vue");
const pesanProduk = () => import("@/views/pesanProduk.vue");
const kontakQmas = () => import("@/views/kontakQmas.vue");
const newsQmas = () => import("@/views/newsQmas.vue");
const newsQmasDetail = () => import("@/views/newsQmasDetail.vue");
const adminBerita = () => import("@/views/adminBerita.vue");
const adminPesanan = () => import("@/views/adminPesanan");
const adminProduk = () => import("@/views/adminProduk");
const adminAnalitik = () => import("@/views/adminAnalitik");
const adminLogin = () => import("@/views/adminLogin");
const adminPengaturan = () => import("@/views/adminPengaturan");
const adminPengaduanSaran = () => import("@/views/adminPengaduanSaran");

const adminDashboard = () => import("@/views/adminDashboard.vue");

const routes = [
  /* Tanpa Role Suara Konsumen */

  {
    path: "/",
    name: "Qmas | Air Mineral",
    component: Dashboard,
    meta: {
      title: "Qmas | Air Mineral",
    },
  },
  {
    path: "/product-Qmas",
    name: "Product Qmas",
    component: ProdukQmas,
    meta: {
      title: "Product Qmas",
    },
  },
  {
    path: "/pengaduan",
    name: "Pengaduan",
    component: FormPengaduan,
    meta: {
      title: "Pengaduan",
    },
  },
  {
    path: "/pesan-qmas",
    name: "Pesan Qmas",
    component: pesanProduk,
    meta: {
      title: "Pesan Qmas",
    },
  },
  {
    path: "/kontak-kami",
    name: "Kontak Kami",
    component: kontakQmas,
    meta: {
      title: "Kontak Kami",
    },
  },
  {
    path: "/suara-konsumen",
    name: "News Qmas",
    component: newsQmas,
    meta: {
      title: "News Qmas",
    },
  },
  {
    path: "/suara-konsumen/detail",
    name: "News Qmas Detail",
    component: newsQmasDetail,
    meta: {
      title: "News Qmas Detail",
    },
  },

  {
    path: "/admin/dashboard",
    name: "Admin Panel",
    component: adminDashboard,
    meta: {
      title: "Admin Panel",
    },
  },
  {
    path: "/admin/kelola-berita",
    name: "Admin Panel Berita",
    component: adminBerita,
    meta: {
      title: "Admin Panel Berita",
    },
  },
  {
    path: "/admin/kelola-pesanan",
    name: "Admin Panel Pesanan",
    component: adminPesanan,
    meta: {
      title: "Admin Panel Pesanan",
    },
  },
  {
    path: "/admin/kelola-produk",
    name: "Admin Panel Produk",
    component: adminProduk,
    meta: {
      title: "Admin Panel Produk",
    },
  },
  {
    path: "/admin/analytics",
    name: "Admin Panel Analitik",
    component: adminAnalitik,
    meta: {
      title: "Admin Panel Analitik",
    },
  },
  {
    path: "/admin/pengaduan-dan-saran",
    name: "Admin Panel Pengaduan Dan Saran",
    component: adminPengaduanSaran,
    meta: {
      title: "Admin Panel Pengaduan Dan Saran",
    },
  },
  {
    path: "/admin/pengaturan",
    name: "Admin Panel Pengaturan",
    component: adminPengaturan,
    meta: {
      title: "Admin Panel Pengaturan",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: adminLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return { top: 0 };
  },
});

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     // Jika ada savedPosition (misalnya dari tombol 'back' browser), gunakan posisi tersebut
//     if (savedPosition) {
//       return savedPosition;
//     }
//     // Secara default, scroll ke atas
//     return { top: 0 };
//   },
// });

router.beforeEach(async (to, from, next) => {
  var isAuthenticated = null;
  var userRole = null;
  if (to.meta.requiresAuth)
    if (to.meta.requiredRole === "swi") {
      await store.dispatch("storeswi/updateStoreSwi");
      isAuthenticated = store.state.storeswi.userLoggedInSwi;
      userRole = store.state.storeswi.userRoleSwi;
    } else {
      await store.dispatch("updateStoreqmas");
      isAuthenticated = store.state.storeqmas.UserqmasIsLoggedIn;
      userRole = store.state.storeqmas.userqmasRole;
    }

  console.log(isAuthenticated);
  console.log(userRole);
  if (to.meta.requiresAuth && !isAuthenticated) {
    alert("Sesi Anda Habis!");
    next({ name: "Login" });
  } else if (
    to.meta.requiresAuth &&
    to.meta.requiredRole &&
    to.meta.requiredRole !== userRole
  ) {
    alert("Tidak Memiliki Hak Akses!");
    next({ name: "Login" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || "";
});

export default router;
