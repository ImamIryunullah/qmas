<template>
    <div class="w-full h-full bg-white">
        <!-- Modal Tambah/Edit Berita -->
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
                <!-- Close Button -->
                <button @click="closeModal" class="absolute top-2 right-2 text-gray-500">✖</button>

                <!-- Title -->
                <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Edit Berita' : 'Tambah Berita' }}</h2>

                <div class="flex flex-col gap-4">
                    <!-- Title Input -->
                    <input class="w-full h-[42px] bg-gray-100 border px-4 rounded" v-model="modalNews.judul"
                        placeholder="Judul" required />

                    <!-- Content Input -->
                    <textarea class="w-full h-[100px] bg-gray-100 border px-4 rounded" v-model="modalNews.konten"
                        placeholder="Deskripsi" required></textarea>

                    <!-- Date Picker -->
                    <input type="date" class="w-full h-[42px] bg-gray-100 border px-4 rounded"
                        v-model="modalNews.tanggal.split('T')[0]" required />

                    <!-- Categories Section -->
                    <label class="block mb-2">Pilih Kategori</label>
                    <div class="space-y-1">
                        <div v-for="category in categories" :key="category.id" class="flex items-center">
                            <input type="checkbox" :value="category.id" v-model="modalNews.kategori" :id="category.id"
                                class="h-4 w-4 border-gray-300 rounded" />
                            <label :for="category.id" class="ml-2 text-sm text-gray-700">{{ category.nama }}</label>
                        </div>
                    </div>

                    <!-- Media Upload Section -->
                    <label class="block mb-2">Upload Media</label>
                    <input type="file" class="w-full h-[42px] bg-gray-100 border px-4 rounded"
                        @change="handleFileChange" />

                    <!-- Display uploaded media with options to edit or delete -->
                    <div class="mt-4 space-y-2">
                        <div v-for="(media, index) in modalNews.media" :key="media.id"
                            class="flex items-center justify-between">
                            <span>{{ media.filepath.split('/').pop() }}</span>
                            <button @click="editMedia(index)" class="text-blue-500">Edit</button>
                            <button @click="removeMedia(index)" class="text-red-500">🗑️</button>
                        </div>
                    </div>

                    <!-- Edit Media Description or File (for the selected media) -->
                    <div v-if="selectedMediaIndex !== null" class="mt-4">
                        <label class="block mb-2">Edit Deskripsi Media</label>
                        <input type="text" v-model="modalNews.selectedMediaDescription"
                            class="w-full h-[42px] bg-gray-100 border px-4 rounded" placeholder="Deskripsi media" />

                        <label class="block mb-2 mt-2">Ubah File Media</label>
                        <input type="file" class="w-full h-[42px] bg-gray-100 border px-4 rounded"
                            @change="handleFileChangeForEdit" />

                        <button @click="saveMediaEdit"
                            class="mt-2 w-full h-[42px] bg-[#03a980] rounded-md text-white font-bold">Simpan Edit
                            Media</button>
                    </div>
                </div>

                <!-- Action Buttons (Cancel and Save) -->
                <div class="flex justify-between items-center mt-6">
                    <button @click="closeModal"
                        class="w-[48%] h-[54px] bg-gray-300 rounded-md text-black font-bold">CANCEL</button>
                    <button @click="saveNews" class="w-[48%] h-[54px] bg-[#03a980] rounded-md text-white font-bold">
                        {{ isEdit ? 'UPDATE' : 'TAMBAH' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from "@/service/lpkni.js";

export default {
    data() {
        return {
            categories: [
                { id: 1, nama: 'Pertahanan' },
                { id: 2, nama: 'Keamanan' }
            ],
            isEdit: false,
            modalNews: {
                id: null,
                judul: "",
                konten: "",
                tanggal: "",
                kategori: [],
                media: []
            },
            selectedMediaIndex: null, // Index of selected media to edit
        };
    },
    methods: {
        closeModal() {
            this.$router.push({ name: "NewsList" }); // Redirect back to the list of news
        },
        saveNews() {
            if (this.isEdit) {
                // Update Berita
                console.log('Update Berita:', this.modalNews);
                this.updateNewsAPI(this.modalNews);
            } else {
                // Add New Berita
                console.log('Tambah Berita:', this.modalNews);
                this.addNewsAPI(this.modalNews);
            }
            this.closeModal();
        },
        updateNewsAPI(news) {
            console.log('API: Update Berita', news);
        },
        addNewsAPI(news) {
            console.log('API: Add Berita', news);
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const filePath = `/uploads/berita/${file.name}`;
                this.modalNews.media.push({ id: Date.now(), filepath: filePath, file, deskripsi: '' });
            }
        },
        removeMedia(index) {
            this.modalNews.media.splice(index, 1);
        },
        editMedia(index) {
            const media = this.modalNews.media[index];
            this.selectedMediaIndex = index;
            this.modalNews.selectedMediaDescription = media.deskripsi || '';
            this.modalNews.selectedMediaFile = media.file;
        },
        saveMediaEdit() {
            const media = this.modalNews.media[this.selectedMediaIndex];
            media.deskripsi = this.modalNews.selectedMediaDescription || media.deskripsi;
            if (this.modalNews.selectedMediaFile) {
                media.file = this.modalNews.selectedMediaFile;
                media.filepath = `/uploads/berita/${media.file.name}`;
            }
            this.selectedMediaIndex = null;
            this.modalNews.selectedMediaDescription = '';
            this.modalNews.selectedMediaFile = null;
        }
    }
};
</script>