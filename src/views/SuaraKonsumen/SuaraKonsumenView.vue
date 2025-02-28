<template>
  <div class="bg-gray-200">
    <!-- Header Section -->
    <NavbarNews />
    <!-- Pop-up Advertisement -->
    <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="relative p-6 w-full sm:w-135 md:w-1/2 lg:w-1/3">
        <!-- Image with larger size -->
        <img :src="adImage" alt="Advertisement" class="w-full h-auto mb-4" />

        <!-- Close Button positioned at the top right of the image -->
        <div class="absolute top-6 right-6">
          <button @click="closePopup" class="text-white p-2">
            <i class="fa fa-close fa-2x text-black hover:text-gray-700"></i> <!-- Larger Icon -->
          </button>
        </div>
      </div>
    </div>
    <section class="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md mb-8 mt-7">
      <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <!-- Banner Image -->
        <div class="max-w-full md:w-1/2">
          <!-- Menampilkan Gambar yang Responsif dengan batas ukuran -->
          <img :src="getfullpathImage(suaraKonsumenList[0].media[0].imageUrl)" alt="Trending Image"
            class="w-full h-full object-cover rounded-lg" />
        </div>

        <!-- News Content -->
        <div class="flex flex-col justify-between space-y-4 w-full md:w-1/2">
          <div>
            <!-- Breaking News Alert -->
            <div class="bg-red-600 text-white p-2 rounded-lg inline-block mb-4">
              <span class="font-bold text-sm">Breaking News</span>
            </div>

            <!-- Title -->
            <router-link :to="`/suara-konsumen/detail/${suaraKonsumenList[0].id}`">
              <h2 class="text-3xl font-bold text-gray-900 hover:text-red-800 leading-tight cursor-pointer">
                {{ suaraKonsumenList[0].judul }}
              </h2>
            </router-link>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ suaraKonsumenList[0].tanggal.split('T')[0] }}</p>
            <p class="text-gray-900 text-sm font-semibold mt-2">
              {{ suaraKonsumenList[0].wilayah.nama_wilayah }}, {{ suaraKonsumenList[0].daerah.nama_daerah }}

            </p>
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
        <h3 class="font-semibold text-lg">
          Suara Konsumen - LPKNI - {{ currentDate }}
        </h3>
      </div>


      <!-- Trending Section -->
      <section class="flex mb-8 items-center justify-center">
        <!-- Horizontal Scrolling Container -->
        <div class="flex space-x-6 overflow-x-auto pb-6 justify-start bg-white py-6 px-4 rounded-lg">
          <!-- Loop through suaraKonsumenList -->
          <div v-for="data in suaraKonsumenList" :key="data.id" class="flex-none w-80">
            <!-- Article Image -->
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Trending Image"
              class="w-full h-48 object-cover rounded-lg mb-4" />
            <RouterLink :to="`/suara-konsumen/detail/${data.id}`">
              <h3 class="text-lg font-semibold text-gray-900 hover:text-red-900">{{ singkatJudul(data.judul, 70) }}</h3>
            </RouterLink>

            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.nama_wilayah }}</p>
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>


            <p class="text-xs text-gray-700 mt-2 font-bold underline">
              {{ data.wilayah.nama_wilayah }}, {{ data.daerah.nama_daerah }}
            </p>
            <p class="text-sm text-gray-700 mt-2">
              {{ truncateDescription(data.deskripsi1, 150) }}
            </p>
            <router-link :to="`/suara-konsumen/detail/${data.id}`">
              <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca Selengkapnya</button>
            </router-link>
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
            <router-link :to="`/suara-konsumen/detail/${data.id}`">
              <h5 class="text-sm sm:text-base font-semibold hover:text-red-900">{{ singkatJudul(data.judul, 50) }}</h5>
            </router-link>
            <!-- <h5 class="text-sm sm:text-base font-semibold">{{ data.judul }}</h5> -->
            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
            <p class="text-xs text-gray-700 mt-2 font-bold underline">
              {{ data.wilayah.nama_wilayah }}, {{ data.daerah.nama_daerah }}
            </p>
            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 170) }}</p>
            <router-link :to="`/suara-konsumen/detail/${data.id}`">
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
import adImage from '@/assets/aqua.jpeg';


import api from "@/service/lpkni"
export default {
  components: {
    FooterNews,
    NavbarNews
  },
  data() {
    return {
      showPopup: true,
      adImage,
      currentDate: this.formatDate(new Date()),
      currentPage: 1,
      articlesPerPage: 4,
      suaraKonsumenList: [{ judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', tanggal: '', kategori: '', nama_wilayah: '', media: [{}], wilayah: { nama_wilayah: "" }, daerah: { nama_daerah: "" } }]
    };
  },
  computed: {
    currentPageArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage;
      const endIndex = this.currentPage * this.articlesPerPage;
      return this.suaraKonsumenList.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getALlBeritaPublish(),
      setTimeout(() => {
        this.showPopup = false;
      }, 10000);
  },
  methods: {
    async getALlBeritaPublish() {
      await api.getAllSuaraKonsumenPublish().then((res) => {
        this.suaraKonsumenList = res.data
        console.log(this.suaraKonsumenList)
      }).catch(() => { })
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
    nextPage() {
      if (this.currentPage * this.articlesPerPage < this.suaraKonsumenList.length) {
        this.currentPage++;
      }
    },
    previousPage() {
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