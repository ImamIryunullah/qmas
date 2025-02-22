<template>

  <div class="w-full min-h-screen bg-gray-100">
    <!-- Navbar -->
    <NavbarAnggota />
    <!-- Content Section -->
    <div class="flex flex-col items-center p-6 flex-grow mt-6 ml-20">
      <div class="bg-white w-full max-w-2xl border border-b-2 shadow-md p-8 rounded-lg animate-fadeInUp">
        <h2
          class="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500 text-center mb-6 animate-fadeInUp">
          Profile
        </h2>

        <div class="space-y-6">
          <!-- Foto Profil -->
          <div class="flex justify-center">
            <div class="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
              <img :src="getFullpathImage(dataUser.imageUsers[0].imageUrl)" alt="Profile Picture"
                class="w-full h-full object-cover rounded-full shadow-lg border-4 border-white ring-2 ring-gray-300 hover:scale-105 transition-transform duration-200" />
            </div>
          </div>

          <!-- Nama Lengkap -->
          <div>
            <p class="text-sm text-gray-600">Nama Lengkap:</p>
            <p class="text-lg font-semibold">{{ dataUser.nama_lengkap }}</p>
          </div>

          <!-- Tanggal Lahir -->
          <div>
            <p class="text-sm text-gray-600">Tanggal Lahir:</p>
            <p class="text-lg font-semibold">{{ dataUser.tanggalLahir.split('T')[0] }}</p>
          </div>

          <!-- NIK -->
          <div>
            <p class="text-sm text-gray-600">Nomor Induk Kependudukan:</p>
            <p class="text-lg font-semibold">{{ dataUser.nik }}</p>
          </div>

          <!-- Wilayah -->
          <div>
            <p class="text-sm text-gray-600">Wilayah:</p>
            <p class="text-lg font-semibold">
              {{
                dataUser.wilayah.nama_wilayah !== ''
                  ? dataUser.wilayah.nama_wilayah
                  : "Data tidak tersedia"
              }}
            </p>
          </div>

          <!-- Daerah -->
          <div>
            <p class="text-sm text-gray-600">Kota / Kab:</p>
            <p class="text-lg font-semibold">
              {{
                dataUser.daerah.nama_daerah !== ''
                  ? dataUser.daerah.nama_daerah
                  : "Anggota Wilayah"
              }}
            </p>
          </div>

          <!-- Alamat -->
          <div>
            <p class="text-sm text-gray-600">Alamat:</p>
            <p class="text-lg font-semibold">{{ dataUser.alamat }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <p class="text-sm text-gray-600">Phone Number:</p>
            <p class="text-lg font-semibold">{{ user.no_hp }}</p>
          </div>

          <!-- Data Jabatan Struktural -->
          <div>
            <p class="text-sm text-gray-600">Jabatan Struktural:</p>
            <p class="text-lg font-semibold">{{ dataUser.jabatanStruktural.nama }}</p>
          </div>

          <!-- Status Perkawinan -->
          <div>
            <p class="text-sm text-gray-600">Status Perkawinan:</p>
            <p class="text-lg font-semibold">{{ dataUser.statusPerkawinan }}</p>
          </div>

          <!-- Agama -->
          <div>
            <p class="text-sm text-gray-600">Agama:</p>
            <p class="text-lg font-semibold">{{ dataUser.agama }}</p>
          </div>

          <!-- Status -->
          <div>
            <p class="text-lg font-semibold">Status:</p>
            <p class="text-lg font-semibold">
              <span
                :class="{ 'text-yellow-500 font-semibold': dataUser.status === 'PENDING', 'font-semibold text-green-500': dataUser.status === 'Dietujui' }">{{
                  dataUser.status }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import NavbarAnggota from "@/components/NavbarAnggota.vue";
import api from "@/service/lpkni";

export default {
  components: {
    NavbarAnggota,
  },

  data() {
    return {
      user: {},
      dataUser: {
        id_data_anggota: null,
        userId: null,
        daerah: {
          id_daerah: null,
          nama_daerah: "",
          kode_daerah: "",
        },
        wilayahId: null,
        wilayah: {
          id_wilayah: null,
          nama_wilayah: "",
          kode_wilayah: "",
        },
        jabatanStrukturalId: null,
        jabatanStruktural: {
          id: null,
          nama: "",
          maksimumAnggota: null,
        },
        nama_lengkap: "",
        alamat: "",
        tanggalLahir: "",
        nik: "",
        tempatLahir: "",
        pekerjaan: "",
        statusPerkawinan: "",
        agama: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        imageUsers: [
          {
            id: null,
            dataUserId: null,
            imageUrl: "",
            keterangan: "",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: null,
            dataUserId: null,
            imageUrl: "",
            keterangan: "",
            createdAt: "",
            updatedAt: "",
          },
        ],
      },
      currentIndex: 0,
      showLightbox: false,
      isModalOpen: false,
    };
  },
  computed: {
    getUserLpkni() {
      return this.$store.state.storeLpkni.userLpkni.data_anggota.id_data_anggota;
    },
  },
  mounted() {
    if (this.getUserLpkni === 0) {
      this.$router.push('/anggota/data-diri')
      return
    }
    this.getProfile();
  },

  methods: {
    openLightbox() {
      this.showLightbox = true;
    },
    // Close the lightbox
    closeLightbox() {
      this.showLightbox = false;
    },
    getProfile() {
      api
        .getUserData()
        .then((response) => {
          this.user = response.data.user;
          this.dataUser = response.data.data_anggota;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openEditModal() {
      this.isModalOpen = true;
    },

    closeEditModal() {
      this.isModalOpen = false;
    },

    saveProfile() {
      alert("Profile updated successfully!");
      this.closeEditModal();
    },

    getFullpathImage(img) {
      return api.getfullpathImage(img);
    },
  },
};
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

@media (max-width: 768px) {
  .kelass {
    width: 90% !important;
  }

  .w-full {
    width: 100%;
  }
}
</style>
