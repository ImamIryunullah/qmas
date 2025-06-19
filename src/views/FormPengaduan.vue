<template>
    <div class="min-h-screen bg-gradient-to-br from-[#D7EDFD] via-[#E8F4FE] to-[#F0F8FF]">
      
      <div class="mb-20">
      <NavbarLandingPage />
      </div> 
      
      <div class="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          
          <div class="text-center mb-12">
            <div class="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-sm">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              Kami Mendengarkan Anda
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold text-[#223DFC] mb-4">
              Masukan & Saran
            </h1>
            
            <p class="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Bantuan Anda sangat berharga bagi kami untuk terus meningkatkan kualitas produk dan pelayanan 
              <strong class="text-blue-700">Q-Mas Air Minum</strong>
            </p>
          </div>
  
          
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Form Pengaduan & Saran
              </h2>
              <p class="text-blue-100 mt-2">Silakan isi formulir di bawah ini dengan lengkap</p>
            </div>
  
            
            <form @submit.prevent="submitForm" class="p-8 space-y-6">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="nama" class="block text-sm font-semibold text-gray-700">
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    v-model="formData.nama"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
  
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-semibold text-gray-700">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="telepon" class="block text-sm font-semibold text-gray-700">
                    Nomor Telepon <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telepon"
                    v-model="formData.telepon"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
  
                <div class="space-y-2">
                  <label for="kategori" class="block text-sm font-semibold text-gray-700">
                    Kategori <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="kategori"
                    v-model="formData.kategori"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="kualitas_produk">Kualitas Produk</option>
                    <option value="pelayanan">Pelayanan</option>
                    <option value="pengiriman">Pengiriman</option>
                    <option value="harga">Harga</option>
                    <option value="saran_umum">Saran Umum</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
              </div>
  
              
              <div class="space-y-2">
                <label for="subjek" class="block text-sm font-semibold text-gray-700">
                  Subjek <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subjek"
                  v-model="formData.subjek"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ringkasan singkat masukan/saran Anda"
                />
              </div>
  
              
              <div class="space-y-2">
                <label for="pesan" class="block text-sm font-semibold text-gray-700">
                  Pesan Lengkap <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="pesan"
                  v-model="formData.pesan"
                  required
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Jelaskan masukan, saran, atau keluhan Anda secara detail..."
                ></textarea>
                <div class="text-right text-sm text-gray-500">
                  {{ formData.pesan.length }}/500 karakter
                </div>
              </div>
  
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">
                  Rating Kepuasan (Opsional)
                </label>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">Tidak Puas</span>
                  <div class="flex space-x-1">
                    <button
                      v-for="star in 5"
                      :key="star"
                      type="button"
                      @click="formData.rating = star"
                      class="focus:outline-none"
                    >
                      <svg
                        class="w-8 h-8 transition-colors duration-200"
                        :class="star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </div>
                  <span class="text-sm text-gray-600">Sangat Puas</span>
                </div>
              </div>
  
              
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div class="text-sm text-blue-800">
                    <p class="font-semibold mb-1">Pemberitahuan Privasi</p>
                    <p>Informasi yang Anda berikan akan kami gunakan untuk meningkatkan kualitas produk dan layanan. Data Anda akan dijaga kerahasiaannya sesuai dengan kebijakan privasi kami.</p>
                  </div>
                </div>
              </div>
  
              
              <div class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreement"
                  v-model="formData.agreement"
                  required
                  class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="agreement" class="text-sm text-gray-700">
                  Saya setuju bahwa informasi yang saya berikan akurat dan dapat digunakan oleh Q-Mas untuk keperluan perbaikan layanan. <span class="text-red-500">*</span>
                </label>
              </div>
  
              
              <div class="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <i v-else class="fas fa-paper-plane mr-2"></i>
                  {{ isSubmitting ? 'Mengirim...' : 'Kirim Masukan' }}
                </button>
                
                <button
                  type="button"
                  @click="resetForm"
                  class="flex-1 sm:flex-none border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  <i class="fas fa-redo mr-2"></i>
                  Reset Form
                </button>
              </div>
            </form>
          </div>
  
          
          <div class="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Kontak Langsung
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-blue-600 font-semibold">WhatsApp</div>
                <div class="text-gray-700">+62 812-3456-7890</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-green-600 font-semibold">Email</div>
                <div class="text-gray-700">info@qmas.com</div>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-orange-600 font-semibold">Telepon</div>
                <div class="text-gray-700">(0341) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      
      <FooterLandingPage />
  
      
      <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Terima Kasih!</h3>
          <p class="text-gray-600 mb-6">Masukan Anda telah berhasil dikirim. Tim kami akan meninjau dan merespons dalam 1-2 hari kerja.</p>
          <button
            @click="closeSuccessModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
  import FooterLandingPage from "@/components/FooterLandingPage.vue";
  
  export default {
    name: "PengaduanPage",
    components: {
      NavbarLandingPage,
      FooterLandingPage,
    },
    data() {
      return {
        isSubmitting: false,
        showSuccessModal: false,
        formData: {
          nama: '',
          email: '',
          telepon: '',
          kategori: '',
          subjek: '',
          pesan: '',
          rating: 0,
          agreement: false
        }
      };
    },
    methods: {
      async submitForm() {
        if (!this.validateForm()) {
          return;
        }
  
        this.isSubmitting = true;
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Here you would normally send the data to your API
          console.log('Form data:', this.formData);
          
          this.showSuccessModal = true;
          this.resetForm();
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Terjadi kesalahan saat mengirim form. Silakan coba lagi.');
        } finally {
          this.isSubmitting = false;
        }
      },
      
      validateForm() {
        if (this.formData.pesan.length > 500) {
          alert('Pesan tidak boleh lebih dari 500 karakter');
          return false;
        }
        return true;
      },
      
      resetForm() {
        this.formData = {
          nama: '',
          email: '',
          telepon: '',
          kategori: '',
          subjek: '',
          pesan: '',
          rating: 0,
          agreement: false
        };
      },
      
      closeSuccessModal() {
        this.showSuccessModal = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  /* Hover effects */
  .hover-scale {
    transition: transform 0.3s ease;
  }
  
  .hover-scale:hover {
    transform: scale(1.02);
  }
  
  /* Focus styles for better accessibility */
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  /* Star rating hover effect */
  .star-rating button:hover svg {
    transform: scale(1.1);
  }
  </style>