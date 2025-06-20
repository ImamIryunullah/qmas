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
              Pengaduan & Saran
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <button
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-5-5 5-5m-10 10l-5-5 5-5"
                ></path>
              </svg>
              <span
                class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              ></span>
            </button>

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
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >Settings</a
                  >
                  <hr class="my-1 border-gray-200" />
                  <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >Logout</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="p-4 lg:p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Pengaduan</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalComplaints }}</p>
                <p class="text-sm text-red-600 mt-1">
                  <span class="font-medium">{{ newComplaints }}</span> baru hari ini
                </p>
              </div>
              <div
                class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Saran Masuk</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalSuggestions }}</p>
                <p class="text-sm text-blue-600 mt-1">
                  <span class="font-medium">{{ newSuggestions }}</span> baru hari ini
                </p>
              </div>
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Belum Ditanggapi</p>
                <p class="text-2xl font-bold text-gray-900">{{ pendingResponses }}</p>
                <p class="text-sm text-orange-600 mt-1">
                  <span class="font-medium">Perlu Tindakan</span>
                </p>
              </div>
              <div
                class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Rata-rata Rating</p>
                <p class="text-2xl font-bold text-gray-900">{{ averageRating }}/5</p>
                <p class="text-sm text-green-600 mt-1">
                  <span class="font-medium">{{ totalReviews }}</span> total rating
                </p>
              </div>
              <div
                class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div
            class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Statistik Kategori</h2>
              <select
                class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>7 Hari Terakhir</option>
                <option>30 Hari Terakhir</option>
                <option>3 Bulan Terakhir</option>
              </select>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="category in categoryStats"
                :key="category.name"
                class="text-center p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-2xl font-bold text-gray-900">{{ category.count }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ category.name }}</div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    :class="category.color"
                    class="h-2 rounded-full transition-all duration-300"
                    :style="{ width: category.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Aksi Cepat</h2>
            <div class="space-y-3">
              <button
                @click="exportData"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Export Data
              </button>
              <button
                @click="generateReport"
                class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a4 4 0 01-4-4V5a4 4 0 014-4h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a4 4 0 01-4 4z"
                  ></path>
                </svg>
                Buat Laporan
              </button>
              <button
                @click="bulkAction"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Aksi Massal
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h2 class="text-lg font-semibold text-gray-900 mb-4 lg:mb-0">
                Daftar Pengaduan & Saran
              </h2>
              <div class="flex flex-col sm:flex-row gap-3">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari berdasarkan nama, email, atau subjek..."
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-0 sm:min-w-[250px]"
                />
                <select
                  v-model="statusFilter"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Semua Status</option>
                  <option value="Baru">Baru</option>
                  <option value="Sedang Diproses">Sedang Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditutup">Ditutup</option>
                </select>
                <select
                  v-model="categoryFilter"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Semua Kategori</option>
                  <option value="Kualitas Produk">Kualitas Produk</option>
                  <option value="Pelayanan">Pelayanan</option>
                  <option value="Pengiriman">Pengiriman</option>
                  <option value="Harga">Harga</option>
                  <option value="Saran Umum">Saran Umum</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      type="checkbox"
                      @change="selectAll"
                      class="rounded border-gray-300"
                    />
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pelanggan
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kategori
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subjek
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rating
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="item in filteredComplaints"
                  :key="item.id"
                  class="hover:bg-gray-50"
                  @click="selectItem(item.id)"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      :checked="selectedItems.includes(item.id)"
                      @click.stop
                      @change="toggleSelect(item.id)"
                      class="rounded border-gray-300"
                    />
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600"
                  >
                    #{{ item.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-sm text-gray-500">{{ item.email }}</div>
                    <div class="text-sm text-gray-500">{{ item.phone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="getCategoryClass(item.category)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ item.category }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate"
                  >
                    {{ item.subject }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex text-yellow-400">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="w-4 h-4"
                          :class="i <= item.rating ? 'text-yellow-400' : 'text-gray-300'"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>
                      </div>
                      <span class="ml-1 text-sm text-gray-600">{{
                        item.rating || "N/A"
                      }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="getStatusClass(item.status)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ item.date }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click.stop="viewDetail(item)"
                      class="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Detail
                    </button>
                    <button
                      @click.stop="respondToComplaint(item)"
                      class="text-green-600 hover:text-green-900 mr-3"
                    >
                      Tanggapi
                    </button>
                    <button
                      @click.stop="updateStatus(item)"
                      class="text-purple-600 hover:text-purple-900"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
          >
            <div class="text-sm text-gray-700">
              Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} -
              {{ Math.min(currentPage * itemsPerPage, filteredComplaints.length) }} dari
              {{ filteredComplaints.length }} data
            </div>
            <div class="flex space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>

    <div
      v-if="showDetailModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              Detail Pengaduan/Saran #{{ selectedComplaint?.id }}
            </h3>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div class="p-6" v-if="selectedComplaint">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Informasi Pelanggan</h4>
              <div class="space-y-2 text-sm">
                <p>
                  <span class="text-gray-600">Nama:</span> {{ selectedComplaint.name }}
                </p>
                <p>
                  <span class="text-gray-600">Email:</span> {{ selectedComplaint.email }}
                </p>
                <p>
                  <span class="text-gray-600">Telepon:</span>
                  {{ selectedComplaint.phone }}
                </p>
              </div>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Informasi Pengaduan</h4>
              <div class="space-y-2 text-sm">
                <p>
                  <span class="text-gray-600">Kategori:</span>
                  {{ selectedComplaint.category }}
                </p>
                <p>
                  <span class="text-gray-600">Rating:</span>
                  {{ selectedComplaint.rating || "Tidak ada" }}/5
                </p>
                <p>
                  <span class="text-gray-600">Status:</span>
                  <span
                    :class="getStatusClass(selectedComplaint.status)"
                    class="px-2 py-1 text-xs rounded-full"
                    >{{ selectedComplaint.status }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 mb-2">Subjek</h4>
            <p class="text-sm text-gray-700">{{ selectedComplaint.subject }}</p>
          </div>
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 mb-2">Pesan Lengkap</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-700 whitespace-pre-wrap">
                {{ selectedComplaint.message }}
              </p>
            </div>
          </div>
          <div class="flex space-x-3">
            <button
              @click="respondToComplaint(selectedComplaint)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Tanggapi
            </button>
            <button
              @click="updateStatus(selectedComplaint)"
              class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  name: "AdminComplaintsPage",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      sidebarOpen: false,
      profileDropdownOpen: false,
      searchQuery: "",
      statusFilter: "",
      categoryFilter: "",
      selectedItems: [],
      showDetailModal: false,
      selectedComplaint: null,
      currentPage: 1,
      itemsPerPage: 10,

      // Sample data - in real app, this would come from API
      complaints: [
        {
          id: "C001",
          name: "Ahmad Wijaya",
          email: "ahmad.wijaya@email.com",
          phone: "081234567890",
          category: "Kualitas Produk",
          subject: "Air galon keruh dan berbau",
          message:
            "Saya membeli galon Q-Mas kemarin, tetapi airnya terlihat keruh dan sedikit berbau. Mohon penjelasan dan solusinya.",
          rating: 2,
          status: "Baru",
          date: "21 Jun 2025",
          time: "09:30",
        },
        {
          id: "C002",
          name: "Siti Nurhaliza",
          email: "siti.nurhaliza@email.com",
          phone: "081234567891",
          category: "Pelayanan",
          subject: "Pengiriman terlambat tanpa konfirmasi",
          message:
            "Pesanan saya dijadwalkan datang pagi ini jam 8, tapi sampai jam 12 siang belum ada kabar. Customer service juga susah dihubungi.",
          rating: 3,
          status: "Sedang Diproses",
          date: "20 Jun 2025",
          time: "12:15",
        },
        {
          id: "C003",
          name: "Budi Santoso",
          email: "budi.santoso@email.com",
          phone: "081234567892",
          category: "Pengiriman",
          subject: "Galon pecah saat pengiriman",
          message:
            "Galon yang dikirim dalam kondisi retak di bagian bawah, sehingga air merembes. Mohon diganti dengan yang baru.",
          rating: 1,
          status: "Baru",
          date: "20 Jun 2025",
          time: "15:20",
        },
        {
          id: "S001",
          name: "Maria Kristina",
          email: "maria.kristina@email.com",
          phone: "081234567893",
          category: "Saran Umum",
          subject: "Saran untuk program loyalitas pelanggan",
          message:
            "Akan lebih baik jika ada program poin atau diskon untuk pelanggan setia yang sudah berlangganan lama.",
          rating: 5,
          status: "Selesai",
          date: "19 Jun 2025",
          time: "10:30",
        },
        {
          id: "C004",
          name: "Rizki Pratama",
          email: "rizki.pratama@email.com",
          phone: "081234567894",
          category: "Harga",
          subject: "Harga naik tanpa pemberitahuan",
          message:
            "Kenapa harga galon naik tiba-tiba? Seharusnya ada pemberitahuan terlebih dahulu kepada pelanggan.",
          rating: 2,
          status: "Sedang Diproses",
          date: "19 Jun 2025",
          time: "14:45",
        },
        {
          id: "S002",
          name: "Dewi Sartika",
          email: "dewi.sartika@email.com",
          phone: "081234567895",
          category: "Lainnya",
          subject: "Saran aplikasi mobile untuk pemesanan",
          message:
            "Bagaimana kalau Q-Mas membuat aplikasi mobile untuk memudahkan pemesanan dan tracking pengiriman?",
          rating: 4,
          status: "Baru",
          date: "18 Jun 2025",
          time: "16:00",
        },
        {
          id: "C005",
          name: "Andi Setiawan",
          email: "andi.setiawan@email.com",
          phone: "081234567896",
          category: "Pelayanan",
          subject: "Staff kurang ramah saat pengiriman",
          message:
            "Staff yang mengirim galon ke rumah saya kurang ramah dan terkesan terburu-buru. Mohon diperbaiki pelayanannya.",
          rating: 2,
          status: "Selesai",
          date: "18 Jun 2025",
          time: "08:20",
        },
        {
          id: "C006",
          name: "Fitri Handayani",
          email: "fitri.handayani@email.com",
          phone: "081234567897",
          category: "Kualitas Produk",
          subject: "Dispenser bocor setelah pemasangan",
          message:
            "Setelah galon dipasang, dispenser saya jadi bocor di bagian bawah. Apakah ada masalah dengan tutup galons?",
          rating: 3,
          status: "Ditutup",
          date: "17 Jun 2025",
          time: "11:10",
        },
      ],
    };
  },
  computed: {
    totalComplaints() {
      return this.complaints.filter((item) => item.id.startsWith("C")).length;
    },
    totalSuggestions() {
      return this.complaints.filter((item) => item.id.startsWith("S")).length;
    },
    newComplaints() {
      return this.complaints.filter(
        (item) => item.id.startsWith("C") && item.date === "21 Jun 2025"
      ).length;
    },
    newSuggestions() {
      return this.complaints.filter(
        (item) => item.id.startsWith("S") && item.date === "21 Jun 2025"
      ).length;
    },
    pendingResponses() {
      return this.complaints.filter(
        (item) => item.status === "Baru" || item.status === "Sedang Diproses"
      ).length;
    },
    averageRating() {
      const ratings = this.complaints
        .filter((item) => item.rating)
        .map((item) => item.rating);
      const sum = ratings.reduce((a, b) => a + b, 0);
      return ratings.length > 0 ? (sum / ratings.length).toFixed(1) : "0.0";
    },
    totalReviews() {
      return this.complaints.filter((item) => item.rating).length;
    },
    categoryStats() {
      const categories = [
        "Kualitas Produk",
        "Pelayanan",
        "Pengiriman",
        "Harga",
        "Saran Umum",
        "Lainnya",
      ];
      const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-gray-500",
      ];

      const stats = categories.map((category, index) => {
        const count = this.complaints.filter((item) => item.category === category).length;
        const percentage =
          this.complaints.length > 0 ? (count / this.complaints.length) * 100 : 0;
        return {
          name: category,
          count,
          percentage: Math.round(percentage),
          color: colors[index],
        };
      });

      return stats.sort((a, b) => b.count - a.count);
    },
    filteredComplaints() {
      let filtered = this.complaints;

      if (this.searchQuery) {
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.statusFilter) {
        filtered = filtered.filter((item) => item.status === this.statusFilter);
      }

      if (this.categoryFilter) {
        filtered = filtered.filter((item) => item.category === this.categoryFilter);
      }

      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
    },
    paginatedComplaints() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredComplaints.slice(start, end);
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    getStatusClass(status) {
      const classes = {
        Baru: "bg-red-100 text-red-800",
        "Sedang Diproses": "bg-blue-100 text-blue-800",
        Selesai: "bg-green-100 text-green-800",
        Ditutup: "bg-gray-100 text-gray-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    },
    getCategoryClass(category) {
      const classes = {
        "Kualitas Produk": "bg-red-100 text-red-800",
        Pelayanan: "bg-blue-100 text-blue-800",
        Pengiriman: "bg-green-100 text-green-800",
        Harga: "bg-yellow-100 text-yellow-800",
        "Saran Umum": "bg-purple-100 text-purple-800",
        Lainnya: "bg-gray-100 text-gray-800",
      };
      return classes[category] || "bg-gray-100 text-gray-800";
    },
    selectAll(event) {
      if (event.target.checked) {
        this.selectedItems = this.paginatedComplaints.map((item) => item.id);
      } else {
        this.selectedItems = [];
      }
    },
    toggleSelect(id) {
      const index = this.selectedItems.indexOf(id);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(id);
      }
    },
    selectItem() {
      // Optional: Select item when clicking row
    },
    viewDetail(item) {
      this.selectedComplaint = item;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
      this.selectedComplaint = null;
    },
    respondToComplaint(item) {
      // Handle response action
      alert(`Mengirim tanggapan untuk pengaduan #${item.id}`);
      // In real app, this would open a response form or send to another page
    },
    updateStatus(item) {
      // Handle status update
      const newStatus = prompt("Masukkan status baru:", item.status);
      if (
        newStatus &&
        ["Baru", "Sedang Diproses", "Selesai", "Ditutup"].includes(newStatus)
      ) {
        item.status = newStatus;
        alert(`Status pengaduan #${item.id} telah diupdate menjadi ${newStatus}`);
      }
    },
    exportData() {
      // Handle data export
      alert("Mengexport data pengaduan dan saran...");
      // In real app, this would generate and download a file
    },
    generateReport() {
      // Handle report generation
      alert("Membuat laporan pengaduan dan saran...");
      // In real app, this would generate a comprehensive report
    },
    bulkAction() {
      if (this.selectedItems.length === 0) {
        alert("Pilih minimal satu item untuk aksi massal");
        return;
      }

      const action = prompt(
        "Pilih aksi massal:\n1. Update Status\n2. Hapus\n3. Export\n\nMasukkan nomor pilihan:"
      );

      switch (action) {
        case "1": {
          const newStatus = prompt("Masukkan status baru:");
          if (newStatus) {
            alert(
              `Mengupdate status ${this.selectedItems.length} item menjadi ${newStatus}`
            );
          }
          break;
        }
        case "2": {
          if (confirm(`Hapus ${this.selectedItems.length} item yang dipilih?`)) {
            alert(`Menghapus ${this.selectedItems.length} item`);
          }
          break;
        }
        case "3": {
          alert(`Mengexport ${this.selectedItems.length} item yang dipilih`);
          break;
        }
        default: {
          alert("Pilihan tidak valid");
        }
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
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

/* Modal styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
