import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";
/* Import Views */
import SuaraKonsumenView from "@/views/SuaraKonsumen/SuaraKonsumenView.vue";
import DetailSuaraKonsumenView from "@/views/SuaraKonsumen/DetailSuaraKonsumenView.vue";
import KategoriView from "@/views/SuaraKonsumen/KategoriView.vue";
/* Auth LPKNI */
import LoginView from "@/views/Auth-LPKNI/LoginView.vue";
import SignUpView from "@/views/Auth-LPKNI/SignUpView.vue";
import ForgotPasswordView from "@/views/Auth-LPKNI/ForgotPasswordView.vue";
import RequestResetPassword from "@/views/Auth-LPKNI/RequestResetPassword.vue";

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
/* Tanpa Role Suara Konsumen */
import LoginSwiView from "@/views/Auth-Swi/LoginSwiView.vue";
import SignUpSwiView from "@/views/Auth-Swi/SignUpSwiView.vue";
import RequestResetPasswordSwi from "@/views/Auth-Swi/RequestResetPasswordSwi.vue";
import ForgotPasswordSwiView from "@/views/Auth-Swi/ForgotPasswordSwiView.vue";
import DataDiriKonsumen from "@/views/swi/DataDiriKonsumen.vue";
import KelayakanWarung from "@/views/swi/KelayakanWarung.vue";
import DashboardSwi from "@/views/swi/DashboardSwi.vue";
import MaintenanceView from "@/views/maintenanceView.vue";
import PengaduanSwi from "@/views/swi/PengaduanSwi.vue";
import CetakSertifikatSwi from "@/views/swi/CetakSertifikatSwi.vue";
import PembayaranSwi from "@/views/swi/PembayaranSwi.vue";

const routes = [
  {
    path: "/maintenance",
    name: "Maintencance",
    component: MaintenanceView,
  },
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
  /* Auth LPKNI*/
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
  {
    path: "/auth/reset-password/:token",
    name: "Reset Password Anggota",
    component: ForgotPasswordView,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/lupa-kata-sandi",
    name: "Lupa Kata Sandi",
    component: RequestResetPassword,
    meta: { requiresAuth: false },
  },

  /*Auth SWI*/
  {
    path: "/auth/swi/login",
    name: "Login Swi",
    component: LoginSwiView,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/swi/register",
    name: "Register SWI",
    component: SignUpSwiView,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/swi/get-reset-password",
    name: "GetResetPassword",
    component: RequestResetPasswordSwi,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/swi/reset-password",
    name: "gantisandiswi",
    component: ForgotPasswordSwiView,
    meta: { requiresAuth: false },
  },
  /* Role Swi */
  {
    path: "/swi/data-diri",
    name: "Data Diri SWI",
    component: DataDiriKonsumen,
    meta: {
      requiresAuth: true,
      requiredRole: "swi",
      title: "Data Diri SWI",
    },
  },
  {
    path: "/swi/kelayakan-warung",
    name: "kelayakan warung",
    component: KelayakanWarung,
    meta: {
      requiresAuth: true,
      requiredRole: "swi",
      title: "Kelayakan Warung",
    },
  },
  {
    path: "/swi/dashboard",
    name: "Dashboard SWI",
    component: DashboardSwi,
    meta: {
      requiresAuth: true,
      requiredRole: "swi",
      title: "Dashboard SWI",
    },
  },
  {
    path: "/swi/pengaduan",
    name: "Pengaduan Swi",
    component: PengaduanSwi,
    meta: {
      requiresAuth: true,
      requiredRole: "swi",
      title: "Dashboard SWI",
    },
  },
  {
    path: "/swi/cetak-sertifikat",
    name: "Cetak Sertifikat Swi",
    component: CetakSertifikatSwi,
    meta: {
      requiresAuth: true,
      requiredRole: "swi",
      title: "Dashboard SWI",
    },
  },
  {
    path: "/swi/pembayaran",
    name: "Pembayaran Swi",
    component: PembayaranSwi,
    meta: {
      requiresAuth: true,
      requiredRole: "swi",
      title: "Dashboard SWI",
    },
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
  document.title = to.meta.title || "LPKNI";
});

export default router;
