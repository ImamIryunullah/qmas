<template>

  <div class="pb-20 ">
    <NavbarSwiAuth />
  </div>

  <div class="min-h-screen flex items-center justify-center bg-green-50">
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
          <p v-if="emailError" class="text-green-600 text-sm mt-1">Format email tidak valid!</p>
        </div>

        <!-- Tombol Kirim -->
        <button type="submit"
          class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition"
          :disabled="loading">
          {{ loading ? "Mengirim..." : "Kirim Link Reset" }}
        </button>
      </form>

      <p class="mt-4 text-sm text-gray-500 text-center">
        Ingat password Anda?
        <router-link to="/auth/swi/login" class="text-green-600 font-semibold hover:underline">Login</router-link>
      </p>
    </div>
  </div>

  <div class="w-full">
    <FooterSwiAuth />
  </div>
</template>

<script>
import NavbarSwiAuth from "@/components/NavbarSwi.vue";
import FooterSwiAuth from "@/components/FooterSwiAuth.vue";
import emailjs from 'emailjs-com';
import swi from '@/service/swi';
export default {
  components: {
    NavbarSwiAuth,
    FooterSwiAuth
  },
  data() {
    return {
      email: '', // Email input from the user
      user_id: 'TD5gB-1e06rK4V9eK', // Your user_id from Mail.js
      service_id: 'service_8de02h3', // Your service_id from Mail.js
      template_id: 'template_ot3ejei', // Your template_id from Mail.js
      loading: false,
      token: '',
      nama_lengkap: ''
    };
  },
  computed: {
    emailError() {
      return this.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    },
  },
  methods: {
    async sendResetLink() {
      const form = { email: this.email }
      swi.RequesTokenResetPassword(form).then(async (res) => {
        this.token = res.data.token
        this.nama_lengkap = res.data.nama_lengkap
        const templateParams = {
          from_name: 'LPKNI SERVICES',
          to_name: this.nama_lengkap,
          email: this.email,
          subject: 'Permintaan Reset Kata Sandi',
          message: `Untuk mereset kata sandi Anda, silakan klik tautan berikut : `,
          link: `http://192.168.1.39:8080/auth/swi/reset-password/${this.token}`
        };
        await emailjs.send(this.service_id, this.template_id, templateParams, this.user_id)
          .then(response => {
            console.log('Email sent successfully:', response);
            alert('Password reset email sent successfully!');
          })
          .catch(error => {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again later.');
          });
      }).catch((error) => {
        this.$toast.error(`Gagal ${error.response.message}`)
      })

    }
  },
};
</script>
