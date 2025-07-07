<template>
  <div class="mb-20">
    <NavbarLandingPage />
  </div>
  <div class="min-h-screen">
    <section
      class="flex flex-col md:flex-row items-center justify-center pt-16 pb-16 bg-[#D7EDFD] text-white animate__animated animate__fadeIn">
      <div class="md:w-1/2 text-center md:text-left px-6 sm:px-10 pt-5 fade-in-left">
        <div class="flex items-center justify-start mb-4">
          <h1 id="typing" class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#223DFC]"></h1>
        </div>
        <p class="mb-6 text-sm sm:text-base md:text-lg text-justify text-black leading-relaxed">
          Air minum <strong>Q-Mas M</strong> diproduksi oleh
          <strong>Panti Asuhan KH Mas Mansyur Malang</strong>, menggunakan mesin filtrasi
          berteknologi tinggi dengan kualitas terbaik. Proses penyaringan super halus
          menghasilkan air minum murni, kaya oksigen, yang sangat baik bagi kesehatan
          tubuh Anda.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/pesan-qmas"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center">
            <i class="fas fa-phone mr-2"></i>
            Pesan Sekarang
          </a>
        </div>
      </div>

      <div class="md:w-[30%] w-3/4 mt-5 md:mt-0 fade-in-right">
        <img src="@/assets/produk.png" loading="lazy" alt="qmas"
          class="rounded-lg w-full mx-auto responsive-image hover-scale" />
      </div>
    </section>

    <section id="about" class="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-[#76AAE4] text-center fade-in-up">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
        Kenapa Memilih Air Minum Q-MAS M
      </h2>

      <p class="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2">
        Air Minum Q-MAS M hadir sebagai solusi air minum berkualitas tinggi yang diproses
        dengan teknologi modern. Berikut beberapa informasi penting mengenai Q-MAS M:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto text-left">
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg card-animate">
          <h3 class="text-lg sm:text-xl font-semibold text-blue-700 mb-3 sm:mb-4">
            Proses Produksi Modern
          </h3>
          <ul class="list-disc text-gray-600 pl-5 space-y-2 text-sm sm:text-base">
            <li>Filtrasi berteknologi tinggi dan proses sterilisasi UV.</li>
            <li>Penyaringan multi-tahap untuk memastikan kejernihan air.</li>
            <li>Kandungan oksigen terjaga, aman untuk kesehatan.</li>
          </ul>
        </div>
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg card-animate">
          <h3 class="text-lg sm:text-xl font-semibold text-blue-700 mb-3 sm:mb-4">
            Keunggulan Produk
          </h3>
          <ul class="list-disc text-gray-600 pl-5 space-y-2 text-sm sm:text-base">
            <li>✅ Rasa segar & ringan di tenggorokan.</li>
            <li>✅ Terjamin kebersihannya, bebas dari kontaminasi.</li>
            <li>✅ Dikemas dengan standar higienis.</li>
          </ul>
        </div>

        <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg card-animate">
          <h3 class="text-lg sm:text-xl font-semibold text-blue-700 mb-3 sm:mb-4">
            Manfaat Bagi Kesehatan
          </h3>
          <ul class="list-disc text-gray-600 pl-5 space-y-2 text-sm sm:text-base">
            <li>Membantu menjaga keseimbangan cairan tubuh.</li>
            <li>Mendukung metabolisme dan detoksifikasi alami.</li>
            <li>Baik untuk kesehatan kulit dan pencernaan.</li>
          </ul>
        </div>
      </div>

      <transition name="fade">
        <div v-if="expanded" class="max-w-6xl mx-auto mt-6 sm:mt-8 text-left">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div class="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md card-animate">
              <h3 class="text-base sm:text-lg font-semibold text-blue-700">
                Kepercayaan Konsumen
              </h3>
              <p class="text-gray-600 mt-2 text-sm sm:text-base">
                Diproduksi oleh Panti Asuhan KH Mas Mansyur Malang, dipercaya oleh banyak
                masyarakat Malang & sekitarnya.
              </p>
            </div>

            <div class="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md card-animate">
              <h3 class="text-base sm:text-lg font-semibold text-blue-700">
                Standar Kebersihan Tinggi
              </h3>
              <p class="text-gray-600 mt-2 text-sm sm:text-base">
                Diproduksi sesuai standar kebersihan industri, menjamin mutu air yang aman
                dikonsumsi.
              </p>
            </div>

            <div class="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md card-animate">
              <h3 class="text-base sm:text-lg font-semibold text-blue-700">
                Testimoni Pelanggan
              </h3>
              <p class="text-gray-600 mt-2 text-sm sm:text-base">
                "Air minum Q-MAS terasa ringan dan segar, cocok untuk kebutuhan harian
                keluarga kami." — Pelanggan Setia
              </p>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <section class="flex flex-col sm:flex-row">
      <div class="w-full sm:w-1/2 overflow-hidden">
        <img src="@/assets/product/airadalah.jpeg" alt="gambar product"
          class="w-full h-auto hover-scale image-animate transition-transform duration-700" />
      </div>
      <div class="w-full sm:w-1/2 overflow-hidden">
        <img src="@/assets/product/penuhikebutuhan.jpeg" alt="gambar product"
          class="w-full h-auto hover-scale image-animate transition-transform duration-700" />
      </div>
    </section>

    <section class="overflow-hidden">
      <img src="@/assets/product/botol.jpg" alt="gambar product"
        class="w-full h-auto hover-scale image-animate transition-transform duration-700" />
    </section>

    <section class="overflow-hidden">
      <img src="@/assets/product/temansetia.jpg" alt="gambar teman setia qmas"
        class="w-full h-auto hover-scale image-animate transition-transform duration-700" />
    </section>

    <section id="track-record" class="py-16 sm:py-20 px-4 sm:px-6 bg-[#E4E6E5] fade-in-up">
      <h2
        class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 text-blue-700 flex flex-col sm:flex-row items-center justify-center">
        <i class="fas fa-newspaper text-blue-700 mb-2 sm:mb-0 sm:mr-3"></i>
        <span class="text-base sm:text-base md:text-xl">PORTAL SUARA KONSUMEN</span>
      </h2>
      <p class="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 text-justify px-2">
        qmas berkomitmen untuk memberikan wadah bagi masyarakat Indonesia dalam
        menyampaikan suara dan keluhan terkait produk atau layanan yang diterima. Kami
        berusaha memastikan bahwa setiap suara konsumen didengar dengan adil, dan sebagai
        hasil dari upaya ini, kami terus meningkatkan kualitas layanan dan perlindungan
        konsumen di seluruh Indonesia. Kami percaya bahwa transparansi dan komunikasi yang
        baik adalah kunci untuk menciptakan hubungan yang saling menguntungkan antara
        produsen dan konsumen.
      </p>

      <div class="flex justify-center mb-6 sm:mb-8">
        <a href="/suara-konsumen"
          class="bg-blue-700 text-white px-4 sm:px-6 py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-800 transition duration-300 hover:scale-105">
          Kunjungi Suara Konsumen
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 h-auto">
        <div v-for="suaraKonsumen in SuaraKonsumeList.slice(0, 4)" :key="suaraKonsumen.id"
          @click="routingTo(suaraKonsumen.id, suaraKonsumen.judul)" class="flex justify-end">
          <div
            class="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 ease-in-out hover:scale-105 w-full card-animate cursor-pointer">
            <img :src="getfullPathImage(suaraKonsumen.media[0].imageUrl)" alt="" loading="lazy"
              class="rounded-md w-full transition duration-300 ease-in-out hover:opacity-80 max-h-40 sm:max-h-52 object-cover" />
            <h3 class="text-base sm:text-xl font-semibold mt-3 sm:mt-4 hover:text-blue-600 text-left cursor-pointer">
              {{ suaraKonsumen.judul }}
            </h3>
            <p class="text-gray-600 mt-2 text-sm sm:text-base">
              {{ getTruncatedDescription(suaraKonsumen.deskripsi1, 200) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="py-16 sm:py-20 px-4 sm:px-6 bg-[#D7EDFD] fade-in-up">
      <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10 animate__animated animate__fadeIn">
        Layanan Kami
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        <div
          class="bg-white p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp card-animate">
          <i class="fas fa-tint text-blue-700 text-2xl sm:text-3xl mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Air Minum Berkualitas
          </h3>
          <p class="text-gray-600 text-justify text-sm sm:text-base">
            Q-Mas menghadirkan air minum berkualitas tinggi yang diproses dengan teknologi
            filtrasi modern, bebas bakteri dan kaya oksigen, untuk menjaga kesehatan
            tubuh.
          </p>
        </div>

        <div
          class="bg-white p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp card-animate">
          <i class="fas fa-box-open text-blue-700 text-2xl sm:text-3xl mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Kemasan Beragam</h3>
          <p class="text-gray-600 text-justify text-sm sm:text-base">
            Tersedia berbagai pilihan kemasan mulai dari 120ml, 240ml, 600ml, hingga galon
            19L, yang praktis untuk konsumsi harian maupun kebutuhan acara besar.
          </p>
        </div>

        <div
          class="bg-white p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp card-animate">
          <i class="fas fa-check-circle text-blue-700 text-2xl sm:text-3xl mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Standar Kesehatan Teruji
          </h3>
          <p class="text-gray-600 text-justify text-sm sm:text-base">
            Q-Mas telah melalui uji laboratorium dan dinyatakan memenuhi standar kesehatan
            oleh Dinas Kesehatan, aman dikonsumsi oleh seluruh kalangan.
          </p>
        </div>

        <div
          class="bg-white p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp card-animate">
          <i class="fas fa-shipping-fast text-blue-700 text-2xl sm:text-3xl mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Distribusi Cepat</h3>
          <p class="text-gray-600 text-justify text-sm sm:text-base">
            Kami melayani pengiriman air minum Q-Mas secara cepat dan tepat waktu ke
            berbagai area Malang dan sekitarnya, untuk kebutuhan rumah tangga, kantor,
            maupun event.
          </p>
        </div>
        <div
          class="bg-white p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp card-animate">
          <i class="fas fa-hand-holding-water text-blue-700 text-2xl sm:text-3xl mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Dukungan Mitra Usaha
          </h3>
          <p class="text-gray-600 text-justify text-sm sm:text-base">
            Kami membuka peluang kemitraan bagi Anda yang ingin menjadi agen atau
            distributor air minum Q-Mas dengan dukungan pelatihan dan promosi.
          </p>
        </div>

        <div
          class="bg-white p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp card-animate">
          <i class="fas fa-heart text-blue-700 text-2xl sm:text-3xl mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Kontribusi Sosial</h3>
          <p class="text-gray-600 text-justify text-sm sm:text-base">
            Setiap pembelian Q-Mas turut berkontribusi untuk mendukung kegiatan sosial dan
            pendidikan anak-anak di Panti Asuhan KH Mas Mansyur.
          </p>
        </div>
      </div>
    </section>

    <section id="contact" class="py-16 sm:py-20 px-4 md:px-8 bg-[#76AAE4] fade-in-up">
      <div class="container mx-auto max-w-screen-md text-center">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 flex flex-col sm:flex-row items-center justify-center">
          <i class="fas fa-phone-alt text-white mb-2 sm:mb-0 sm:mr-3"></i>
          Hubungi Kami
        </h2>

        <p class="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 px-2">
          Punya Pertanyaan Atau Ingin Tahu Lebih Lanjut? Kontak Kami Sekarang!
        </p>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a href="https://wa.me/6281333015767" target="_blank"
            class="bg-blue-600 text-white px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
            <i class="fa fa-phone text-black mr-2 text-lg sm:text-2xl"> </i>0813 3301 5767
            & 0341-437354
          </a>

          <a href="mailto:pt.qmas@gmail.com"
            class="bg-blue-600 text-white px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
            📧 pt.qmas@gmail.com
          </a>
        </div>

        <div class="mt-8 sm:mt-10 flex justify-center gap-4 sm:gap-6">
          <a href="https://www.facebook.com/qmas.pusat/" target="_blank"
            class="text-blue-600 hover:text-blue-800 transition-transform duration-300 text-xl sm:text-2xl hover:scale-125">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/qmas.jaktim/" target="_blank"
            class="text-blue-600 hover:text-blue-800 transition-transform duration-300 text-xl sm:text-2xl hover:scale-125">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/@channelqmas" target="_blank"
            class="text-blue-600 hover:text-blue-800 transition-transform duration-300 text-xl sm:text-2xl hover:scale-125">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://www.linkedin.com/company/consumers-international" target="_blank"
            class="text-blue-600 hover:text-blue-800 transition-transform duration-300 text-xl sm:text-2xl hover:scale-125">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>

    <section
      class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 py-8 sm:py-10 min-h-[400px] sm:min-h-[600px] fade-in-up">
      <div class="relative w-full h-[300px] sm:h-[500px] cursor-pointer overflow-hidden rounded-lg shadow-lg map-hover">
        <img :src="require('@/assets/product/kotamalangsebaran.jpg')" alt="gambar 1"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out opacity-100 hover:opacity-0" />
        <img :src="require('@/assets/product/mapsmalang.jpeg')" alt="gambar 1 hover"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out opacity-0 hover:opacity-100 hover:-translate-y-3" />
      </div>

      <div class="relative w-full h-[300px] sm:h-[500px] cursor-pointer overflow-hidden rounded-lg shadow-lg map-hover">
        <img :src="require('@/assets/product/kotabatusebaran.png')" alt="gambar 2"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out opacity-100 hover:opacity-0" />
        <img :src="require('@/assets/product/mapskotabatu.jpg')" alt="gambar 2 hover"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out opacity-0 hover:opacity-100 hover:-translate-y-3" />
      </div>

      <div
        class="relative w-full h-[300px] sm:h-[500px] cursor-pointer overflow-hidden rounded-lg shadow-lg map-hover sm:col-span-2 md:col-span-1">
        <img :src="require('@/assets/product/kabmalangsebaran.jpg')" alt="gambar 3"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out opacity-100 hover:opacity-0" />
        <img :src="require('@/assets/product/mapskabmalang.jpg')" alt="gambar 3 hover"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out opacity-0 hover:opacity-100 hover:-translate-y-3" />
      </div>
    </section>

    <FooterLandingPage />
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="text-white text-lg">Sedang Memuat...</div>
      <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
    </div>
  </div>
</template>

<script>
import FooterLandingPage from "@/components/FooterLandingPage.vue";
import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
import qmas from "@/service/qmas";

// Move the type function outside of the component
function type(element, text, i) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    setTimeout(() => type(element, text, i + 1), 100);
  }
}

export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage,
  },
  name: "LandingPage",
  data() {
    return {
      expanded: false,
      SuaraKonsumeList: [],
      isLoading: false,
    };
  },
  mounted() {
    this.typeWriterEffect();
    this.addFadeInAnimation();
    this.getAllBerita();
    this.initScrollAnimations();
  },
  methods: {
    routingTo(id, judul) {
      this.$router.push(`/suara-konsumen/detail/${id}/${judul}`);
    },
    getTruncatedDescription(text, karakter) {
      if (text.length > karakter) {
        return text.slice(0, karakter) + "...";
      }
      return text;
    },
    getAllBerita() {
      this.isLoading = true;
      qmas
        .getAllSuaraKonsumenPublish()
        .then((res) => {
          this.SuaraKonsumeList = res.data;
          console.log(this.SuaraKonsumeList);
        })
        .catch(() => { })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getfullPathImage(img) {
      return qmas.getfullpathImage(img);
    },

    typeWriterEffect() {
      const text = "Qmas-air minum kesehatan";
      const element = document.getElementById("typing");

      if (element) {
        type(element, text, 0);
      }
    },

    // Enhanced scroll animations
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      }, observerOptions);

      // Observe all elements with animation classes
      document
        .querySelectorAll(
          ".fade-in-up, .fade-in-left, .fade-in-right, .card-animate, .image-animate, .map-hover"
        )
        .forEach((el) => {
          observer.observe(el);
        });
    },

    // Method to add fade-in effect on scroll
    addFadeInAnimation() {
      window.addEventListener("scroll", () => {
        const aboutText = document.getElementById("about-text");
        const trackRecord = document.getElementById("track-record");

        // Check if elements exist before checking their position
        if (aboutText && trackRecord) {
          const rectAboutText = aboutText.getBoundingClientRect();
          const rectTrackRecord = trackRecord.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Fade-in effect for About text
          if (rectAboutText.top < viewportHeight - 100) {
            aboutText.classList.add("animate__fadeIn");
          }

          // Fade-in effect for Track Record section
          if (rectTrackRecord.top < viewportHeight - 100) {
            trackRecord.classList.add("animate__fadeIn");
          }
        }
      });
    },

    setActiveFilter(filter) {
      console.log(filter);
    },
  },
};
</script>

<style scoped>
/* Enhanced Animation Styles */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Base animation states */
.fade-in-up,
.fade-in-left,
.fade-in-right,
.card-animate,
.image-animate,
.map-hover {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up {
  transform: translateY(50px);
}

.fade-in-left {
  transform: translateX(-50px);
}

.fade-in-right {
  transform: translateX(50px);
}

.card-animate {
  transform: translateY(30px) scale(0.95);
}

.image-animate {
  transform: scale(1.05);
}

/* Active animation states */
.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.fade-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.card-animate.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.image-animate.animate-in {
  opacity: 1;
  transform: scale(1);
}

/* Hover effects */
.hover-scale {
  transition: transform 0.3s ease-in-out;
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* Map hover effects */
.map-hover {
  opacity: 1;
  transform: scale(1);
}

.map-hover.animate-in {
  opacity: 1;
  transform: scale(1);
}

.map-hover:hover {
  transform: scale(1.02) translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Responsive image scaling */
.responsive-image {
  transition: transform 0.5s ease-in-out, filter 0.3s ease;
}

.responsive-image:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Staggered animation delays for cards */
.card-animate:nth-child(1) {
  transition-delay: 0.1s;
}

.card-animate:nth-child(2) {
  transition-delay: 0.2s;
}

.card-animate:nth-child(3) {
  transition-delay: 0.3s;
}

.card-animate:nth-child(4) {
  transition-delay: 0.4s;
}

.card-animate:nth-child(5) {
  transition-delay: 0.5s;
}

.card-animate:nth-child(6) {
  transition-delay: 0.6s;
}

/* Image zoom effect */
.image-zoom {
  overflow: hidden;
  border-radius: 0.5rem;
}

.image-zoom img {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.image-zoom:hover img {
  transform: scale(1.1);
}

/* Parallax-like effect for background images */
.parallax-section {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Floating animation for icons */
@keyframes floating {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.floating-icon {
  animation: floating 3s ease-in-out infinite;
}

/* Pulse effect for important elements */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.pulse-effect {
  animation: pulse 2s infinite;
}

/* Smooth transitions for buttons */
.btn-smooth {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-smooth:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Loading animation */
.spinner-border {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Typewriter cursor effect */
#typing::after {
  content: "|";
  animation: blink 1s infinite;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {

  .fade-in-up,
  .fade-in-left,
  .fade-in-right {
    transform: translateY(20px);
  }

  .fade-in-left {
    transform: translateX(-20px);
  }

  .fade-in-right {
    transform: translateX(20px);
  }

  .card-animate {
    transform: translateY(15px) scale(0.98);
  }

  .hover-scale:hover {
    transform: scale(1.01);
  }

  .map-hover:hover {
    transform: scale(1.01) translateY(-2px);
  }
}

/* Section dividers with animation */
.section-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #76aae4, transparent);
  opacity: 0;
  transform: scaleX(0);
  transition: all 1s ease-in-out;
}

.section-divider.animate-in {
  opacity: 1;
  transform: scaleX(1);
}

/* Gradient text animation */
.gradient-text {
  background: linear-gradient(45deg, #223dfc, #76aae4, #223dfc);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Enhanced transition for expandable content */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
