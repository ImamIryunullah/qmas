<template>
  <div class="pb-20 ">
    <NavbarSwiAuth />
  </div>
  <div v-if="isMounted"
    class="flex justify-center items-center w-full min-h-screen bg-gradient-to-r from-green-300 to-green-700 py-10">

    <div class="hidden lg:flex lg:w-1/2 h-[508px] rounded-l-lg overflow-hidden border-2 object-cover border-white">
      <img src="@/assets/gaga.jpg" alt="Login Illustration" class="w-full h-full object-cover">
    </div>

    <!-- Kolom Form Login -->
    <div class="w-full lg:w-100 flex flex-col justify-center items-center px-8 lg:px-20 py-9 bg-white rounded-r-lg">

      <div class="text-center md:text-left">
        <h2 class="text-xl md:text-2xl font-bold text-green-600 mb-4 flex items-center justify-center md:justify-start">
          <i class="fas fa-sign-in-alt text-green-600 mr-2"></i> Selamat Datang Kembali
        </h2>
        <p class="text-sm md:text-base text-gray-700 mb-6 text-center md:text-left">
          Login sekarang untuk melanjutkan
        </p>
      </div>

      <div class="w-full max-w-md">
        <form @submit.prevent="login">
          <!-- Email -->
          <div>
            <label class="text-sm text-gray-500 font-bold">Email</label>
            <div class="relative">
              <input v-model="email" type="email" placeholder="Email"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600" required />
              <i class="fas fa-envelope absolute left-3 top-4 text-gray-400"></i>
            </div>
          </div>

          <!-- Password -->
          <div class="mt-5">
            <label class="text-sm text-gray-500 font-bold">Password</label>
            <div class="relative w-full">
              <input v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Password"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600" required />
              <i class="fas fa-lock absolute left-3 top-4 text-gray-400"></i>
            </div>
            <div class="flex items-center mt-3">
              <input type="checkbox" v-model="passwordVisible" class="mr-2 cursor-pointer" />
              <label class="text-sm text-gray-500 font-bold">Tampilkan Password</label>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit"
            class="w-full h-12 bg-green-600 text-white font-bold rounded-lg hover:bg-green-800 mt-5 transition-transform transform hover:scale-105"
            :disabled="loading">
            <i v-if="loading" class="fas fa-spinner fa-spin"></i> {{ loading ? 'Loading...' : 'MASUK' }}
          </button>

          <!-- Forgot Password -->
          <div class="mt-3 text-center">
            <router-link to="/auth/swi/get-reset-password"
              class="text-green-600 font-bold underline hover:text-green-800">
              Lupa password?
            </router-link>
          </div>

          <!-- Register -->
          <p class="mt-4 text-sm text-gray-500 text-center">
            Belum memiliki akun SWI?
            <router-link to="/auth/swi/register" class="text-green-600 font-semibold hover:underline">Daftar
              Sekarang</router-link>
          </p>

        </form>
      </div>
    </div>

  </div>

  <div class="w-full">
    <FooterSwiAuth />
  </div>
</template>

<script>
import NavbarSwiAuth from "@/components/NavbarSwi.vue";
import FooterSwiAuth from "@/components/FooterSwiAuth.vue";
import swi from "@/service/swi";
import Swal from 'sweetalert2';
export default {
  components: {
    NavbarSwiAuth,
    FooterSwiAuth
  },
  data() {
    return {
      passwordVisible: false,
      isMounted: false,
      email: null,
      password: null,
      errorMessage: "",
      loading: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.storeswi.userLoggedInSwi;
    },
    userRole() {
      return this.$store.state.storeswi.userRoleSwi;
    }
  },
  mounted() {
    this.isMounted = true;
    this.getHealth()
  },
  methods: {
    async getHealth() {
      await swi.getHealthSwi().then(() => {

      }).catch(() => {
        this.$router.push('/maintenance');
      })
    },
    async login() {
      try {
        await this.$store.dispatch("storeswi/loginSwi", { email: this.email, password: this.password });
        if (this.isUserLoggedIn) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil Login',
          });
          if (this.userRole === "swi") {
            await this.$router.push("/swi/dashboard");
          }
        }
      } catch (error) {
        this.$toast.error(`${error}`, { position: "top-right", duration: 1000 });
      }
    },
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 mb-4;
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-in-out;
}

.container {
  max-width: 100%;
}

.login-form-container {
  background-color: #ffffff;
}

.image-container {
  background-color: #03a980;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media query for mobile view */
@media screen and (max-width: 100px) {
  .login-form-container {
    padding: 40px 20px;
  }

  /* Hide image section for smaller screens */
  .image-container {
    display: none;
  }


}
</style>
