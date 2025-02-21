<template>
    <div v-if="!detailPage"
        class="font-Jet capitalize border border-black shadow-2xl shadow-black rounded-md pb-5 pr-5 pl-5">
        <div class="flex space-x-4 items-center">
            <div class="w-1 h-10 bg-blues">
            </div>
            <div>
                <h1 class="text-2xl fonsem">berita populer</h1>
            </div>
        </div>
        <div class="block md:flex justify-between pt-6 ">
            <div v-for="(news, index ) in populer" :key="news.id">
                <button @click="goToDetail(news)">
                    <div class="max-w-[30rem] 2xl:max-w-[35rem]">
                        <div class="relative top-4 -left-2">
                            <div class="flex">
                                <div class="bg-black rounded-full text-white w-8 h-8 text-center">
                                    <h1 class="pt-1">{{ index + 1 }}</h1>
                                </div>
                            </div>
                        </div>
                        <div
                            class="hover:bg-blues hover:bg-opacity-5 hover:rounded-lg hover:px-1 border border-black rounded-xl">
                            <div class="flex space-x-6">
                                <div class="">
                                    <img class="max-w-[10rem] 2xl:max-w-[15rem] max-h-[5rem] 2xl:max-h-[10rem] rounded-xl"
                                        :src="`http://192.168.1.50:3000${news.media[0].filepath}`" alt="">
                                </div>
                                <div>
                                    <div>
                                        <h1 class="font-semibold text-start">{{ truncateContent(news.konten, 100) }}
                                        </h1>
                                    </div>
                                    <div class="flex space-x-4 pt-6">
                                        <div class="text-blue-600 font-bold">
                                            <h1>{{ news.kategori[0].nama }}</h1>
                                        </div>
                                        <div>
                                            <h1>{{ news.tanggal.split('T')[0] }}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="flex space-x-4 items-center">
            <div class="w-1 h-10 bg-blues">
            </div>
            <div>
                <h1 class="text-2xl fonsem">berita populer</h1>
            </div>
        </div>
        <div class="pt-6">
            <div v-for="(news, index ) in populer" :key="news.id">
                <button @click="goToDetail(news)">
                    <div class="max-w-[35rem]">
                        <div class="relative top-4 -left-2">
                            <div class="flex">
                                <div class="bg-black rounded-full text-white w-8 h-8 text-center">
                                    <h1 class="pt-1">{{ index + 1 }}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="hover:bg-blues hover:bg-opacity-5 hover:rounded-lg hover:px-1">
                            <div class="flex space-x-6">
                                <div class="">
                                    <img class="max-w-[10rem] max-h-[10rem] rounded-xl"
                                        :src="`http://192.168.1.50:3000${news.media[0].filepath}`" alt="">
                                </div>
                                <div>
                                    <div>
                                        <h1 class="font-semibold text-start">{{ news.konten }}</h1>
                                    </div>
                                    <div class="flex space-x-4 pt-6">
                                        <div class="text-blue-600 font-bold">
                                            <h1>{{ news.kategori[0].nama }}</h1>
                                        </div>
                                        <div>
                                            <h1>{{ news.pubDate.split('T')[0] }}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import api from '@/service/api';
export default {
    data() {
        return {
            populer: [],
            olahraga: [],
            politik: [],
            otomotif: [],
            nasional: [],
            internasional: [],
        };
    },
    computed: {
        detailPage() {
            return this.$route.name === "Detail Berita";
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
                this.populer = res.data
                this.populer = this.populer
                    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
                    .slice(0, 3);
            }).catch((error) => {
                console.error(error);
            })


        },
    },
    mounted() {
        this.getAllBeritaDatas()
    },
}
</script>
