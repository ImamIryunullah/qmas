<template>
  <div class="pb-20">
    <NavbarLandingPage />
  </div>

  <div v-if="isMounted"
    class=" flex justify-center w-full h-full bg-gradient-to-r from-red-400 to-red-600 pb-20 pt-20 ">
    <div class="hidden lg:flex lg:w-1/2 rounded-l-lg overflow-hidden border-2 border-white object-cover">
      <img src="@/assets/pasar.jpg" alt="Login Illustration" class="w-full h-full object-cover ">
    </div>

    <div class="w-100 bg-white rounded-lg  flex flex-col lg:flex-row animate-fadeInUp">
      <!-- Left Section (Login Form) -->
      <div
        class="w-full lg:w-100 h-full flex flex-col justify-center items-center px-8 lg:px-20 bg-white border border-gray-300 rounded-r py-8 ">
        <div class="text-center md:text-left">
          <h2 class="text-xl md:text-2xl font-bold text-red-600 mb-4 flex items-center justify-center md:justify-start">
            <i class="fas fa-sign-in-alt text-red-600 mr-2"></i> Selamat Datang Kembali
          </h2>
          <p class="text-sm md:text-base text-gray-700 mb-6 text-center md:text-left">
            Login sekarang untuk melanjutkan
          </p>
        </div>


        <div class="w-full max-w-md space-y-4">
          <form @submit.prevent="login">
            <!-- Email -->
            <div>
              <label class="text-sm text-gray-500 font-bold">Email</label>
              <div class="relative">
                <input v-model="email" type="email" placeholder="Email"
                  class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform "
                  required />
                <i class="fas fa-envelope absolute left-3 top-4 text-gray-400"></i>
              </div>
            </div>

            <!-- Password -->
            <div class="mt-5 mb-5">
              <label class="text-sm text-gray-500 font-bold">Password</label>
              <div class="relative w-full">
                <input v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Password"
                  class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2 transform "
                  required />
                <i class="fas fa-lock absolute left-3 top-6 text-gray-400"></i>
              </div>
              <div class="flex items-center mt-3">
                <input type="checkbox" v-model="passwordVisible"
                  class="mr-2 transform transition duration-200 ease-in-out cursor-pointer " />
                <label class="text-sm text-gray-500 font-bold">Tampilkan Password</label>
              </div>
            </div>

            <button type="submit" class="w-full h-12 bg-red-600 text-white font-bold rounded-lg hover:bg-red-800"
              :disabled="loading">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i> {{ loading ? 'Loading...' : 'MASUK' }}
            </button>
            <div class="mt-2">
              <router-link to="/auth/lupa-kata-sandi"
                class="text-red-600 font-bold mb-3 block text-left underline hover:scale-105">Lupa
                password?</router-link>
            </div>

          </form>
          <p class="mt-2 text-sm text-gray-500 hover:scale-105">
            Belum memiliki Akun?
            <router-link to="/auth/register-anggota" class="text-red-600 font-semibold hover:underline ">Daftar
              Sekarang</router-link>
          </p>
        </div>

      </div>
    </div>

  </div>
  <div class="w-full">
    <FooterLandingPage />
  </div>
</template>

<script>
import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
import FooterLandingPage from "@/components/FooterLandingPage.vue";
import lpkni from '@/service/lpkni';
import Swal from 'sweetalert2';

export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage
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
      return this.$store.state.storeLpkni.UserLpkniIsLoggedIn;
    },
    userRole() {
      return this.$store.state.storeLpkni.userLpkniRole;
    }
  },
  mounted() {
    this.isMounted = true;
    this.getHealth()
  },
  methods: {
    async getHealth() {
      await lpkni.getHealthlpkni().then(() => {

      }).catch(() => {
        this.$router.push('/maintenance');
      })
    },
    async login() {
      try {
        // Dispatch login action to Vuex store
        await this.$store.dispatch("loginLpkni", { email: this.email, password: this.password });
        console.log(this.isUserLoggedIn)

        // Check if the user is logged in
        if (this.isUserLoggedIn) {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil Login',
            text: 'Selamat datang kembali!',
            timer: 1500,
            showConfirmButton: false,
          });

          // Redirect based on user role
          if (this.userRole === "admin") {
            await this.$router.push("/admin/dashboard");
          } else if (this.userRole === "anggota") {
            await this.$router.push("/anggota/dashboard");
          } else {
            await this.$router.push("/auth/login");
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Login',
          text: `${error}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
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
