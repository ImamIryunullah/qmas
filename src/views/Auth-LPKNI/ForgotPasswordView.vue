<template>
  <div class="pb-20">
    <NavbarLandingPage />
  </div>
  <div class="min-h-screen flex items-center justify-center bg-red-50">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Ganti Password</h2>
      <p class="text-sm text-gray-600 text-center mb-6">Silakan masukkan password lama dan password baru.</p>

      <form @submit.prevent="changePassword">
        <!-- Password Baru -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Password Baru</label>
          <div class="relative">
            <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password baru" required minlength="6" />
            <button type="button" @click="toggleNewPassword" class="absolute right-3 top-3 text-gray-500">
              <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Konfirmasi Password Baru -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
          <div class="relative">
            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Konfirmasi password baru" required />
            <button type="button" @click="toggleConfirmPassword" class="absolute right-3 top-3 text-gray-500">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <p v-if="passwordMismatch" class="text-red-600 text-sm mt-1">Password baru tidak cocok!</p>
        </div>

        <!-- Tombol Submit -->
        <button type="submit"
          class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition">
          Simpan Perubahan
        </button>
        <div class="mt-2">
          <router-link to="/auth/login"
            class="text-red-600 font-bold mb-3 block text-left underline hover:scale-105">Kembali Ke Login</router-link>
        </div>

      </form>
    </div>

  </div>

  <div class="w-full">
    <FooterLandingPage />
  </div>
</template>

<script>
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';
import FooterLandingPage from '@/components/FooterLandingPage.vue';
import lpkni from '@/service/lpkni';
import Swal from 'sweetalert2';
export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      token: this.$route.query.token || this.$route.params.token, // Ambil token dari query atau path
    };
  },
  computed: {
    passwordMismatch() {
      return this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword;
    },

  },
  mounted() {
    const token = this.$route.params.token;
    this.token = this.$route.params.token;
    console.log("Token from route: ", token);
    this.CheckvalidToken(token)
  },


  methods: {
    async CheckvalidToken(token) {
      await lpkni.CheckpasswordToken(token).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Token Valid!',
          text: 'Token yang Anda masukkan valid.',
          timer: 1500,
          showConfirmButton: false

        });
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Token Tidak Valid!',
          text: 'Token yang Anda masukkan tidak valid.',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.$router.push('/auth/lupa-kata-sandi');
        }, 1000);
      });
    },

    toggleOldPassword() {
      this.showOldPassword = !this.showOldPassword;
    },

    toggleNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    changePassword() {
      if (this.passwordMismatch) {
        Swal.fire({
          icon: 'error',
          title: 'Password Tidak Sama!',
          text: 'Harap coba lagi, password yang Anda masukkan tidak cocok.',
          timer: 1500,
          showConfirmButton: false
        });
        return;
      }
      this.token = this.$route.params.token;
      const form = { new_password: this.newPassword };

      lpkni.ChangePassword(this.token, form).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Password Diubah!',
          text: 'Password Anda berhasil diubah. Silahkan login.',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.$router.push('/auth/login');
        }, 1000);
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Password Gagal Diubah!',
          text: 'Terjadi kesalahan saat mengubah password. Harap coba lagi.',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.$router.push('/auth/lupa-kata-sandi');
        }, 1000);
      });
    }
  }

};
</script>
