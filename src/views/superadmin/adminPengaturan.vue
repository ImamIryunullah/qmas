<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNavbar :isOpen="sidebarOpen" @toggle="toggleSidebar" @close="closeSidebar" />

    <div class="lg:ml-64 transition-all duration-300">
      <nav class="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
        <div class="flex items-center justify-between">
          <button
            @click="toggleSidebar"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <div class="flex-1 lg:flex-none">
            <h1 class="text-xl lg:text-2xl font-bold text-gray-900 ml-2 lg:ml-0">
              Pengaturan Admin
            </h1>
          </div>

          <div class="flex items-center space-x-4">

            <div class="relative">
              <button
                @click="profileDropdownOpen = !profileDropdownOpen"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div
                  class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <span class="text-white text-sm font-medium">A</span>
                </div>
                <span class="hidden md:block font-medium">Admin</span>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div
                v-if="profileDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div class="py-1">
                  <a
                    href="/admin/pengaturan"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Settings</a
                  >
                  <hr class="my-1 border-gray-200" />
                  <a href="/login" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >Logout</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="p-4 lg:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Menu Pengaturan</h2>
              <nav class="space-y-2">
                <button
                  v-for="menu in settingsMenu"
                  :key="menu.id"
                  @click="activeTab = menu.id"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                    activeTab === menu.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                  ]"
                >
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        :d="menu.icon"
                      ></path>
                    </svg>
                    {{ menu.name }}
                  </div>
                </button>
              </nav>
            </div>
          </div>

          <div class="lg:col-span-3">
            <div
              v-if="activeTab === 'profile'"
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Profil Admin</h3>
              <form @submit.prevent="handleProfileSave">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Nama Lengkap</label
                    >
                    <input
                      v-model="profile.fullName"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Email</label
                    >
                    <div class="relative">
                      <input
                        v-model="profile.email"
                        type="email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        placeholder="admin@qmas.com"
                      />
                      <div
                        v-if="emailChanged"
                        class="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <svg
                          class="w-5 h-5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <p v-if="emailChanged" class="text-xs text-orange-600 mt-1">
                      Perubahan email memerlukan verifikasi password
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Nomor Telepon</label
                    >
                    <input
                      v-model="profile.phone"
                      type="tel"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="081234567890"
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Alamat</label
                  >
                  <textarea
                    v-model="profile.address"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>
                </div>
                <div class="mt-6 flex justify-end">
                  <button
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>

            <div
              v-if="activeTab === 'security'"
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Keamanan</h3>

              <div class="mb-8">
                <h4 class="text-md font-medium text-gray-900 mb-4">Ubah Password</h4>
                <form @submit.prevent="changePassword">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2"
                        >Password Saat Ini</label
                      >
                      <input
                        v-model="security.currentPassword"
                        type="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan password saat ini"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2"
                        >Password Baru</label
                      >
                      <input
                        v-model="security.newPassword"
                        type="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan password baru"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2"
                        >Konfirmasi Password Baru</label
                      >
                      <input
                        v-model="security.confirmPassword"
                        type="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Konfirmasi password baru"
                      />
                    </div>
                  </div>
                  <div class="mt-6">
                    <button
                      type="submit"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Ubah Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Verifikasi Email -->
    <div
      v-if="showEmailVerificationModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity modal-backdrop"
          aria-hidden="true"
          @click="closeEmailVerificationModal"
        ></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <!-- Modal panel -->
        <div
          class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Verifikasi Perubahan Email
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 mb-4">
                  Untuk keamanan akun, masukkan password saat ini untuk mengonfirmasi
                  perubahan email dari
                  <span class="font-medium text-gray-700">{{ originalEmail }}</span>
                  menjadi
                  <span class="font-medium text-gray-700">{{ profile.email }}</span>
                </p>

                <form @submit.prevent="verifyEmailChange">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Password Saat Ini <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="emailVerification.password"
                      type="password"
                      ref="passwordInput"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan password saat ini"
                      :class="{ 'border-red-300': emailVerification.error }"
                    />
                    <p v-if="emailVerification.error" class="mt-1 text-sm text-red-600">
                      {{ emailVerification.error }}
                    </p>
                  </div>

                  <div class="flex items-center mb-4">
                    <input
                      v-model="emailVerification.sendNotification"
                      type="checkbox"
                      id="sendNotification"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      for="sendNotification"
                      class="ml-2 block text-sm text-gray-700"
                    >
                      Kirim notifikasi ke email lama
                    </label>
                  </div>

                  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      :disabled="emailVerification.loading"
                      class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        v-if="emailVerification.loading"
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {{
                        emailVerification.loading
                          ? "Memverifikasi..."
                          : "Konfirmasi Perubahan"
                      }}
                    </button>
                    <button
                      type="button"
                      @click="closeEmailVerificationModal"
                      :disabled="emailVerification.loading"
                      class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  name: "AdminSettings",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      sidebarOpen: false,
      profileDropdownOpen: false,
      activeTab: "profile",
      showEmailVerificationModal: false,
      originalEmail: "admin@qmas.com",
      settingsMenu: [
        {
          id: "profile",
          name: "Profil Admin",
          icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
          id: "security",
          name: "Keamanan",
          icon:
            "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        },
      ],
      profile: {
        fullName: "Admin Q-Mas",
        email: "admin@qmas.com",
        phone: "081234567890",
        address: "Jl. Raya No. 123, Malang, Jawa Timur",
      },
      security: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      emailVerification: {
        password: "",
        sendNotification: true,
        loading: false,
        error: "",
      },
    };
  },
  computed: {
    emailChanged() {
      return this.profile.email !== this.originalEmail;
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    handleProfileSave() {
      if (this.emailChanged) {
        this.showEmailVerificationModal = true;
        this.$nextTick(() => {
          if (this.$refs.passwordInput) {
            this.$refs.passwordInput.focus();
          }
        });
      } else {
        this.saveProfile();
      }
    },
    saveProfile() {
      // Implementasi simpan profil
      alert("Profil berhasil disimpan!");
      this.originalEmail = this.profile.email;
    },
    closeEmailVerificationModal() {
      this.showEmailVerificationModal = false;
      this.profile.email = this.originalEmail; // Reset email ke nilai asli
      this.emailVerification.password = "";
      this.emailVerification.error = "";
      this.emailVerification.loading = false;
    },
    async verifyEmailChange() {
      if (!this.emailVerification.password.trim()) {
        this.emailVerification.error = "Password tidak boleh kosong";
        return;
      }

      this.emailVerification.loading = true;
      this.emailVerification.error = "";

      try {
        // Simulasi API call untuk verifikasi password
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulasi validasi password (ganti dengan API call sesungguhnya)
            if (this.emailVerification.password === "admin123") {
              resolve();
            } else {
              reject(new Error("Password tidak valid"));
            }
          }, 1500);
        });

        // Jika berhasil, simpan profil
        this.saveProfile();
        this.showEmailVerificationModal = false;
        this.emailVerification.password = "";

        // Tampilkan notifikasi sukses
        alert(
          "Email berhasil diperbarui! " +
            (this.emailVerification.sendNotification
              ? "Notifikasi telah dikirim ke email lama."
              : "")
        );
      } catch (error) {
        this.emailVerification.error = error.message;
      } finally {
        this.emailVerification.loading = false;
      }
    },
    changePassword() {
      if (this.security.newPassword !== this.security.confirmPassword) {
        alert("Password baru dan konfirmasi password tidak cocok!");
        return;
      }
      // Implementasi ubah password
      alert("Password berhasil diubah!");
      this.security.currentPassword = "";
      this.security.newPassword = "";
      this.security.confirmPassword = "";
    },
  },
  mounted() {
    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".relative")) {
        this.profileDropdownOpen = false;
      }
    });
  },
};
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Responsive table */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
  }
}

/* Toggle switch animation */
.toggle-switch {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal backdrop blur effect */
.modal-backdrop {
  backdrop-filter: blur(4px);
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
