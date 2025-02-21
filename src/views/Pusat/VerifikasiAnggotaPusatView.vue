<template>
  <div class="flex bg-white">
    <!-- Navbar -->
    <NavbarPusat />

    <!-- Main Content -->
    <div class="flex-1 min-h-screen bg-white pt-16 px-6 md:px-12 lg:px-20 ml-50">
      <div class="flex flex-col items-center mt-4 border  border-b-2">
        <div class="bg-white w-full max-w-7xl p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-[#03a980] text-left mb-4">Data Pendaftaran Anggota</h2>

          <div v-if="pendaftaranData.length > 0" class="overflow-x-auto">
            <table
              class="w-full table-auto border-collapse text-sm border items-center justify-center text-center border-gray-300 rounded-lg shadow-md">
              <thead class="bg-[#028a66] text-white">
                <tr>
                  <th class="px-6 py-4 border border-b-2">Nama</th>
                  <th class="px-6 py-4 border border-b-2">NIK</th>
                  <th class="px-6 py-4 border border-b-2">Tipe Anggota</th>
                  <th class="px-6 py-4 border border-b-2">Provinsi</th>
                  <th class="px-6 py-4 border border-b-2">Kota/Kabupaten</th>
                  <th class="px-6 py-4 border border-b-2">Instansi</th>
                  <th class="px-6 py-4 border border-b-2">Jabatan</th>
                  <th class="px-6 py-4 border border-b-2">Status</th>
                  <th class="px-6 py-4 border border-b-2">Foto 3x4</th>
                  <th class="px-6 py-4 border border-b-2">Foto KTP</th>
                  <th class="px-6 py-4 border border-b-2 items-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pendaftaran, index) in pendaftaranData" :key="index" class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 border ">{{ pendaftaran.nama }}</td>
                  <td class="px-6 py-4 border ">{{ pendaftaran.nik }}</td>
                  <td class="px-6 py-4 border ">{{ pendaftaran.anggotaType }}</td>
                  <td class="px-6 py-4 border ">{{ pendaftaran.provinsi }}</td>
                  <td class="px-6 py-4 border ">{{ pendaftaran.kotaKabupaten }}</td>
                  <td class="px-6 py-4 border ">{{ pendaftaran.instansi }}</td>
                  <td class="px-6 py-4 border ">{{ pendaftaran.jabatan }}</td>
                  <td class="px-6 py-4 border  font-semibold" :class="getStatusColor(pendaftaran.status)">
                    {{ pendaftaran.status }}
                  </td>
                  <td class="px-6 py-4 border">
                    <img :src="pendaftaran.foto3x4Url" alt="Foto 3x4" class="w-200 h-200 border border-gray-300 " />
                  </td>
                  <td class="px-6 py-4 border">
                    <img :src="pendaftaran.fotoKtpUrl" alt="Foto KTP" class="w-200 h-200 border border-gray-300 " />
                  </td>
                  <td class="px-6 py-4 flex space-x-2 justify-center items-center">
                    <button @click="approvePendaftaran(pendaftaran)"
                      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Setujui</button>
                    <button @click="rejectPendaftaran(pendaftaran)"
                      class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Tolak</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="text-center text-gray-500">Tidak ada data pendaftaran anggota.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPusat from '@/components/NavbarPusat.vue';

export default {
  components: {
    NavbarPusat
  },
  data() {
    return {
      pendaftaranData: [
        {
          nama: "John Doe",
          nik: "1234567890123456",
          provinsi: "Jawa Timur",
          kotaKabupaten: "Kota Malang",
          instansi: "LPKNI Malang",
          anggotaType: "Provinsi",
          jabatan: "Anggota Direktorat",
          status: "Diproses",
          foto3x4Url: "https://scontent.fsub8-2.fna.fbcdn.net/v/t39.30808-6/288575763_1626042551102019_8601646054353330201_n.png?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PWvKkNBrxTEQ7kNvgEigSUm&_nc_oc=AdgP78XtPmHXWTFiWp33_bp5N6CDO_oUJzgGosCclVPAFNF4bnzZ5KGr8HmYk3SwXO4&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=AL08aAmwj8qBmsrhX-Uospo&oh=00_AYB8aNzaHF75p9hVWDBnJQaoVNxa5WOw9-zAhzT-s3hb2w&oe=67B9697C",
          fotoKtpUrl: "https://scontent.fsub8-2.fna.fbcdn.net/v/t39.30808-6/288575763_1626042551102019_8601646054353330201_n.png?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PWvKkNBrxTEQ7kNvgEigSUm&_nc_oc=AdgP78XtPmHXWTFiWp33_bp5N6CDO_oUJzgGosCclVPAFNF4bnzZ5KGr8HmYk3SwXO4&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=AL08aAmwj8qBmsrhX-Uospo&oh=00_AYB8aNzaHF75p9hVWDBnJQaoVNxa5WOw9-zAhzT-s3hb2w&oe=67B9697C"
        },
        {
          nama: "Jane Smith",
          nik: "6543210987654321",
          provinsi: "NTB",
          kotaKabupaten: "Mataram",
          instansi: "LPKNI Lombok",
          anggotaType: "KotaKabupaten",
          jabatan: "Anggota Sekretariat",
          status: "Disetujui",
          foto3x4Url: "https://scontent.fsub8-2.fna.fbcdn.net/v/t39.30808-6/288575763_1626042551102019_8601646054353330201_n.png?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PWvKkNBrxTEQ7kNvgEigSUm&_nc_oc=AdgP78XtPmHXWTFiWp33_bp5N6CDO_oUJzgGosCclVPAFNF4bnzZ5KGr8HmYk3SwXO4&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=AL08aAmwj8qBmsrhX-Uospo&oh=00_AYB8aNzaHF75p9hVWDBnJQaoVNxa5WOw9-zAhzT-s3hb2w&oe=67B9697C",
          fotoKtpUrl: "https://scontent.fsub8-2.fna.fbcdn.net/v/t39.30808-6/288575763_1626042551102019_8601646054353330201_n.png?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PWvKkNBrxTEQ7kNvgEigSUm&_nc_oc=AdgP78XtPmHXWTFiWp33_bp5N6CDO_oUJzgGosCclVPAFNF4bnzZ5KGr8HmYk3SwXO4&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=AL08aAmwj8qBmsrhX-Uospo&oh=00_AYB8aNzaHF75p9hVWDBnJQaoVNxa5WOw9-zAhzT-s3hb2w&oe=67B9697C"
        },
      ]
    };
  },
  methods: {
    approvePendaftaran(pendaftaran) {
      alert(`Pendaftaran ${pendaftaran.nama} telah disetujui.`);
    },
    rejectPendaftaran(pendaftaran) {
      alert(`Pendaftaran ${pendaftaran.nama} telah ditolak.`);
    },
    getStatusColor(status) {
      switch (status) {
        case "Diproses":
          return "text-yellow-500";
        case "Disetujui":
          return "text-green-500";
        case "Ditolak":
          return "text-red-500";
        default:
          return "text-gray-500";
      }
    }
  }
};
</script>

<style scoped>
/* Responsif untuk mobile */
@media (max-width: 768px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th,
  td {
    padding: 8px;
    font-size: 12px;
  }

  img {
    width: 48px;
    height: 48px;
  }

  button {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>