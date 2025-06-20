<template>
    <div class="min-h-screen bg-gray-50">
      
      <AdminNavbar 
        :isOpen="sidebarOpen" 
        @toggle="toggleSidebar"
        @close="closeSidebar"
      />
      
      
      <div class="lg:ml-64 transition-all duration-300">
        
        <nav class="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
          <div class="flex items-center justify-between">
            
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            
            
            <div class="flex-1 lg:flex-none">
              <h1 class="text-xl lg:text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Kelola Pesanan</h1>
            </div>
            
            
            <div class="flex items-center space-x-4">
              
              <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5 5-5m-10 10l-5-5 5-5"></path>
                </svg>
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              
              <div class="relative">
                <button 
                  @click="profileDropdownOpen = !profileDropdownOpen"
                  class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span class="text-white text-sm font-medium">A</span>
                  </div>
                  <span class="hidden md:block font-medium">Admin</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                
                <div 
                  v-if="profileDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <hr class="my-1 border-gray-200">
                    <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</a>
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
                  <p class="text-sm font-medium text-gray-600">Total Pesanan</p>
                  <p class="text-2xl font-bold text-gray-900">{{ totalOrders }}</p>
                  <p class="text-sm text-blue-600 mt-1">
                    <span class="font-medium">Semua Status</span>
                  </p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Pesanan Pending</p>
                  <p class="text-2xl font-bold text-gray-900">{{ pendingOrders }}</p>
                  <p class="text-sm text-orange-600 mt-1">
                    <span class="font-medium">Perlu Diproses</span>
                  </p>
                </div>
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Sedang Diproses</p>
                  <p class="text-2xl font-bold text-gray-900">{{ processingOrders }}</p>
                  <p class="text-sm text-blue-600 mt-1">
                    <span class="font-medium">Dalam Pengerjaan</span>
                  </p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Selesai Hari Ini</p>
                  <p class="text-2xl font-bold text-gray-900">{{ completedToday }}</p>
                  <p class="text-sm text-green-600 mt-1">
                    <span class="font-medium">Berhasil Dikirim</span>
                  </p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div class="p-6 border-b border-gray-200">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div class="flex items-center space-x-4">
                  <h2 class="text-lg font-semibold text-gray-900">Filter & Pencarian</h2>
                </div>
                <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    placeholder="Cari berdasarkan ID, nama, atau telepon..."
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1 sm:w-64"
                  >
                  <select 
                    v-model="statusFilter"
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Semua Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <select 
                    v-model="dateFilter"
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Semua Tanggal</option>
                    <option value="today">Hari Ini</option>
                    <option value="yesterday">Kemarin</option>
                    <option value="week">Minggu Ini</option>
                    <option value="month">Bulan Ini</option>
                  </select>
                  <button 
                    @click="resetFilters"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">Daftar Pesanan ({{ filteredOrders.length }})</h2>
                <div class="flex space-x-3">
                  <button 
                    @click="exportOrders"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Export Excel
                  </button>
                  <button 
                    @click="refreshOrders"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input 
                        type="checkbox" 
                        @change="toggleSelectAll"
                        :checked="selectedOrders.length === filteredOrders.length && filteredOrders.length > 0"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembayaran</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        :value="order.id"
                        v-model="selectedOrders"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer" @click="viewOrderDetail(order)">#{{ order.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                      <div class="text-sm text-gray-500">{{ order.customer.phone }}</div>
                      <div class="text-sm text-gray-500">{{ order.customer.email }}</div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">
                        <div v-for="item in order.items" :key="item.id" class="mb-1">
                          {{ item.name }} x{{ item.quantity }}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatCurrency(order.total) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ order.paymentMethod }}</div>
                      <div class="text-sm text-gray-500">{{ order.paymentStatus }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <select 
                        :value="order.status"
                        @change="updateOrderStatus(order.id, $event.target.value)"
                        :class="getStatusSelectClass(order.status)"
                        class="text-xs font-medium rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{{ formatDate(order.createdAt) }}</div>
                      <div class="text-xs text-gray-400">{{ formatTime(order.createdAt) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center space-x-2">
                        <button 
                          @click="viewOrderDetail(order)"
                          class="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                          title="Lihat Detail"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                        <button 
                          @click="editOrder(order)"
                          class="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors"
                          title="Edit Pesanan"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button 
                          @click="deleteOrder(order.id)"
                          class="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Hapus Pesanan"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            
            <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                  Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} dari {{ filteredOrders.length }} pesanan
                </div>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <span class="px-3 py-1 text-sm text-gray-700">
                    Halaman {{ currentPage }} dari {{ totalPages }}
                  </span>
                  <button 
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
          <div v-if="selectedOrders.length > 0" class="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">{{ selectedOrders.length }} pesanan dipilih</span>
              <div class="flex space-x-2">
                <button 
                  @click="bulkUpdateStatus('Processing')"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Set Processing
                </button>
                <button 
                  @click="bulkUpdateStatus('Delivered')"
                  class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Set Delivered
                </button>
                <button 
                  @click="bulkDelete"
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Hapus
                </button>
              </div>
              <button 
                @click="selectedOrders = []"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
      
      
      <div 
        v-if="sidebarOpen" 
        @click="closeSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      ></div>
      
      
      <div v-if="showOrderDetail" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Detail Pesanan #{{ selectedOrderDetail?.id }}</h3>
              <button 
                @click="showOrderDetail = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-6" v-if="selectedOrderDetail">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Informasi Pelanggan</h4>
                  <div class="space-y-2 text-sm">
                    <div><strong>Nama:</strong> {{ selectedOrderDetail.customer.name }}</div>
                    <div><strong>Email:</strong> {{ selectedOrderDetail.customer.email }}</div>
                    <div><strong>Telepon:</strong> {{ selectedOrderDetail.customer.phone }}</div>
                    <div><strong>Alamat:</strong> {{ selectedOrderDetail.customer.address }}</div>
                  </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Detail Pengiriman</h4>
                  <div class="space-y-2 text-sm">
                    <div><strong>Metode:</strong> {{ selectedOrderDetail.deliveryMethod }}</div>
                    <div><strong>Catatan:</strong> {{ selectedOrderDetail.notes || 'Tidak ada catatan' }}</div>
                  </div>
                </div>
              </div>
              
              
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Items Pesanan</h4>
                  <div class="space-y-2">
                    <div v-for="item in selectedOrderDetail.items" :key="item.id" class="flex justify-between text-sm">
                      <span>{{ item.name }} x{{ item.quantity }}</span>
                      <span class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</span>
                    </div>
                    <div class="border-t pt-2 mt-2">
                      <div class="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{{ formatCurrency(selectedOrderDetail.total) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Informasi Pembayaran</h4>
                  <div class="space-y-2 text-sm">
                    <div><strong>Metode:</strong> {{ selectedOrderDetail.paymentMethod }}</div>
                    <div><strong>Status:</strong> {{ selectedOrderDetail.paymentStatus }}</div>
                    <div><strong>Detail:</strong> {{ selectedOrderDetail.paymentDetail }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminNavbar from '@/components/AdminNavbar.vue'
  
  export default {
    name: 'AdminOrderManagement',
    components: {
      AdminNavbar
    },
    data() {
      return {
        sidebarOpen: false,
        profileDropdownOpen: false,
        searchQuery: '',
        statusFilter: '',
        dateFilter: '',
        selectedOrders: [],
        currentPage: 1,
        itemsPerPage: 10,
        showOrderDetail: false,
        selectedOrderDetail: null,
        orders: [
            {
          id: 'QM00001234',
          customer: {
            name: 'Ahmad Wijaya',
            email: 'ahmad.wijaya@email.com',
            phone: '081234567890',
            address: 'Jl. Mawar No. 123, Malang, Jawa Timur'
          },
          items: [
            { id: 1, name: 'Kue Coklat Premium', quantity: 2, price: 75000 },
            { id: 2, name: 'Roti Keju Special', quantity: 1, price: 45000 }
          ],
          total: 195000,
          paymentMethod: 'Transfer Bank',
          paymentStatus: 'Paid',
          paymentDetail: 'BCA - 1234567890',
          status: 'Processing',
          deliveryMethod: 'Delivery',
          notes: 'Mohon dikemas dengan bubble wrap',
          createdAt: new Date('2024-06-20T08:30:00'),
          updatedAt: new Date('2024-06-20T09:15:00')
        },
        {
          id: 'QM00001235',
          customer: {
            name: 'Siti Nurhaliza',
            email: 'siti.nurhaliza@email.com',
            phone: '081234567891',
            address: 'Jl. Melati No. 45, Malang, Jawa Timur'
          },
          items: [
            { id: 3, name: 'Donat Glazed', quantity: 12, price: 8000 },
            { id: 4, name: 'Croissant Butter', quantity: 6, price: 12000 }
          ],
          total: 168000,
          paymentMethod: 'E-Wallet',
          paymentStatus: 'Paid',
          paymentDetail: 'OVO - 081234567891',
          status: 'Delivered',
          deliveryMethod: 'Pickup',
          notes: '',
          createdAt: new Date('2024-06-20T10:15:00'),
          updatedAt: new Date('2024-06-20T11:30:00')
        },
        {
          id: 'QM00001236',
          customer: {
            name: 'Budi Santoso',
            email: 'budi.santoso@email.com',
            phone: '081234567892',
            address: 'Jl. Kenanga No. 78, Malang, Jawa Timur'
          },
          items: [
            { id: 5, name: 'Birthday Cake Custom', quantity: 1, price: 350000 }
          ],
          total: 350000,
          paymentMethod: 'Cash',
          paymentStatus: 'Pending',
          paymentDetail: 'Bayar saat pengiriman',
          status: 'Pending',
          deliveryMethod: 'Delivery',
          notes: 'Cake untuk ulang tahun anak, tema superhero',
          createdAt: new Date('2024-06-20T14:00:00'),
          updatedAt: new Date('2024-06-20T14:00:00')
        },
        {
          id: 'QM00001237',
          customer: {
            name: 'Maya Indah',
            email: 'maya.indah@email.com',
            phone: '081234567893',
            address: 'Jl. Anggrek No. 12, Malang, Jawa Timur'
          },
          items: [
            { id: 6, name: 'Muffin Blueberry', quantity: 6, price: 15000 },
            { id: 7, name: 'Cookies Chocolate Chip', quantity: 24, price: 5000 }
          ],
          total: 210000,
          paymentMethod: 'Transfer Bank',
          paymentStatus: 'Paid',
          paymentDetail: 'Mandiri - 9876543210',
          status: 'Processing',
          deliveryMethod: 'Delivery',
          notes: 'Untuk acara kantor',
          createdAt: new Date('2024-06-19T16:45:00'),
          updatedAt: new Date('2024-06-20T08:00:00')
        },
        {
          id: 'QM00001238',
          customer: {
            name: 'Rizky Pratama',
            email: 'rizky.pratama@email.com',
            phone: '081234567894',
            address: 'Jl. Dahlia No. 56, Malang, Jawa Timur'
          },
          items: [
            { id: 8, name: 'Cheesecake Strawberry', quantity: 1, price: 85000 },
            { id: 9, name: 'Tiramisu Cup', quantity: 4, price: 25000 }
          ],
          total: 185000,
          paymentMethod: 'E-Wallet',
          paymentStatus: 'Paid',
          paymentDetail: 'GoPay - 081234567894',
          status: 'Cancelled',
          deliveryMethod: 'Pickup',
          notes: 'Dibatalkan karena ada keperluan mendadak',
          createdAt: new Date('2024-06-19T11:20:00'),
          updatedAt: new Date('2024-06-19T13:45:00')
        }
      ]
    }
  },
  computed: {
    totalOrders() {
      return this.orders.length
    },
    pendingOrders() {
      return this.orders.filter(order => order.status === 'Pending').length
    },
    processingOrders() {
      return this.orders.filter(order => order.status === 'Processing').length
    },
    completedToday() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return this.orders.filter(order => {
        const orderDate = new Date(order.updatedAt)
        orderDate.setHours(0, 0, 0, 0)
        return order.status === 'Delivered' && orderDate.getTime() === today.getTime()
      }).length
    },
    filteredOrders() {
      let filtered = this.orders

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(order =>
          order.id.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.phone.includes(query) ||
          order.customer.email.toLowerCase().includes(query)
        )
      }

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter)
      }

      // Filter by date
      if (this.dateFilter) {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - 7)
        const monthStart = new Date(today)
        monthStart.setDate(1)

        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt)
          switch (this.dateFilter) {
            case 'today':
              return orderDate.toDateString() === today.toDateString()
            case 'yesterday':
              return orderDate.toDateString() === yesterday.toDateString()
            case 'week':
              return orderDate >= weekStart
            case 'month':
              return orderDate >= monthStart
            default:
              return true
          }
        })
      }

      // Sort by created date (newest first)
      return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage)
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredOrders.slice(start, end)
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
    resetFilters() {
      this.searchQuery = ''
      this.statusFilter = ''
      this.dateFilter = ''
      this.currentPage = 1
    },
    toggleSelectAll() {
      if (this.selectedOrders.length === this.filteredOrders.length) {
        this.selectedOrders = []
      } else {
        this.selectedOrders = this.filteredOrders.map(order => order.id)
      }
    },
    viewOrderDetail(order) {
      this.selectedOrderDetail = order
      this.showOrderDetail = true
    },
    editOrder(order) {
      // Implementation for edit order
      console.log('Edit order:', order.id)
      // You can navigate to edit page or show edit modal
    },
    deleteOrder(orderId) {
      if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
        this.orders = this.orders.filter(order => order.id !== orderId)
        this.selectedOrders = this.selectedOrders.filter(id => id !== orderId)
        this.$toast.success('Pesanan berhasil dihapus')
      }
    },
    updateOrderStatus(orderId, newStatus) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = newStatus
        order.updatedAt = new Date()
        this.$toast.success(`Status pesanan ${orderId} berhasil diubah menjadi ${newStatus}`)
      }
    },
    bulkUpdateStatus(status) {
      if (this.selectedOrders.length === 0) return
      
      if (confirm(`Apakah Anda yakin ingin mengubah status ${this.selectedOrders.length} pesanan menjadi ${status}?`)) {
        this.selectedOrders.forEach(orderId => {
          const order = this.orders.find(o => o.id === orderId)
          if (order) {
            order.status = status
            order.updatedAt = new Date()
          }
        })
        this.selectedOrders = []
        this.$toast.success(`Status ${this.selectedOrders.length} pesanan berhasil diubah`)
      }
    },
    bulkDelete() {
      if (this.selectedOrders.length === 0) return
      
      if (confirm(`Apakah Anda yakin ingin menghapus ${this.selectedOrders.length} pesanan?`)) {
        this.orders = this.orders.filter(order => !this.selectedOrders.includes(order.id))
        this.selectedOrders = []
        this.$toast.success('Pesanan yang dipilih berhasil dihapus')
      }
    },
    exportOrders() {
      // Implementation for export to Excel
      console.log('Exporting orders to Excel...')
      // You can use libraries like xlsx or csv-export
      this.$toast.success('Data pesanan berhasil diekspor')
    },
    refreshOrders() {
      // Implementation for refresh orders from API
      console.log('Refreshing orders...')
      this.$toast.success('Data pesanan berhasil diperbarui')
    },
    getStatusSelectClass(status) {
      const baseClass = 'text-xs font-medium rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500'
      switch (status) {
        case 'Pending':
          return `${baseClass} bg-orange-100 text-orange-800`
        case 'Processing':
          return `${baseClass} bg-blue-100 text-blue-800`
        case 'Delivered':
          return `${baseClass} bg-green-100 text-green-800`
        case 'Cancelled':
          return `${baseClass} bg-red-100 text-red-800`
        default:
          return `${baseClass} bg-gray-100 text-gray-800`
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount)
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  mounted() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        this.profileDropdownOpen = false
      }
    })
  },
  watch: {
    // Reset to first page when filters change
    searchQuery() {
      this.currentPage = 1
    },
    statusFilter() {
      this.currentPage = 1
    },
    dateFilter() {
      this.currentPage = 1
    }
  }
}
</script>