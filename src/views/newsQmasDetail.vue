<template>
    <div class="min-h-screen bg-gray-50">
      <div class="mb-20">
        <NavbarLandingPage />
      </div>
  
      <main class="container mx-auto px-4 py-8">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="#" class="hover:text-blue-600 transition-colors">Beranda</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
            <a href="#" class="hover:text-blue-600 transition-colors">Berita</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
            <span class="text-gray-900">{{ currentArticle.category }}</span>
          </div>
        </nav>
  
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <article class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <!-- Featured Image -->
              <div class="w-full h-80 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                <div class="text-center text-white">
                  <div class="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span class="text-xl font-semibold">Featured Image</span>
                </div>
                <div class="absolute top-6 left-6">
                  <span :class="currentArticle.categoryColor" class="px-4 py-2 rounded-full text-sm font-bold">
                    {{ currentArticle.category }}
                  </span>
                </div>
              </div>
  
              <!-- Article Content -->
              <div class="p-8">
                <!-- Article Header -->
                <div class="mb-6">
                  <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div class="flex items-center space-x-2">
                      <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-bold">Q</span>
                      </div>
                      <span class="font-medium text-gray-700">{{ currentArticle.author }}</span>
                    </div>
                    <span>•</span>
                    <time>{{ currentArticle.date }}</time>
                    <span>•</span>
                    <span>{{ currentArticle.readTime }} menit baca</span>
                  </div>
                  <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {{ currentArticle.title }}
                  </h1>
                  <p class="text-xl text-gray-600 leading-relaxed">
                    {{ currentArticle.excerpt }}
                  </p>
                </div>
  
                <!-- Article Body -->
                <div class="prose prose-lg max-w-none">
                  <div v-html="currentArticle.content" class="text-gray-700 leading-relaxed space-y-6"></div>
                </div>
  
                <!-- Tags -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in currentArticle.tags" :key="tag" 
                          class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                      #{{ tag }}
                    </span>
                  </div>
                </div>
  
                <!-- Share Buttons -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Bagikan:</h3>
                  <div class="flex space-x-3">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                    <button class="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                      <span>Twitter</span>
                    </button>
                    <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M.057 9.076c0-1.5 1.2-2.72 2.68-2.72h14.526c1.48 0 2.68 1.22 2.68 2.72v1.848c0 1.5-1.2 2.72-2.68 2.72H2.737c-1.48 0-2.68-1.22-2.68-2.72V9.076z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
  
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Related Articles -->
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 class="text-xl font-bold text-gray-900 mb-6">Berita Terkait</h3>
              <div class="space-y-4">
                <article v-for="(article, index) in relatedArticles" :key="index" 
                         class="group cursor-pointer">
                  <div class="flex space-x-4">
                    <div class="w-20 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                        <path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors mb-1">
                        {{ article.title }}
                      </h4>
                      <div class="flex items-center text-xs text-gray-500 space-x-2">
                        <span>{{ article.date }}</span>
                        <span>•</span>
                        <span>{{ article.readTime }} min</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
  
            <!-- Popular Tags -->
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 class="text-xl font-bold text-gray-900 mb-6">Tag Populer</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in popularTags" :key="tag.name" 
                      class="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-full text-sm cursor-pointer transition-colors">
                  #{{ tag.name }} ({{ tag.count }})
                </span>
              </div>
            </div>
  
            <!-- Newsletter -->
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 class="text-xl font-bold mb-4">Dapatkan Update Terbaru</h3>
              <p class="text-blue-100 mb-4 text-sm">
                Berlangganan newsletter kami untuk mendapatkan berita terbaru dari Q-Mas
              </p>
              <div class="space-y-3">
                <input type="email" placeholder="Email Anda" 
                       class="w-full px-4 py-2 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-blue-300 outline-none">
                <button class="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  Berlangganan
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Comments Section -->
        <div class="mt-12">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Komentar ({{ comments.length }})</h3>
            
            <!-- Comment Form -->
            <div class="mb-8 p-6 bg-gray-50 rounded-xl">
              <h4 class="font-semibold text-gray-900 mb-4">Tinggalkan Komentar</h4>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nama Anda" 
                         class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <input type="email" placeholder="Email Anda" 
                         class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                </div>
                <textarea placeholder="Tulis komentar Anda..." rows="4" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"></textarea>
                <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Kirim Komentar
                </button>
              </div>
            </div>
  
            <!-- Comments List -->
            <div class="space-y-6">
              <div v-for="(comment, index) in comments" :key="index" class="border-b border-gray-200 pb-6 last:border-b-0">
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-semibold text-sm">{{ comment.name.charAt(0) }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h5 class="font-semibold text-gray-900">{{ comment.name }}</h5>
                      <span class="text-gray-500 text-sm">{{ comment.date }}</span>
                    </div>
                    <p class="text-gray-700 leading-relaxed">{{ comment.content }}</p>
                    <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                      Balas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <FooterLandingPage />
    </div>
  </template>
  
  <script>
  import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
  import FooterLandingPage from "@/components/FooterLandingPage.vue";
  
  export default {
    components: {
      NavbarLandingPage,
      FooterLandingPage
    },
    name: 'NewsDetailPage',
    data() {
      return {
        currentArticle: {
          title: 'Manfaat Air Beroksigen Tinggi untuk Kesehatan Optimal',
          excerpt: 'Penelitian terbaru mengungkap bahwa air dengan kandungan oksigen tinggi dapat meningkatkan metabolisme tubuh hingga 25% dan memperkuat sistem imun secara signifikan.',
          category: 'Kesehatan',
          categoryColor: 'bg-blue-100 text-blue-700',
          date: '19 Juni 2025',
          author: 'Dr. Sarah Wijaya',
          readTime: '8',
          tags: ['kesehatan', 'air-beroksigen', 'metabolisme', 'imun', 'q-mas'],
          content: `
            <p>Air beroksigen tinggi telah menjadi topik yang semakin menarik perhatian dalam dunia kesehatan. Penelitian terbaru yang dilakukan oleh tim ahli nutrisi dari Universitas Indonesia menunjukkan bahwa konsumsi air dengan kandungan oksigen tinggi dapat memberikan manfaat luar biasa bagi tubuh manusia.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Apa itu Air Beroksigen Tinggi?</h2>
            <p>Air beroksigen tinggi adalah air minum yang telah diperkaya dengan oksigen tambahan melalui proses teknologi khusus. Kandungan oksigen dalam air jenis ini dapat mencapai 7-10 kali lipat lebih tinggi dibandingkan air minum biasa.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Manfaat Utama untuk Kesehatan</h2>
            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Meningkatkan Metabolisme Tubuh</h3>
            <p>Studi menunjukkan bahwa air beroksigen tinggi dapat meningkatkan laju metabolisme hingga 25%. Oksigen tambahan membantu sel-sel tubuh bekerja lebih efisien dalam proses pembakaran kalori dan produksi energi.</p>
            
            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Memperkuat Sistem Kekebalan Tubuh</h3>
            <p>Oksigen berperan penting dalam fungsi sel-sel imun. Dengan asupan oksigen yang optimal, sistem kekebalan tubuh dapat bekerja lebih maksimal dalam melawan infeksi dan penyakit.</p>
            
            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Meningkatkan Stamina dan Energi</h3>
            <p>Konsumsi rutin air beroksigen tinggi dapat membantu mengurangi rasa lelah dan meningkatkan stamina, terutama bagi mereka yang aktif berolahraga atau memiliki aktivitas padat.</p>
            
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Penelitian dan Bukti Ilmiah</h2>
            <p>Tim peneliti yang dipimpin oleh Prof. Dr. Ahmad Sulaiman melakukan studi selama 6 bulan terhadap 200 responden. Hasil penelitian menunjukkan peningkatan signifikan pada parameter kesehatan seperti kadar hemoglobin, kapasitas paru-paru, dan tingkat energi harian.</p>
            
            <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6">
              "Air beroksigen tinggi bukan hanya tren, tetapi solusi nyata untuk meningkatkan kualitas hidup. Data menunjukkan 85% responden merasakan peningkatan energi dalam 2 minggu pertama konsumsi." - Prof. Dr. Ahmad Sulaiman
            </blockquote>
            
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips Konsumsi yang Tepat</h2>
            <p>Untuk mendapatkan manfaat optimal, disarankan mengonsumsi air beroksigen tinggi sebanyak 2-3 gelas per hari, terutama di pagi hari saat bangun tidur dan setelah berolahraga.</p>
            
            <p class="mt-6">Q-Mas dengan teknologi terbarunya menghadirkan air beroksigen tinggi berkualitas premium yang telah teruji klinis dan aman untuk konsumsi harian seluruh keluarga.</p>
          `
        },
        relatedArticles: [
          {
            title: 'Tips Menjaga Hidrasi Tubuh di Musim Kemarau',
            date: '18 Juni 2025',
            readTime: '5'
          },
          {
            title: '7 Manfaat Air Mineral untuk Kesehatan Jantung',
            date: '17 Juni 2025',
            readTime: '6'
          },
          {
            title: 'Pentingnya Memilih Air Minum Berkualitas',
            date: '16 Juni 2025',
            readTime: '7'
          },
          {
            title: 'Inovasi Teknologi Filtrasi Air Terbaru',
            date: '15 Juni 2025',
            readTime: '4'
          }
        ],
        popularTags: [
          { name: 'kesehatan', count: 25 },
          { name: 'air-minum', count: 18 },
          { name: 'nutrisi', count: 15 },
          { name: 'hidrasi', count: 12 },
          { name: 'metabolisme', count: 10 },
          { name: 'imun', count: 8 }
        ],
        comments: [
          {
            name: 'Budi Santoso',
            date: '2 jam yang lalu',
            content: 'Artikel yang sangat informatif! Saya sudah mencoba Q-Mas beroksigen tinggi selama sebulan dan benar-benar merasakan peningkatan energi yang signifikan.'
          },
          {
            name: 'Sari Dewi',
            date: '5 jam yang lalu',
            content: 'Terima kasih atas informasinya. Sebagai seorang atlet, saya selalu mencari cara untuk meningkatkan performa. Akan saya coba produk Q-Mas ini.'
          },
          {
            name: 'Ahmad Rahman',
            date: '1 hari yang lalu',
            content: 'Penelitian yang menarik. Apakah ada efek samping dari konsumsi air beroksigen tinggi dalam jangka panjang?'
          }
        ]
      }
    },
    mounted() {
      // Scroll to top when component is mounted
      window.scrollTo(0, 0);
    }
  }
  </script>
  
  <style scoped>
  .prose h2 {
    @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
  }
  
  .prose h3 {
    @apply text-xl font-semibold text-gray-800 mt-6 mb-3;
  }
  
  .prose p {
    @apply text-gray-700 leading-relaxed mb-4;
  }
  
  .prose blockquote {
    @apply border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6;
  }
  </style>