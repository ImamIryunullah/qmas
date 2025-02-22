<template>
    <div class="border border-black pt-5 pb-5 pl-5 pr-5 rounded-md shadow-xl shadow-current bg-gray-100">
        <swiper :pagination="{
            type: 'fraction',
        }" :navigation="true" :modules="modules" class="mySwiper">
            <swiper-slide v-for="headline in headlines" :key="headline.id">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center font-Jet text-gray-800 bg-gray-100">
                    <div class="space-y-6">
                        <div class="text-start text-lg font-bold pb-2">
                            <h1>Headline</h1>
                        </div>
                        <div class="text-start text-2xl lg:text-4xl font-semibold">
                            <h1>{{ headline.judul }}</h1>
                        </div>
                        <div class="text-start text-base lg:text-lg">
                            <h1>{{ truncateContent(headline.konten, 200) }}</h1>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </div>
                            <div class="text-base">
                                <h1>{{ headline.tanggal.split('T')[0] }}</h1>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <button class="text-blue-500 hover:text-blue-800" @click="goToDetail(headline)">
                                <h1>Baca Selengkapnya</h1>
                            </button>
                        </div>
                    </div>
                    <div>
                        <img class="w-full lg:w-[10rem] h-[10rem] rounded-2xl object-cover"
                            :src="`http://192.168.1.50:3000${headline.media[0].filepath}`" alt="">
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import api from "@/service/lpkni";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Pagination, Navigation } from "swiper/modules";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            modules: [Pagination, Navigation],
            headlines: [],
            olahraga: [],
            politik: [],
            otomotif: [],
            nasional: [],
            internasional: [],
        };
    },
    methods: {
        truncateContent(content, maxLength) {
            if (content.length > maxLength) {
                return content.substring(0, maxLength) + '...';
            }
            return content;
        },
        goToDetail(headline) {
            this.$router.push(`/berita/${headline.id}`);
        },

        getAllBeritaDatas() {
            api.GetAllBerita().then((res) => {
                this.headlines = res.data
            }).catch((error) => {
                console.error(error);
            })


        },
        //     getOtomotifDatas() {
        //         getApi.getBeritaOtomotif((data) => {
        //             this.otomotif = data;
        //             this.updateHeadlines();
        //         });
        //     },
        //     getNasionalDatas() {
        //         getApi.getBeritaNasional((data) => {
        //             this.nasional = data;
        //             this.updateHeadlines();
        //         });
        //     },
        //     getInternasionalDatas() {
        //         getApi.getBeritaInternasional((data) => {
        //             this.internasional = data;
        //             this.updateHeadlines();
        //         });
        //     },
        //     updateHeadlines() {
        //         const combinedData = [
        //             ...this.olahraga,
        //             ...this.politik,
        //             ...this.otomotif,
        //             ...this.nasional,
        //             ...this.internasional,
        //         ];
        //         this.headlines = combinedData
        //             .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        //             .slice(0, 5);
        //     },
    },
    mounted() {
        this.getAllBeritaDatas();
    },
};
</script>
