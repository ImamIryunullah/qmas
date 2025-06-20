<template>
  <div>
    <aside
      :class="[
        'fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">Q-Mas</h2>
              <p class="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          <button
            @click="$emit('close')"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div class="mb-6">
          <h3
            class="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3"
          >
            Dashboard
          </h3>
          <router-link
            to="/admin/dashboard"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/dashboard')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/dashboard')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
              ></path>
            </svg>
            Overview
            <span v-if="isActive('/admin/dashboard')" class="ml-auto">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
            </span>
          </router-link>
        </div>

        <div class="mb-6">
          <h3
            class="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3"
          >
            Management
          </h3>

          <router-link
            to="/admin/kelola-pesanan"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/orders')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/kelola-pesanan')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
            Pesanan
            <span
              class="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {{ pendingOrders }}
            </span>
          </router-link>

          <router-link
            to="/admin/kelola-produk"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/kelola-produk')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/kelola-produk')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
            Produk
          </router-link>

          <!-- <router-link
            to="/admin/customers"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/customers')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/customers')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              ></path>
            </svg>
            Pelanggan
          </router-link> -->

          <!-- Konten Dropdown -->
          <div>
            <button
              @click="toggleDropdownKonten"
              class="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <div class="flex items-center">
                <svg
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>News & Pengaduan</span>
              </div>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': dropdownKontenOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div v-if="dropdownKontenOpen" class="pl-8 mt-1 space-y-1">
              <router-link
                to="/admin/kelola-berita"
                :class="[
                  'block px-3 py-2 text-sm rounded-md transition duration-150',
                  isActive('/admin/kelola-berita')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                ]"
              >
                Berita
              </router-link>

              <router-link
                to="/admin/pengaduan-dan-saran"
                :class="[
                  'block px-3 py-2 text-sm rounded-md transition duration-150',
                  isActive('/admin/pengaduan-dan-saran')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                ]"
              >
                Pengaduan
              </router-link>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h3
            class="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3"
          >
            Analytics
          </h3>

          <!-- <router-link
            to="/admin/reports"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/reports')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/reports')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            Laporan
          </router-link> -->

          <router-link
            to="/admin/analytics"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/analytics')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/analytics')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Analitik
          </router-link>
        </div>

        <div class="mb-6">
          <h3
            class="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3"
          >
            System
          </h3>

          <router-link
            to="/admin/pengaturan"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/admin/pengaturan')
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <svg
              :class="[
                'mr-3 h-5 w-5 transition-colors duration-200',
                isActive('/admin/pengaturan')
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Pengaturan
          </router-link>
        </div>
      </nav>

      <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              class="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p class="text-xs text-gray-500 truncate">admin@qmas.com</p>
          </div>
          <button
            @click="logout"
            class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
            title="Logout"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
    ></div>
  </div>
</template>

<script>
export default {
  name: "AdminSidebar",

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["close"],

  data() {
    return {
      pendingOrders: 5,
      dropdownKontenOpen: false, // untuk kontrol dropdown "Konten"
    };
  },

  methods: {
    isActive(route) {
      return this.$route.path === route || this.$route.path.startsWith(route + "/");
    },

    toggleDropdownKonten() {
      this.dropdownKontenOpen = !this.dropdownKontenOpen;
    },

    logout() {
      // Implement logout logic here
      this.$router.push("/login");
    },
  },

  watch: {
    // Otomatis buka dropdown jika berada di halaman dalam grup konten
    "$route.path"(newPath) {
      if (newPath.startsWith("/admin/berita") || newPath.startsWith("/admin/pengaduan-dan-saran")) {
        this.dropdownKontenOpen = true;
      }
    },
  },
};
</script>
