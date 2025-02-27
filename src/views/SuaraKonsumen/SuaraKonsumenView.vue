<template>
  <div class="bg-gray-200">
    <!-- Header Section -->
    <NavbarNews />
    <section class="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md mb-8 mt-7">
      <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <!-- Banner Image -->
        <div class="w-full md:w-1/2">
          <!-- Menampilkan Gambar yang Responsif dengan batas ukuran -->
          <img :src="getfullpathImage(suaraKonsumenList[0].media[0].imageUrl)" alt="Trending Image"
            class="w-full h-auto max-h-64 object-cover rounded-lg" />
        </div>

        <!-- News Content -->
        <div class="flex flex-col justify-between space-y-4 w-full md:w-1/2">
          <div>
            <!-- Breaking News Alert -->
            <div class="bg-red-600 text-white p-2 rounded-lg inline-block mb-4">
              <span class="font-bold text-sm">Breaking News</span>
            </div>

            <!-- Title -->
            <h2 class="text-3xl font-bold text-gray-900 leading-tight">
              {{ suaraKonsumenList[0].judul }}
            </h2>

            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ suaraKonsumenList[0].tanggal.split('T')[0] }}</p>

            <!-- Description -->
            <p class="text-gray-700 text-sm mt-2">
              {{ truncateDescription(suaraKonsumenList[0].deskripsi1, 200) }}
            </p>

            <div class="mt-4">
              <!-- Read More Button -->
              <router-link :to="`/suara-konsumen/detail/${suaraKonsumenList[0].id}`">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <div class="container mx-auto px-4 py-6 md:px-8 sm:px-8">
      <div class="bg-red-600 text-white p-4 rounded-lg mb-8">
        <h3 class="font-semibold text-lg">YANG MUNGKIN ANDA SUKA....</h3>
      </div>

      <!-- Trending Section -->
      <section class="flex mb-8 items-center justify-center">
        <!-- Horizontal Scrolling Container -->
        <div class="flex space-x-6 overflow-x-auto pb-6 justify-start">
          <!-- Loop through suaraKonsumenList -->
          <div v-for="data in suaraKonsumenList" :key="data.id" class="flex-none w-80">
            <!-- Article Image -->
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Trending Image"
              class="w-full h-48 object-cover rounded-lg mb-4" />

            <!-- Article Title -->
            <h3 class="text-lg font-semibold text-gray-900">{{ singkatJudul(data.judul, 70) }}</h3>

            <!-- Article Date -->
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>

            <!-- Article Description -->
            <p class="text-sm text-gray-700 mt-2">
              {{ truncateDescription(data.deskripsi1, 150) }}
            </p>

            <!-- Read More Button -->
            <router-link :to="`/suara-konsumen/detail/${data.id}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
            </router-link>
          </div>
        </div>
      </section>


      <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>

      <!-- Section Baru -->
      <section class="container mx-auto px-4 py-6">
        <div class="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
          <!-- Left Section (Featured Article) -->
          <div v-for="data in suaraKonsumenList" :key="data.id"
            class="w-full sm:w-2/3 md:w-3/5 bg-gray-100 rounded-lg shadow-md flex flex-col">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Featured Article Image"
              class="w-full h-64 object-cover rounded-t-lg" />
            <div class="p-4 flex-grow">
              <h5 class="text-2xl sm:text-2xl font-semibold text-gray-900">{{ singkatJudul(data.judul, 50) }}</h5>
              <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
              <p class="text-xs sm:text-sm text-gray-600 mt-2">{{ truncateDescription(data.deskripsi1, 150) }}</p>
              <!-- Baca Selengkapnya Button -->
              <router-link :to="`/suara-konsumen/detail/${data.id}`">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
              </router-link>
            </div>
          </div>

          <!-- Right Section (Smaller Articles) -->
          <div class="w-full sm:w-1/3 md:w-2/5 space-y-6 flex-col">
            <!-- Smaller Article 1 -->
            <div v-for="data in suaraKonsumenList" :key="data.id" class="flex flex-row space-x-4">
              <!-- Title Section -->
              <div class="w-2/3 sm:w-2/4">
                <h4 class="text-sm font-semibold text-gray-800">{{ singkatJudul(data.judul, 70) }}</h4>
                <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
                <!-- Baca Selengkapnya Button -->
                <router-link :to="`/suara-konsumen/detail/${data.id}`">
                  <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
                </router-link>
              </div>
            </div>
            <div class="w-full mx-auto border-t-2 border-gray-300"></div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 ml-4">Semua Berita</h2>
        <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="data in suaraKonsumenList" :key="data.id" class="p-3">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Latest Story"
              class="w-full h-48 object-cover mb-4" />
            <h5 class="text-sm sm:text-base font-semibold">{{ data.judul }}</h5>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 170) }}</p>
            <router-link :to="`/suara-konsumen/detail/${data.id}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                Selengkapnya</button>
            </router-link>
          </article>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 ml-4">Semua Berita</h2>
        <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="data in suaraKonsumenList" :key="data.id" class="p-3">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Latest Story"
              class="w-full h-48 object-cover mb-4" />
            <h5 class="text-sm sm:text-base font-semibold">{{ data.judul }}</h5>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 150) }}</p>
            <router-link :to="`/suara-konsumen/detail/${data.id}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                Selengkapnya</button>
            </router-link>
          </article>
        </div>
      </section>
      <div class="flex justify-between items-center">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Previous
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Next
        </button>
      </div>
    </div>
  </div>
  <FooterNews />
</template>

<script>

import FooterNews from '@/components/FooterSuaraKonsumen.vue';
import NavbarNews from '@/components/NavbarSuaraKonsumen.vue';

import api from "@/service/lpkni"
export default {
  components: {
    FooterNews,
    NavbarNews
  },
  data() {
    return {
      article: {
        judul: 'John Lewis, civil rights giant, crosses Edmund Pettus Bridge one final time',
        waktu_publikasi: '17 Agustus 1945',
        deskripsi: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque harum autem repellendus repellat a doloribus ea quas, tenetur velit. Aliquam.'
      },
      currentPage: 1,
      articlesPerPage: 1,
      articles: [
        { id: 1, judul: 'Cake meme reflects coronavirus absurdity...', deskripsi: 'A viral video depicting hyper-realistic cakes...', gambar: '@/assets/bannerberita.jpeg' },
        { id: 2, judul: 'John Lewis makes final journey...', deskripsi: 'The body of the late US Rep. John Lewis...', gambar: '@/assets/bannerberita.jpeg' },
        { id: 3, judul: 'Beloved Arizona coach loses battle...', deskripsi: 'The Arizona coach lost his battle with...', gambar: '@/assets/bannerberita.jpeg' },
        { id: 4, judul: 'New Study on Climate Change...', deskripsi: 'A new study reveals important data...', gambar: '@/assets/bannerberita.jpeg' },
        { id: 5, judul: 'The Impact of Technology on Society...', deskripsi: 'Exploring how technology is changing the world...', gambar: '@/assets/bannerberita.jpeg' },
        { id: 6, judul: 'Global Health Crisis: Solutions Needed', deskripsi: 'Experts discuss how to tackle global health issues...', gambar: '@/assets/bannerberita.jpeg' }
      ],
      suaraKonsumenList: [{ judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', tanggal: '', kategori: '', media: [{}] }]
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.articles.slice(start, end);
    }
  },
  mounted() {
    this.getALlBeritaPublish()
  },
  methods: {
    async getALlBeritaPublish() {
      await api.getAllSuaraKonsumenPublish().then((res) => {
        this.suaraKonsumenList = res.data
        console.log(this.suaraKonsumenList)
      }).catch(() => { })
    },
    getfullpathImage(img) {
      return api.getfullpathImage(img)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    truncateDescription(text, length) {
      // Ensure the text exists and is not null
      if (text && text.length > length) {
        return text.slice(0, length) + '...'; // Truncate and add ellipsis
      }
      return text; // Return full text if it's within the length limit
    },
    singkatJudul(text, length) {
      if (text && text.length > length) {
        return text.slice(0, length) + '...'; // Truncate and add ellipsis
      }
      return text; // Return full text if it's within the length limit
    }
  },

  name: 'NewsPage'
};
</script>
<style scoped>
@media (max-width: 640px) {
  .w-full {
    width: 100%;
  }

  .sm\:w-1\/3 {
    width: 100%;
    /* Stacks the cards vertically on small screens */
  }
}
</style>