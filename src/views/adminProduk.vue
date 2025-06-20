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
                <h1 class="text-xl lg:text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Kelola Produk</h1>
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
                    <p class="text-sm font-medium text-gray-600">Total Produk</p>
                    <p class="text-2xl font-bold text-gray-900">{{ totalProducts }}</p>
                    <p class="text-sm text-blue-600 mt-1">
                        <span class="font-medium">Semua Kategori</span>
                    </p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    </div>
                </div>
                </div>
                
                
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                    <p class="text-sm font-medium text-gray-600">Produk Aktif</p>
                    <p class="text-2xl font-bold text-gray-900">{{ activeProducts }}</p>
                    <p class="text-sm text-green-600 mt-1">
                        <span class="font-medium">Tersedia</span>
                    </p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    </div>
                </div>
                </div>
                
                
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                    <p class="text-sm font-medium text-gray-600">Stok Rendah</p>
                    <p class="text-2xl font-bold text-gray-900">{{ lowStockProducts }}</p>
                    <p class="text-sm text-orange-600 mt-1">
                        <span class="font-medium">Perlu Restock</span>
                    </p>
                    </div>
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    </div>
                </div>
                </div>
                
                
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                    <p class="text-sm font-medium text-gray-600">Produk Terlaris</p>
                    <p class="text-2xl font-bold text-gray-900">{{ bestSellerCount }}</p>
                    <p class="text-sm text-purple-600 mt-1">
                        <span class="font-medium">Bulan Ini</span>
                    </p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
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
                        placeholder="Cari berdasarkan nama produk..."
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1 sm:w-64"
                    >
                    <select 
                        v-model="categoryFilter"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Semua Kategori</option>
                        <option value="Kue">Kue</option>
                        <option value="Roti">Roti</option>
                        <option value="Donat">Donat</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Muffin">Muffin</option>
                        <option value="Cake">Cake</option>
                    </select>
                    <select 
                        v-model="statusFilter"
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                        <option value="low_stock">Stok Rendah</option>
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
                    <h2 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">Daftar Produk ({{ filteredProducts.length }})</h2>
                    <div class="flex space-x-3">
                    <button 
                        @click="exportProducts"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Export Excel
                    </button>
                    <button 
                        @click="showAddProduct = true"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Tambah Produk
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
                            :checked="selectedProducts.length === filteredProducts.length && filteredProducts.length > 0"
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        >
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terjual</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                        <input 
                            type="checkbox" 
                            :value="product.id"
                            v-model="selectedProducts"
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        >
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-lg object-cover" :src="product.image" :alt="product.name">
                            </div>
                            <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                            <div class="text-sm text-gray-500">{{ product.sku }}</div>
                            </div>
                        </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {{ product.category }}
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ formatCurrency(product.price) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ product.stock }} unit</div>
                        <div v-if="product.stock <= product.minStock" class="text-xs text-red-500">Stok rendah!</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="getStatusBadgeClass(product.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getStatusText(product.status) }}
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ product.sold }} unit
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{{ formatDate(product.createdAt) }}</div>
                        <div class="text-xs text-gray-400">{{ formatTime(product.createdAt) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex items-center space-x-2">
                            <button 
                            @click="viewProductDetail(product)"
                            class="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                            title="Lihat Detail"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            </button>
                            <button 
                            @click="editProduct(product)"
                            class="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors"
                            title="Edit Produk"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            </button>
                            <button 
                            @click="toggleProductStatus(product.id)"
                            :class="product.status === 'active' ? 'text-orange-600 hover:text-orange-900 hover:bg-orange-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50'"
                            class="p-1 rounded transition-colors"
                            :title="product.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'"
                            >
                            <svg v-if="product.status === 'active'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 12M6 6l12 12"></path>
                            </svg>
                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            </button>
                            <button 
                            @click="deleteProduct(product.id)"
                            class="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                            title="Hapus Produk"
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
                    Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} dari {{ filteredProducts.length }} produk
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
            
            
            <div v-if="selectedProducts.length > 0" class="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">{{ selectedProducts.length }} produk dipilih</span>
                <div class="flex space-x-2">
                    <button 
                    @click="bulkUpdateStatus('active')"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                    Aktifkan
                    </button>
                    <button 
                    @click="bulkUpdateStatus('inactive')"
                    class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                    Nonaktifkan
                    </button>
                    <button 
                    @click="bulkDelete"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                    Hapus
                    </button>
                </div>
                <button 
                    @click="selectedProducts = []"
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
        
        
        <div v-if="showProductDetail" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Detail Produk</h3>
                <button 
                    @click="showProductDetail = false"
                    class="text-gray-400 hover:text-gray-600"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                </div>
            </div>
            <div class="p-6" v-if="selectedProductDetail">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div class="space-y-6">
                    <div class="text-center">
                    <img :src="selectedProductDetail.image" :alt="selectedProductDetail.name" class="w-64 h-64 mx-auto rounded-lg object-cover shadow-md">
                    </div>
                </div>
                
                
                <div class="space-y-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-3">Informasi Produk</h4>
                    <div class="space-y-2 text-sm">
                        <div><strong>Nama:</strong> {{ selectedProductDetail.name }}</div>
                        <div><strong>SKU:</strong> {{ selectedProductDetail.sku }}</div>
                        <div><strong>Kategori:</strong> {{ selectedProductDetail.category }}</div>
                        <div><strong>Harga:</strong> {{ formatCurrency(selectedProductDetail.price) }}</div>
                        <div><strong>Status:</strong> 
                        <span :class="getStatusBadgeClass(selectedProductDetail.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2">
                            {{ getStatusText(selectedProductDetail.status) }}
                        </span>
                        </div>
                        <div><strong>Deskripsi:</strong> {{ selectedProductDetail.description }}</div>
                    </div>
                    </div>
                    
                    <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-3">Informasi Stok</h4>
                    <div class="space-y-2 text-sm">
                        <div><strong>Stok Tersedia:</strong> {{ selectedProductDetail.stock }} unit</div>
                        <div><strong>Stok Minimum:</strong> {{ selectedProductDetail.minStock }} unit</div>
                        <div><strong>Total Terjual:</strong> {{ selectedProductDetail.sold }} unit</div>
                        <div><strong>Berat:</strong> {{ selectedProductDetail.weight }} gram</div>
                    <div v-if="selectedProductDetail.stock <= selectedProductDetail.minStock" class="text-red-600">
                        <strong>⚠️ Peringatan:</strong> Stok sudah mencapai batas minimum!
                    </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-3">Riwayat Produk</h4>
                    <div class="space-y-2 text-sm">
                    <div><strong>Dibuat:</strong> {{ formatDate(selectedProductDetail.createdAt) }} {{ formatTime(selectedProductDetail.createdAt) }}</div>
                    <div><strong>Diupdate:</strong> {{ formatDate(selectedProductDetail.updatedAt) }} {{ formatTime(selectedProductDetail.updatedAt) }}</div>
                    <div><strong>Dibuat oleh:</strong> {{ selectedProductDetail.createdBy }}</div>
                    <div><strong>Diupdate oleh:</strong> {{ selectedProductDetail.updatedBy }}</div>
                    </div>
                </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-6 flex justify-end space-x-3">
                <button 
                @click="editProduct(selectedProductDetail)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                Edit Produk
                </button>
                <button 
                @click="showProductDetail = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                Tutup
                </button>
            </div>
            </div>
        </div>
        </div>
        
        <!-- Modal Add/Edit Product -->
        <div v-if="showAddProduct || showEditProduct" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                {{ showAddProduct ? 'Tambah Produk Baru' : 'Edit Produk' }}
                </h3>
                <button 
                @click="closeProductModal"
                class="text-gray-400 hover:text-gray-600"
                >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                </button>
            </div>
            </div>
            
            <form @submit.prevent="submitProduct" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Column -->
                <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Produk *</label>
                    <input 
                    v-model="productForm.name"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama produk"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                    <input 
                    v-model="productForm.sku"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan SKU produk"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                    <select 
                    v-model="productForm.category"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="">Pilih Kategori</option>
                    <option value="Kue">Kue</option>
                    <option value="Roti">Roti</option>
                    <option value="Donat">Donat</option>
                    <option value="Cookies">Cookies</option>
                    <option value="Muffin">Muffin</option>
                    <option value="Cake">Cake</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Harga *</label>
                    <input 
                    v-model="productForm.price"
                    type="number" 
                    min="0"
                    step="100"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Berat (gram)</label>
                    <input 
                    v-model="productForm.weight"
                    type="number" 
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    >
                </div>
                </div>
                
                <!-- Right Column -->
                <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Stok *</label>
                    <input 
                    v-model="productForm.stock"
                    type="number" 
                    min="0"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Stok Minimum *</label>
                    <input 
                    v-model="productForm.minStock"
                    type="number" 
                    min="0"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select 
                    v-model="productForm.status"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label>
                    <input 
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <div v-if="productForm.image" class="mt-2">
                    <img :src="productForm.image" alt="Preview" class="w-20 h-20 object-cover rounded-lg">
                    </div>
                </div>
                </div>
            </div>
            
            <!-- Description -->
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea 
                v-model="productForm.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan deskripsi produk (opsional)"
                ></textarea>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-6 flex justify-end space-x-3">
                <button 
                type="button"
                @click="closeProductModal"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                Batal
                </button>
                <button 
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                {{ showAddProduct ? 'Tambah Produk' : 'Update Produk' }}
                </button>
            </div>
            </form>
        </div>
        </div>
        
        <!-- Confirmation Modal -->
        <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-md w-full">
            <div class="p-6">
            <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">{{ confirmDialog.title }}</h3>
            <p class="text-gray-600 text-center mb-6">{{ confirmDialog.message }}</p>
            <div class="flex justify-center space-x-3">
                <button 
                @click="showConfirmDialog = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                Batal
                </button>
                <button 
                @click="confirmDialog.action(); showConfirmDialog = false"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                Ya, Hapus
                </button>
            </div>
            </div>
        </div>
        </div>
        
        <!-- Toast Notification -->
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
    name: 'ProductManagement',
    components: {
        AdminNavbar
    },
    data() {
        return {
        // Sidebar state
        sidebarOpen: false,
        profileDropdownOpen: false,
        
        // Search and filter
        searchQuery: '',
        categoryFilter: '',
        statusFilter: '',
        
        // Pagination
        currentPage: 1,
        itemsPerPage: 10,
        
        // Selection
        selectedProducts: [],
        
        // Modals
        showProductDetail: false,
        showAddProduct: false,
        showEditProduct: false,
        showConfirmDialog: false,
        showToast: false,
        
        // Selected product for detail view
        selectedProductDetail: null,
        
        // Product form
        productForm: {
            id: null,
            name: '',
            sku: '',
            category: '',
            price: 0,
            stock: 0,
            minStock: 5,
            status: 'active',
            description: '',
            image: '',
            weight: 0
        },
        
        // Confirmation dialog
        confirmDialog: {
            title: '',
            message: '',
            action: null
        },
        
        // Toast notification
        toast: {
            type: 'success', // success, error, warning, info
            message: ''
        },
        
        // Sample products data
        products: [
            {
            id: 1,
            name: 'Botol Tanggung 750ml QMas',
            sku: 'CRO-BUT-001',
            category: 'Botol',
            price: 15000,
            stock: 25,
            minStock: 5,
            status: 'active',
            sold: 150,
            description: 'Croissant lembut dengan butter premium, dipanggang fresh setiap hari.',
            image: 'https://images.unsplash.com/photo-1555507036-ab794f674c7f?w=300&h=300&fit=crop',
            weight: 80,
            createdAt: '2024-01-15T08:30:00Z',
            updatedAt: '2024-01-20T10:15:00Z',
            createdBy: 'Admin Baker',
            updatedBy: 'Admin Baker'
            },
            {
            id: 2,
            name: 'Galon Qmas 15L',
            sku: 'CAK-CHO-001',
            category: 'Galon',
            price: 85000,
            stock: 8,
            minStock: 3,
            status: 'active',
            sold: 45,
            description: 'Kue coklat premium dengan lapisan ganache dan topping berry.',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
            weight: 500,
            createdAt: '2024-01-10T14:20:00Z',
            updatedAt: '2024-01-18T16:45:00Z',
            createdBy: 'Admin Baker',
            updatedBy: 'Manager'
            },
            {
            id: 3,
            name: 'Gelas Qmas',
            sku: 'DON-GLA-001',
            category: 'Gelas',
            price: 8000,
            stock: 2,
            minStock: 10,
            status: 'active',
            sold: 320,
            description: 'Donat klasik dengan glazur manis yang meleleh di mulut.',
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop',
            weight: 60,
            createdAt: '2024-01-12T09:15:00Z',
            updatedAt: '2024-01-19T11:30:00Z',
            createdBy: 'Staff Produksi',
            updatedBy: 'Admin Baker'
            },
        ]
        }
    },
    
    computed: {
        // Statistics
        totalProducts() {
        return this.products.length
        },
        
        activeProducts() {
        return this.products.filter(p => p.status === 'active').length
        },
        
        lowStockProducts() {
        return this.products.filter(p => p.stock <= p.minStock).length
        },
        
        bestSellerCount() {
        return this.products.filter(p => p.sold > 100).length
        },
        
        // Filtered products
        filteredProducts() {
        let filtered = this.products
        
        // Search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase()
            filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
            )
        }
        
        // Category filter
        if (this.categoryFilter) {
            filtered = filtered.filter(product => product.category === this.categoryFilter)
        }
        
        // Status filter
        if (this.statusFilter) {
            if (this.statusFilter === 'low_stock') {
            filtered = filtered.filter(product => product.stock <= product.minStock)
            } else {
            filtered = filtered.filter(product => product.status === this.statusFilter)
            }
        }
        
        return filtered
        },
        
        // Paginated products
        paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredProducts.slice(start, end)
        },
        
        // Total pages
        totalPages() {
        return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
        },
        
        // Toast class
        toastClass() {
        const baseClasses = 'bg-white border-l-4'
        switch (this.toast.type) {
            case 'success':
            return `${baseClasses} border-green-400 text-green-700`
            case 'error':
            return `${baseClasses} border-red-400 text-red-700`
            case 'warning':
            return `${baseClasses} border-yellow-400 text-yellow-700`
            case 'info':
            return `${baseClasses} border-blue-400 text-blue-700`
            default:
            return `${baseClasses} border-gray-400 text-gray-700`
        }
        }
    },
    
    watch: {
        // Reset to first page when filters change
        searchQuery() {
        this.currentPage = 1
        },
        categoryFilter() {
        this.currentPage = 1
        },
        statusFilter() {
        this.currentPage = 1
        },
        
        // Auto hide toast
        showToast(newVal) {
        if (newVal) {
            setTimeout(() => {
            this.showToast = false
            }, 5000)
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
        
        // Filter methods
        resetFilters() {
        this.searchQuery = ''
        this.categoryFilter = ''
        this.statusFilter = ''
        this.selectedProducts = []
        },
        
        // Selection methods
        toggleSelectAll() {
        if (this.selectedProducts.length === this.filteredProducts.length) {
            this.selectedProducts = []
        } else {
            this.selectedProducts = this.filteredProducts.map(p => p.id)
        }
        },
        
        // Product detail methods
        viewProductDetail(product) {
        this.selectedProductDetail = { ...product }
        this.showProductDetail = true
        },
        
        // Product form methods
        editProduct(product) {
        this.productForm = { ...product }
        this.showEditProduct = true
        this.showProductDetail = false
        },
        
        closeProductModal() {
        this.showAddProduct = false
        this.showEditProduct = false
        this.resetProductForm()
        },
        
        resetProductForm() {
        this.productForm = {
            id: null,
            name: '',
            sku: '',
            category: '',
            price: 0,
            stock: 0,
            minStock: 5,
            status: 'active',
            description: '',
            image: '',
            weight: 0
        }
        },
        
        // Image upload handler
        handleImageUpload(event) {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
            this.productForm.image = e.target.result
            }
            reader.readAsDataURL(file)
        }
        },
        
        // Submit product form
        submitProduct() {
        if (this.showAddProduct) {
            // Add new product
            const newProduct = {
            ...this.productForm,
            id: Date.now(), // Simple ID generation
            sold: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'Admin',
            updatedBy: 'Admin'
            }
            
            // Set default image if none provided
            if (!newProduct.image) {
            newProduct.image = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&h=300&fit=crop'
            }
            
            this.products.unshift(newProduct)
            this.showToast = true
            this.toast = {
            type: 'success',
            message: 'Produk berhasil ditambahkan!'
            }
        } else if (this.showEditProduct) {
            // Update existing product
            const index = this.products.findIndex(p => p.id === this.productForm.id)
            if (index !== -1) {
            this.products[index] = {
                ...this.productForm,
                updatedAt: new Date().toISOString(),
                updatedBy: 'Admin'
            }
            this.showToast = true
            this.toast = {
                type: 'success',
                message: 'Produk berhasil diupdate!'
            }
            }
        }
        
        this.closeProductModal()
        },
        
        // Product status methods
        toggleProductStatus(productId) {
        const product = this.products.find(p => p.id === productId)
        if (product) {
            product.status = product.status === 'active' ? 'inactive' : 'active'
            product.updatedAt = new Date().toISOString()
            product.updatedBy = 'Admin'
            
            this.showToast = true
            this.toast = {
            type: 'success',
            message: `Produk berhasil ${product.status === 'active' ? 'diaktifkan' : 'dinonaktifkan'}!`
            }
        }
        },
        
        // Delete product
        deleteProduct(productId) {
        this.confirmDialog = {
            title: 'Hapus Produk',
            message: 'Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.',
            action: () => {
            const index = this.products.findIndex(p => p.id === productId)
            if (index !== -1) {
                this.products.splice(index, 1)
                this.selectedProducts = this.selectedProducts.filter(id => id !== productId)
                
                this.showToast = true
                this.toast = {
                type: 'success',
                message: 'Produk berhasil dihapus!'
                }
            }
            }
        }
        this.showConfirmDialog = true
        },
        
        // Bulk operations
        bulkUpdateStatus(status) {
        if (this.selectedProducts.length === 0) return
        
        this.selectedProducts.forEach(productId => {
            const product = this.products.find(p => p.id === productId)
            if (product) {
            product.status = status
            product.updatedAt = new Date().toISOString()
            product.updatedBy = 'Admin'
            }
        })
        
        this.selectedProducts = []
        this.showToast = true
        this.toast = {
            type: 'success',
            message: `Produk berhasil ${status === 'active' ? 'diaktifkan' : 'dinonaktifkan'}!`
        }
        },
        
        bulkDelete() {
        if (this.selectedProducts.length === 0) return
        
        this.confirmDialog = {
            title: 'Hapus Produk Terpilih',
            message: `Apakah Anda yakin ingin menghapus ${this.selectedProducts.length} produk yang dipilih? Tindakan ini tidak dapat dibatalkan.`,
            action: () => {
            this.products = this.products.filter(p => !this.selectedProducts.includes(p.id))
            const deletedCount = this.selectedProducts.length
            this.selectedProducts = []
            
            this.showToast = true
            this.toast = {
                type: 'success',
                message: `${deletedCount} produk berhasil dihapus!`
            }
            }
        }
        this.showConfirmDialog = true
        },
        
        // Export methods
        exportProducts() {
        // Simple CSV export
        const headers = ['Nama Produk', 'SKU', 'Kategori', 'Harga', 'Stok', 'Status', 'Terjual']
        const csvContent = [
            headers.join(','),
            ...this.filteredProducts.map(product => [
            `"${product.name}"`,
            product.sku,
            product.category,
            product.price,
            product.stock,
            product.status,
            product.sold
            ].join(','))
        ].join('\n')
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `produk_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        this.showToast = true
        this.toast = {
            type: 'success',
            message: 'Data produk berhasil diekspor!'
        }
        },
        
        // Utility methods
        formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount)
        },
        
        formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        },
        
        formatTime(dateString) {
        return new Date(dateString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        })
        },
        
        getStatusText(status) {
        switch (status) {
            case 'active':
            return 'Aktif'
            case 'inactive':
            return 'Nonaktif'
            default:
            return status
        }
        },
        
        getStatusBadgeClass(status) {
        switch (status) {
            case 'active':
            return 'bg-green-100 text-green-800'
            case 'inactive':
            return 'bg-red-100 text-red-800'
            default:
            return 'bg-gray-100 text-gray-800'
        }
        }
    },
    
    // Close dropdowns when clicking outside
    mounted() {
        document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative')) {
            this.profileDropdownOpen = false
        }
        })
    },
    
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }
    }
    </script>