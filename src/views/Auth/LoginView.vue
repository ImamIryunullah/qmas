<template>
  <div class="pb-20 ">
    <NavbarLandingPage />
  </div>

  <div v-if="isMounted" class=" flex justify-center w-full h-full bg-white pb-20 pt-20 ">
    <!-- <img src="@/assets/logoswi.png" alt="SWI Logo" class="w-24 h-auto mb-6" /> -->
    <div class="w-100 bg-white shadow-lg rounded-lg  flex flex-col lg:flex-row animate-fadeInUp">
      <!-- Left Section (Login Form) -->
      <div
        class="w-full lg:w-100 h-full flex flex-col justify-center items-center px-8 lg:px-20 bg-white border border-gray-300 rounded-lg shadow-lg py-8 ">
        <!-- <img src="@/assets/logoswi.png" alt="SWI Logo" class="w-24 h-auto mb-6" /> -->
        <h2 class="text-3xl font-semibold text-red-600 mb-4">Login Sekarang!!</h2>
        <p class="text-sm text-gray-500 mb-6">Silakan masukkan kredensial Anda</p>

        <div class="w-full max-w-md space-y-4">
          <form @submit.prevent="login">
            <!-- Email -->
            <div>
              <label class="text-sm text-gray-500 font-bold">Email</label>
              <input v-model="email" type="email" placeholder="Email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform mt-2 hover:scale-105"
                required />
            </div>

            <!-- Password -->
            <div class="mt-5 mb-5">
              <label class="text-sm text-gray-500 font-bold">Password</label>
              <input v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out mt-2 transform hover:scale-105"
                required />
              <div class="flex items-center mt-3">
                <input type="checkbox" v-model="passwordVisible"
                  class="mr-2 transform transition duration-200 ease-in-out cursor-pointer " />
                <label class="text-sm text-gray-500 font-bold">Tampilkan Password</label>
              </div>
            </div>



            <button type="submit"
              class="w-full h-12 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition hover:scale-105"
              :disabled="loading">
              {{ loading ? 'Loading...' : 'MASUK' }}
            </button>
            <div class="mt-2">
              <router-link to="/lupapassword"
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
      <!-- Right Section (Image) -->
      <!-- <div
        class="w-full  max-h-full bg-red-600 flex flex-col justify-center items-center text-white p-8 shadow-lg rounded-lg ">
        <div class="w-full max-w-[300px] h-[80%] relative">
          <img src="@/assets/iconlpkni.png" alt="Illustration"
            class="w-full h-full object-cover rounded-lg shadow-lg transform transition duration-500 ease-in-out  logo-animate" />
        </div>
        <span class="text-center text-lg font-light px-6 mt-2 italic opacity-90 logo-fade-in">
          "Your premier digital library for borrowing and reading books"
        </span>
      </div> -->

    </div>

  </div>
  <div class="w-full">
    <FooterLandingPage />
  </div>
</template>

<script>
import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
import FooterLandingPage from "@/components/FooterLandingPage.vue";
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
      return this.$store.state.userLoggedIn;
    },
    userRole() {
      return this.$store.state.userRole;
    }
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", { email: this.email, password: this.password });
        if (this.isUserLoggedIn) {
          this.$toast.success("Berhasil login", { position: "top-right", duration: 1000 });
          if (this.userRole === "admin") {
            await this.$router.push("/admin/dashboard");
          } else if (this.userRole === "anggota") {
            await this.$router.push("/anggota/dashboard");
          } else {
            await this.$router.push("/auth/login");
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
