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
                            {{ article.judul }}
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-sm text-gray-700 mb-4">
                            {{ article.paragraf1 }}
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
                            {{ article.judul }}
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
                            {{ article.judul }}
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
                            {{ article.judul }}
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
                            {{ article.judul }}
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
                            {{ article.judul }}
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
                            {{ article.judul }}
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

            <!-- Horizontal Scrollable Container for Articles -->
            <div class="flex overflow-x-auto space-x-6">
                <!-- Article 1 -->
                <article class="flex-none w-full sm:w-80 md:w-96 p-4 bg-white rounded-lg shadow-lg">
                    <img src="@/assets/bahlil.jpeg" alt="Latest Story"
                        class="w-full h-56 object-cover rounded-lg mb-4" />
                    <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        {{ article.judul }}
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        {{ article.deskripsi }}
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
                        {{ article.judul }}
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        {{ article.deskripsi }}
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
                        {{ article.judul }}
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        {{ article.deskripsi }}
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
                        {{ article.judul }}
                    </h3>
                    <p class="text-xs sm:text-sm text-red-700 mb-2">{{ article.waktu_publikasi }}</p>
                    <p class="text-xs sm:text-sm text-gray-700 mb-4">
                        {{ article.deskripsi }}
                    </p>
                    <router-link :to="'/suara-konsumen/detail/4'">
                        <button class="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm">Baca
                            Selengkapnya</button>
                    </router-link>
                </article>
            </div>
        </section>


        <section class="container mx-auto px-4 py-3">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Left Article (smaller) -->
                <div class="lg:col-span-1">
                    <article class="p-4">
                        <img src="@/assets/bahlil.jpeg" alt="Left Article"
                            class="w-full h-48 object-cover rounded-md mb-4" />
                        <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                            {{ article.judul }}
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-xs sm:text-sm text-gray-700 mb-4">{{ article.deskripsi }}</p>
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
                            {{ article.judul }}
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-sm text-gray-700 mb-4">{{ article.deskripsi }}</p>
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
                            {{ article.judul }}
                        </h3>
                        <p class="text-xs sm:text-sm text-red-700 mt-1">{{ article.waktu_publikasi }}</p>
                        <p class="text-xs sm:text-sm text-gray-700 mb-4">{{ article.deskripsi }}</p>
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
                judul: 'ofjijweggggggggggeeeeeeeeeeeeeeeefwfweffeff',
                waktu_publikasi: '27 Agustus 2024',
                paragraf1: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem minima doloribus recusandae enim nesciunt dolores reiciendis molestiae. Quae, molestias impedit, optio voluptas perferendis fugit blanditiis, id esse molestiae deserunt velit cumque. Praesentium illo provident harum facere perferendis eos reiciendis voluptate voluptatem ut? Quasi quisquam quo quibusdam cum temporibus quam numquam facere sequi aperiam delectus accusamus harum exercitationem, iste, dolorem vel error nesciunt rem deserunt! Soluta, quidem aperiam. Provident labore at sint omnis! Dolore ipsam ducimus molestias cupiditate, omnis illum, sapiente dolores perferendis esse tenetur dolorem vero voluptatum quibusdam, corrupti sint quidem dicta laborum ratione? Natus, odio quae? Placeat neque, qui deleniti tempore est praesentium esse quibusdam facilis similique quae perspiciatis nam veritatis sit ducimus molestias adipisci quam blanditiis voluptates aut beatae distinctio accusantium. Temporibus, hic impedit beatae aperiam perferendis similique nobis dolore illum repudiandae, ipsum ad eius explicabo, voluptatem voluptate exercitationem blanditiis id reiciendis? Voluptatibus officiis sed quaerat possimus. Dolores eveniet quaerat maiores sed natus! Itaque distinctio adipisci natus accusamus laboriosam dolore iure? Omnis iure saepe et eligendi. Aut eum rem quia explicabo minus expedita vel illum nobis fugit quod accusamus a itaque minima iste delectus, mollitia perspiciatis? Tenetur quisquam odio et natus omnis sequi quibusdam, maxime fugit quidem voluptates?',
                deskripsi: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus dolorum a quis doloribus harum fuga accusamus placeat, maiores dolor rerum unde necessitatibus voluptatem voluptas atque. Fugiat, culpa cumque. Harum, esse.',
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
