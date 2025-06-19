<template>
  <NavbarPortalView />
  <div class="w-full h-full bg-white">


    <!-- Content Section -->
    <div class="flex flex-col items-center p-10  flex-grow pt-10 mt-10">
      <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md border border-b-2">
        <h2 class="text-2xl font-semibold text-[#03a980] text-center mb-6">Tentang Kami</h2>

        <p class="text-lg text-[#4f4f4f] leading-relaxed">
          <strong>LPKNI Malang</strong> adalah sebuah lembaga pendidikan dan pelatihan yang berkomitmen untuk
          meningkatkan kualitas sumber daya manusia (SDM) Indonesia melalui berbagai program sertifikasi dan pelatihan.
          Kami berfokus pada pengembangan kompetensi di berbagai bidang, termasuk bidang teknik, manajemen, kesehatan,
          dan banyak lagi, untuk membantu masyarakat Indonesia mempersiapkan diri dalam dunia kerja yang kompetitif.
        </p>
        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-4">
          Berpusat di Malang, LPKNI berkolaborasi dengan berbagai institusi pendidikan, perusahaan, dan pemerintah untuk
          memberikan pelatihan yang relevan dengan kebutuhan pasar kerja. Kami menyediakan program pelatihan yang
          dirancang dengan kurikulum yang up-to-date, instruktur profesional, serta fasilitas yang memadai untuk
          menunjang keberhasilan peserta dalam meraih sertifikasi kompetensi.
        </p>

        <h3 class="text-xl font-semibold text-[#028a66] mt-6">Visi Kami</h3>
        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-2">
          Menjadi lembaga pelatihan dan sertifikasi kompetensi yang terpercaya dan berkontribusi besar dalam menciptakan
          tenaga kerja yang berkualitas, siap bersaing di tingkat lokal maupun global.
        </p>

        <h3 class="text-xl font-semibold text-[#028a66] mt-6">Misi Kami</h3>
        <ul class="text-lg text-[#4f4f4f] leading-relaxed mt-2 space-y-2">
          <li>1. Menyediakan pelatihan yang relevan dengan kebutuhan industri dan perkembangan teknologi.</li>
          <li>2. Mengembangkan kemampuan individu melalui program sertifikasi kompetensi yang terstandarisasi.</li>
          <li>3. Meningkatkan akses dan kesempatan bagi masyarakat untuk mengembangkan keterampilan dan memperoleh
            sertifikasi yang diakui.</li>
          <li>4. Berkontribusi dalam pembangunan SDM Indonesia yang unggul dan berdaya saing.</li>
        </ul>

        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-4">
          Kami percaya bahwa pendidikan dan pelatihan adalah kunci untuk memajukan bangsa. Oleh karena itu, kami
          senantiasa berusaha memberikan pelayanan terbaik untuk setiap peserta pelatihan, serta menciptakan dampak
          positif bagi masyarakat dan dunia industri.
        </p>

        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-4">
          <strong>LPKNI Malang</strong> berkomitmen untuk terus mendukung transformasi pendidikan di Indonesia dengan
          menyediakan pelatihan dan sertifikasi yang sesuai dengan standar internasional. Dengan visi dan misi yang
          jelas, kami siap membimbing setiap individu untuk meraih masa depan yang lebih cerah dan sukses.
        </p>

        <!-- Alasan Membuat Portal Berita -->
        <h3 class="text-xl font-semibold text-[#028a66] mt-6">Mengapa Membuat Portal Berita?</h3>
        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-2">
          Dalam era digital ini, informasi dan berita berkembang dengan sangat cepat, baik itu di bidang pendidikan,
          ekonomi, teknologi, maupun berbagai sektor lainnya. Kami merasa penting untuk menyediakan sebuah platform yang
          dapat menghubungkan masyarakat dengan berita terbaru, yang tidak hanya informatif, tetapi juga relevan dengan
          kehidupan sehari-hari mereka.
        </p>

        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-4">
          Portal Berita LPKNI Malang hadir untuk memberikan kemudahan dalam mengakses informasi yang dapat mendukung
          pendidikan, peningkatan keterampilan, dan perkembangan karir masyarakat. Dengan menyediakan berita terkini
          tentang dunia pendidikan, pelatihan, serta industri terkait, kami berkomitmen untuk menyebarluaskan informasi
          yang bermanfaat dan dapat membantu masyarakat dalam membuat keputusan yang lebih baik.
        </p>

        <p class="text-lg text-[#4f4f4f] leading-relaxed mt-4">
          Kami juga percaya bahwa dengan adanya portal berita ini, masyarakat bisa lebih mudah mengakses informasi
          penting yang berkaitan dengan perkembangan dunia pendidikan, termasuk pelatihan dan sertifikasi yang relevan
          dengan kebutuhan industri. Dengan demikian, portal berita ini tidak hanya berfungsi sebagai saluran informasi,
          tetapi juga sebagai jembatan untuk meningkatkan kualitas SDM Indonesia.
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import NavbarPortalView from '@/components/NavbarSuaraKonsumen.vue';

export default {
  components: {
    NavbarPortalView,

  }
};
</script>

<!-- <style>
/* Custom Styles for About Page */
.bg-white {
  background-color: white;
}
.text-[#03a980] {
  color: #03a980;
}
.text-[#028a66] {
  color: #028a66;
}
.text-[#4f4f4f] {
  color: #4f4f4f;
}
.leading-relaxed {
  line-height: 1.75;
}
</style> -->
