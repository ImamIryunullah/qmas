<template>
  <div class="bg-gray-200">
    <!-- Header Section -->
    <NavbarNews />
    <!--IKLAN-->
    <!-- <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="relative p-6 w-full sm:w-135 md:w-1/2 lg:w-1/3">
        <img :src="adImage" alt="Advertisement" class="w-full h-auto mb-4" />
        <div class="absolute top-6 right-6">
          <button @click="closePopup" class="text-white p-2">
            <i class="fa fa-close fa-2x text-black hover:text-gray-700"></i> 
          </button>
        </div>
      </div>
    </div> -->
      <!--IKLAN-->
    <div class="flex items-center justify-center mt-4 w-full px-4">
      <div class="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <input type="text" v-model="searchQuery"
          class="pl-12 pr-4 py-3 rounded-lg text-black placeholder-gray-400 focus:outline-none w-full bg-white"
          placeholder="Cari Berita Disini..." />
        <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>
    </div>

    <div v-if="searchQuery" class="text-center text-xl mt-4 text-gray-700 font-semibold">
      Pencarian "{{ searchQuery }}"
    </div>

    <section class="flex mb-3 items-center justify-center container mx-auto px-4 py-6">
      <div class="flex space-x-6 overflow-x-auto pb-6 justify-start bg-gray-200 py-6 px-4 rounded-lg">
        <div v-if="filteredArticles.length === 0" class="text-center text-xl text-red-600 w-full">
          Berita tidak ada, coba cari yang lain.
        </div>
        <div v-for="data in filteredArticles" :key="data.id" class="flex-none w-80">
          <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Trending Image"
            class="w-full h-48 object-cover rounded-lg mb-4" />
          <RouterLink :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
            <h3 class="text-lg font-semibold text-gray-900 hover:text-red-900">{{ singkatJudul(data.judul, 60) }}</h3>
          </RouterLink>
          <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.nama_wilayah }}</p>
          <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>


          <p class="text-xs text-gray-700 mt-2 font-bold underline">
            {{ data.wilayah.nama_wilayah }}, {{ data.daerah.nama_daerah }}
          </p>
          <p class="text-sm text-gray-700 mt-2">
            {{ truncateDescription(data.deskripsi1, 150) }}
          </p>
          <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
            <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="suaraKonsumenList.length > 0" class="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md mb-4">
      <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <div class="max-w-full md:w-1/2">
          <img :src="getfullpathImage(suaraKonsumenList[0].media[0].imageUrl)" alt="Trending Image"
            class="w-full h-full object-cover rounded-lg" />
        </div>
        <div class="flex flex-col justify-between space-y-4 w-full md:w-1/2">
          <div>
            <div class="bg-red-600 text-white p-2 rounded-lg inline-block mb-4">
              <span class="font-bold text-sm">Breaking News</span>
            </div>
            <router-link :to="`/suara-konsumen/detail/${suaraKonsumenList[0].id}`">
              <h2 class="text-3xl font-bold text-gray-900 hover:text-red-800 leading-tight cursor-pointer">
                {{ suaraKonsumenList[0].judul }}
              </h2>
            </router-link>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ suaraKonsumenList[0].tanggal.split('T')[0] }}</p>
            <p class="text-gray-900 text-sm font-semibold mt-2">
              {{ suaraKonsumenList[0].wilayah.nama_wilayah }}, {{ suaraKonsumenList[0].daerah.nama_daerah }}

            </p>
            <p class="text-gray-700 text-sm mt-2">
              {{ truncateDescription(suaraKonsumenList[0].deskripsi1, 200) }}
            </p>

            <div class="mt-4">
              <router-link :to="`/suara-konsumen/detail/${suaraKonsumenList[0].id}/${suaraKonsumenList[0].judul}`">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 py-6 md:px-8 sm:px-8">
      <div class="bg-black text-white p-4 rounded-lg mb-8">
        <h3 class="font-semibold text-lg">
          Suara Konsumen - LPKNI - {{ currentDate }}
        </h3>
      </div>


      <section class="mb-3">
        <h2 class="text-xl font-semibold mb-4 ml-4">Semua Berita</h2>
        <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="data in currentPageArticles" :key="data.id" class="p-3">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Latest Story"
              class="w-full h-48 object-cover mb-4" />
            <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
              <h5 class="text-sm sm:text-base font-semibold hover:text-red-900">{{ singkatJudul(data.judul, 50) }}</h5>
            </router-link>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
            <p class="text-xs text-gray-700 mt-2 font-bold underline">
              {{ data.wilayah.nama_wilayah }}, {{ data.daerah.nama_daerah }}
            </p>
            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 170) }}</p>
            <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                Selengkapnya</button>
            </router-link>
          </article>
        </div>
        <div class="flex flex-wrap justify-center items-center mt-6 gap-3">
  <!-- Tombol Prev -->
  <button @click="changePage(currentPage - 1)" 
    :disabled="currentPage === 1"
    class="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
    Prev
  </button>

  <!-- Nomor Halaman -->
  <div class="flex flex-wrap gap-2">
    <button v-for="page in visiblePages" :key="page" 
      @click="changePage(page)" 
      :class="currentPage === page 
        ? 'bg-red-600 text-white' 
        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'"
      class="px-4 py-2 rounded-lg font-semibold transition duration-200">
      {{ page }}
    </button>
  </div>

  <!-- Tombol Next -->
  <button @click="changePage(currentPage + 1)" 
    :disabled="currentPage === totalPages"
    class="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
    Next
  </button>
</div>

      </section>
      <section class="container mx-auto px-4 py-6 md:px-8 sm:px-8">
        <h5 class="text-xl mb-4 bg-black py-3 rounded-lg text-white p-4 sm:text-lg md:text-xl lg:text-2xl">
          Mungkin Anda Mencari Berita Dari Jawa Timur
        </h5>

        <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="data in jawaTimurNews" :key="data.id" class="p-3">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Latest Story"
              class="w-full h-48 object-cover mb-4" />
            <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
              <h5 class="text-sm sm:text-base font-semibold hover:text-red-900">{{ singkatJudul(data.judul, 50) }}</h5>
            </router-link>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
            <p class="text-xs text-gray-700 mt-2 font-bold underline">
              {{ data.wilayah.nama_wilayah }}, {{ data.daerah.nama_daerah }}
            </p>
            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 170) }}</p>
            <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                Selengkapnya</button>
            </router-link>
          </article>
        </div>
      </section>
      <section class="container mx-auto px-4 py-8 mb-8 md:px-8 sm:px-8">
        <h5 class="text-xl mb-4 bg-black py-3 rounded-lg text-white p-4 sm:text-lg md:text-xl lg:text-2xl">
          Mungkin Anda Mencari Berita Dari DKI JAKARTA
        </h5>

        <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="data in JakartaNews" :key="data.id" class="p-3">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Latest Story"
              class="w-full h-48 object-cover mb-4" />
            <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
              <h5 class="text-sm sm:text-base font-semibold hover:text-red-900">{{ singkatJudul(data.judul, 50) }}</h5>
            </router-link>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
            <p class="text-xs text-gray-700 mt-2 font-bold underline">
              {{ data.wilayah.nama_wilayah }}, {{ data.daerah.nama_daerah }}
            </p>
            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 170) }}</p>
            <router-link :to="`/suara-konsumen/detail/${data.id}/${data.judul}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                Selengkapnya</button>
            </router-link>
          </article>
        </div>
      </section>
    </div>
  </div>
  <FooterNews />
</template>

<script>

import FooterNews from '@/components/FooterSuaraKonsumen.vue';
import NavbarNews from '@/components/NavbarSuaraKonsumen.vue';
// import adImage from '@/assets/aqua.jpeg';


import api from "@/service/lpkni"
export default {
  components: {
    FooterNews,
    NavbarNews

  },
  data() {
    return {
      searchQuery: '',
      showPopup: true,
      isLoading: false,
      maxVisiblePages: 5,
      // adImage,
      currentDate: this.formatDate(new Date()),
      currentPage: 1,
      articlesPerPage: 8,
      suaraKonsumenList: [{ judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', tanggal: '', kategori: '', nama_wilayah: '', media: [{}], wilayah: { nama_wilayah: "" }, daerah: { nama_daerah: "" }, created_at: '' }]
    };
  },
  computed: {
    jawaTimurNews() {
      return this.suaraKonsumenList.filter(data => data.wilayah.nama_wilayah === 'JAWA TIMUR');
    },
    JakartaNews() {
      return this.suaraKonsumenList.filter(data => data.wilayah.nama_wilayah === 'DKI JAKARTA');
    },
    totalPages() {
      return Math.ceil(this.suaraKonsumenList.length / this.articlesPerPage);
    },
    currentPageArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage;
      const endIndex = this.currentPage * this.articlesPerPage;
      return this.suaraKonsumenList.slice(startIndex, endIndex);
    },
    filteredArticles() {
      if (this.searchQuery === '') {
        return this.suaraKonsumenList;
      }
      return this.suaraKonsumenList.filter(article => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
          article.judul.toLowerCase().includes(searchLower) ||
          article.deskripsi1.toLowerCase().includes(searchLower) ||
          article.deskripsi2.toLowerCase().includes(searchLower) ||
          article.deskripsi3.toLowerCase().includes(searchLower) ||
          article.wilayah.nama_wilayah.toLowerCase().includes(searchLower) ||
          article.daerah.nama_daerah.toLowerCase().includes(searchLower)
        );
      });
    },

    visiblePages() {
      let pages = [];
      let startPage = Math.max(this.currentPage - Math.floor(this.maxVisiblePages / 2), 1);
      let endPage = Math.min(startPage + this.maxVisiblePages - 1, this.totalPages);

      if (endPage - startPage < this.maxVisiblePages - 1) {
        startPage = Math.max(endPage - this.maxVisiblePages + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted() {
    this.getALlBeritaPublish(),
      setTimeout(() => {
        this.showPopup = false;
      }, 10000);
  },
  methods: {
    async getALlBeritaPublish() {
      this.isLoading = true
      await api.getAllSuaraKonsumenPublish().then((res) => {
        this.suaraKonsumenList = res.data
        this.suaraKonsumenList = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        console.log(this.suaraKonsumenList)
      }).catch(() => {

      }).finally(() => {
        this.isLoading = false
      })
    },
    closePopup() {
      this.showPopup = false;
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    getfullpathImage(img) {
      return api.getfullpathImage(img)
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
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