import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";
import ProdukQmas from "@/views/produkQmas.vue";
const Dashboard = () => import("@/views/LandingPage.vue");
const FormPengaduan = () => import("@/views/FormPengaduan.vue");
const pesanProduk = () => import("@/views/pesanProduk.vue");
const kontakQmas = () => import("@/views/kontakQmas.vue");
const routes = [
  /* Tanpa Role Suara Konsumen */

  {
    path: "/",
    name: "Dasboard",
    component: Dashboard,
  },
  {
    path: "/product-Qmas",
    name: "Product Qmas",
    component: ProdukQmas,
  },
  {
    path: "/pengaduan",
    name: "Pengaduan",
    component: FormPengaduan,
  },
  {
    path: "/pesan-qmas",
    name: "Pesan Qmas",
    component: pesanProduk,
  },
  {
    path: "/kontak-kami",
    name: "Kontak Kami",
    component: kontakQmas,
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
      await store.dispatch("updateStoreLpkni");
      isAuthenticated = store.state.storeLpkni.UserLpkniIsLoggedIn;
      userRole = store.state.storeLpkni.userLpkniRole;
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
  document.title = to.meta.title || "LPKNI Official";
});

export default router;
