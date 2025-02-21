<template>
    <div class="bg-gray-50">
        <NavbarNews />
        <section class="container mx-auto px-4 py-9">
            <h2 class="text-xl text-center font-semibold mb-6 bg-black text-white py-2 uppercase">{{ kategori }}</h2>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Main Article on the Left -->
                <div class="col-span-3">
                    <article class="bg-white p-4 rounded-lg shadow-md">
                        <img src="@/assets/bahlil.jpeg" alt="Main Story"
                            class="w-full h-full object-cover rounded-md mb-4" />
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Terhimpit kemiskinan dan kesepian, kisah lansia di Jepang memilih hidup di penjara
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-sm text-gray-700 mb-4">
                            Di Jepang, seorang lansia memilih hidup di penjara karena terhimpit kemiskinan dan kesepian.
                            Ini menjadi fenomena menarik yang...
                        </p>
                        <router-link :to="'/suara-konsumen/detail/1'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                    </article>
                </div>
                <!-- Smaller Articles on the Right -->
                <div class="col-span-1">
                    <article class="p-4 ">
                        <h4 class="text-sm font-semibold text-gray-900">
                            Doyan makan bakso dan seblak, ribuan remaja putri di Karawang derita anemia
                        </h4>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <router-link :to="'/suara-konsumen/detail/2'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-2 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
                    </article>

                    <article class=" p-4 ">
                        <h4 class="text-sm font-semibold text-gray-900">
                            Pesona 5 artis Indonesia masuk dalam Daftar Perempuan Tercantik Dunia 2024 versi TC Candler
                        </h4>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <router-link :to="'/suara-konsumen/detail/3'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-2 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
                    </article>

                    <article class=" p-4 ">
                        <h4 class="text-sm font-semibold text-gray-900">
                            'Geng anak baik': Tak Takut Kids Club jadi ruang aman anak-anak terlantar di Singapura
                        </h4>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <router-link :to="'/suara-konsumen/detail/4'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-2 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
                    </article>

                    <article class=" p-4 ">
                        <h4 class="text-sm font-semibold text-gray-900">
                            'Geng anak baik': Tak Takut Kids Club jadi ruang aman anak-anak terlantar di Singapura
                        </h4>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <router-link :to="'/suara-konsumen/detail/4'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-2 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
                    </article>

                    <article class=" p-4 ">
                        <h4 class="text-sm font-semibold text-gray-900">
                            'Geng anak baik': Tak Takut Kids Club jadi ruang aman anak-anak terlantar di Singapura
                        </h4>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <router-link :to="'/suara-konsumen/detail/4'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-2 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
                    </article>

                    <article class=" p-4 ">
                        <h4 class="text-sm font-semibold text-gray-900">
                            'Geng anak baik': Tak Takut Kids Club jadi ruang aman anak-anak terlantar di Singapura
                        </h4>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <router-link :to="'/suara-konsumen/detail/4'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-2 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
                    </article>

                </div>
            </div>
        </section>
        <div class="w-full mx-auto border-t-2 border-gray-300"></div>
        <!-- Latest News Section -->
        <section class="container mx-auto px-3 py-5">
            <!-- Title Section -->
            <h2 class="text-xl font-semibold mb-6">Latest News</h2>

            <!-- Horizontal Scrollable Container for Articles -->
            <div class="flex overflow-x-auto space-x-6">
                <!-- Article 1 -->
                <article class="flex-none w-full sm:w-80 md:w-96 p-4 bg-white rounded-lg shadow-lg">
                    <img src="@/assets/bahlil.jpeg" alt="Latest Story"
                        class="w-full h-56 object-cover rounded-lg mb-4" />
                    <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Studi: Waspada, AI bisa melemahkan kemampuan manusia berpikir kritis
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        AI berpotensi merubah cara manusia berpikir, mengurangi kemampuan berpikir kritis dan logis.
                    </p>
                    <router-link :to="'/suara-konsumen/detail/1'">
                        <button class="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm">Baca
                            Selengkapnya</button>
                    </router-link>
                </article>

                <!-- Article 2 -->
                <article class="flex-none w-full sm:w-80 md:w-96 p-4 bg-white rounded-lg shadow-lg">
                    <img src="@/assets/bahlil.jpeg" alt="Latest Story"
                        class="w-full h-56 object-cover rounded-lg mb-4" />
                    <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Apa itu tren Youngtro? Ketika iPhone dan digicam lawas viral serta diburu Gen Z
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        Gen Z mulai mencintai kamera lawas dan iPhone sebagai tren baru dalam media sosial.
                    </p>
                    <router-link :to="'/suara-konsumen/detail/2'">
                        <button class="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm">Baca
                            Selengkapnya</button>
                    </router-link>
                </article>

                <!-- Article 3 -->
                <article class="flex-none w-full sm:w-80 md:w-96 p-4 bg-white rounded-lg shadow-lg">
                    <img src="@/assets/bahlil.jpeg" alt="Latest Story"
                        class="w-full h-56 object-cover rounded-lg mb-4" />
                    <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        'Saya bukan dari keluarga kaya': Agnez Mo bahas kisruh royalti Rp1,5 M
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        Agnez Mo membahas masalah royalti yang melibatkan Rp1,5 M dengan Menteri Hukum.
                    </p>
                    <router-link :to="'/suara-konsumen/detail/3'">
                        <button class="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm">Baca
                            Selengkapnya</button>
                    </router-link>
                </article>

                <!-- Article 4 -->
                <article class="flex-none w-full sm:w-80 md:w-96 p-4 bg-white rounded-lg shadow-lg">
                    <img src="@/assets/bahlil.jpeg" alt="Latest Story"
                        class="w-full h-56 object-cover rounded-lg mb-4" />
                    <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Golongan darah B disebut lebih panjang umur dan awet muda, ini alasannya
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        Penelitian menunjukkan bahwa golongan darah B memiliki umur yang lebih panjang dan lebih awet
                        muda.
                    </p>
                    <router-link :to="'/suara-konsumen/detail/4'">
                        <button class="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm">Baca
                            Selengkapnya</button>
                    </router-link>
                </article>
            </div>
        </section>


        <div class="w-full mx-auto mt-2 border-t-2 border-gray-300"></div>
        <div class="container mx-auto px-4 py-6 md:px-8 sm:px-8">
            <div class="bg-black   text-white p-4 rounded-lg mb-1">
                <h3 class="font-semibold text-lg text-center">YANG MUNGKIN ANDA CARI</h3>
            </div>
        </div>


        <section class="container mx-auto px-4 py-3">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Left Article (smaller) -->
                <div class="lg:col-span-1">
                    <article class="p-4">
                        <img src="@/assets/bahlil.jpeg" alt="Left Article"
                            class="w-full h-48 object-cover rounded-md mb-4" />
                        <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                            Pope Francis is showing 'slight improvement' after pneumonia diagnosis
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-xs sm:text-sm text-gray-700 mb-4">Pope Francis has shown slight improvement after
                            being diagnosed with pneumonia, says the Vatican.</p>
                        <router-link :to="'/suara-konsumen/detail/1'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                    </article>
                </div>
                <!-- Center Article (larger) -->
                <div class="lg:col-span-2">
                    <article class="bg-white p-4 rounded-lg shadow-md">
                        <img src="@/assets/bahlil.jpeg" alt="Main Article"
                            class="w-full h-80 object-cover rounded-md mb-4" />
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Apple launches the iPhone 16e, a cheaper new version of iPhone 16
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-sm text-gray-700 mb-4">Apple announced the release of the iPhone 16e, a more
                            affordable version of the iPhone 16 series. The new model features...</p>
                        <router-link :to="'/suara-konsumen/detail/2'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                    </article>
                </div>
                <!-- Right Article (smaller) -->
                <div class="lg:col-span-1">
                    <article class="p-4">
                        <img src="@/assets/bahlil.jpeg" alt="Right Article"
                            class="w-full h-48 object-cover rounded-md mb-4" />
                        <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                            US calls out ‘dangerous’ Chinese helicopter maneuvers
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-xs sm:text-sm text-gray-700 mb-4">The United States has called out China over
                            "dangerous" helicopter maneuvers over the South China Sea, as tensions rise...</p>
                        <router-link :to="'/suara-konsumen/detail/3'">
                            <button class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                                Selengkapnya</button>
                        </router-link>
                    </article>
                </div>
            </div>
        </section>
    </div>
    <FooterNews />

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
                waktu_publikasi: '27 Agustus 2024',
            }
        };
    },
    computed: {
        kategori() {
            return this.$route.params.kategori;
        }
    },
};
</script>

<style scoped>
/* Ensure images fit properly within the container */
article img {
    object-fit: cover;
}
</style>