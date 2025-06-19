<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      
      <div class="mb-20">
        <NavbarLandingPage />
      </div>
      
      <section class="py-16">
        <div class="container mx-auto px-6">
          <div class="grid lg:grid-cols-3 gap-12">
            
            
            <div class="lg:col-span-1 space-y-8">
              <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3"></div>
                  Informasi Kontak
                </h3>
                
                <div class="space-y-6">
                  
                  <div class="group">
                    <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300">
                      <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-phone text-white text-lg"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Telepon</p>
                        <p class="text-gray-600">+62 812-3456-7890</p>
                        <p class="text-gray-600">+62 821-9876-5432</p>
                      </div>
                    </div>
                  </div>
  
                  
                  <div class="group">
                    <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-green-50 transition-all duration-300">
                      <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-envelope text-white text-lg"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Email</p>
                        <p class="text-gray-600">info@qmas.com</p>
                        <p class="text-gray-600">order@qmas.com</p>
                      </div>
                    </div>
                  </div>
  
                  
                  <div class="group">
                    <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-all duration-300">
                      <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-map-marker-alt text-white text-lg"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Alamat</p>
                        <p class="text-gray-600">
                          Panti Asuhan KH Mas Mansyur<br>
                          Jl. Raya Malang No. 123<br>
                          Malang, Jawa Timur 65141
                        </p>
                      </div>
                    </div>
                  </div>
  
                  
                  <div class="group">
                    <div class="flex items-start space-x-4 p-4 rounded-xl hover:bg-orange-50 transition-all duration-300">
                      <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-clock text-white text-lg"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">Jam Operasional</p>
                        <p class="text-gray-600">Senin - Jumat: 08:00 - 17:00</p>
                        <p class="text-gray-600">Sabtu: 08:00 - 15:00</p>
                        <p class="text-gray-600">Minggu: Tutup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              
              <!-- <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Ikuti Kami</h3>
                <div class="grid grid-cols-2 gap-4">
                  <a href="#" class="group flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105">
                    <i class="fab fa-facebook-f text-white text-xl mr-2"></i>
                    <span class="text-white font-medium">Facebook</span>
                  </a>
                  <a href="#" class="group flex items-center justify-center p-4 bg-pink-600 hover:bg-pink-700 rounded-xl transition-all duration-300 transform hover:scale-105">
                    <i class="fab fa-instagram text-white text-xl mr-2"></i>
                    <span class="text-white font-medium">Instagram</span>
                  </a>
                  <a href="#" class="group flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-300 transform hover:scale-105">
                    <i class="fab fa-whatsapp text-white text-xl mr-2"></i>
                    <span class="text-white font-medium">WhatsApp</span>
                  </a>
                  <a href="#" class="group flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 transform hover:scale-105">
                    <i class="fab fa-youtube text-white text-xl mr-2"></i>
                    <span class="text-white font-medium">YouTube</span>
                  </a>
                </div>
              </div> -->
            </div>
  
            
            <div class="lg:col-span-2">
              <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg mr-3"></div>
                  Kirim Pesan
                </h3>
                
                <form @submit.prevent="submitForm" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    
                    <div class="group">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <div class="relative">
                        <input
                          v-model="form.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="Masukkan nama lengkap Anda"
                        >
                        <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
  
                    
                    <div class="group">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div class="relative">
                        <input
                          v-model="form.email"
                          type="email"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="nama@email.com"
                        >
                        <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                  </div>
  
                  <div class="grid md:grid-cols-2 gap-6">
                    
                    <div class="group">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Telepon *
                      </label>
                      <div class="relative">
                        <input
                          v-model="form.phone"
                          type="tel"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="+62 812-3456-7890"
                        >
                        <i class="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
  
                    
                    <!-- <div class="group">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Subjek *
                      </label>
                      <div class="relative">
                        <select
                          v-model="form.subject"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12 appearance-none"
                        >
                          <option value="">Pilih subjek</option>
                          <option value="order">Pemesanan Produk</option>
                          <option value="info">Informasi Produk</option>
                          <option value="complaint">Keluhan/Saran</option>
                          <option value="partnership">Kemitraan</option>
                          <option value="other">Lainnya</option>
                        </select>
                        <i class="fas fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div> -->
                  </div>
  
                  
                  <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <div class="relative">
                      <textarea
                        v-model="form.message"
                        required
                        rows="6"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12 pt-4 resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                      ></textarea>
                      <i class="fas fa-comment-alt absolute left-4 top-6 text-gray-400"></i>
                    </div>
                  </div>
  
                  
                  <div class="flex items-start space-x-3">
                    <input
                      v-model="form.terms"
                      type="checkbox"
                      required
                      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    >
                    <label class="text-sm text-gray-600">
                      Saya setuju dengan 
                      <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">syarat dan ketentuan</a> 
                      serta 
                      <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">kebijakan privasi</a>
                    </label>
                  </div>
  
                  
                  <div class="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <i v-if="!isSubmitting" class="fas fa-paper-plane mr-2"></i>
                      <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                      {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
                    </button>
                    
                    <button
                      type="button"
                      @click="resetForm"
                      class="sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                    >
                      <i class="fas fa-redo mr-2"></i>
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lokasi Kami
            </h2>
            <p class="text-xl text-gray-600">
              Kunjungi langsung lokasi produksi Q-Mas M di Malang
            </p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="aspect-w-16 aspect-h-9 h-96 lg:h-[500px]">
              
              <div class="bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 opacity-20">
                  <div class="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full animate-pulse"></div>
                  <div class="absolute bottom-10 right-10 w-16 h-16 bg-cyan-300 rounded-full animate-pulse" style="animation-delay: 1s"></div>
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <div class="text-center z-10">
                  <i class="fas fa-map-marked-alt text-6xl text-blue-600 mb-4"></i>
                  <h3 class="text-2xl font-bold text-gray-800 mb-2">Peta Lokasi</h3>
                  <p class="text-gray-600 mb-4">Panti Asuhan KH Mas Mansyur, Malang</p>
                  <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    <i class="fas fa-directions mr-2"></i>
                    Dapatkan Petunjuk Arah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      
      <section class="py-16">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p class="text-xl text-gray-600">
              Temukan jawaban atas pertanyaan umum tentang Q-Mas M
            </p>
          </div>
          
          <div class="max-w-4xl mx-auto">
            <div class="space-y-4">
              <div 
                v-for="(faq, index) in faqs" 
                :key="index"
                class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  @click="toggleFaq(index)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
                >
                  <span class="font-semibold text-gray-900">{{ faq.question }}</span>
                  <i 
                    :class="['fas fa-chevron-down transition-transform duration-300', { 'rotate-180': faq.isOpen }]"
                    class="text-blue-600"
                  ></i>
                </button>
                <div 
                  v-show="faq.isOpen"
                  class="px-6 pb-4 text-gray-600 animate-fadeIn"
                >
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <FooterLandingPage />
  
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-scale-up">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check text-2xl text-green-600"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
          <p class="text-gray-600 mb-6">Terima kasih telah menghubungi kami. Kami akan merespons pesan Anda dalam 24 jam.</p>
          <button
            @click="showSuccessModal = false"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
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
    name: "ContactPage",
    components: {
      NavbarLandingPage,
      FooterLandingPage,
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          message: '',
          terms: false
        },
        isSubmitting: false,
        showSuccessModal: false,
        faqs: [
          {
            question: "Bagaimana cara memesan air minum Q-Mas M?",
            answer: "Anda dapat memesan melalui telepon, WhatsApp, atau mengisi form kontak di website ini. Tim kami akan menghubungi Anda untuk konfirmasi pesanan.",
            isOpen: false
          },
          {
            question: "Berapa minimal pemesanan air minum Q-Mas M?",
            answer: "Minimal pemesanan adalah 1 galon (19 liter). Untuk pemesanan dalam jumlah besar, tersedia diskon khusus.",
            isOpen: false
          },
          {
            question: "Apakah tersedia layanan antar untuk wilayah Malang?",
            answer: "Ya, kami menyediakan layanan antar gratis untuk wilayah Malang kota. Untuk wilayah di luar Malang, berlaku biaya pengiriman sesuai jarak.",
            isOpen: false
          },
          {
            question: "Bagaimana proses penyaringan air Q-Mas M?",
            answer: "Air Q-Mas M melewati 7 tahap penyaringan menggunakan teknologi RO (Reverse Osmosis) dan UV sterilization untuk menghasilkan air murni berkualitas tinggi.",
            isOpen: false
          },
          {
            question: "Apakah air Q-Mas M sudah bersertifikat?",
            answer: "Ya, produk kami telah memiliki sertifikat BPOM dan ISO untuk menjamin kualitas dan keamanan produk.",
            isOpen: false
          }
        ]
      };
    },
    methods: {
      async submitForm() {
        if (!this.form.terms) {
          alert('Harap setujui syarat dan ketentuan');
          return;
        }
  
        this.isSubmitting = true;
        
        // Simulate form submission
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          this.showSuccessModal = true;
          this.resetForm();
        } catch (error) {
          alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
          this.isSubmitting = false;
        }
      },
      
      resetForm() {
        this.form = {
          name: '',
          email: '',
          phone: '',
          message: '',
          terms: false
        };
      },
      
      toggleFaq(index) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scale-up {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-scale-up {
    animation: scale-up 0.3s ease-out;
  }
  
  .rotate-180 {
    transform: rotate(180deg);
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
    background: linear-gradient(45deg, #3b82f6, #06b6d4);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #2563eb, #0891b2);
  }
  
  /* Form focus states */
  .group input:focus,
  .group select:focus,
  .group textarea:focus {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
  }
  
  .group:hover input,
  .group:hover select,
  .group:hover textarea {
    border-color: #93c5fd;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  </style>