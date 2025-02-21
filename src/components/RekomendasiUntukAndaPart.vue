<template>
    <div class="border border-black pt-5 pb-5 pr-5 pl-5 rounded-2xl shadow-2xl">
        <div class="flex flex-wrap space-y-4 lg:space-y-0 space-x-0 lg:space-x-4 items-center font-Jet justify-between">
            <div class="flex space-x-2 items-center">
                <div class="w-1 h-10 bg-blues"></div>
                <div>
                    <h1 class="text-xl lg:text-2xl fonsem">Rekomendasi Untuk Anda</h1>
                </div>
            </div>
            <div class="w-full lg:w-auto">
                <button class="w-full">
                    <div class="border-2 border-black rounded-md flex items-center w-full">
                        <input type="text" placeholder="Cari disini..." class="px-2 h-10 w-full lg:w-[30rem]" />
                        <div class="pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            <div v-for="news in paginatedNews" :key="news.id" class="flex flex-col">
                <div class="hover:bg-blues hover:bg-opacity-5 hover:rounded-lg hover:px-1">
                    <button @click="goToDetail(news)">
                        <div>
                            <img class="w-full max-h-[15rem] rounded-xl object-cover"
                                :src="`http://192.168.1.50:3000${news.media[0].filepath}`" alt="" />
                        </div>
                        <div class="pt-4">
                            <h1 class="font-semibold text-start">{{ news.judul }}</h1>
                        </div>
                        <div class="pt-2">
                            <h1 class="font-normal text-start text-sm">{{ truncateContent(news.konten, 100) }}</h1>
                        </div>
                        <div class="flex justify-between pt-2">
                            <div v-for="kategori in news.kategori" :key="kategori.id" class="text-blue-600 font-bold">
                                <h1>{{ kategori.nama }}</h1>
                            </div>
                            <div>
                                <h1 class="text-sm">{{ news.tanggal.split('T')[0] }}</h1>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <div class="flex justify-center items-center pt-10 space-x-4 sm:space-x-8 lg:space-x-12">
                <div>
                    <button class="flex space-x-2 items-center" @click="prevPage" :disabled="currentPage === 1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </div>
                        <div class="border px-4 py-2 rounded hover:bg-gray-200">
                            Previous
                        </div>
                    </button>
                </div>
                <span>{{ currentPage }} of {{ totalPages }}</span>
                <div>
                    <button class="flex space-x-2 items-center" @click="nextPage"
                        :disabled="currentPage === totalPages">
                        <div class="border px-4 py-2 rounded hover:bg-gray-200">
                            <h1>
                                Next
                            </h1>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/service/api';

export default {
    data() {
        return {
            rekomendasi: [],
            olahraga: [],
            politik: [],
            otomotif: [],
            nasional: [],
            internasional: [],
            currentPage: 1,
            itemsPerPage: 8,
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.rekomendasi.length / this.itemsPerPage);
        },
        paginatedNews() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.rekomendasi.slice(startIndex, startIndex + this.itemsPerPage);
        },
    },

    methods: {
        truncateContent(content, maxLength) {
            if (content.length > maxLength) {
                return content.substring(0, maxLength) + '...';
            }
            return content;
        },
        goToDetail(headline) {
            const data = {
                title: headline.title,
                desc: headline.description,
                date: headline.pubDate,
                tag: headline.tag,
                Thumb: headline.thumbnail,
            };
            this.$store.commit('setDetailData', data);
            this.$router.push(`/Detail/${headline.tag}/${headline.title}`);
            setTimeout(() => {
                window.location.reload()
            }, 100);
        },
        getAllBeritaDatas() {
            api.GetAllBerita().then((res) => {
                this.rekomendasi = res.data
            }).catch((error) => {
                console.error(error);
            })


        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
    mounted() {
        this.getAllBeritaDatas()
    },
}
</script>
