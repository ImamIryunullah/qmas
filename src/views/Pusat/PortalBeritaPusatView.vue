<template>
  <div class="w-screen bg-gray-100">

    <NavbarPusat />

    <!-- Search Bar -->
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <input v-model="searchQuery" type="text" placeholder="Cari berita..."
        class="w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03a980]" />
      <select v-model="selectedCategory"
        class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03a980]">
        <option value="">Semua Kategori</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Container utama dengan layout Tribunnews -->
    <div class="max-w-6xl mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Kolom Utama (Berita Terbaru) -->
      <div class="md:col-span-2">
        <h2 class="text-3xl font-bold text-[#028a66] border-b-4 border-[#03a980] pb-2 mb-6">Berita Terbaru</h2>

        <div v-for="news in paginatedNews" :key="news.id"
          class="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
          <img :src="getImagePath(news.image_url)" alt="Gambar Berita" class="w-32 h-32 object-cover rounded-md mr-4">
          <div>
            <h3 class="text-xl font-semibold text-[#333]">{{ news.title }}</h3>
            <p class="text-sm text-[#4f4f4f]">{{ news.description.substring(0, 100) }}...</p>
            <span class="text-xs text-[#028a66]">{{ news.category }} • {{ formatDate(news.date) }}</span>
            <router-link :to="`/news/${news.id}`"
              class="text-[#0090ff] hover:text-[#028a66] text-sm font-medium block mt-2">Baca Selengkapnya</router-link>
          </div>
        </div>
      </div>

      <!-- Sidebar (Rekomendasi dan Popular) -->
      <div>
        <h2 class="text-xl font-bold text-[#028a66] border-b-4 border-[#03a980] pb-2 mb-4">Rekomendasi</h2>

        <div v-for="news in paginatedNews.slice(0, 5)" :key="news.id" class="mb-4">
          <router-link :to="`/news/${news.id}`" class="flex items-center">
            <img :src="getImagePath(news.image_url)" alt="Gambar Berita" class="w-20 h-20 object-cover rounded-md mr-3">
            <p class="text-sm font-semibold text-[#333]">{{ news.title }}</p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-8 space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1"
        class="px-4 py-2 bg-[#03a980] text-white rounded-md hover:bg-[#028a66] disabled:opacity-50">Previous</button>
      <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-4 py-2 border rounded-md"
        :class="currentPage === page ? 'bg-[#03a980] text-white' : 'bg-white text-black hover:bg-gray-200'">{{ page
        }}</button>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-[#03a980] text-white rounded-md hover:bg-[#028a66] disabled:opacity-50">Next</button>
    </div>

  </div>
  <FooterPortal />
</template>

<script>
import FooterPortal from '@/components/FooterSuaraKonsumen.vue';
import NavbarPusat from '@/components/NavbarPusat.vue';
import ApiService from '@/service/lpkni.js';

export default {
  components: {
    NavbarPusat,
    FooterPortal
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      categories: ['Politik', 'Olahraga', 'Teknologi', 'Nasional', 'Internasional'],
      newsList: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    filteredNews() {
      return this.newsList.filter(news =>
        news.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedCategory ? news.category === this.selectedCategory : true)
      );
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredNews.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      ApiService.getNews()
        .then(response => {
          this.newsList = response.data.data;
        })
        .catch(error => {
          console.error("Gagal mengambil data berita:", error);
        });
    },
    getImagePath(imgPath) {
      return imgPath ? `http://192.168.1.11:5000${imgPath}` : "https://via.placeholder.com/150";
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("id-ID", options);
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
    }
  }
};
</script>
