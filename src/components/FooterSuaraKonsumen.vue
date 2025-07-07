<template>
  <footer class="bg-red-600 text-white py-8 mt-12">
    <div class="container mx-auto px-6 md:px-12">

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">

        <div>
          <h3 class="font-semibold text-lg mb-4">Link Cepat</h3>
          <ul>
            <li><a href="#contact" class="hover:text-gray-300">Terkini</a></li>
            <li><a href="#about" class="hover:text-gray-300">Nasional</a></li>
            <li><a href="#services" class="hover:text-gray-300">Internasional</a></li>
            <li><a href="#services" class="hover:text-gray-300">Ekonomi</a></li>
            <li><a href="#services" class="hover:text-gray-300">Kriminal</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Ikuti Kami</h3>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/qmas.pusat/" target="_blank" class="hover:text-gray-300"><i
                class="fab fa-facebook-f text-xl"></i></a>
            <a href="https://www.instagram.com/qmas_official/" target="_blank" class="hover:text-gray-300"><i
                class="fab fa-instagram text-xl"></i></a>
            <a href="https://www.youtube.com/@channelqmas" target="_blank" class="hover:text-gray-300"><i
                class="fab fa-youtube text-xl"></i></a>
            <a href="https://www.linkedin.com/company/consumers-international/?trk=hb_tab_compy_id_1709164"
              target="_blank" class="hover:text-gray-300"><i class="fab fa-linkedin-in text-xl"></i></a>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Kontak dan Alamat</h3>
          <p class="text-gray-300">qmas Kota Malang, Indonesia</p>
          <p class="text-gray-300">Malang, di Jalan Raya Wapoga No.2 Perum Nguji Permai Il </p>
          <p class="text-gray-300">Phone: 0813 3301 5767 & 0341 - 437354</p>
          <p class="text-gray-300">Email: pt.qmas@gmail.com</p>
        </div>


        <div>
          <h3 class="font-semibold text-lg mb-4">Jadilah Bagian dari Kami</h3>
          <p class="text-gray-300 mb-4">
            Bergabung dengan qmas dan dapatkan manfaat eksklusif dalam perlindungan dan standarisasi usaha
            Anda!
          </p>
          <div class="grid grid-cols-2 gap-2 text-center">
            <router-link to="/auth/register-anggota"
              class="bg-white text-red-600 hover:text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              qmas
            </router-link>
            <router-link to="/auth/swi/register"
              class="bg-white text-red-600 hover:text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              SWI
            </router-link>
          </div>
        </div>
      </div>


      <div class="text-sm text-gray-300">
        <p>&copy; 2025 qmas. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>