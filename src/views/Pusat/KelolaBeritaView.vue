<template>
  <div class="flex bg-green-100">
    <!-- Navbar -->
    <NavbarPusat />

    <!-- Filter Waktu -->
    <div class="flex justify-center space-x-4 mt-6">
      <button v-for="filter in filters" :key="filter" @click="setActiveFilter(filter)"
        :class="['px-4 py-2 rounded-full text-sm font-semibold transition', activeFilter === filter ? 'bg-[#03a980] text-white' : 'bg-gray-200 text-gray-700']">
        {{ filter }}
      </button>
    </div>

    <!-- Modal Tambah/Edit Berita -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500">✖</button>
        <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Edit Berita' : 'Tambah Berita' }}</h2>
        <div class="flex flex-col gap-4">
          <input class="w-full h-[42px] bg-gray-100 border px-4 rounded" v-model="modalNews.title"
            placeholder="Judul" />
          <textarea class="w-full h-[100px] bg-gray-100 border px-4 rounded" v-model="modalNews.description"
            placeholder="Deskripsi"></textarea>
          <input type="date" class="w-full h-[42px] bg-gray-100 border px-4 rounded" v-model="modalNews.date" />
          <select v-model="modalNews.category" class="w-full h-[42px] bg-gray-100 border px-4 rounded">
            <option disabled value="">Pilih Kategori</option>
            <option>Politik</option>
            <option>Olahraga</option>
            <option>Teknologi</option>
            <option>Nasional</option>
            <option>Internasional</option>
          </select>
          <input type="file" class="w-full h-[42px] bg-gray-100 border px-4 rounded" @change="handleFileChange" />
        </div>
        <div class="flex justify-between items-center mt-6">
          <button @click="closeModal"
            class="w-[48%] h-[54px] bg-gray-300 rounded-md text-black font-bold">CANCEL</button>
          <button @click="saveNews" class="w-[48%] h-[54px] bg-[#03a980] rounded-md text-white font-bold">
            {{ isEdit ? 'UPDATE' : 'TAMBAH' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Table Daftar Berita -->
    <div class="min-h-screen w-screen p-8 mt-5">
      <div class="bg-green-200 p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Daftar Berita</h2>
          <button @click="openAddModal" class="bg-[#03a980] text-white px-4 py-2 rounded-md hover:bg-[#028970]">
            ➕ Tambah Berita
          </button>
        </div>
        <table class="w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4 text-left">ID</th>
              <th class="py-2 px-4 text-left">Judul</th>
              <th class="py-2 px-4 text-left">Deskripsi</th>
              <th class="py-2 px-4 text-left">Tanggal Publikasi</th>
              <th class="py-2 px-4 text-left">Kategori</th>
              <th class="py-2 px-4 text-left">Foto</th>
              <th class="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="Berita in paginatedNews" :key="Berita.id" class="border-b">
              <td class="py-2 px-4">{{ Berita.id }}</td>
              <td class="py-2 px-4">{{ Berita.title }}</td>
              <td class="py-2 px-4">{{ Berita.description }}</td>
              <td class="py-2 px-4">{{ Berita.date }}</td>
              <td class="py-2 px-4 font-semibold text-[#03a980]">{{ Berita.category }}</td>
              <td class="py-2 px-4">
                <img :src="Berita.gambar[0]?.url" alt="Foto Berita" class="w-16 h-16 rounded-md object-cover" />
              </td>
              <td class="py-2 px-4 flex gap-2">
                <button @click="openEditModal(Berita)" class="text-blue-500">✏️</button>
                <button @click="deleteNews(Berita.id)" class="text-red-500">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div v-if="!showModal" class="flex justify-center mt-6 space-x-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-[#03a980] text-white rounded-md hover:bg-[#028a66] disabled:opacity-50">Previous</button>
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-4 py-2 border rounded-md"
            :class="currentPage === page ? 'bg-[#03a980] text-white' : 'bg-white text-black hover:bg-gray-200'">{{ page
            }}</button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-[#03a980] text-white rounded-md hover:bg-[#028a66] disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPusat from '@/components/NavbarPusat.vue';
import ApiService from '@/service/lpkni.js';


export default {
  components: {
    NavbarPusat,
  },
  data() {
    return {
      newsList: [
        {
          id: 1,
          title: "Presiden Resmikan Proyek Infrastruktur Baru",
          description: "Presiden meresmikan proyek infrastruktur di Jakarta...",
          date: "2025-02-10",
          category: "Politik",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 2,
          title: "Timnas Indonesia Lolos ke Final Piala Asia",
          description: "Tim nasional Indonesia berhasil mengalahkan Jepang...",
          date: "2025-02-09",
          category: "Olahraga",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 3,
          title: "Teknologi AI Terbaru Diumumkan oleh Google",
          description: "Google memperkenalkan kecerdasan buatan terbaru...",
          date: "2025-02-08",
          category: "Teknologi",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 4,
          title: "Banjir Besar Melanda Jakarta, Ribuan Warga Mengungsi",
          description: "Hujan deras menyebabkan banjir di berbagai wilayah...",
          date: "2025-02-07",
          category: "Nasional",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 5,
          title: "Konflik Rusia-Ukraina Memanas Kembali",
          description: "Ketegangan antara Rusia dan Ukraina kembali meningkat...",
          date: "2025-02-06",
          category: "Internasional",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 6,
          title: "Startup Indonesia Raih Pendanaan Seri B",
          description: "Startup teknologi Indonesia mendapatkan investasi besar...",
          date: "2025-02-05",
          category: "Teknologi",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 7,
          title: "Pemerintah Keluarkan Regulasi Baru Terkait Pajak Digital",
          description: "Regulasi baru diterapkan untuk mengatur transaksi digital...",
          date: "2025-02-04",
          category: "Politik",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 8,
          title: "Messi Memenangkan Ballon d'Or Lagi",
          description: "Lionel Messi kembali memenangkan penghargaan Ballon d'Or...",
          date: "2025-02-03",
          category: "Olahraga",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 9,
          title: "NASA Temukan Planet Baru yang Berpotensi Dihuni",
          description: "Ilmuwan NASA mengumumkan penemuan planet baru...",
          date: "2025-02-02",
          category: "Teknologi",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        },
        {
          id: 10,
          title: "Perubahan Iklim Mengancam Kehidupan Laut",
          description: "Studi terbaru menunjukkan dampak besar perubahan iklim...",
          date: "2025-02-01",
          category: "Internasional",
          gambar: [{ url: "https://via.placeholder.com/150" }]
        }
      ],
      currentPage: 1,
      itemsPerPage: 20,
      showModal: false,
      isEdit: false,
      modalNews: {
        id: null,
        title: '',
        description: '',
        date: '',
        category: '',
        gambar: null,
      },
      selectedImage: null,
      errorMessage: "",
    };
  },
  // mounted() {
  //   this.getNews();
  // },
  computed: {
    totalPages() {
      return Math.ceil(this.newsList.length / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.newsList.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    openAddModal() {
      this.isEdit = false;
      this.modalNews = { id: null, title: '', description: '', date: '', category: '', image: null };
      this.showModal = true;
    },
    openEditModal(news) {
      this.isEdit = true;
      this.modalNews = { ...news };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveNews() {
      const formData = new FormData();
      formData.append('judul', this.modalNews.title);
      formData.append('description', this.modalNews.description);
      formData.append('date', this.modalNews.date);
      formData.append('category', this.modalNews.category);
      if (this.selectedImage) {
        formData.append('gambar', this.selectedImage);
      }

      console.log('Form Data:', formData);

      const action = this.isEdit ? ApiService.updateBerita(this.modalNews.id, formData) : ApiService.createBerita(formData);

      action
        .then(() => {
          this.getNews();
          this.closeModal();
        })
        .catch(error => {
          this.errorMessage = "Failed to save news, please try again.";
          console.error(error);
        });
    },
    deleteNews(id) {
      ApiService.deleteBerita(id)
        .then(() => {
          this.getNews();
        })
        .catch(error => {
          this.errorMessage = "Failed to delete news, please try again.";
          console.error(error);
        });
    },
    handleFileChange(event) {
      this.selectedImage = event.target.files[0];
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
};
</script>