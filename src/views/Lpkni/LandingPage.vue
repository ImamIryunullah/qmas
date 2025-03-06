<template>
    <div class="mb-10">
        <NavbarLandingPage />
    </div>
    <div class="bg-red-100 min-h-screen">
        <section class="flex flex-col md:flex-row items-center justify-center pt-14 bg-red-700 text-white">
            <div class="md:w-1/2 text-center md:text-left px-[1.5rem] sm:px-4 pt-5 sm:text-base">
                <div class="flex items-center justify-start text-start">
                    <h1 id="typing" class="text-4xl md:text-5xl font-bold mb-3 mt-2"></h1>
                </div>
                <p class="mb-6 text-sm sm:text-lg text-justify">LPKNI merupakan salah satu lembaga atau institusi yang
                    mempunyai
                    tugas
                    pokok dan
                    fungsinya adalah melindungi hak setiap warga negara baik perseorangan (konsumen) maupun badan yang
                    harus mendapatkan perlakuan yang layak selaku konsumen khususnya dan masyarakat sebagai warga negara
                    Indonesia pada umumnya.</p>
                <div class="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center md:justify-start mb-5">
                    <a href="/auth/register-anggota"
                        class="w-full md:w-auto text-center bg-white text-red-600 px-4 py-2 rounded-lg font-bold sm:font-semibold hover:bg-gray-100 transition duration-300">
                        Daftar LPKNI
                    </a>
                    <a href="/auth/swi/register"
                        class="w-full md:w-auto text-center bg-white text-red-600 px-4 py-2 rounded-lg font-bold sm:font-semibold hover:bg-gray-100 transition duration-300">
                        Daftar SWI
                    </a>
                    <a href="https://www.youtube.com/@channellpkni" target="_blank"
                        class="w-full md:w-auto text-center bg-white text-red-600 px-4 py-2 rounded-lg font-bold sm:font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center">
                        <i class="fa fa-youtube-play text-3xl"></i>
                    </a>
                </div>

            </div>
            <div class="md:w-[30%] w-3/4 mt-5 md:mt-0">
                <img src="@/assets/animasi1.png" loading="lazy" alt="LPKNI"
                    class="rounded-lg w-full mx-auto responsive-image" />
            </div>
        </section>
        <section id="about" class="py-14 sm:py-16 px-6 bg-red-50 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
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
            <h2
                class="text-3xl md:text-4xl font-semibold text-center mb-4 text-red-700 flex items-center justify-center">
                <!-- Icon before the title -->
                <i class="fas fa-newspaper text-red-700 mr-3"></i>
                <span class="text-base md:text-xl">PORTAL SUARA KONSUMEN</span>
            </h2>


            <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-justify">
                LPKNI berkomitmen untuk memberikan wadah bagi masyarakat Indonesia dalam menyampaikan suara dan
                keluhan terkait produk atau layanan yang diterima. Kami berusaha memastikan bahwa setiap suara konsumen
                didengar dengan adil, dan sebagai hasil dari upaya ini, kami terus meningkatkan kualitas layanan dan
                perlindungan
                konsumen di seluruh Indonesia. Kami percaya bahwa transparansi dan komunikasi yang baik adalah kunci
                untuk
                menciptakan hubungan yang saling menguntungkan antara produsen dan konsumen.
            </p>

            <!-- Button to navigate to 'suara-konsumen' page -->
            <div class="flex justify-center mb-8">
                <a href="/suara-konsumen"
                    class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
                    Kunjungi Suara Konsumen
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
                <div v-for="suaraKonsumen in SuaraKonsumeList.slice(0, 4)" :key="suaraKonsumen.id"
                    @click="routingTo(suaraKonsumen.id, suaraKonsumen.judul)" class="flex justify-end">
                    <!-- Image Box -->
                    <div
                        class="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 ease-in-out hover:scale-105 w-full">
                        <img :src="getfullPathImage(suaraKonsumen.media[0].imageUrl)" alt="" loading="lazy"
                            class="rounded-md w-full transition duration-300 ease-in-out hover:opacity-80 max-h-52 object-cover">
                        <h3 class="text-xl font-semibold mt-4 hover:text-red-600 text-left cursor-pointer">
                            {{ suaraKonsumen.judul }}
                        </h3>
                        <p class="text-gray-600 mt-2">
                            {{ getTruncatedDescription(suaraKonsumen.deskripsi1, 300) }}
                        </p>
                    </div>
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

                <p class="text-lg sm:text-xl text-gray-600 mb-8">Punya Pertanyaan Atau Ingin Tahu Lebih Lanjut? Kontak
                    Kami Sekarang!
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
                    <a href="https://www.youtube.com/@channellpkni" target="_blank"
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
        <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="text-white text-lg">Sedang Memuat...</div>
            <div class="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16 ml-2"></div>
        </div>
    </div>
</template>

<script>
import FooterLandingPage from '@/components/FooterLandingPage.vue';
import NavbarLandingPage from '@/components/NavbarLandingPage.vue';
import lpkni from '@/service/lpkni';
// Move the type function outside of the component
function type(element, text, i) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => type(element, text, i + 1), 100);
    }
}

export default {
    components: {
        NavbarLandingPage,
        FooterLandingPage,
    },
    name: 'LandingPage',
    data() {
        return {
            expanded: false,
            SuaraKonsumeList: [],
            isLoading: false
        };
    },
    mounted() {
        this.typeWriterEffect();
        this.addFadeInAnimation();
        this.getAllBerita()
    },
    methods: {
        routingTo(id, judul) {
            this.$router.push(`/suara-konsumen/detail/${id}/${judul}`)
        },
        getTruncatedDescription(text, karakter) {
            if (text.length > karakter) {
                return text.slice(0, karakter) + '...'; // Menambahkan elipsis (...) jika lebih dari 200 karakter
            }
            return text;
        },
        getAllBerita() {
            this.isLoading = true;
            lpkni.getAllSuaraKonsumenPublish().then((res) => {
                this.SuaraKonsumeList = res.data
                console.log(this.SuaraKonsumeList)
            }).catch(() => {

            }).finally(() => {
                this.isLoading = false;
            })
        },
        getfullPathImage(img) {
            return lpkni.getfullpathImage(img)
        },

        typeWriterEffect() {
            const text = "Lembaga Perlindungan Konsumen Nasional Indonesia";
            const element = document.getElementById("typing"); // Pastikan elemen ada

            if (element) {
                type(element, text, 0);
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

/* Styles for screens below 1024px */
@media (max-width: 1024px) {

    /* Reduce font size for better fit on tablet screens */
    header .text-white {
        font-size: 0.875rem;
    }

    header i {
        font-size: 1.25rem;
    }

    /* Adjust padding and size of navbar container */
    header .container {
        padding: 0 20px;
    }

    /* Reduce size of navbar items and buttons */
    .block.md\:hidden button {
        font-size: 1.25rem;
    }

    header .md\:hidden .space-x-6 {
        flex-direction: column;
    }

    .md\:hidden .w-64 {
        width: 100%;
    }

    /* Adjust section titles and paragraph spacing */
    h2 {
        font-size: 2rem;
    }

    .text-lg {
        font-size: 1rem;
    }

    /* Adjust padding for the content area */
    .container.mx-auto {
        padding: 0 20px;
    }

    /* Adjust image width */
    .w-full {
        width: 100%;
    }
}

/* Styles for screens below 820px */
@media (max-width: 820px) {
    header .text-white {
        font-size: 0.75rem;
        /* Even smaller font for mobile */
    }

    header i {
        font-size: 1rem;
    }

    header .container {
        padding: 0 10px;
        /* Reduced padding */
    }

    /* Adjust layout for smaller screens */
    .block.md\:hidden button {
        font-size: 1.125rem;
    }

    /* Adjust spacing and width for sections */
    section {
        padding: 12px 6px;
        /* Smaller padding */
    }

    h2 {
        font-size: 1.5rem;
    }

    .text-lg {
        font-size: 0.9rem;
    }

    /* Adjust grid layout for items */
    .grid-cols-1 {
        grid-template-columns: 1fr;
    }

    .grid-cols-2 {
        grid-template-columns: 1fr;
    }

    /* Adjust image widths */
    .w-full {
        width: 100%;
    }

    /* Reduce button sizes */
    .bg-red-600 {
        padding: 10px 12px;
    }
}

/* Styles for screens below 768px */
@media (max-width: 768px) {

    /* Adjust font sizes even smaller */
    header .text-white {
        font-size: 0.625rem;
        /* Smaller font for small screens */
    }

    header i {
        font-size: 0.875rem;
    }

    /* Adjust container padding */
    header .container {
        padding: 0 5px;
        /* Further reduce padding */
    }

    /* Adjust buttons and icons */
    .block.md\:hidden button {
        font-size: 1rem;
    }

    section {
        padding: 10px 4px;
    }

    h2 {
        font-size: 1.25rem;
    }

    .text-lg {
        font-size: 0.8rem;
    }

    /* Adjust grid layout */
    .grid-cols-1 {
        grid-template-columns: 1fr;
    }

    .grid-cols-2 {
        grid-template-columns: 1fr;
    }

    /* Adjust width of images */
    .w-full {
        width: 100%;
        height: auto;
    }

    .bg-red-600 {
        padding: 8px 10px;
    }
}
</style>