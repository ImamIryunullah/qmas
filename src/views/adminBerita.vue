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
              Kelola Berita
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
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Berita</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalNews }}</p>
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Berita Aktif</p>
                <p class="text-2xl font-bold text-gray-900">{{ publishedNews }}</p>
              </div>
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-600"
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
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Draft</p>
                <p class="text-2xl font-bold text-gray-900">{{ draftNews }}</p>
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Views Bulan Ini</p>
                <p class="text-2xl font-bold text-gray-900">15.4K</p>
              </div>
              <div
                class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
          >
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Cari berita..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <svg
                  class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>

              <select
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Kategori</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Produk">Produk</option>
                <option value="Komunitas">Komunitas</option>
                <option value="Tips">Tips</option>
              </select>

              <select
                v-model="selectedStatus"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <button
              @click="showAddModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Tambah Berita
            </button>
          </div>
        </div>

        
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Daftar Berita</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Judul
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kategori
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Penulis
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
                    Views
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="news in filteredNews" :key="news.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-4"
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
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {{ news.title }}
                        </div>
                        <div class="text-sm text-gray-500 max-w-xs truncate">
                          {{ news.excerpt }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="getCategoryClass(news.category)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ news.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ news.author }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="getStatusClass(news.status)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ news.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ news.date }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ news.views }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="editNews(news)"
                        class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Edit"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        @click="viewNews(news)"
                        class="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="View"
                      >
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        @click="deleteNews(news.id)"
                        class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                        title="Delete"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          
          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing <span class="font-medium">1</span> to
                  <span class="font-medium">10</span> of
                  <span class="font-medium">{{ totalNews }}</span> results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </button>
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    2
                  </button>
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600"
                  >
                    3
                  </button>
                  <button
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"
      >
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ showAddModal ? "Tambah Berita Baru" : "Edit Berita" }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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

        <form @submit.prevent="saveNews" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Judul Berita</label
              >
              <input
                type="text"
                v-model="newsForm.title"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan judul berita..."
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                v-model="newsForm.category"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Kategori</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Produk">Produk</option>
                <option value="Komunitas">Komunitas</option>
                <option value="Tips">Tips</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="newsForm.status"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Excerpt/Ringkasan</label
              >
              <textarea
                v-model="newsForm.excerpt"
                required
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan ringkasan berita..."
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Konten Berita</label
              >
              <textarea
                v-model="newsForm.content"
                required
                rows="10"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan konten lengkap berita..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
              <input
                type="text"
                v-model="newsForm.author"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nama penulis..."
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Publikasi</label
              >
              <input
                type="date"
                v-model="newsForm.date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {{ showAddModal ? "Simpan Berita" : "Update Berita" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'

export default {
  name: "AdminNewsManagement",
  components: {
    AdminNavbar
  },
  data() {
    return {
      sidebarOpen: false,
      profileDropdownOpen: false,
      showAddModal: false,
      showEditModal: false,
      searchQuery: "",
      selectedCategory: "",
      selectedStatus: "",
      newsForm: {
        id: null,
        title: "",
        excerpt: "",
        content: "",
        category: "",
        status: "draft",
        author: "",
        date: "",
      },
      newsList: [
        {
          id: 1,
          title: "Manfaat Air Beroksigen Tinggi untuk Kesehatan Optimal",
          excerpt:
            "Penelitian terbaru mengungkap bahwa air dengan kandungan oksigen tinggi dapat meningkatkan metabolisme tubuh...",
          content: "Konten lengkap berita...",
          category: "Kesehatan",
          status: "published",
          author: "Dr. Sarah",
          date: "2025-06-19",
          views: 1250,
        },
        {
          id: 2,
          title: "Tips Memilih Produk Minuman Kesehatan yang Tepat",
          excerpt:
            "Panduan lengkap untuk memilih minuman kesehatan yang sesuai dengan kebutuhan tubuh Anda...",
          content: "Konten lengkap berita...",
          category: "Tips",
          status: "published",
          author: "Nutritionist Maya",
          date: "2025-06-18",
          views: 890,
        },
        {
          id: 3,
          title: "Komunitas Sehat: Berbagi Pengalaman Hidup Lebih Baik",
          excerpt:
            "Bergabunglah dengan komunitas yang peduli kesehatan dan berbagi tips hidup sehat...",
          content: "Konten lengkap berita...",
          category: "Komunitas",
          status: "draft",
          author: "Community Manager",
          date: "2025-06-17",
          views: 456,
        },
        {
          id: 4,
          title: "Produk Terbaru: Minuman Elektrolit untuk Atlet",
          excerpt:
            "Peluncuran produk minuman elektrolit khusus yang diformulasikan untuk kebutuhan atlet profesional...",
          content: "Konten lengkap berita...",
          category: "Produk",
          status: "published",
          author: "Product Team",
          date: "2025-06-16",
          views: 1567,
        },
        {
          id: 5,
          title: "Penelitian Terbaru: Hidrasi Optimal untuk Produktivitas",
          excerpt:
            "Studi menunjukkan hubungan erat antara tingkat hidrasi tubuh dengan tingkat produktivitas kerja...",
          content: "Konten lengkap berita...",
          category: "Kesehatan",
          status: "archived",
          author: "Research Team",
          date: "2025-06-15",
          views: 2341,
        },
      ],
    };
  },
  computed: {
    totalNews() {
      return this.newsList.length;
    },
    publishedNews() {
      return this.newsList.filter((news) => news.status === "published").length;
    },
    draftNews() {
      return this.newsList.filter((news) => news.status === "draft").length;
    },
    filteredNews() {
      let filtered = this.newsList;

      if (this.searchQuery) {
        filtered = filtered.filter(
          (news) =>
            news.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            news.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            news.author.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategory) {
        filtered = filtered.filter((news) => news.category === this.selectedCategory);
      }

      if (this.selectedStatus) {
        filtered = filtered.filter((news) => news.status === this.selectedStatus);
      }

      return filtered;
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.resetForm();
    },
    resetForm() {
      this.newsForm = {
        id: null,
        title: "",
        excerpt: "",
        content: "",
        category: "",
        status: "draft",
        author: "",
        date: "",
      };
    },
    editNews(news) {
      this.newsForm = { ...news };
      this.showEditModal = true;
    },
    viewNews(news) {
      // Implement view functionality
      console.log("Viewing news:", news);
      // You can redirect to a view page or open a modal
    },
    deleteNews(newsId) {
      if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
        this.newsList = this.newsList.filter((news) => news.id !== newsId);
      }
    },
    saveNews() {
      if (this.showAddModal) {
        // Add new news
        const newId = Math.max(...this.newsList.map((n) => n.id)) + 1;
        this.newsList.push({
          ...this.newsForm,
          id: newId,
          views: 0,
        });
      } else if (this.showEditModal) {
        // Update existing news
        const index = this.newsList.findIndex((news) => news.id === this.newsForm.id);
        if (index !== -1) {
          this.newsList.splice(index, 1, { ...this.newsForm });
        }
      }
      this.closeModal();
    },
    getCategoryClass(category) {
      const classes = {
        Kesehatan: "bg-green-100 text-green-800",
        Produk: "bg-blue-100 text-blue-800",
        Komunitas: "bg-purple-100 text-purple-800",
        Tips: "bg-yellow-100 text-yellow-800",
      };
      return classes[category] || "bg-gray-100 text-gray-800";
    },
    getStatusClass(status) {
      const classes = {
        published: "bg-green-100 text-green-800",
        draft: "bg-yellow-100 text-yellow-800",
        archived: "bg-gray-100 text-gray-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".relative")) {
        this.profileDropdownOpen = false;
      }
    });
  },
};
</script>

<style scoped>
/* Custom styles for the news management component */
.transition-all {
  transition: all 0.3s ease;
}

/* Responsive table styles */
@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}

/* Modal animation styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar for modal */
.max-h-screen::-webkit-scrollbar {
  width: 6px;
}
.max-h-screen::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.max-h-screen::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
.max-h-screen::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
