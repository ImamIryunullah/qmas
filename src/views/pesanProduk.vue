<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
    
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-blue-600">Q-Mas M</div>
          </div>
          <button 
            @click="goBack" 
            class="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Kembali
          </button>
        </div>
      </div>
    </nav>

    
    <section class="py-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Pesan Q-Mas M</h1>
        <p class="text-xl text-blue-100 max-w-2xl mx-auto">
          Air minum berkualitas tinggi dari Panti Asuhan KH Mas Mansur Malang
        </p>
      </div>
    </section>

    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        
        <div class="space-y-8">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Pilih Produk</h2>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="product in products" 
                :key="product.id"
                class="border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
                :class="selectedProduct?.id === product.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"
                @click="selectProduct(product)"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2L3 7v11h14V7l-7-5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
                      <p class="text-gray-600">{{ product.description }}</p>
                      <p class="text-2xl font-bold text-blue-600 mt-2">Rp {{ product.price.toLocaleString('id-ID') }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <button 
                      @click.stop="decreaseQuantity(product.id)"
                      class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                      :disabled="getQuantity(product.id) <= 0"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                      </svg>
                    </button>
                    <span class="w-8 text-center font-semibold">{{ getQuantity(product.id) }}</span>
                    <button 
                      @click.stop="increaseQuantity(product.id)"
                      class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div class="bg-white rounded-2xl shadow-xl p-8" v-if="totalQuantity > 0">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>
            <div class="space-y-4">
              <div v-for="item in orderItems" :key="item.id" class="flex justify-between">
                <span class="text-gray-600">{{ item.name }} x{{ item.quantity }}</span>
                <span class="font-semibold">Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</span>
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span class="text-blue-600">Rp {{ totalPrice.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Informasi Pengiriman</h2>
          </div>

          <form @submit.prevent="submitOrder" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input 
                  v-model="form.fullName"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
              <textarea 
                v-model="form.address"
                rows="4" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Jalan, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Metode Pengiriman</label>
                <select 
                  v-model="form.deliveryMethod"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Pilih metode pengiriman</option>
                  <option value="reguler">Reguler (2-3 hari)</option>
                  <option value="express">Express (1-2 hari)</option>
                  <option value="same-day">Same Day (Hari ini)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
                <select 
                  v-model="form.paymentMethod"
                  @change="form.paymentDetail = ''"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Pilih metode pembayaran</option>
                  <option value="transfer">Transfer Bank</option>
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="ewallet">E-Wallet</option>
                  <option value="qris">QRIS</option>
                  <option value="virtual-account">Virtual Account</option>
                </select>
              </div>
            </div>

            
            <div v-if="form.paymentMethod" class="transition-all duration-500 ease-in-out">
              
              <div v-if="form.paymentMethod === 'transfer'" class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 class="font-semibold text-blue-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  </svg>
                  Transfer Bank
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pilih Bank</label>
                    <select 
                      v-model="form.paymentDetail"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih bank tujuan</option>
                      <option value="bca">BCA - 1234567890 (a.n. Panti Asuhan KH Mas Mansyur)</option>
                      <option value="mandiri">Mandiri - 0987654321 (a.n. Panti Asuhan KH Mas Mansyur)</option>
                      <option value="bni">BNI - 1122334455 (a.n. Panti Asuhan KH Mas Mansyur)</option>
                      <option value="bri">BRI - 5544332211 (a.n. Panti Asuhan KH Mas Mansyur)</option>
                    </select>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p class="text-sm text-yellow-800">
                      <strong>Catatan:</strong> Setelah transfer, mohon kirim bukti pembayaran melalui WhatsApp ke 0812-3456-7890
                    </p>
                  </div>
                </div>
              </div>

              
              <div v-if="form.paymentMethod === 'cod'" class="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 class="font-semibold text-green-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h6zM4 11a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zM7 10a1 1 0 100 2h1a1 1 0 100-2H7z"/>
                  </svg>
                  Cash on Delivery (COD)
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Area COD</label>
                    <select 
                      v-model="form.paymentDetail"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih area COD</option>
                      <option value="malang-kota">Malang Kota (Gratis)</option>
                      <option value="malang-kabupaten">Malang Kabupaten (+Rp 5.000)</option>
                      <option value="batu">Kota Batu (+Rp 10.000)</option>
                    </select>
                  </div>
                  <div class="bg-green-100 border border-green-300 rounded-lg p-3">
                    <p class="text-sm text-green-800">
                      <strong>Info:</strong> Pembayaran dilakukan saat barang sampai. Siapkan uang pas untuk memudahkan transaksi.
                    </p>
                  </div>
                </div>
              </div>

              
              <div v-if="form.paymentMethod === 'ewallet'" class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 class="font-semibold text-purple-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                  E-Wallet
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pilih E-Wallet</label>
                    <select 
                      v-model="form.paymentDetail"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih e-wallet</option>
                      <option value="gopay">GoPay - 0812-3456-7890</option>
                      <option value="ovo">OVO - 0812-3456-7890</option>
                      <option value="dana">DANA - 0812-3456-7890</option>
                      <option value="shopeepay">ShopeePay - 0812-3456-7890</option>
                      <option value="linkaja">LinkAja - 0812-3456-7890</option>
                    </select>
                  </div>
                  <div class="bg-purple-100 border border-purple-300 rounded-lg p-3">
                    <p class="text-sm text-purple-800">
                      <strong>Cara Bayar:</strong> Transfer ke nomor yang dipilih, lalu kirim screenshot bukti pembayaran ke WhatsApp kami.
                    </p>
                  </div>
                </div>
              </div>

              
              <div v-if="form.paymentMethod === 'qris'" class="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h4 class="font-semibold text-indigo-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clip-rule="evenodd"/>
                    <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 01-1-1zM16 10a1 1 0 100-2H9a1 1 0 100 2h7zM9 15a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM13 15a1 1 0 100-2H9a1 1 0 100 2h4z"/>
                  </svg>
                  QRIS
                </h4>
                <div class="text-center">
                  <div class="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div class="text-gray-400">
                      <svg class="w-20 h-20 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clip-rule="evenodd"/>
                      </svg>
                      <p class="text-sm">QR Code Q-Mas M</p>
                    </div>
                  </div>
                  <div class="bg-indigo-100 border border-indigo-300 rounded-lg p-3">
                    <p class="text-sm text-indigo-800">
                      <strong>Cara Bayar:</strong> Scan QR Code dengan aplikasi mobile banking atau e-wallet Anda
                    </p>
                  </div>
                </div>
                <input type="hidden" v-model="form.paymentDetail" value="qris-selected" />
              </div>

              
              <div v-if="form.paymentMethod === 'virtual-account'" class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 class="font-semibold text-orange-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                  </svg>
                  Virtual Account
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pilih Bank</label>
                    <select 
                      v-model="form.paymentDetail"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih bank untuk VA</option>
                      <option value="bca-va">BCA Virtual Account</option>
                      <option value="mandiri-va">Mandiri Virtual Account</option>
                      <option value="bni-va">BNI Virtual Account</option>
                      <option value="bri-va">BRI Virtual Account</option>
                      <option value="permata-va">Permata Virtual Account</option>
                    </select>
                  </div>
                  <div class="bg-orange-100 border border-orange-300 rounded-lg p-3">
                    <p class="text-sm text-orange-800">
                      <strong>Info:</strong> Nomor Virtual Account akan dikirim via SMS/WhatsApp setelah konfirmasi pesanan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catatan Tambahan (Opsional)</label>
              <textarea 
                v-model="form.notes"
                rows="3" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Catatan khusus untuk pesanan Anda..."
              ></textarea>
            </div>

            <div class="flex items-center">
              <input 
                v-model="form.agreeTerms"
                type="checkbox" 
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700">
                Saya setuju dengan <a href="#" class="text-blue-600 hover:text-blue-800">syarat dan ketentuan</a>
              </label>
            </div>

            <button 
              type="submit"
              :disabled="totalQuantity === 0 || isSubmitting"
              class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                Pesan Sekarang - Rp {{ totalPrice.toLocaleString('id-ID') }}
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses Pesanan...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>

    
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h3>
          <p class="text-gray-600 mb-6">
            Terima kasih atas pesanan Anda. Kami akan segera menghubungi Anda untuk konfirmasi.
          </p>
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <p class="text-sm text-gray-600">ID Pesanan:</p>
            <p class="font-mono font-bold text-lg">{{ orderId }}</p>
          </div>
          <button 
            @click="closeSuccessModal"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderPage',
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Q-Mas M 600ml',
          description: 'Botol praktis untuk kebutuhan sehari-hari',
          price: 3000
        },
        {
          id: 2,
          name: 'Q-Mas M 1.5L',
          description: 'Ukuran keluarga yang ekonomis',
          price: 7000
        },
        {
          id: 3,
          name: 'Q-Mas M 19L (Galon)',
          description: 'Untuk kebutuhan kantor dan rumah',
          price: 15000
        }
      ],
      selectedProduct: null,
      quantities: {},
      form: {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        deliveryMethod: '',
        paymentMethod: '',
        paymentDetail: '',
        notes: '',
        agreeTerms: false
      },
      isSubmitting: false,
      showSuccessModal: false,
      orderId: ''
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.quantities).reduce((sum, qty) => sum + qty, 0);
    },
    totalPrice() {
      return this.products.reduce((sum, product) => {
        const qty = this.quantities[product.id] || 0;
        return sum + (product.price * qty);
      }, 0);
    },
    orderItems() {
      return this.products
        .filter(product => this.quantities[product.id] > 0)
        .map(product => ({
          ...product,
          quantity: this.quantities[product.id]
        }));
    }
  },
  methods: {
    selectProduct(product) {
      this.selectedProduct = product;
    },
    getQuantity(productId) {
      return this.quantities[productId] || 0;
    },
    increaseQuantity(productId) {
      this.quantities[productId] = (this.quantities[productId] || 0) + 1;
    },
    decreaseQuantity(productId) {
      if (this.quantities[productId] > 0) {
        this.quantities[productId]--;
      }
    },
    async submitOrder() {
      this.isSubmitting = true;
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate order ID
        this.orderId = 'QM' + Date.now().toString().slice(-8);
        
        // Show success modal
        this.showSuccessModal = true;
        
        // Reset form
        this.resetForm();
        
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.form = {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        deliveryMethod: '',
        paymentMethod: '',
        paymentDetail: '',
        notes: '',
        agreeTerms: false
      };
      this.quantities = {};
      this.selectedProduct = null;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      // Optionally navigate back to home page
      this.goBack();
    },
    goBack() {
      // This would typically use Vue Router
      window.history.back();
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>