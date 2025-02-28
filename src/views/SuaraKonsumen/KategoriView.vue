<template>
    <div class="bg-gray-200">
        <!-- Header Section -->
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

        <div v-if="suaraKonsumenList.length > 1">
            <section class="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md mb-5 mt-2">
                <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    <!-- Banner Image -->
                    <div class="max-w-full md:w-1/2">
                        <!-- Menampilkan Gambar yang Responsif dengan batas ukuran -->
                        <img :src="getfullpathImage(suaraKonsumenList[0].media[0].imageUrl)" alt="Trending Image"
                            class="w-full h-auto object-cover rounded-lg max-h-96" />
                    </div>

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

                            <p class="text-xs sm:text-sm text-red-700 mt-1">{{
                                suaraKonsumenList[0].tanggal.split('T')[0] }}
                            </p>

                            <!-- Description -->
                            <p class="text-gray-700 text-sm mt-2 underline">
                                {{ suaraKonsumenList[0].wilayah.nama_wilayah }}, {{
                                    suaraKonsumenList[0].daerah.nama_daerah }}
                            </p>
                            <p class="text-gray-700 text-sm mt-2">
                                {{ truncateDescription(suaraKonsumenList[0].deskripsi1, 200) }}
                            </p>

                            <div class="mt-4">
                                <!-- Read More Button -->
                                <router-link :to="`/suara-konsumen/detail/${suaraKonsumenList[0].id}`">
                                    <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca
                                        Selengkapnya</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Main Content Section -->
            <div class="container mx-auto px-4 py-6 md:px-8 sm:px-8">
                <div class="bg-black text-white p-4 rounded-lg mb-8">
                    <h3 class="font-semibold text-sm sm:text-sm md:text-2sm lg:text-lg text-center">
                        Suara Konsumen - LPKNI - {{ getWilayahName }}
                    </h3>
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

                            <h3 class="text-lg font-semibold text-gray-900">{{ singkatJudul(data.judul, 50) }}</h3>
                            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
                            <p class="text-gray-700 text-sm mt-2 underline">
                                {{ suaraKonsumenList[0].wilayah.nama_wilayah }}, {{
                                    suaraKonsumenList[0].daerah.nama_daerah }}
                            </p>
                            <p class="text-sm text-gray-700 mt-2">
                                {{ truncateDescription(data.deskripsi1, 150) }}
                            </p>
                            <router-link :to="`/suara-konsumen/detail/${data.id}`">
                                <button class="text-red-600 hover:text-red-800 font-semibold mt-4">Baca
                                    Selengkapnya</button>
                            </router-link>
                        </div>
                    </div>
                </section>


                <section class="mb-8">
                    <h2 class="text-xl font-semibold mb-4 ml-4">Semua Berita - {{ getWilayahName }}</h2>
                    <div class="w-full mx-auto mt-2 border-t-2 border-gray-500"></div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <article v-for="data in currentPageArticles" :key="data.id" class="p-3">
                            <img :src="getfullpathImage(data.media[0].imageUrl)" alt="Latest Story"
                                class="w-full h-48 object-cover mb-4" />
                            <h5 class="text-sm sm:text-base font-semibold">{{ singkatJudul(data.judul, 50) }}</h5>
                            <p class="text-xs sm:text-sm text-red-700 mt-1">{{ data.tanggal.split('T')[0] }}</p>
                            <p class="text-gray-700 text-sm mt-2 underline">
                                {{ suaraKonsumenList[0].wilayah.nama_wilayah }}, {{
                                    suaraKonsumenList[0].daerah.nama_daerah }}
                            </p>
                            <p class="text-xs sm:text-sm text-gray-700">{{ truncateDescription(data.deskripsi1, 170) }}
                            </p>
                            <router-link :to="`/suara-konsumen/detail/${data.id}`">
                                <button
                                    class="text-red-600 hover:text-red-800 font-semibold mt-4 text-xs sm:text-sm">Baca
                                    Selengkapnya</button>
                            </router-link>
                        </article>
                    </div>

                    <!-- Pagination Controls -->
                    <div class="flex justify-center mt-6">
                        <!-- Page Number Buttons -->
                        <div class="flex space-x-2">
                            <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{
                                'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800': true,
                                'bg-red-800': currentPage === page
                            }" class="text-white font-semibold">
                                {{ page }}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>




        <div v-else>
            <div class="container mx-auto px-4 py-16 md:px-16 sm:px-8">
                <!-- Full-screen alert section with icon and text -->
                <div class="flex items-center justify-center w-full h-full bg-red-600 rounded-lg shadow-xl">
                    <!-- Icon and Text Section -->
                    <div class="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                        <!-- Info Icon -->
                        <i class="fas fa-info-circle text-4xl sm:text-5xl md:text-6xl text-white"></i>
                        <!-- Text Message -->
                        <h3
                            class="text-2xl sm:text-3xl md:text-4xl font-semibold text-white py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-12">
                            BERTIA BELUM ADA DALAM PROVINSI INI
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterNews />
</template>

<script>
import FooterNews from '@/components/FooterSuaraKonsumen.vue';
import NavbarNews from '@/components/NavbarSuaraKonsumen.vue';
import lpkni from '@/service/lpkni';
import adImage from '@/assets/aqua.jpeg';
export default {
    name: "KategoriView",
    components: {
        FooterNews,
        NavbarNews
    },
    data() {
        return {
            showPopup: true,
            adImage,
            currentPage: 1, // Start at the first page
            articlesPerPage: 10, // Number of articles per page
            // The selected region
            selectedWilayah: this.$route.params.wilayah_id, // The list of regions to choose from
            suaraKonsumenListCoba: [
                // Example data (your actual data will be fetched from the API)
                {
                    id: 9,
                    judul: '',
                    deskripsi1: '',
                    tanggal: '',
                    wilayah: { nama_wilayah: '' },
                    media: [{ imageUrl: '', deskripsi: '' }],
                    daerah: { nama_daerah: '' }
                }
            ],
            suaraKonsumenList: [
                // Example data (your actual data will be fetched from the API)
                {
                    id: 9,
                    judul: '',
                    deskripsi1: '',
                    tanggal: '',
                    wilayah: { nama_wilayah: '' },
                    media: [{ imageUrl: '', deskripsi: '' }],
                    daerah: { nama_daerah: '' }
                }
            ]
        };
    },
    mounted() {
        this.getAllSuaraKonsumen()
        setTimeout(() => {
            this.showPopup = false;
        }, 3000);
    },



    computed: {
        idWilayah() {
            return this.$route.params.wilayahid
        },
        getWilayahName() {
            const selectedWilayah = this.suaraKonsumenList.length > 0
                ? this.suaraKonsumenList[0].wilayah.nama_wilayah
                : 'Berita Belum Ada';
            return selectedWilayah;
        },
        totalPages() {
            return Math.ceil(this.suaraKonsumenList.length / this.articlesPerPage);
        },
        currentPageArticles() {
            const start = (this.currentPage - 1) * this.articlesPerPage;
            const end = this.currentPage * this.articlesPerPage;
            return this.suaraKonsumenList.slice(start, end);
        }
    },
    methods: {
        async getAllSuaraKonsumen() {
            await lpkni.getAllSuaraKonsumenPublishBywilayahID(this.idWilayah).then((res) => {
                this.suaraKonsumenList = res.data
                console.log(this.suaraKonsumenList)
            }).catch(() => {

            })
        },
        closePopup() {
            this.showPopup = false;
        },
        getfullpathImage(image) {
            return lpkni.getfullpathImage(image)
        },
        singkatJudul(text, length) {
            return text.length > length ? text.slice(0, length) + '...' : text;
        },
        truncateDescription(text, length) {
            return text.length > length ? text.slice(0, length) + '...' : text;
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return; // Prevent invalid pages
            this.currentPage = page;
        }
    }
};
</script>

<style scoped>
/* Ensure images fit properly within the container */
article img {
    object-fit: cover;
}
</style>
