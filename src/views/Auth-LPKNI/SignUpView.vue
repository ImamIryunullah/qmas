<template>

  <div class="pb-20 bg-white">
    <NavbarLandingPage />
  </div>

  <div v-if="isMounted" class=" flex justify-center w-full h-full bg-red-50 pb-20 pt-20 ">
    <!-- Left Section (Background) -->
    <!-- Right Section (Form) -->
    <div
      class="w-full lg:w-100 h-full flex flex-col justify-center items-center px-8 lg:px-20 bg-white border border-gray-300 rounded-lg shadow-lg  animate-fadeInUp">

      <div class="">
        <h2 class="text-3xl font-semibold text-red-600 mb-5 mt-5">Buat Akun Baru</h2>
      </div>
      <p class="text-sm text-gray-500 mb-5">Bergabung Menjadi Anggota LPKNI Wilayah Dan Daerah</p>

      <form @submit.prevent="submitForm" class="w-full max-w-md space-y-5">
        <div class="flex flex-col space-y-2">
          <label for="nama_depan" class="text-sm text-gray-500 font-bold">Nama Depan</label>
          <input v-model="form.nama_depan" id="nama_depan" type="text" placeholder="Nama Depan"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            required />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="nama_belakang" class="text-sm text-gray-500 font-bold">Nama Belakang</label>
          <input v-model="form.nama_belakang" id="nama_belakang" type="text" placeholder="Nama Belakang"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            required />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="no_hp" class="text-sm text-gray-500 font-bold">No Hp</label>
          <input v-model="form.no_hp" id="no_hp" type="text" placeholder="No Hp"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            required />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="email" class="text-sm text-gray-500 font-bold">Email</label>
          <input v-model="form.email" id="email" type="email" placeholder="Email"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            required />
        </div>

        <!-- Password Fields -->
        <div class="flex flex-col relative space-y-2">
          <label for="password" class="text-sm text-gray-500 font-bold">Password</label>
          <input v-model="form.password" :type="passwordVisible ? 'text' : 'password'" id="password"
            placeholder="Password"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            required />

        </div>
        <!-- Show Password Checkbox -->
        <div class="flex items-center">
          <input type="checkbox" v-model="passwordVisible"
            class="mr-2 transform transition duration-200 ease-in-out cursor-pointer " />
          <label class="text-sm text-gray-500 font-bold">Tampilkan Password</label>

        </div>

        <div class="flex flex-col relative space-y-2">
          <label for="confirmpassword" class="text-sm text-gray-500 font-bold">Konfirmasi Password</label>
          <input v-model="form.confirmpassword" :type="passwordVisible ? 'text' : 'password'" id="confirmpassword"
            placeholder="Konfirmasi Password"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            required />
        </div>


        <!-- Submit Button -->
        <button type="submit" class=" mt-6 w-full h-12 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-500 transition
          duration-200 ease-in-out transform hover:scale-105">
          Daftar
        </button>
      </form>



      <!-- Link to Sign In -->
      <p class="mt-4 text-sm text-gray-500 mb-5">
        Sudah Memiliki Akun?
        <router-link to="/auth/login" class="text-red-600 font-semibold hover:underline ">Masuk Sekarang</router-link>
      </p>

    </div>

  </div>
  <div class="w-full">
    <FooterLandingPage />
  </div>
</template>

<script>
import Api from "@/service/lpkni.js";
import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
import FooterLandingPage from "@/components/FooterLandingPage.vue";
export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage
  },
  data() {
    return {
      isMounted: false,
      passwordVisible: false, // Menyembunyikan atau menampilkan password
      form: {
        nama_depan: "",
        nama_belakang: "",
        no_hp: "",
        email: "",
        password: "",
        confirmpassword: "",
        username: "",
      },
    };
  },
  mounted() {
    this.isMounted = true;
  },
  computed: {
    // Generate username based on first name, last name, and email
    generatedUsername() {
      if (this.form.nama_depan && this.form.nama_belakang && this.form.email) {
        const usernameBase =
          this.form.nama_depan.substring(0, 3).toLowerCase() +
          this.form.nama_belakang.substring(0, 3).toLowerCase();
        const randomNumber = Math.floor(Math.random() * 1000);
        return usernameBase + randomNumber;
      }
      return ""; // Return empty if inputs are not filled
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    isFormInvalid() {
      // Validate form inputs and check if password and confirm password match
      return (
        !this.form.nama_depan ||
        !this.form.nama_belakang ||
        !this.form.no_hp ||
        !this.form.email ||
        !this.form.password ||
        !this.form.confirmpassword
      );
    },
    submitForm() {
      if (this.isFormInvalid()) {
        alert("Lengkapi Data Anda!");
        return;
      }
      if (this.form.password !== this.form.confirmpassword) {
        alert("Password Anda Tidak Cocok");
        return;
      }
      const userData = {
        nama_depan: this.form.nama_depan,
        nama_belakang: this.form.nama_belakang,
        no_hp: this.form.no_hp,
        email: this.form.email,
        username: this.generatedUsername, // Use generated username
        password: this.form.password,
      };
      console.log(userData);
      Api.CreateUser(userData)
        .then((res) => {
          alert(res.data.message);
          this.$router.push("/auth/login");
        })
        .catch((error) => {
          if (error.response) {
            alert(`${error.response.data.error}`);
          } else if (error.request) {
            alert("No response from server.");
          } else {
            alert(`Error: ${error.message}`);
          }
        });
    },
  },
};
</script>

<style scoped>
.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-in-out;
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
</style>
