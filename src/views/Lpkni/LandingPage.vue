<template>
    <div class="mb-10">
        <NavbarLandingPage />
    </div>
    <div class="bg-red-100 min-h-screen">

        <section class="flex flex-col md:flex-row items-center justify-center pt-14 bg-red-700 text-white">
            <!-- Left Section (Text Content) -->
            <div class="md:w-1/2 text-center md:text-left px-4 pt-5 sm:text-base">
                <!-- Typing Effect for Heading -->
                <div class="flex items-center justify-center">
                    <h1 id="typing" class="text-4xl md:text-5xl font-bold mb-4"></h1>
                </div>

                <p class="mb-6 text-lg text-justify">LPKNI merupakan salah satu lembaga atau institusi yang mempunyai
                    tugas
                    pokok dan
                    fungsinya adalah melindungi hak setiap warga negara baik perseorangan (konsumen) maupun badan yang
                    harus mendapatkan perlakuan yang layak selaku konsumen khususnya dan masyarakat sebagai warga negara
                    Indonesia pada umumnya.</p>
                <div class="flex space-x-4">
                    <a href="/auth/login"
                        class="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        LPKNI
                    </a>
                    <a href="/auth/swi/login"
                        class="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 ">
                        Standarisasi Warung Indonesia
                    </a>
                </div>

            </div>

            <!-- Right Section (Image) -->
            <div class="md:w-[30%] w-3/4 mt-5 md:mt-0">
                <img src="@/assets/animasi1.png" alt="LPKNI" class="rounded-lg w-full mx-auto responsive-image" />
            </div>
        </section>
        <section id="about" class="py-16 px-6 bg-red-50 text-center">
            <h2 class="text-4xl font-bold text-gray-800 mb-6">
                Keuntungan Menjadi Bagian Dari Kami
            </h2>

            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                Bergabung dengan kami memberikan banyak manfaat, mulai dari jaminan kebersihan hingga promosi eksklusif
                untuk warung Anda. Berikut adalah beberapa keuntungan utama:
            </p>

            <!-- GRID UNTUK KEUNTUNGAN, PROSES, DAN MANFAAT -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">

                <!-- KEUNTUNGAN PEMILIK WARUNG -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold text-red-600 mb-4">Keuntungan bagi Pemilik Warung</h3>
                    <ul class="list-disc text-gray-600 pl-5 space-y-2">
                        <li>Sertifikat Warung / Restoran setelah uji kelayakan LPKNI.</li>
                        <li>Banner daftar menu dan harga dari pihak sponsor.</li>
                        <li>Promosi di majalah suara konsumen & website SWI.</li>
                    </ul>
                </div>

                <!-- PROSES STANDARISASI -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold text-red-600 mb-4">Proses Standarisasi Warung</h3>
                    <ul class="list-none text-gray-600 pl-5 space-y-2">
                        <li>✅ Pendaftaran Offline dan Online</li>
                        <li>✅ Verifikasi Data dan Approved</li>
                        <li>✅ Sosialisasi Penggunaan Bahan Makanan</li>
                        <li>✅ Pemeriksaan</li>
                        <li>✅ Sertifikasi SWI</li>
                    </ul>
                </div>

                <!-- MANFAAT STANDARISASI -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold text-red-600 mb-4">Manfaat Standarisasi</h3>
                    <ul class="list-disc text-gray-600 pl-5 space-y-2">
                        <li><strong>Pengusaha Warung:</strong> Standar kebersihan dan manajemen harga transparan.</li>
                        <li><strong>Konsumen:</strong> Jaminan makanan aman, transparansi harga.</li>
                        <li><strong>Pemerintah:</strong> Peningkatan pendapatan pajak & kemudahan pengawasan.</li>
                    </ul>
                </div>
            </div>

            <!-- EFEK "BACA SELENGKAPNYA" UNTUK INFO TAMBAHAN -->
            <transition name="fade">
                <div v-if="expanded" class="max-w-6xl mx-auto mt-8 text-left">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-700">Keuntungan Tambahan</h3>
                            <p class="text-gray-600 mt-2">Warung Anda akan mendapatkan eksposur lebih luas melalui
                                berbagai platform digital.</p>
                        </div>

                        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-700">Keamanan & Higienis</h3>
                            <p class="text-gray-600 mt-2">Proses sertifikasi memastikan makanan yang disajikan bersih
                                dan aman.</p>
                        </div>

                        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold text-gray-700">Bantuan Legal</h3>
                            <p class="text-gray-600 mt-2">Pemilik warung yang mengalami kendala bisa mendapatkan bantuan
                                hukum dari LPKNI.</p>
                        </div>

                    </div>
                </div>
            </transition>

            <!-- TOMBOL "BACA SELENGKAPNYA" -->
            <div class="flex justify-center mt-8">
                <button @click="toggleExpand"
                    class="bg-red-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105">
                    <i class="fas fa-info-circle mr-2"></i> {{ expanded ? "Tutup" : "Baca Selengkapnya" }}
                </button>
            </div>
        </section>
        <!-- Track Record Section -->
        <section id="track-record" class="py-20 px-6 bg-white">
            <h2 class="text-3xl font-semibold text-center mb-2 text-red-700 flex items-center justify-center">
                <!-- Icon before the title -->
                <i class="fas fa-arrow-right text-red-700 mr-3"></i>
                Perjalanan LPKNI
            </h2>

            <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-justify">
                Selama bertahun-tahun, LPKNI telah aktif bekerja untuk melindungi hak-hak konsumen, menyelesaikan
                perselisihan,
                dan meningkatkan kesadaran konsumen. Berikut ini adalah beberapa kegiatan dan pencapaian penting kami.
            </p>
            <!-- Image Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Image 1 -->
                <div
                    class="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 ease-in-out hover:scale-105">
                    <img src="@/assets/kegiatan1.png" alt="LPKNI Event 1"
                        class="rounded-lg w-full object-cover transition duration-300 ease-in-out hover:opacity-80 max-h-80">
                    <h3 class="text-xl font-semibold mt-4 hover:text-red-600">Presentasi Standarisasi Warung Indonesia
                    </h3>
                    <p class="text-gray-600 mt-2 text-justify">
                        Presentasi Standarisasi Warung Indonesia bersama Kementrian Pariwisata dan Ekonomi Kreatif di
                        Jakarta 12 September 2023 yang dilakukan oleh LPKNI merupakan bentuk Follow up atas hasil Rakor
                        I yang diadakan di Kab. Pasuruan Jawa Timur.
                    </p>
                </div>
                <!-- Image 1 -->
                <div
                    class="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 ease-in-out hover:scale-105">
                    <img src="@/assets/kegiatan1.png" alt="LPKNI Event 1"
                        class="rounded-lg w-full object-cover transition duration-300 ease-in-out hover:opacity-80 max-h-80">
                    <h3 class="text-xl font-semibold mt-4 hover:text-red-600">Presentasi Standarisasi Warung Indonesia
                    </h3>
                    <p class="text-gray-600 mt-2 text-justify">
                        Presentasi Standarisasi Warung Indonesia bersama Kementrian Pariwisata dan Ekonomi Kreatif di
                        Jakarta 12 September 2023 yang dilakukan oleh LPKNI merupakan bentuk Follow up atas hasil Rakor
                        I yang diadakan di Kab. Pasuruan Jawa Timur.
                    </p>
                </div>
                <!-- Image 2 -->
                <div
                    class="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 ease-in-out hover:scale-105">
                    <img src="@/assets/kegiatan2.jpeg" alt="LPKNI Event 2"
                        class="rounded-lg w-full object-cover transition duration-300 ease-in-out hover:opacity-80 max-h-80">
                    <h3 class="text-xl font-semibold mt-4 hover:text-red-600">Pelaksanaan Operasi Pasar</h3>
                    <p class="text-gray-600 mt-2 text-justify">
                        Pelaksanaan Operasi Pasar Minyak Goreng Murah bermerk Letizia Sabtu, 9 September 2023 di pasar
                        Bunulrejo Kota Malang berjalan dengan lancar dan antusias warga yang sangat luar biasa. Terima
                        kasih atas dukungan serta support rekan" LPKNI dan Dinas terkait.
                    </p>
                </div>
                <!-- Image 3 -->
                <div
                    class="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 ease-in-out hover:scale-105">
                    <img src="@/assets/kegiatan3.png" alt="LPKNI Event 3"
                        class="rounded-lg w-full object-cover transition duration-300 ease-in-out hover:opacity-80 max-h-80">
                    <h3 class="text-xl font-semibold mt-4 hover:text-red-600">Operasi Pasar Minyak Goreng</h3>
                    <p class="text-gray-600 mt-2 text-justify">
                        Presiden LPKNI Nanang Nilson, S.H.,M.H dalam waktu dekat akan menggalakkan operasi pasar Minyak
                        Goreng Murah merk Letizia harga Rp. 15.000/liter dimulai dari Pasar Bunul Pada tgl. 9 Sept 2023.
                    </p>
                </div>
            </div>
        </section>
        <section id="services" class="py-20 px-6 bg-red-50">
            <h2 class="text-3xl font-semibold text-center mb-10 animate__animated animate__fadeIn">Layanan Kami</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <!-- Service Card 1 -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp">
                    <i class="fas fa-shield-alt text-red-600 text-3xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Perlindungan Konsumen</h3>
                    <p class="text-gray-600 text-justify">
                        Kami melindungi hak konsumen dengan memastikan praktik bisnis yang adil dan memberikan dukungan
                        dalam menyelesaikan perselisihan secara efektif.
                    </p>
                </div>

                <!-- Service Card 2 - Bantuan Hukum -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp">
                    <i class="fas fa-gavel text-red-600 text-3xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Bantuan Hukum</h3>
                    <p class="text-gray-600 text-justify">
                        Menawarkan nasihat hukum dan representasi bagi konsumen yang menghadapi masalah penipuan, iklan
                        yang menyesatkan, dan transaksi yang tidak adil.
                    </p>
                </div>

                <!-- Service Card 3 - Menyuarakan Suara Konsumen -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp">
                    <i class="fas fa-bullhorn text-red-600 text-3xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Menyuarakan Suara Konsumen</h3>
                    <p class="text-gray-600 text-justify">
                        Kami menyediakan platform tempat konsumen dapat mengungkapkan kekhawatiran, berbagi pengalaman,
                        dan mencari solusi atas perlakuan tidak adil di pasar.
                    </p>
                </div>

                <!-- Service Card 4 - Promosi Warung -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp">
                    <i class="fas fa-store text-red-600 text-3xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Promosi Warung</h3>
                    <p class="text-gray-600 text-justify">
                        Standarisasi Warung Indonesia membantu pemilik warung mendapatkan promosi melalui Portal Suara
                        Konsumen,
                        dan website resmi untuk meningkatkan visibilitas usaha.
                    </p>
                </div>

                <!-- Service Card 5 - Keamanan dan Higienis -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp">
                    <i class="fas fa-utensils text-red-600 text-3xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Keamanan dan Higienis</h3>
                    <p class="text-gray-600 text-justify">
                        Setiap warung yang terstandarisasi harus memenuhi syarat kebersihan dan keamanan pangan,
                        sehingga pelanggan merasa aman mengonsumsi makanan di tempat tersebut.
                    </p>
                </div>

                <!-- Service Card 6 - Bantuan Legal untuk Pemilik Warung -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp">
                    <i class="fas fa-handshake text-red-600 text-3xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Bantuan Legal untuk Pemilik Warung</h3>
                    <p class="text-gray-600">
                        Jika pemilik warung mengalami kendala hukum atau perselisihan bisnis, LPKNI siap memberikan
                        bimbingan dan bantuan hukum untuk melindungi kepentingan usaha mereka.
                    </p>
                </div>
            </div>
        </section>
        <!-- Contact Section -->
        <section id="contact" class="py-20 px-4 md:px-8 bg-white">
            <div class="container mx-auto max-w-screen-md text-center">
                <!-- Heading -->
                <h2 class="text-3xl sm:text-4xl font-bold text-red-600 mb-4 flex items-center justify-center">
                    <!-- Icon before the title -->
                    <i class="fas fa-phone-alt text-red-600 mr-3"></i>
                    Hubungi Kami
                </h2>

                <p class="text-lg sm:text-xl text-gray-600 mb-8">Have questions or want to learn more? Contact us now!
                </p>

                <!-- Contact Buttons -->
                <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                    <!-- Contact via Phone -->
                    <a href="https://wa.me/6281333015767" target="_blank"
                        class="bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                        <i class="fa fa-phone text-black mr-2 text-2xl"> </i>0813 3301 5767 & 0341-437354
                    </a>

                    <!-- Contact via Email -->
                    <a href="mailto:pt.lpkni@gmail.com"
                        class="bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                        📧 pt.lpkni@gmail.com
                    </a>
                </div>

                <!-- Social Media Links -->
                <div class="mt-10 flex justify-center gap-6">
                    <a href="https://www.facebook.com/lpkni.pusat/" target="_blank"
                        class="text-red-600 hover:text-red-800 transition-transform duration-300 text-2xl">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/lpkni.jaktim/" target="_blank"
                        class="text-red-600 hover:text-red-800 transition-transform duration-300 text-2xl">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.youtube.com/user/ConsumersIntl" target="_blank"
                        class="text-red-600 hover:text-red-800 transition-transform duration-300 text-2xl">
                        <i class="fab fa-youtube"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/consumers-international" target="_blank"
                        class="text-red-600 hover:text-red-800 transition-transform duration-300 text-2xl">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <FooterLandingPage />

    </div>
</template>

<script>
import FooterLandingPage from '@/components/FooterLandingPage.vue';
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';

// Move the type function outside of the component
function type(element, text, i) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => type(element, text, i), 100);
    } else {
        setTimeout(() => {
            element.innerHTML = "";
            i = 0;
            type(element, text, i);
        }, 2000);
    }
}

export default {
    components: {
        NavbarLandingPage,
        FooterLandingPage
    },
    name: 'LandingPage',
    data() {
        return {

            expanded: false,
            shortText: `
                Lembaga Pengaduan Konsumen Korban Perbankan, Finance, Koperasi, Pinjol dan Perusahaan atau Lembaga yang curang. Jika anda mengalami masalah hukum terkait, silakan mengunjungi kantor LPKNI dan bertemu dengan Bapak Nanang Nilson, atau bisa juga WhatsApp di nomor 0813-3301-5767.
                <br><br>
                Lembaga Perlindungan Konsumen Nasional Indonesia (LPKNI) Kota Malang siap menjalankan tugasnya setelah dilantik dalam acara Pelantikan dan Penyerahan SK Jabatan yang berlangsung di Kantor LPKNI Ruko Pelita, Jalan Puntodewo Kav. 2, Kota Malang.
            `,
            filters: ["About", "Services", "Contact"]
        };
    },
    mounted() {
        this.typeWriterEffect();
        this.addFadeInAnimation();
    },
    methods: {
        // Method for Typing Effect
        typeWriterEffect() {
            const text = "Lembaga Perlindungan Konsumen Nasional Indonesia";
            let i = 0;
            const element = document.getElementById("typing"); // Target the correct element (about-text)

            // Ensure the element exists before running the typing effect
            if (element) {
                type(element, text, i); // Call the type function outside the mounted hook
            }
        },
        toggleExpand() {
            this.expanded = !this.expanded;
        },

        // Method to add fade-in effect on scroll
        addFadeInAnimation() {
            window.addEventListener('scroll', () => {
                const aboutText = document.getElementById('about-text');
                const trackRecord = document.getElementById('track-record');

                // Check if elements exist before checking their position
                if (aboutText && trackRecord) {
                    const rectAboutText = aboutText.getBoundingClientRect();
                    const rectTrackRecord = trackRecord.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    // Fade-in effect for About text
                    if (rectAboutText.top < viewportHeight - 100) {
                        aboutText.classList.add('animate__fadeIn'); // Add animation class
                    }

                    // Fade-in effect for Track Record section
                    if (rectTrackRecord.top < viewportHeight - 100) {
                        trackRecord.classList.add('animate__fadeIn'); // Add animation class
                    }
                }
            });
        },

        setActiveFilter(filter) {
            console.log(filter);
        }
    }
};
</script>



<style scoped>
/* Tailwind CSS animation for fade-in effect */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fadeIn {
    animation: fadeIn 2s ease-out forwards;
}

.animate__fadeIn {
    animation: fadeIn 1s ease-in-out;
}

/* For Hover Effect */
.hover\:scale-105:hover {
    transform: scale(1.05);
}

/* For the text hover effect */
.hover\:text-red-600:hover {
    color: #ef4444;
}

/* Optional: For Smooth Scroll */
html {
    scroll-behavior: smooth;
}

@media (max-width: 100px) {
    .responsive-image {
        width: 80%;
    }
}
</style>