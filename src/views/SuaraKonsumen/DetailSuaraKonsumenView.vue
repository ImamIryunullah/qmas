<template>
  <div class="bg-gray-50">
    <NavbarNews /> <!-- Include the navbar -->

    <section class="container mx-auto px-4 py-6">
      <!-- <h2 class="text-xl font-semibold mb-4">Detail Berita...</h2> -->
      <div class="flex flex-col sm:flex-row sm:space-x-6">
        <!-- Left Section (Main Article) -->
        <div class="border border-b-2 rounded-md shadow-2xl w-full sm:w-2/3 mb-6 sm:mb-0">
          <article class="bg-gray-50 p-4 rounded-lg shadow-md">
            <figure class="relative">
              <img src="@/assets/bahlil.jpeg" alt="Latest Story" class="w-full h-full object-cover  mb-4" />
              <figcaption class="text-center text-sm text-gray-700 mt-1">{{ article.caption }}</figcaption>
              <!-- Underline below the caption -->
              <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
            </figure>

            <h3 class="text-lg sm:text-2xl font-semibold mt-2">{{ article.judul }}</h3>

            <p class="text-xs sm:text-sm text-gray-500 mt-4">{{ article.waktu_publikasi }}</p>
            <p class="text-xs sm:text-sm text-red-600 mt-4 font-bold underline">{{ article.kategori }}</p>
            <div class="space-y-7">
              <p class="text-justify mt-2">{{ article.paragraf1 }}</p>

              <!-- Figure for Image with Caption -->
              <figure class="relative">
                <img src="@/assets/bahlil.jpeg" alt="gambarOpsional" class="w-full sm:w-1/2 mx-auto mb-2">

                <figcaption class="text-center text-sm text-gray-600 mt-2">{{ article.caption }}</figcaption>
                <div class="w-1/2 mx-auto mt-2 border-t-2 border-gray-300"></div>
              </figure>

              <p class="text-justify mt-2">{{ article.paragraf2 }}</p>
              <p class="text-justify mt-2">{{ article.paragraf3 }}</p>
            </div>

            <!-- Social Media Share Buttons -->
            <div class="flex space-x-4 mt-4">
              <!-- Facebook Share Button -->
              <a href="https://www.facebook.com/sharer/sharer.php?u={{ article.url }}" target="_blank"
                class="text-blue-600 hover:text-blue-800">
                <i class="fab fa-facebook-f text-2xl"></i>
              </a>

              <!-- WhatsApp Share Button -->
              <a href="https://api.whatsapp.com/send?text={{ article.judul }}%20{{ article.url }}" target="_blank"
                class="text-green-500 hover:text-green-700">
                <i class="fab fa-whatsapp text-2xl"></i>
              </a>

              <!-- Twitter Share Button -->
              <a href="https://x.com/intent/tweet?url={{ article.url }}&text={{ article.judul }}" target="_blank"
                class="text-blue-400 hover:text-blue-600">
                <i class="fab fa-twitter text-2xl"></i>
              </a>

              <button id="copyLink" class="text-gray-400 hover:text-gray-800" title="Copy Link">
                <i class="fas fa-link text-2xl"></i>
              </button>
            </div>
            <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
          </article>

        </div>


        <!-- Right Section (Smaller Articles) -->

        <div class="w-full sm:w-1/3 space-y-6 mt-1">
          <h2 class="text-xl font-semibold mb-4">More to see</h2>
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


    <section class="container mx-auto px-4 py-6">
      <h2 class="text-xl font-semibold mb-6">Kolom Komentar</h2>

      <!-- Comment Form -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 class="text-lg font-semibold mb-4">Tinggalkan Komentar</h3>

        <!-- Username Field -->
        <input type="text" class="w-full p-3 border border-gray-300 rounded-lg mb-4" placeholder="Masukkan nama Anda..."
          v-model="username" />

        <textarea class="w-full p-3 border border-gray-300 rounded-lg mb-4" placeholder="Tulis komentar Anda..."
          rows="4" v-model="commentText"></textarea>

        <button class="bg-red-700 text-white py-2 px-6 rounded-md hover:bg-gray-700" @click="submitComment">
          Kirim Komentar
        </button>
      </div>

      <!-- Comments List -->
      <div class="space-y-6">
        <!-- Comment 1 -->
        <div class="bg-white p-4 rounded-lg shadow-md" v-for="(comment, index) in comments" :key="index">
          <div class="flex items-center mb-4">
            <!-- Profile Icon -->
            <div class="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center mr-4">
              <i class="fas fa-user"></i> <!-- Font Awesome user icon -->
            </div>
            <div>
              <p class="font-semibold text-sm">{{ comment.username }}</p>
              <p class="text-xs text-gray-500">{{ comment.date }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-700">
            {{ comment.text }}
          </p>
        </div>
      </div>
    </section>


    <FooterNews />
  </div>
</template>

<script>
import FooterNews from '@/components/FooterSuaraKonsumen.vue';
import NavbarNews from '@/components/NavbarSuaraKonsumen.vue';

export default {

  components: {
    FooterNews,
    NavbarNews

  },

  data() {
    return {
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
      username: '',
      commentText: '',

      // Dummy comments data
      comments: [
        {
          username: 'John Doe',
          text: 'This is a great article! Thanks for sharing.',
          date: '2022-09-15',
        },
        {
          username: 'Jane Smith',
          text: 'I found this information really helpful, looking forward to reading more!',
          date: '2022-09-16',
        },
        {
          username: 'Mark Johnson',
          text: 'Interesting perspective. I learned something new today.',
          date: '2022-09-17',
        }
      ]
    };
  },
  methods: {
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
    submitComment() {
      if (this.username && this.commentText) {
        const newComment = {
          username: this.username,
          text: this.commentText,
          date: new Date().toLocaleDateString(), // Current date
        };

        // Add new comment to the list
        this.comments.push(newComment);

        // Reset the input fields
        this.username = '';
        this.commentText = '';
      } else {
        alert('Please enter both a name and a comment.');
      }
    }
  },
  name: 'ArticleDetail'
};
</script>

<style scoped></style>
