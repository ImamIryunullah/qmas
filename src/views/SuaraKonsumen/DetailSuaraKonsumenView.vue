<template>
  <div class="bg-gray-50">
    <NavbarNews />
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
    <section class="container mx-auto px-4 py-6">
      <div class="flex flex-col sm:flex-row sm:space-x-6">
        <div class="border border-b-2 w-full sm:w-2/3 mb-6 sm:mb-0">
          <article class="bg-gray-50 p-4 rounded-lg shadow-md">
            <figure class="relative">
              <img :src="getfullpathImage(berita.media[0].imageUrl)" alt="Latest Story"
                class="w-full h-full object-cover  mb-4" />
              <figcaption class="text-center text-sm text-gray-700 mt-1 italic">{{ berita.media[0].deskripsi }}
              </figcaption>
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </figure>
            <h3 class="text-lg sm:text-2xl font-semibold mt-2">{{ berita.judul }}</h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-4 underline"><span
                class="font-semibold text-sm underline">Berita
                Dirilis Pada
              </span>{{
                berita.created_at.split('T')[0] }}
            </p>
            <p class="text-justify leading-losse text-red-600 mt-2 ">{{ berita.wilayah.nama_wilayah }}, {{
              berita.daerah.nama_daerah }}</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-2 font-semibold">Waktu: {{ berita.created_at.split('T')[1] }}
              WIB</p>
            <p class="text-xs sm:text-sm text-red-600 mt-4 font-bold underline">{{ berita.kategori }}</p>
            <div class="space-y-7">
              <p class="text-justify mt-6 px-6 py-4 leading-losse">{{ berita.deskripsi1 }}</p>


              <figure class="relative">
                <img :src="getfullpathImage(berita.media[0].imageUrl)" alt="gambarOpsional"
                  class="w-full sm:w-1/2 mx-auto mb-2">
                <figcaption class="text-center text-sm text-gray-600 mt-2 italic">{{ berita.media[0].deskripsi }}
                </figcaption>
                <div class="w-1/2 mx-auto mt-2 border-t-2 border-gray-300"></div>
              </figure>
              <p class="text-justify mt-6 px-6 py-4 leading-losse">{{ berita.deskripsi2 }}</p>
              <figure class="relative">
                <div v-if="berita.media.length > 2">
                  <img :src="getfullpathImage(berita.media[1].imageUrl)" alt="gambarOpsional"
                    class="w-full sm:w-1/2 mx-auto mb-2">
                  <figcaption class="text-center text-sm text-gray-600 mt-2 italic">{{ berita.media[1].deskripsi }}
                  </figcaption>
                </div>

                <div class="w-1/2 mx-auto mt-2 border-t-2 border-gray-300"></div>
              </figure>
              <p class="text-justify mt-6 px-6 py-4 leading-losse">{{ berita.deskripsi3 }}</p>
              <figure class="relative">
                <div v-if="berita.media.length > 2">
                  <img :src="getfullpathImage(berita.media[2].imageUrl)" alt="gambarOpsional"
                    class="w-full sm:w-1/2 mx-auto mb-2">
                  <figcaption class="text-center text-sm text-gray-600 mt-2 italic">{{ berita.media[2].deskripsi }}
                  </figcaption>
                </div>

                <div class="w-1/2 mx-auto mt-2 border-t-2 border-gray-300"></div>
              </figure>
            </div>
            <div class="flex space-x-4 mt-4">
              <div>
                <div class="">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4">Share This Page</h3>
                  <div class="flex flex-col space-y-4">
                    <a :href="'https://api.whatsapp.com/send?text=' + currentUrl" target="_blank"
                      class="text-green-500 hover:text-green-700 flex items-center space-x-2">
                      <i class="fab fa-whatsapp text-2xl"></i>
                      <span>Share on WhatsApp</span>
                    </a>
                    <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl" target="_blank"
                      class="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
                      <i class="fab fa-facebook-f text-2xl"></i>
                      <span>Share on Facebook</span>
                    </a>
                    <a :href="'https://twitter.com/intent/tweet?url=' + currentUrl" target="_blank"
                      class="text-blue-400 hover:text-blue-600 flex items-center space-x-2">
                      <i class="fab fa-twitter text-2xl"></i>
                      <span>Share on Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            <div class="items-center flex justify-center">
              <div class="w-full sm:w-1/2 lg:w-2/3 p-1">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex">Ingin Memasang Iklan?</h3>
                <p class="text-sm text-gray-600 mb-4 justify">
                  Apakah Anda ingin memasarkan produk atau usaha Anda di seluruh Indonesia? Bergabunglah
                  dengan
                  kami dan
                  dapatkan akses untuk memasang iklan di platform kami untuk memasarkan produk anda untuk menjangkau
                  lebih
                  banyak
                </p>
                <div class="flex justify-center">
                  <a href="https://wa.me/6281333015767" target="_blank">
                    <button
                      class="bg-red-500 text-white px-2 py-2 rounded-md font-semibold hover:bg-red-600 transition-all">
                      Pasang Iklan Sekarang
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </article>

        </div>

        <!-- Right Section (Smaller Articles) -->

        <div class="w-full sm:w-1/3 space-y-6 mt-1">
          <h2 class="bg-black text-white px-2 py-1 rounded-sm text-center flex justify-center font-semibold">BACA JUGA
          </h2>
          <div v-for="data in suaraKonsumenTerbaruList" :key="data.id"
            class="bg-gray-50 flex space-x-4 transition-all p-4 transform">
            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Article 1"
              class="w-1/3 h-20 object-cover rounded-lg" />
            <div class="w-2/3">
              <router-link :to="`/suara-konsumen/detail/${suaraKonsumenList[0].id}`">
                <h5 class="text-lg font-semibold text-gray-800 hover:text-red-900">{{ singkatJudul(data.judul, 50) }}
                </h5>
              </router-link>
              <p class="text-sm text-red-600">{{ data.tanggal.split('T')[0] }}</p>
              <p class="text-gray-600 font-semibold text-sm">{{ berita.wilayah.nama_wilayah }}, {{
                berita.daerah.nama_daerah }}</p>
              <p class="text-sm text-gray-500">{{ singkatDeskripsi(data.deskripsi1, 100) }}</p>
              <!-- <router-link :to="`/suara-konsumen/detail/${data.id}`"> -->
              <button @click="routerPush(data.id)"
                class="text-red-600 hover:text-red-800 font-semibold mt-4 w-full text-center">
                Baca Selengkapnya
              </button>
              <!-- </router-link> -->
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <FooterNews />
  </div>
</template>

<script>
import FooterNews from '@/components/FooterSuaraKonsumen.vue';
import NavbarNews from '@/components/NavbarSuaraKonsumen.vue';
import lpkni from '@/service/lpkni';
import adImage from '@/assets/aqua.jpeg';
export default {
  components: {
    FooterNews,
    NavbarNews

  },
  data() {
    return {
      showPopup: true,
      adImage,
      idBerita: this.$route.query.id || this.$route.params.id,
      currentUrl: window.location.href,  // Get the current URL of the page
      showShareOptions: false,
      berita: { kategori: '', created_at: '', tanggal: '', judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', media: [{ imageUrl: '', deskripsi: '' }, { imageUrl: '', deskripsi: '' }, { imageUrl: '', deskripsi: '' }], wilayah: { nama_wilayah: '' }, daerah: { nama_daerah: '' } },
      suaraKonsumenList: [{ judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', tanggal: '', kategori: '', media: [{}] }],
      suaraKonsumenTerbaruList: [{ judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', tanggal: '', kategori: '', media: [{}] }]

    };
  },
  mounted() {
    this.getSuaraKonsumenByid(this.idBerita),
      this.getALlBeritaPublish()
    this.getSuaraKonsumenTerbaru()
    setTimeout(() => {
      this.showPopup = false;
    }, 5000);
  },
  computed: {
    // limitedSuaraKonsumenList() {
    //   return this.suaraKonsumenList
    //     .sort((a, b) => new Date(b.waktu_publikasi) - new Date(a.waktu_publikasi))
    //     .slice(0, 5);
    // }
  },
  methods: {
    // limitedSuaraKonsumenList() {
    //   return this.suaraKonsumenList
    //     .sort((a, b) => new Date(b.waktu_publikasi) - new Date(a.waktu_publikasi))
    //     .slice(0, 5);
    // },\
    async routerPush(id) {
      await this.$router.push(`/suara-konsumen/detail/${id}`)
      window.location.reload()
    },
    closePopup() {
      this.showPopup = false;
    },
    toggleShareOptions() {
      this.showShareOptions = !this.showShareOptions;
    },
    async getSuaraKonsumenTerbaru() {
      await lpkni.getSuaraKonsumenterbaru().then((res) => {
        this.suaraKonsumenTerbaruList = res.data
      }).catch(() => {

      })
    },
    async getSuaraKonsumenByid(id) {
      await lpkni.getSuaraKonsumenByid(id).then((res) => {
        this.berita = res.data
        console.log(this.berita)
      }).catch(() => {

      })
    },
    async getALlBeritaPublish() {
      await lpkni.getAllSuaraKonsumenPublish().then((res) => {
        this.suaraKonsumenList = res.data
        console.log(this.suaraKonsumenList)
      }).catch(() => { })
    },
    getfullpathImage(img) {
      return lpkni.getfullpathImage(img)
    },
    singkatDeskripsi(text, length) {
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
    },
    copyLink() {
      // Get the article URL (replace with your dynamic URL if needed)
      const articleUrl = this.article.url || 'https://example.com';

      // Use Clipboard API to copy the URL
      navigator.clipboard.writeText(articleUrl).then(() => {
        alert('Link copied to clipboard!');
      }).catch((err) => {
        console.error('Failed to copy link: ', err);
        alert('Failed to copy the link!');
      });
    },
  },
  name: 'ArticleDetail'
};
</script>

<style scoped></style>
