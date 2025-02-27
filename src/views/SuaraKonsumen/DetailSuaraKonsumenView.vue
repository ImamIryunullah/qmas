<template>
  <div class="bg-gray-50">
    <NavbarNews />
    <section class="container mx-auto px-4 py-6">
      <div class="flex flex-col sm:flex-row sm:space-x-6">
        <div class="border border-b-2 rounded-md shadow-2xl w-full sm:w-2/3 mb-6 sm:mb-0">
          <article class="bg-gray-50 p-4 rounded-lg shadow-md">
            <figure class="relative">
              <img :src="getfullpathImage(berita.media[0].imageUrl)" alt="Latest Story"
                class="w-full h-full object-cover  mb-4" />
              <figcaption class="text-center text-sm text-gray-700 mt-1">{{ berita.media[0].deskripsi }}</figcaption>
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </figure>
            <h3 class="text-lg sm:text-2xl font-semibold mt-2">{{ berita.judul }}</h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-4">{{ berita.created_at.split('T')[0] }}</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-4">{{ berita.created_at.split('T')[1] }}</p>
            <p class="text-xs sm:text-sm text-red-600 mt-4 font-bold underline">{{ berita.kategori }}</p>
            <div class="space-y-7">
              <p class="text-justify mt-2">{{ berita.deskripsi1 }}</p>
              <figure class="relative">
                <img :src="getfullpathImage(berita.media[0].imageUrl)" alt="gambarOpsional"
                  class="w-full sm:w-1/2 mx-auto mb-2">
                <figcaption class="text-center text-sm text-gray-600 mt-2">{{ berita.media[0].deskripsi }}</figcaption>
                <div class="w-1/2 mx-auto mt-2 border-t-2 border-gray-300"></div>
              </figure>
              <p class="text-justify mt-2">{{ berita.deskripsi2 }}</p>
              <figure class="relative">
                <img :src="getfullpathImage(berita.media[1].imageUrl)" alt="gambarOpsional"
                  class="w-full sm:w-1/2 mx-auto mb-2">
                <figcaption class="text-center text-sm text-gray-600 mt-2">{{ berita.media[1].deskripsi }}</figcaption>
                <div class="w-1/2 mx-auto mt-2 border-t-2 border-gray-300"></div>
              </figure>
              <p class="text-justify mt-2">{{ berita.deskripsi3 }}</p>
              <figure class="relative">
                <img :src="getfullpathImage(berita.media[2].imageUrl)" alt="gambarOpsional"
                  class="w-full sm:w-1/2 mx-auto mb-2">
                <figcaption class="text-center text-sm text-gray-600 mt-2">{{ berita.media[2].deskripsi }}</figcaption>
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
          </article>

        </div>

        <!-- Right Section (Smaller Articles) -->

        <div class="w-full sm:w-1/3 space-y-6 mt-1">
          <div class="bg-gray-50 flex space-x-4 transition-all p-4 transform">
            <img src="@/assets/bannerberita.jpeg" alt="Article 1" class="w-1/3 h-20 object-cover rounded-lg" />
            <div class="w-2/3">
              <h4 class="text-lg font-semibold text-gray-800">{{ article.judul }}</h4>
              <p class="text-sm text-red-600">{{ article.waktu_publikasi }}</p>
              <p class="text-sm text-gray-500">{{ article.deskripsi }}</p>
              <router-link :to="'/detail/1'">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4 transition-all hover:underline">Baca
                  Selengkapnya</button>
              </router-link>
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </div>
          </div>

          <div class="bg-gray-50 flex space-x-4 transition-all p-4 transform">
            <img src="@/assets/bannerberita.jpeg" alt="Article 2" class="w-1/3 h-20 object-cover rounded-lg" />
            <div class="w-2/3">
              <h4 class="text-lg font-semibold text-gray-800">{{ article.judul }}</h4>
              <p class="text-sm text-red-600">{{ article.waktu_publikasi }}</p>
              <p class="text-sm text-gray-500">{{ article.deskripsi }}</p>
              <router-link :to="'/detail/1'">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4 transition-all hover:underline">Baca
                  Selengkapnya</button>
              </router-link>
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </div>
          </div>
          <div class="bg-gray-50 flex space-x-4 transition-all p-4 transform">
            <img src="@/assets/bannerberita.jpeg" alt="Article 2" class="w-1/3 h-20 object-cover rounded-lg" />
            <div class="w-2/3">
              <h4 class="text-lg font-semibold text-gray-800">Beloved Arizona coach loses battle with coronavirus</h4>
              <p class="text-sm text-red-600">{{ article.waktu_publikasi }}</p>
              <p class="text-sm text-gray-500">{{ article.deskripsi }}</p>
              <router-link :to="'/detail/1'">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4 transition-all hover:underline">Baca
                  Selengkapnya</button>
              </router-link>
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </div>
          </div>
          <div class="bg-gray-50 flex space-x-4 transition-all p-4 transform">
            <img src="@/assets/bannerberita.jpeg" alt="Article 2" class="w-1/3 h-20 object-cover rounded-lg" />
            <div class="w-2/3">
              <h4 class="text-lg font-semibold text-gray-800">{{ article.judul }}</h4>
              <p class="text-sm text-red-600">{{ article.waktu_publikasi }}</p>
              <p class="text-sm text-gray-500">{{ article.deskripsi }}</p>
              <router-link :to="'/detail/1'">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4 transition-all hover:underline">Baca
                  Selengkapnya</button>
              </router-link>
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </div>
          </div>

          <div class="bg-gray-50 flex space-x-4 transition-all p-4 transform">
            <img src="@/assets/bannerberita.jpeg" alt="Article 3" class="w-1/3 h-20 object-cover rounded-lg" />
            <div class="w-2/3">
              <h4 class="text-lg font-semibold text-gray-800">{{ article.judul }}</h4>
              <p class="text-sm text-red-600">{{ article.waktu_publikasi }}</p>
              <p class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius esse
                labore dignissimos.</p>
              <router-link :to="'/detail/1'">
                <button class="text-red-600 hover:text-red-800 font-semibold mt-4 transition-all hover:underline">Baca
                  Selengkapnya</button>
              </router-link>
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
export default {
  components: {
    FooterNews,
    NavbarNews

  },
  data() {
    return {
      idBerita: this.$route.query.id || this.$route.params.id,
      article: {
        judul: 'John Lewis makes final journey across Edmund Pettus Bridge',
        caption: 'Pada hari Sabtu, 12 Februari 2045 Bahlil sedang memasaakk brodeeerr sistahhhhh',
        gambar: '',
        waktu_publikasi: '27 Agustus 2024',
        kategori: 'Berita Nasional',
        paragraf1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolorum quae soluta non doloribus veniam quaerat quis nemo modi cum. Placeat expedita velit nisi dolores reiciendis, labore in quos inventore fugit, ut maxime maiores saepe neque voluptate magni nihil corporis! Alias adipisci maxime officia, eius sunt natus cupiditate at distinctio similique velit impedit quas animi voluptatum rerum facilis deleniti sit delectus cumque nobis? Deserunt, quas. Consectetur id pariatur, facere neque expedita ut blanditiis, consequatur dolorum rem amet quibusdam reprehenderit nobis ullam quam voluptatum. Esse sint nesciunt eveniet. Quisquam repudiandae culpa quae magni quod accusantium a eveniet, vero eos, atque libero.',
        paragraf2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolorum quae soluta non doloribus veniam quaerat quis nemo modi cum. Placeat expedita velit nisi dolores reiciendis, labore in quos inventore fugit, ut maxime maiores saepe neque voluptate magni nihil corporis! Alias adipisci maxime officia, eius sunt natus cupiditate at distinctio similique velit impedit quas animi voluptatum rerum facilis deleniti sit delectus cumque nobis? Deserunt, quas. Consectetur id pariatur, facere neque expedita ut blanditiis, consequatur dolorum rem amet quibusdam reprehenderit nobis ullam quam voluptatum. Esse sint nesciunt eveniet. Quisquam repudiandae culpa quae magni quod accusantium a eveniet, vero eos, atque libero.',
        paragraf3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolorum quae soluta non doloribus veniam quaerat quis nemo modi cum. Placeat expedita velit nisi dolores reiciendis, labore in quos inventore fugit, ut maxime maiores saepe neque voluptate magni nihil corporis! Alias adipisci maxime officia, eius sunt natus cupiditate at distinctio similique velit impedit quas animi voluptatum rerum facilis deleniti sit delectus cumque nobis? Deserunt, quas. Consectetur id pariatur, facere neque expedita ut blanditiis, consequatur dolorum rem amet quibusdam reprehenderit nobis ullam quam voluptatum. Esse sint nesciunt eveniet. Quisquam repudiandae culpa quae magni quod accusantium a eveniet, vero eos, atque libero.',
        deskripsi: 'fewfgwefiwfggv'
      },
      currentUrl: window.location.href,  // Get the current URL of the page
      showShareOptions: false,
      berita: { kategori: '', created_at: '', tanggal: '', judul: '', deskripsi1: '', deskripsi2: '', deskripsi3: '', media: [{ imageUrl: '', deskripsi: '' }, { imageUrl: '', deskripsi: '' }, { imageUrl: '', deskripsi: '' }] }
    };
  },
  mounted() {
    this.getSuaraKonsumenByid(this.idBerita)
  },
  methods: {
    toggleShareOptions() {
      this.showShareOptions = !this.showShareOptions;
    },
    async getSuaraKonsumenByid(id) {
      await lpkni.getSuaraKonsumenByid(id).then((res) => {
        this.berita = res.data
        console.log(this.berita)
      }).catch(() => {

      })
    },
    getfullpathImage(img) {
      return lpkni.getfullpathImage(img)
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
