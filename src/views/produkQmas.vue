<template>
  <div class="mb-20">
    <NavbarLandingPage />
  </div>
  <section
    class="relative flex flex-col md:flex-row items-center justify-center pt-16 pb-16 bg-gradient-to-br from-[#D7EDFD] via-[#E8F4FE] to-[#F0F8FF] text-white animate__animated animate__fadeIn overflow-hidden"
  >
    <div class="absolute inset-0 opacity-30">
      <div
        class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-blue-500/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-cyan-300/15 to-blue-400/20 rounded-full blur-2xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-200/10 to-indigo-300/15 rounded-full blur-xl animate-spin"
        style="animation-duration: 20s"
      ></div>
    </div>

    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-40 shadow-lg"
      ></div>
      <div
        class="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full animate-pulse opacity-30 shadow-md"
      ></div>
      <div
        class="absolute bottom-20 left-32 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full animate-ping opacity-35 shadow-xl"
      ></div>
      <div
        class="absolute bottom-40 right-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-40 shadow-md"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/4 left-1/3 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-float opacity-50"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/4 w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-float opacity-35"
        style="animation-delay: 1.5s"
      ></div>
    </div>

    <div class="absolute inset-0 opacity-15">
      <div
        class="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 animate-spin shadow-lg"
        style="animation-duration: 8s"
      ></div>
      <div
        class="absolute bottom-32 left-1/4 w-6 h-20 bg-gradient-to-t from-blue-300 to-cyan-400 rounded-full transform rotate-12 animate-pulse shadow-md"
      ></div>
      <div
        class="absolute top-1/3 right-1/3 w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 transform rotate-12 animate-spin shadow-lg"
        style="animation-duration: 12s"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/2 w-12 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transform -rotate-45 animate-pulse shadow-md"
        style="animation-delay: 2s"
      ></div>
    </div>

    <div
      class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 animate-pulse"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent animate-pulse"
      style="animation-delay: 1s"
    ></div>

    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-300/10 via-transparent to-cyan-300/10"
      ></div>
      <div
        class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-300/10 via-transparent to-blue-300/10"
      ></div>
    </div>

    <div
      class="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto"
    >
      <div class="md:w-1/2 text-center md:text-left px-6 sm:px-10 pt-5 fade-in-left">
        <div
          class="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 shadow-sm"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Kualitas Terjamin & Sehat
        </div>

        <div class="flex items-center justify-start mb-4">
          <h1
            id="typing"
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#223DFC] gradient-text"
          ></h1>
        </div>

        <p
          class="mb-8 text-sm sm:text-base md:text-lg text-justify text-gray-700 leading-relaxed"
        >
          Air minum <strong class="text-blue-700">Q-Mas M</strong> diproduksi oleh
          <strong class="text-blue-700">Panti Asuhan KH Mas Mansyur Malang</strong>,
          menggunakan mesin filtrasi berteknologi tinggi dengan kualitas terbaik. Proses
          penyaringan super halus menghasilkan air minum murni, kaya oksigen, yang sangat
          baik bagi kesehatan tubuh Anda.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div
            class="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
          >
            <div
              class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-gray-700 font-medium">Teknologi Tinggi</span>
          </div>

          <div
            class="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
          >
            <div
              class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              </svg>
            </div>
            <span class="text-gray-700 font-medium">Kaya Oksigen</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <a
            href="/pesan-qmas"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center"
          >
            <i class="fas fa-phone mr-2"></i>
            Pesan Sekarang
          </a>

          <a href="/"
            class="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            <i class="fas fa-info-circle mr-2"></i>
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>

      <div class="md:w-[30%] w-3/4 mt-8 md:mt-0 fade-in-right relative">
        <div
          class="absolute -inset-4 blur-lg opacity-20"
        ></div>

        <div class="relative rounded-2xl p-4">
          <img
            src="@/assets/produk.png"
            loading="lazy"
            alt="Q-Mas Air Minum"
            class=" w-full mx-auto responsive-image hover-scale transition-all duration-500"
          />

          <div
            class="absolute -bottom-2 -left-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse"
          >
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div
          class="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 animate-float"
        >
          <div class="text-center">
            <div class="text-blue-600 font-bold text-lg">100%</div>
            <div class="text-gray-600 text-xs">Murni</div>
          </div>
        </div>

        <div
          class="absolute -right-4 bottom-1/4 bg-white rounded-lg shadow-lg p-3 animate-float"
          style="animation-delay: 1s"
        >
          <div class="text-center">
            <div class="text-green-600 font-bold text-lg">O₂</div>
            <div class="text-gray-600 text-xs">Kaya Oksigen</div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        class="relative block w-full h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="rgba(255,255,255,0.15)"
        ></path>
      </svg>
      <svg
        class="absolute bottom-0 left-0 w-full h-12"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          fill="rgba(255,255,255,0.25)"
        ></path>
      </svg>
    </div>
  </section>
  <FooterLandingPage />
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="text-white text-lg">Sedang Memuat...</div>
    <div
      class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"
    ></div>
  </div>
</template>

<script>
import NavbarLandingPage from "@/components/NavbarLandingPage.vue";
import FooterLandingPage from "@/components/FooterLandingPage.vue";

export default {
  components: {
    NavbarLandingPage,
    FooterLandingPage,
  },
};
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

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

/* Enhanced background animations */
@keyframes morphing {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(90deg);
  }
  50% {
    transform: scale(0.9) rotate(180deg);
  }
  75% {
    transform: scale(1.05) rotate(270deg);
  }
}

.morphing-shape {
  animation: morphing 15s ease-in-out infinite;
}

/* Parallax-like effect */
@keyframes parallax-slow {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-20px) rotate(360deg);
  }
}

.parallax-element {
  animation: parallax-slow 20s linear infinite;
}
</style>
