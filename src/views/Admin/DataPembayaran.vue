<template>
    <div>
        <NavbarAdmin />
        <div class="bg-gray-100 w-full h-full min-h-screen pl-28 mx-auto p-8">
            <!-- Dashboard Header -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">📋 DATA PEMBAYARAN</h1>
                <button @click="exportToCSV"
                    class="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                    <i class="fas fa-file-csv mr-2"></i> Export CSV
                </button>

            </div>

            <!-- Table Section -->
            <div class="overflow-x-auto bg-white rounded-lg shadow-md">
                <!-- Filters -->
                <div class="flex justify-between items-center p-4 border-b">
                    <div class="flex space-x-4">
                        <select class="px-4 py-2 rounded-md border border-gray-300">
                            <option value="100">Show All</option>
                            <option value="100">Show 100</option>
                            <option value="50">Show 50</option>
                            <option value="25">Show 25</option>
                        </select>
                        <select class="px-4 py-2 rounded-md border border-gray-300">
                            <option value="all">Semua Data</option>
                            <option value="department1">Lunas</option>
                            <option value="department2">Belum Lunas</option>
                        </select>
                    </div>
                    <div class="flex items-center space-x-4 relative">
                        <i class="fas fa-search absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input type="text"
                            class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 w-64"
                            placeholder="Cari Anggota" />
                    </div>
                </div>

                <!-- Table -->
                <table class="min-w-full table-auto">
                    <thead class="bg-red-500 text-white">
                        <tr>
                            <th class="px-4 py-2 border">No.</th>
                            <th class="px-4 py-2 border">Nama</th>
                            <th class="px{{  }}y-2 border">Metode Pemabayaran</th>
                            <th class="px-4 py-2 border">Jumlah Pembayaran</th>
                            <th class="px-4 py-2 border">Status</th>
                            <th class="px-4 py-2 border">Waktu Pembayaran</th>
                            <th class="px-4 py-2 border">Bukti Pembayaran</th>
                            <th class="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Dynamic Data Rows -->
                        <tr v-for="(payment, index) in payments" :key="index" class="text-gray-600">
                            <td class="px-4 py-2 border">{{ index + 1 }}</td>
                            <td class="px-4 py-2 border">{{ payment.userName }}</td>
                            <td class="px-4 py-2 border">{{ payment.paymentMethod }}</td>
                            <td class="px-4 py-2 border">Rp{{ payment.amount }}</td>
                            <td class="px-4 py-2 border">
                                <span
                                    :class="{ 'text-green-500': payment.status === 'Lunas', 'text-yellow-500': payment.status === 'Belum Lunas' }">
                                    {{ payment.status }}
                                </span>
                            </td>
                            <td class="px-4 py-2 border">{{ payment.paymentDate }}</td>
                            <td class="px-4 py-2 border text-center">
                                <img v-if="payment.buktiPembayaran" :src="payment.buktiPembayaran"
                                    alt="Bukti Pembayaran"
                                    class="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-75"
                                    @click="showImage(payment.buktiPembayaran)" />
                                <span v-else class="text-gray-500">Belum Ada</span>
                            </td>

                            <!-- Modal untuk memperbesar gambar -->
                            <transition name="fade">
                                <div v-if="imagePreview"
                                    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                    <div class="bg-white p-4 rounded-lg shadow-lg">
                                        <img :src="imagePreview" class="max-w-full max-h-[80vh] rounded-lg" />
                                        <button @click="imagePreview = null"
                                            class="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg">Tutup</button>
                                    </div>
                                </div>
                            </transition>
                            <td class="px-4 py-2 border text-center">
                                <button
                                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md flex items-center justify-center space-x-2"
                                    @click="deleteAnggota(anggota.id)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin.vue";

export default {
    components: {
        NavbarAdmin,
    },
    data() {
        return {
            payments: [
                {
                    userName: "Kristin Watson",
                    paymentMethod: "Transfer Bank",
                    amount: "150.00",
                    status: "Lunas",
                    paymentDate: "2025-03-15",
                    buktiPembayaran: ""
                },
                {
                    userName: "Marvin McKinney",
                    paymentMethod: "Bank Transfer",
                    amount: "250.00",
                    status: "Belum Lunas",
                    paymentDate: "2025-03-16",
                    buktiPembayaran: ""
                },
                {
                    userName: "Jane Cooper",
                    paymentMethod: "Belum Bayar",
                    amount: "100.00",
                    status: "Belum Lunas",
                    paymentDate: "2025-03-17",
                    buktiPembayaran: ""
                },
                {
                    userName: "Cody Fisher",
                    paymentMethod: "E-wallet",
                    amount: "200.00",
                    status: "Belum Lunas",
                    paymentDate: "2025-03-18",
                    buktiPembayaran: ""
                },
                {
                    userName: "Bessie Cooper",
                    paymentMethod: "Transfer Bank",
                    amount: "180.00",
                    status: "Lunas",
                    paymentDate: "2025-03-19",
                    buktiPembayaran: ""
                },
                {
                    userName: "Leslie Alexander",
                    paymentMethod: "Bank Transfer",
                    amount: "120.00",
                    status: "Belum Lunas",
                    paymentDate: "2025-03-20",
                    buktiPembayaran: ""
                },
                {
                    userName: "Guy Hawkins",
                    paymentMethod: "Qris",
                    amount: "220.00",
                    status: "Lunas",
                    paymentDate: "2025-03-21",
                    buktiPembayaran: ""
                },
            ],
        };
    },
    methods: {
        exportToCSV() {
            const headers = ["No, Nama", "Metode Pembayaran", "Jumlah Pembayaran", "Status", "Waktu Pembayaran"];
            const rows = this.payments.map((payment, index) => [
                index + 1,
                payment.userName,
                payment.paymentMethod,
                `Rp${payment.amount}`,
                payment.status,
                payment.paymentDate
            ]);

            const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });

            // Buat link untuk mendownload file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "data_pembayaran.csv";
            link.click();
        }
    }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>