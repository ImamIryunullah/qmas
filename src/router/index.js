import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";
/* Import Views */
import SuaraKonsumenView from "@/views/SuaraKonsumen/SuaraKonsumenView.vue";
import DetailSuaraKonsumenView from "@/views/SuaraKonsumen/DetailSuaraKonsumenView.vue";
import KategoriView from "@/views/SuaraKonsumen/KategoriView.vue";
/* Auth */
import LoginView from "@/views/Auth/LoginView.vue";
import SignUpView from "@/views/Auth/SignUpView.vue";
/* Pusat */
import VerifikasiAnggotaPusatView from "@/views/Pusat/VerifikasiAnggotaPusatView.vue";
/* LPNI */
import Dashboard from "@/views/Lpkni/LandingPage.vue";
/* Anggota */
import FormPengaduan from "@/views/Lpkni/FormPengaduan.vue";
import ProfileAnggotaView from "@/views/Anggota/ProfileAnggotaView.vue";
import PendaftaranAnggotaView from "@/views/Anggota/FormDataAnggotaView.vue";
import DashboardAnggota from "@/views/Anggota/DashboardAnggota.vue";
import FormPengaduanAnggotaView from "@/views/Anggota/FormPengaduanAnggotaView.vue";
import PembayaranAnggotaView from "@/views/Anggota/PembayaranAnggotaView.vue";
import IdCardAnggotaView from "@/views/Anggota/IdCardAnggotaView.vue";
/* Admin */
import DataPendaftaranAnggota from "@/views/Admin/DataPendaftaranAnggota.vue";
import DashboardAdmin from "@/views/Admin/DashboardAdmin.vue";
import DataPembayaran from "@/views/Admin/DataPembayaran.vue";
import DataPengaduanAdmin from "@/views/Admin/DataPengaduanAdmin.vue";
import ManagementJabatan from "@/views/Admin/ManagementJabatan.vue";
import KelolaPengaduanData from "@/views/Admin/KelolaPengaduanData.vue";

const routes = [
  /* Tanpa Role Suara Konsumen */
  {
    path: "/suara-konsumen",
    name: "Suara Konsumen",
    component: SuaraKonsumenView,
  },
  {
    path: "/suara-konsumen/detail/:id",
    name: "Detail Suara Konsumen",
    component: DetailSuaraKonsumenView,
  },
  {
    path: "/suara-konsumen/kategori/:kategori",
    name: "Kategori Suara Konsumen",
    component: KategoriView,
  },
  /* Auth */
  {
    path: "/auth/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/register-anggota",
    name: "Register Anggota",
    component: SignUpView,
    meta: { requiresAuth: false },
  },
  /* Role Pusat */
  {
    path: "/pusat/verifikasi-anggota",
    name: "Register Pusat",
    component: VerifikasiAnggotaPusatView,
    meta: { requiresAuth: true, requiredRole: "pusat" },
  },
  /* Role Anggota */
  {
    path: "/anggota/dashboard",
    name: "Dashboard Anggota",
    component: DashboardAnggota,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "Dashboard Anggota",
    },
  },
  {
    path: "/anggota/data-diri",
    name: "Data Diri Anggota",
    component: PendaftaranAnggotaView,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "Data Diri Anggota",
    },
  },
  {
    path: "/anggota/profile",
    name: "Profile Anggota",
    component: ProfileAnggotaView,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "Profile Anggota",
    },
  },
  {
    path: "/anggota/pengaduan",
    name: "Pengaduan Anggota",
    component: FormPengaduanAnggotaView,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "Pengaduan Anggota",
    },
  },
  {
    path: "/anggota/pembayaran",
    name: "Pembayaran Anggota",
    component: PembayaranAnggotaView,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "Pembayaran Anggota",
    },
  },
  {
    path: "/anggota/id-card",
    name: "ID Card Anggota",
    component: IdCardAnggotaView,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "ID Card Anggota",
    },
  },
  /* Tanpa Role LPKNI */
  {
    path: "/",
    name: "Dasboard",
    component: Dashboard,
  },
  {
    path: "/pengaduan",
    name: "Pengaduan",
    component: FormPengaduan,
  },

  /* Admin */
  {
    path: "/admin/data-pendaftaran-anggota",
    name: "Data Anggota Admin",
    component: DataPendaftaranAnggota,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Data Anggota Admin",
    },
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard Admin",
    component: DashboardAdmin,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Dashboard Admin",
    },
  },
  {
    path: "/admin/data-pembayaran-anggota",
    name: "Data Pembayaran",
    component: DataPembayaran,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Data Pembayaran",
    },
  },
  {
    path: "/admin/data-pengaduan",
    name: "Data Pengaduan",
    component: DataPengaduanAdmin,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Data Pengaduan",
    },
  },
  {
    path: "/admin/management-jabatan",
    name: "Management Jabatan",
    component: ManagementJabatan,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Management Jabatan",
    },
  },
  {
    path: "/admin/pengaduan-suara-konsumen",
    name: "Pengaduan Suara Konsumen",
    component: KelolaPengaduanData,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Pengaduan Suara Konsumen",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("updateStore");
  const isAuthenticated = store.state.userLoggedIn;
  const userRole = store.state.userRole;
  // console.log(isAuthenticated);
  // console.log(userRole);
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
  document.title = to.meta.title || "LPKNI";
});

export default router;
