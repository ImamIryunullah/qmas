<template>
    <footer class="bg-gradient-to-r from-red-500 to-red-800 text-white py-8">
        <div class="container mx-auto px-6 md:px-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
                <!-- Quick Links -->
                <div>
                    <h3 class="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul>
                        <li><a href="#about" class="hover:text-gray-300">About</a></li>
                        <li><a href="#services" class="hover:text-gray-300">Services</a></li>
                        <li><a href="#contact" class="hover:text-gray-300">Contact</a></li>
                    </ul>
                </div>

                <!-- Follow Us -->
                <div>
                    <h3 class="font-semibold text-lg mb-4">Follow Us</h3>
                    <div class="flex space-x-4">
                        <a href="https://www.facebook.com/lpkni.pusat/" target="_blank" class="hover:text-gray-300">
                            <i class="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="https://www.instagram.com/lpkni_official/" target="_blank" class="hover:text-gray-300">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="https://www.youtube.com/@channellpkni" target="_blank" class="hover:text-gray-300">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/consumers-international/?trk=hb_tab_compy_id_1709164"
                            target="_blank" class="hover:text-gray-300">
                            <i class="fab fa-linkedin-in text-xl"></i>
                        </a>
                    </div>
                </div>

                <!-- Contact Information -->
                <div>
                    <h3 class="font-semibold text-lg mb-4">Contact</h3>
                    <p class="text-gray-300">LPKNI, Malang City, Indonesia</p>
                    <p class="text-gray-300">Malang, di Jalan Raya Wapoga No.2 Perum Nguji Permai Il </p>
                    <p class="text-gray-300">Phone: 0813 3301 5767 & 0341 - 437354</p>
                    <p class="text-gray-300">Email: pt.lpkni@gmail.com</p>
                </div>

                <!-- Join Us Section -->
                <div>
                    <h3 class="font-semibold text-lg mb-4">Jadilah Bagian dari Kami</h3>
                    <p class="text-gray-300 mb-4">
                        Bergabung dengan LPKNI dan dapatkan manfaat eksklusif dalam perlindungan dan standarisasi usaha
                        Anda!
                    </p>
                    <div class="grid grid-cols-2 gap-2 text-center">
                        <router-link to="/auth/register-anggota"
                            class="bg-white text-red-600 hover:text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                            LPKNI
                        </router-link>
                        <router-link to="/auth/swi/register"
                            class="bg-white text-red-600 hover:text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                            SWI
                        </router-link>
                    </div>
                </div>

            </div>

            <!-- Copyright Section -->
            <div class="text-sm text-gray-300 text-center mt-6">
                <p>&copy; 2025 LPKNI. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</template>
