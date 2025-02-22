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

  <div class="w-full">
    <FooterLandingPage />
  </div>
</template>

<script>
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';
import FooterLandingPage from '@/components/FooterLandingPage.vue';
export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage
  },
  data() {
    return {
      email: "",
      loading: false,
    };
  },
  computed: {
    emailError() {
      return this.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    },
  },
  methods: {
    sendResetLink() {
      if (this.emailError) {
        alert("Silakan masukkan email yang valid!");
        return;
      }
      this.loading = true;

      // Simulasi request API (ganti dengan API reset password)
      setTimeout(() => {
        alert(`Link reset password telah dikirim ke ${this.email}`);
        this.loading = false;
        this.$router.push("/auth/reset-password");
      }, 2000);
    },
  },
};
</script>
