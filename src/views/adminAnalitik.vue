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
              <h1 class="text-xl lg:text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Analitik & Laporan</h1>
            </div>
            
            
            <div class="flex items-center space-x-4">
              <select 
                v-model="dateFilter"
                @change="updateAnalytics"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="today">Hari Ini</option>
                <option value="week">7 Hari Terakhir</option>
                <option value="month">30 Hari Terakhir</option>
                <option value="quarter">3 Bulan Terakhir</option>
                <option value="year">1 Tahun Terakhir</option>
              </select>
              
              
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
                    <a href="/admin/pengaturan" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <hr class="my-1 border-gray-200">
                    <a href="/login" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</a>
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
                  <p class="text-sm font-medium text-gray-600">Total Pendapatan</p>
                  <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(analytics.totalRevenue) }}</p>
                  <p class="text-sm mt-1" :class="analytics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                    <span class="font-medium">
                      {{ analytics.revenueGrowth >= 0 ? '+' : '' }}{{ analytics.revenueGrowth }}%
                    </span>
                    vs periode sebelumnya
                  </p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Pesanan</p>
                  <p class="text-2xl font-bold text-gray-900">{{ analytics.totalOrders }}</p>
                  <p class="text-sm mt-1" :class="analytics.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                    <span class="font-medium">
                      {{ analytics.orderGrowth >= 0 ? '+' : '' }}{{ analytics.orderGrowth }}%
                    </span>
                    vs periode sebelumnya
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
                  <p class="text-sm font-medium text-gray-600">Pelanggan Aktif</p>
                  <p class="text-2xl font-bold text-gray-900">{{ analytics.activeCustomers }}</p>
                  <p class="text-sm mt-1" :class="analytics.customerGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                    <span class="font-medium">
                      {{ analytics.customerGrowth >= 0 ? '+' : '' }}{{ analytics.customerGrowth }}%
                    </span>
                    vs periode sebelumnya
                  </p>
                </div>
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Produk Terlaris</p>
                  <p class="text-2xl font-bold text-gray-900">{{ analytics.bestSellingProduct.name }}</p>
                  <p class="text-sm text-orange-600 mt-1">
                    <span class="font-medium">{{ analytics.bestSellingProduct.sold }} unit</span>
                    terjual
                  </p>
                </div>
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900">Grafik Pendapatan</h3>
                <div class="flex space-x-2">
                  <button 
                    @click="chartType = 'revenue'"
                    :class="chartType === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
                    class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                  >
                    Pendapatan
                  </button>
                  <button 
                    @click="chartType = 'orders'"
                    :class="chartType === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
                    class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                  >
                    Pesanan
                  </button>
                </div>
              </div>
              
              
              <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <p class="text-gray-500 text-sm">Grafik {{ chartType === 'revenue' ? 'Pendapatan' : 'Pesanan' }}</p>
                  <p class="text-gray-400 text-xs mt-1">{{ getChartPeriodText() }}</p>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900">Distribusi Produk</h3>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Lihat Detail
                </button>
              </div>
              
              
              <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                  </svg>
                  <p class="text-gray-500 text-sm">Pie Chart Distribusi Produk</p>
                  <p class="text-gray-400 text-xs mt-1">Berdasarkan kategori</p>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900">Produk Terlaris</h3>
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="(product, index) in topProducts" :key="product.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 font-semibold text-sm">{{ index + 1 }}</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ product.name }}</p>
                        <p class="text-sm text-gray-500">{{ product.category }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-900">{{ product.sold }} unit</p>
                      <p class="text-sm text-green-600">{{ formatCurrency(product.revenue) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span class="text-gray-600 font-semibold text-sm">#{{ order.id }}</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ order.customerName }}</p>
                        <p class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-900">{{ formatCurrency(order.total) }}</p>
                      <span :class="getOrderStatusBadgeClass(order.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        {{ getOrderStatusText(order.status) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Insight Pelanggan</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Pelanggan Baru</span>
                  <span class="font-semibold text-gray-900">{{ analytics.newCustomers }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Pelanggan Returning</span>
                  <span class="font-semibold text-gray-900">{{ analytics.returningCustomers }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Rata-rata Order</span>
                  <span class="font-semibold text-gray-900">{{ formatCurrency(analytics.avgOrderValue) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Customer Lifetime Value</span>
                  <span class="font-semibold text-gray-900">{{ formatCurrency(analytics.customerLifetimeValue) }}</span>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Status Inventori</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Total Produk</span>
                  <span class="font-semibold text-gray-900">{{ analytics.inventory.totalProducts }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Stok Rendah</span>
                  <span class="font-semibold text-red-600">{{ analytics.inventory.lowStock }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Stok Habis</span>
                  <span class="font-semibold text-red-600">{{ analytics.inventory.outOfStock }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Nilai Inventori</span>
                  <span class="font-semibold text-gray-900">{{ formatCurrency(analytics.inventory.totalValue) }}</span>
                </div>
              </div>
            </div>
            
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Metrik Performa</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Conversion Rate</span>
                  <span class="font-semibold text-green-600">{{ analytics.performance.conversionRate }}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Bounce Rate</span>
                  <span class="font-semibold text-orange-600">{{ analytics.performance.bounceRate }}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Avg. Session Duration</span>
                  <span class="font-semibold text-gray-900">{{ analytics.performance.avgSessionDuration }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Return Customer Rate</span>
                  <span class="font-semibold text-blue-600">{{ analytics.performance.returnCustomerRate }}%</span>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Export Laporan</h3>
                <p class="text-sm text-gray-600">Unduh laporan analitik dalam berbagai format</p>
              </div>
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-0">
                <button 
                  @click="exportReport('pdf')"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Export PDF
                </button>
                <button 
                  @click="exportReport('excel')"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Export Excel
                </button>
                <button 
                  @click="exportReport('csv')"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Export CSV
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
      
      
      <div v-if="showToast" class="fixed top-4 right-4 z-50 transition-all duration-300">
        <div :class="toastClass" class="px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-sm font-medium">{{ toast.message }}</span>
          <button @click="showToast = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminNavbar from '@/components/AdminNavbar.vue'
  
  export default {
    name: 'AnalyticsPage',
    components: {
      AdminNavbar
    },
    data() {
      return {
        // Sidebar state
        sidebarOpen: false,
        profileDropdownOpen: false,
        
        // Filters
        dateFilter: 'month',
        chartType: 'revenue',
        
        // Toast notification
        showToast: false,
        toast: {
          type: 'success',
          message: ''
        },
        
        // Analytics data
        analytics: {
          totalRevenue: 15750000,
          revenueGrowth: 12.5,
          totalOrders: 342,
          orderGrowth: 8.3,
          activeCustomers: 156,
          customerGrowth: 15.7,
          bestSellingProduct: {
            name: 'Botol Tanggung 750ml',
            sold: 89
          },
          newCustomers: 23,
          returningCustomers: 133,
          avgOrderValue: 46053,
          customerLifetimeValue: 185000,
          inventory: {
            totalProducts: 15,
            lowStock: 3,
            outOfStock: 1,
            totalValue: 2350000
          },
          performance: {
          conversionRate: 3.2,
          bounceRate: 45.7,
          avgSessionDuration: '2m 34s',
          returnCustomerRate: 67.8
        }
      },
      
      // Top products data
      topProducts: [
        {
          id: 1,
          name: 'Botol Tanggung 750ml',
          category: 'Botol Plastik',
          sold: 89,
          revenue: 4450000
        },
        {
          id: 2,
          name: 'Galon Air 19L',
          category: 'Galon',
          sold: 67,
          revenue: 3350000
        },
        {
          id: 3,
          name: 'Botol Kecil 330ml',
          category: 'Botol Plastik',
          sold: 54,
          revenue: 1620000
        },
        {
          id: 4,
          name: 'Dispenser Manual',
          category: 'Aksesoris',
          sold: 23,
          revenue: 1150000
        },
        {
          id: 5,
          name: 'Tutup Galon Premium',
          category: 'Aksesoris',
          sold: 45,
          revenue: 675000
        }
      ],
      
      // Recent orders data
      recentOrders: [
        {
          id: 1234,
          customerName: 'Budi Santoso',
          total: 125000,
          status: 'completed',
          createdAt: new Date('2025-06-20T08:30:00')
        },
        {
          id: 1235,
          customerName: 'Siti Rahayu',
          total: 89000,
          status: 'processing',
          createdAt: new Date('2025-06-20T07:15:00')
        },
        {
          id: 1236,
          customerName: 'Ahmad Fauzi',
          total: 156000,
          status: 'shipped',
          createdAt: new Date('2025-06-19T16:45:00')
        },
        {
          id: 1237,
          customerName: 'Dewi Lestari',
          total: 67000,
          status: 'pending',
          createdAt: new Date('2025-06-19T14:20:00')
        },
        {
          id: 1238,
          customerName: 'Rudi Hermawan',
          total: 198000,
          status: 'completed',
          createdAt: new Date('2025-06-19T10:30:00')
        }
      ]
    }
  },
  
  computed: {
    toastClass() {
      return {
        'bg-green-50 border border-green-200 text-green-800': this.toast.type === 'success',
        'bg-red-50 border border-red-200 text-red-800': this.toast.type === 'error',
        'bg-blue-50 border border-blue-200 text-blue-800': this.toast.type === 'info'
      }
    }
  },
  
  methods: {
    // Sidebar methods
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    
    closeSidebar() {
      this.sidebarOpen = false
      this.profileDropdownOpen = false
    },
    
    // Analytics methods
    updateAnalytics() {
      // Simulate API call to update analytics based on date filter
      this.showToast = true
      this.toast = {
        type: 'success',
        message: `Data analitik diperbarui untuk periode ${this.getDateFilterText()}`
      }
      
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false
      }, 3000)
      
      // Here you would typically make an API call to fetch new data
      // this.fetchAnalyticsData(this.dateFilter)
    },
    
    getDateFilterText() {
      const filterTexts = {
        'today': 'hari ini',
        'week': '7 hari terakhir',
        'month': '30 hari terakhir',
        'quarter': '3 bulan terakhir',
        'year': '1 tahun terakhir'
      }
      return filterTexts[this.dateFilter] || 'periode yang dipilih'
    },
    
    getChartPeriodText() {
      return `Data ${this.getDateFilterText()}`
    },
    
    // Utility methods
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    },
    
    formatDate(date) {
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date))
    },
    
    getOrderStatusText(status) {
      const statusTexts = {
        'pending': 'Menunggu',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'completed': 'Selesai',
        'cancelled': 'Dibatalkan'
      }
      return statusTexts[status] || status
    },
    
    getOrderStatusBadgeClass(status) {
      const statusClasses = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'processing': 'bg-blue-100 text-blue-800',
        'shipped': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    },
    
    // Export methods
    exportReport(format) {
      this.showToast = true
      this.toast = {
        type: 'success',
        message: `Laporan ${format.toUpperCase()} sedang dipersiapkan untuk diunduh`
      }
      
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false
      }, 3000)
      
      // Here you would typically trigger the actual export
      // this.downloadReport(format, this.dateFilter)
      
      // Simulate download after 2 seconds
      setTimeout(() => {
        this.showToast = true
        this.toast = {
          type: 'success',
          message: `Laporan ${format.toUpperCase()} berhasil diunduh`
        }
        
        setTimeout(() => {
          this.showToast = false
        }, 3000)
      }, 2000)
    },
    
    // Data fetching methods (would be API calls in real implementation)
    fetchAnalyticsData(period) {
      // Simulate API call
      console.log(`Fetching analytics data for period: ${period}`)
    }
  },
  
  mounted() {
    // Initialize analytics data when component is mounted
    this.updateAnalytics()
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        this.profileDropdownOpen = false
      }
    })
  },
  
  beforeUnmount() {
    // Clean up event listeners
    document.removeEventListener('click', () => {})
  }
}

</script>