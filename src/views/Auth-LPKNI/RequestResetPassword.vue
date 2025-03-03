<template>

  <div class="pb-20">
    <NavbarLandingPage />
  </div>

  <div class="min-h-screen flex items-center justify-center bg-red-50">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">🔑 Lupa Password</h2>
      <p class="text-sm text-gray-600 text-center mb-6">Masukkan email Anda untuk mendapatkan link reset password.</p>

      <form @submit.prevent="sendResetLink">
        <!-- Input Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan email Anda" required />
          <p v-if="emailError" class="text-red-600 text-sm mt-1">Format email tidak valid!</p>
        </div>

        <!-- Tombol Kirim -->
        <button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition"
          :disabled="loading">
          {{ loading ? "Mengirim..." : "Kirim Link Reset" }}
        </button>
      </form>

      <p class="mt-4 text-sm text-gray-500 text-center">
        Ingat password Anda?
        <router-link to="/auth/login" class="text-red-600 font-semibold hover:underline">Login</router-link>
      </p>
    </div>
  </div>
  <!-- Overlay loading -->
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="text-white text-lg">Sedang Memuat...</div>
    <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
  </div>
  <div class="w-full">
    <FooterLandingPage />
  </div>
</template>

<script>
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';
import FooterLandingPage from '@/components/FooterLandingPage.vue';
import emailjs from 'emailjs-com';
import lpkni from '@/service/lpkni';
import Swal from 'sweetalert2';
export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage
  },
  data() {
    return {
      email: '', // Email input from the user
      user_id: 'TD5gB-1e06rK4V9eK', // Your user_id from Mail.js
      service_id: 'service_8de02h3', // Your service_id from Mail.js
      template_id: 'template_ot3ejei', // Your template_id from Mail.js
      loading: false,
      token: '',
      nama_lengkap: '',
      isLoading: false
    };
  },
  computed: {
    emailError() {
      return this.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    },
  },
  methods: {
    async sendResetLink() {
      this.isLoading = true;
      const form = { email: this.email }
      lpkni.RequesTokenResetPassword(form).then(async (res) => {
        this.token = res.data.token
        this.nama_lengkap = res.data.nama_lengkap
        const templateParams = {
          from_name: 'LPKNI SERVICES',
          to_name: this.nama_lengkap,
          email: this.email,
          subject: 'Permintaan Reset Kata Sandi',
          message: `Untuk mereset kata sandi Anda, silakan klik tautan berikut : `,
          link: `https://lpkni.id/auth/reset-password/${this.token}`
        };
        await emailjs.send(this.service_id, this.template_id, templateParams, this.user_id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Cek Email Anda Sekarang, Untuk Mengganti Kata Sandi',
            });
            setTimeout(() => {
              this.$router.push('/auth/login')
            }, 1000);
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal',
              text: 'Silahkan Coba Lagi, Masukan Email Anda Dengan Benar',
            });
            return;
          });
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Silahkan Coba Lagi',
        });
        return;
      }).finally(() => {
        this.isLoading = false;
      })

    }
  },
};
</script>
