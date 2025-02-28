import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";
/* Import Views */
const SuaraKonsumenView = () =>
  import("@/views/SuaraKonsumen/SuaraKonsumenView.vue");
const DetailSuaraKonsumenView = () =>
  import("@/views/SuaraKonsumen/DetailSuaraKonsumenView.vue");
const KategoriView = () => import("@/views/SuaraKonsumen/KategoriView.vue");
/* Auth LPKNI */
const LoginView = () => import("@/views/Auth-LPKNI/LoginView.vue");
const SignUpView = () => import("@/views/Auth-LPKNI/SignUpView.vue");
const ForgotPasswordView = () =>
  import("@/views/Auth-LPKNI/ForgotPasswordView.vue");
const RequestResetPassword = () =>
  import("@/views/Auth-LPKNI/RequestResetPassword.vue");

/* LPNI */
const Dashboard = () => import("@/views/Lpkni/LandingPage.vue");
/* Anggota */
const FormPengaduan = () => import("@/views/Lpkni/FormPengaduan.vue");
const ProfileAnggotaView = () =>
  import("@/views/Anggota/ProfileAnggotaView.vue");
const PendaftaranAnggotaView = () =>
  import("@/views/Anggota/FormDataAnggotaView.vue");
const DashboardAnggota = () => import("@/views/Anggota/DashboardAnggota.vue");
const FormPengaduanAnggotaView = () =>
  import("@/views/Anggota/FormPengaduanAnggotaView.vue");
const PembayaranAnggotaView = () =>
  import("@/views/Anggota/PembayaranAnggotaView.vue");
const IdCardAnggotaView = () => import("@/views/Anggota/IdCardAnggotaView.vue");
const UploadKegiatan = () => import("@/views/Anggota/UploadKegiatan.vue");
/* Admin */
const DataPendaftaranAnggota = () =>
  import("@/views/Admin/DataPendaftaranAnggota.vue");
const DashboardAdmin = () => import("@/views/Admin/DashboardAdmin.vue");
const DataPembayaran = () => import("@/views/Admin/DataPembayaran.vue");
const DataPengaduanAdmin = () => import("@/views/Admin/DataPengaduanAdmin.vue");
const ManagementJabatan = () => import("@/views/Admin/ManagementJabatan.vue");
const TambahSuaraKonsumen = () =>
  import("@/views/Admin/TambahSuaraKonsumen.vue");
const KegiatanAnggotaAdmin = () =>
  import("@/views/Admin/KegiatanAnggotaAdmin.vue");
/* Tanpa Role Suara Konsumen */
const LoginSwiView = () => import("@/views/Auth-Swi/LoginSwiView.vue");
const SignUpSwiView = () => import("@/views/Auth-Swi/SignUpSwiView.vue");
const RequestResetPasswordSwi = () =>
  import("@/views/Auth-Swi/RequestResetPasswordSwi.vue");
const ForgotPasswordSwiView = () =>
  import("@/views/Auth-Swi/ForgotPasswordSwiView.vue");
const DataDiriKonsumen = () => import("@/views/swi/DataDiriKonsumen.vue");
const KelayakanWarung = () => import("@/views/swi/KelayakanWarung.vue");
const DashboardSwi = () => import("@/views/swi/DashboardSwi.vue");
const MaintenanceView = () => import("@/views/maintenanceView.vue");
const PengaduanSwi = () => import("@/views/swi/PengaduanSwi.vue");
const CetakSertifikatSwi = () => import("@/views/swi/CetakSertifikatSwi.vue");
const PembayaranSwi = () => import("@/views/swi/PembayaranSwi.vue");
const EditSuaraKonsumen = () => import("@/views/Admin/EditSuaraKonsumen.vue");
const DaftarSuaraKonsumen = () =>
  import("@/views/Admin/DaftarSuaraKonsumen.vue");

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
    path: "/suara-konsumen/wilayah/:wilayahid",
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
  {
    path: "/anggota/upload-kegiatan",
    name: "Upload Kegiatan",
    component: UploadKegiatan,
    meta: {
      requiresAuth: true,
      requiredRole: "anggota",
      title: "Upload Kegiatan",
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
    path: "/admin/laporan-kegiatan",
    name: "Management Kegiatan Anggota",
    component: KegiatanAnggotaAdmin,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Management Kegiatan Anggota",
    },
  },
  {
    path: "/admin/pengaduan-suara-konsumen",
    name: "Pengaduan Suara Konsumen",
    component: TambahSuaraKonsumen,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Pengaduan Suara Konsumen",
    },
  },
  {
    path: "/admin/edit-suara-konsumen/:id",
    name: "Edit Suara Konsumen",
    component: EditSuaraKonsumen,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Edit Suara Konsumen",
    },
  },
  {
    path: "/admin/daftar-suara-konsumen",
    name: "Daftar Suara Konsumen",
    component: DaftarSuaraKonsumen,
    meta: {
      requiresAuth: true,
      requiredRole: "admin",
      title: "Daftar Suara Konsumen",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Fungsi untuk scroll ke atas dengan smooth scrolling
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
  document.title = to.meta.title || "LPKNI";
});

export default router;
