<template>
    <div>
        <NavbarAdmin />
        <div class="bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-8 transition-all"
            :class="isSidebarOpen ? 'pl-72' : 'ml-0'">
            <div class="text-center mb-12">
                <div class="flex justify-center items-center space-x-3">
                    <img src="@/assets/iconlpkni.png" alt="LPKNI Icon" class="mt-2 w-9 h-12" />
                    <h1 class="text-4xl font-extrabold text-gray-800">Activity Anggota LPKNI</h1>
                </div>
                <p class="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto mt-2">
                    Lembaga Perlindungan Konsumen Indonesia
                </p>
            </div>
            <div class="overflow-x-auto ">
                <table class="min-w-full table-auto">
                    <thead class="bg-gray-900 font-medium text-white ">
                        <tr class="bg-black">
                            <th class="px-4 py-2 text-left text-lg">No</th>
                            <th class="px-4 py-2 text-left text-lg">Judul Kegiatan</th>
                            <th class="px-4 py-2 text-left text-lg">Deskripsi</th>
                            <th class="px-4 py-2 text-left text-lg">Foto Kegiatan</th>
                            <th class="px-4 py-2 text-left text-lg">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(activity, index) in activities" :key="index" class="border-b">
                            <td class="px-4 py-2 text-sm text-black">{{ index + 1 }}</td>
                            <td class="px-4 py-2 text-sm text-black">{{ activity.judul }}</td>
                            <td class="px-4 py-2 text-sm text-black">{{ activity.deskripsi }}</td>
                            <td class="px-4 py-2 text-sm">
                                <div v-if="activity.files.length > 0" class="flex space-x-2">
                                    <img v-for="(file, idx) in activity.files" :key="idx" :src="file" alt="file preview"
                                        class="w-16 h-16 object-cover rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
                                        @click="openLightbox(idx)" />
                                </div>
                            </td>
                            <td class="px-4 py-2 text-sm text-gray">
                                <div v-for="(keterangan, idx) in activity.keterangan" :key="idx" class="mb-2">
                                    <span class="text-gray-600 text-sm">{{ keterangan }}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- No Activities Message -->
            <div v-if="activities.length === 0" class="text-center text-gray-600 mt-6">
                <p>Belum ada kegiatan yang di-upload. Silakan tunggu hingga ada data yang masuk.</p>
            </div>
        </div>
        <!-- Lightbox -->
        <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUrls" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>
<script>
import NavbarAdmin from '@/components/NavbarAdmin.vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import Swal from "sweetalert2";
import api from "@/service/lpkni";

export default {
    components: {
        NavbarAdmin,
        VueEasyLightbox
    },
    data() {
        return {
            activities: [],
            lightboxVisible: false,
            lightboxIndex: 0,
            imageUrls: [],
        };
    },
    mounted() {
        this.fetchActivities();
    },
    computed: {
        isSidebarOpen() {
            return this.$store.state.storeSidebar.isSidebarOpen;
        }
    },
    methods: {

        async fetchActivities() {
            try {
                const response = await api.getActivities();
                this.activities = response.data;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tidak Ada Kegiatan',
                    text: 'Tunggu Hingga Ada Data Yang Masuk',
                });
            }
        },

        openLightbox(index) {
            this.lightboxVisible = true;
            this.lightboxIndex = index;
            this.imageUrls = this.activities[this.lightboxIndex].files;
        }
    }
};
</script>

<style scoped>
.table-auto {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
}

th {
    background-color: gray;
}

tr:hover {
    background-color: gray;
}

td,
th {
    padding: 12px 16px;
    font-size: 14px;
}
</style>