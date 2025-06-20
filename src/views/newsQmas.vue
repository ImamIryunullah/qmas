<template>
    <div class="min-h-screen bg-gray-50">
    <div class="mb-20">
      <NavbarLandingPage />
    </div>
      <main class="container mx-auto px-4 py-16">

        <section class="">
          <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Berita Utama</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <article class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="relative">
                <div class="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div class="text-center text-white">
                    <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span class="text-lg font-semibold">Featured Image</span>
                  </div>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">HOT</span>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium mr-3">Kesehatan</span>
                  <time>19 Juni 2025</time>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3 leading-tight hover:text-blue-600 cursor-pointer">
                  Manfaat Air Beroksigen Tinggi untuk Kesehatan Optimal
                </h3>
                <p class="text-gray-600 mb-4 leading-relaxed">
                  Penelitian terbaru mengungkap bahwa air dengan kandungan oksigen tinggi dapat meningkatkan metabolisme tubuh hingga 25% dan memperkuat sistem imun...
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-bold">Q</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700">Tim Q-Mas</span>
                  </div>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold text-sm">Baca Selengkapnya →</a>
                </div>
              </div>
            </article>
  
            
            <div class="space-y-6">
              <article v-for="(article, index) in sideArticles" :key="index" 
                       class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex">
                <div class="w-32 h-24 bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                    <path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                  </svg>
                </div>
                <div class="p-4 flex-1">
                  <div class="flex items-center text-xs text-gray-500 mb-2">
                    <span :class="article.categoryColor" class="px-2 py-1 rounded text-xs font-medium mr-2">{{ article.category }}</span>
                    <time>{{ article.date }}</time>
                  </div>
                  <h3 class="font-bold text-gray-800 text-sm mb-2 leading-tight hover:text-blue-600 cursor-pointer">
                    {{ article.title }}
                  </h3>
                  <p class="text-xs text-gray-600 line-clamp-2">{{ article.excerpt }}</p>
                </div>
              </article>
            </div>
          </div>
        </section>
  
        
        <section class="mb-12">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-gray-800">Berita Terkini</h2>
            <div class="flex items-center space-x-2">
              <button @click="gridView = true" :class="gridView ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'" 
                      class="p-2 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button @click="gridView = false" :class="!gridView ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'" 
                      class="p-2 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </button>
            </div>
          </div>
  
          
          <div v-if="gridView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article v-for="(article, index) in filteredArticles" :key="index" 
                     class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-full h-48 bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center">
                <div class="text-center text-white">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                    <path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                  </svg>
                  <span class="text-sm">News Image</span>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <span :class="article.categoryColor" class="px-2 py-1 rounded text-xs font-medium mr-3">{{ article.category }}</span>
                  <time>{{ article.date }}</time>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-3 leading-tight hover:text-blue-600 cursor-pointer">
                  {{ article.title }}
                </h3>
                <p class="text-gray-600 mb-4 leading-relaxed">{{ article.excerpt }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xs font-bold">Q</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700">{{ article.author }}</span>
                  </div>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold text-sm">Baca →</a>
                </div>
              </div>
            </article>
          </div>
  
          
          <div v-else class="space-y-6">
            <article v-for="(article, index) in filteredArticles" :key="index" 
                     class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row">
              <div class="w-full sm:w-64 h-48 sm:h-32 bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                  <path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <div class="p-6 flex-1">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <span :class="article.categoryColor" class="px-2 py-1 rounded text-xs font-medium mr-3">{{ article.category }}</span>
                  <time>{{ article.date }}</time>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3 leading-tight hover:text-blue-600 cursor-pointer">
                  {{ article.title }}
                </h3>
                <p class="text-gray-600 mb-4 leading-relaxed">{{ article.excerpt }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-bold">Q</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700">{{ article.author }}</span>
                  </div>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Baca Selengkapnya →</a>
                </div>
              </div>
            </article>
          </div>
        </section>

      </main>
  
      <FooterLandingPage />
    </div>
  </template>
  
  <script>
import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
import FooterLandingPage from "@/components/FooterLandingPage.vue";
  export default {
    components:{
      NavbarLandingPage,
      FooterLandingPage
    },
    name: 'QMasNewsPortal',
    data() {
      return {
        activeCategory: 'semua',
        mobileMenuOpen: false,
        gridView: true,
        sideArticles: [
          {
            title: 'Tips Menjaga Hidrasi Tubuh di Musim Kemarau',
            excerpt: 'Panduan lengkap untuk menjaga tubuh tetap terhidrasi dengan baik...',
            category: 'Tips',
            categoryColor: 'bg-green-100 text-green-700',
            date: '18 Juni 2025'
          },
          {
            title: 'Q-Mas M Raih Penghargaan Produk Terbaik 2025',
            excerpt: 'Prestasi membanggakan dari produk air minum Q-Mas M...',
            category: 'Produk',
            categoryColor: 'bg-purple-100 text-purple-700',
            date: '17 Juni 2025'
          },
          {
            title: 'Program Beasiswa Panti Asuhan KH Mas Mansyur',
            excerpt: 'Kesempatan emas untuk pelajar berprestasi...',
            category: 'Komunitas',
            categoryColor: 'bg-yellow-100 text-yellow-700',
            date: '16 Juni 2025'
          }
        ],
        allArticles: [
          {
            title: 'Pentingnya Memilih Air Minum Berkualitas untuk Kesehatan Keluarga',
            excerpt: 'Air minum yang berkualitas adalah fondasi kesehatan keluarga. Pelajari kriteria air minum yang baik dan dampaknya bagi tubuh...',
            category: 'Kesehatan',
            categoryColor: 'bg-blue-100 text-blue-700',
            date: '19 Juni 2025',
            author: 'Dr. Sarah'
          },
          {
            title: 'Inovasi Teknologi Filtrasi Air Q-Mas Terdepan di Indonesia',
            excerpt: 'Mengenal lebih dekat teknologi canggih yang digunakan dalam proses produksi air minum Q-Mas untuk menghasilkan kualitas premium...',
            category: 'Produk',
            categoryColor: 'bg-purple-100 text-purple-700',
            date: '18 Juni 2025',
            author: 'Tim Teknis'
          },
          {
            title: 'Kegiatan Bakti Sosial Q-Mas di Desa Terpencil Malang',
            excerpt: 'Program CSR Q-Mas menghadirkan air bersih dan sehat untuk masyarakat desa terpencil, meningkatkan kualitas hidup warga...',
            category: 'Komunitas',
            categoryColor: 'bg-yellow-100 text-yellow-700',
            date: '17 Juni 2025',
            author: 'Tim CSR'
          },
          {
            title: '7 Manfaat Air Beroksigen Tinggi yang Wajib Anda Ketahui',
            excerpt: 'Penelitian menunjukkan bahwa air dengan kandungan oksigen tinggi memiliki berbagai manfaat luar biasa untuk kesehatan tubuh...',
            category: 'Kesehatan',
            categoryColor: 'bg-blue-100 text-blue-700',
            date: '16 Juni 2025',
            author: 'Dr. Andi'
          },
          {
            title: 'Q-Mas Ekspansi ke 10 Kota Baru di Jawa Timur',
            excerpt: 'Langkah strategis Q-Mas untuk memperluas jangkauan distribusi dan memberikan akses air minum berkualitas ke lebih banyak konsumen...',
            category: 'Produk',
            categoryColor: 'bg-purple-100 text-purple-700',
            date: '15 Juni 2025',
            author: 'Tim Marketing'
          },
          {
            title: 'Workshop Edukasi Kesehatan untuk Ibu-Ibu PKK',
            excerpt: 'Q-Mas mengadakan workshop gratis tentang pentingnya air minum sehat dan tips menjaga kesehatan keluarga...',
            category: 'Komunitas',
            categoryColor: 'bg-yellow-100 text-yellow-700',
            date: '14 Juni 2025',
            author: 'Tim Edukasi'
          }
        ]
      }
    },
    computed: {
      filteredArticles() {
        if (this.activeCategory === 'semua') {
          return this.allArticles;
        }
        return this.allArticles.filter(article => 
          article.category.toLowerCase() === this.activeCategory.toLowerCase()
        );
      }
    },
    methods: {
      setActiveCategory(category) {
        this.activeCategory = category;
        this.mobileMenuOpen = false;
      }
    }
  }
  </script>