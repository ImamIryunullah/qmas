<template>
  <div class="w-screen min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <NavbarPusat />

    <!-- Content Wrapper -->
    <div class="flex flex-col items-center px-10 py-6 mt-[90px] flex-grow">
      <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-[#03a980] text-center mb-6">Profil Pusat</h2>

        <!-- Foto Profil -->
        <div class="flex flex-col items-center">
          <img :src="profileImage" alt="" class="w-24 h-24 rounded-full border border-gray-300">
          <input type="file" @change="uploadImage" class="mt-3 text-sm text-gray-600">
        </div>

        <!-- Form Profil -->
        <form @submit.prevent="updateProfile" class="mt-6 space-y-4">
          <div>
            <label class="text-gray-700 font-semibold">Nama</label>
            <input v-model="profile.nama" type="text" class="input-field" required>
          </div>
          <div>
            <label class="text-gray-700 font-semibold">Email</label>
            <input v-model="profile.email" type="email" class="input-field" required>
          </div>
          <div>
            <label class="text-gray-700 font-semibold">No. Telepon</label>
            <input v-model="profile.noTelepon" type="text" class="input-field" required>
          </div>
          <div>
            <label class="text-gray-700 font-semibold">Alamat</label>
            <input v-model="profile.alamat" type="text" class="input-field">
          </div>
          <div>
            <label class="text-gray-700 font-semibold">Username</label>
            <input v-model="profile.username" type="text" class="input-field" disabled>
          </div>
          <!-- Tombol Simpan -->
          <button type="submit"
            class="w-full bg-[#03a980] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#028a66] transition">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPusat from '@/components/NavbarPusat.vue';

export default {
  components: {
    NavbarPusat
  },
  data() {
    return {
      profileImage: 'https://via.placeholder.com/100', // Placeholder profile image
      profile: {
        nama: "Admin Pusat",
        email: "pusat@mail.com",
        noTelepon: "08123456789",
        alamat: "Jl. Merdeka No.1, Jakarta",
        username: "pusat_admin",
      }
    };
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = URL.createObjectURL(file);
      }
    },
    updateProfile() {
      alert("Profil berhasil diperbarui!");
    }
  }
};
</script>

<style scoped>
/* Styling Input */
.input-field {
  @apply w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none;
}

/* Responsif */
@media (max-width: 768px) {
  .input-field {
    font-size: 14px;
  }
}
</style>
