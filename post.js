const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

// URL API yang telah dibuat untuk menerima POST request
const apiUrl = "http://localhost:3000/api/daerah"; // Ganti dengan URL API yang sesuai

// Fungsi untuk menambahkan delay (delay dalam milidetik)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fungsi untuk membaca CSV dan melakukan POST request
async function processCSVAndPost() {
  const rows = []; // Array untuk menampung semua data CSV

  // Membaca file CSV
  fs.createReadStream("regions.csv") // Ganti dengan path file CSV Anda
    .pipe(csv({ headers: false })) // Membaca CSV tanpa header
    .on("data", (row) => {
      rows.push(row); // Menyimpan data CSV ke dalam array
    })
    .on("end", async () => {
      console.log("CSV selesai dibaca, mulai mengirimkan data...");

      // Kirim data satu per satu dengan delay
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const kodeDaerah = row[0].trim(); // Kode daerah (kolom pertama)
        const namaDaerah = row[1].trim(); // Nama daerah (kolom kedua)

        // Tentukan kode wilayah berdasarkan kode daerah (misalnya kode wilayah '11' untuk provinsi Aceh)
        const kodeWilayah = kodeDaerah.split(".")[0]; // Mengambil 2 digit pertama sebagai kode wilayah (misalnya '11')

        // Data yang akan dikirim ke API
        const data = {
          kode_daerah: kodeDaerah, // Kode daerah (dalam format "XX.XX")
          nama_daerah: namaDaerah,
          wilayah: { kode_wilayah: kodeWilayah }, // Nama daerah
        };

        // Melakukan POST request ke API dengan delay
        try {
          const response = await axios.post(apiUrl, data);
          console.log(
            `Data berhasil dikirim untuk daerah ${namaDaerah} dengan kode wilayah ${kodeWilayah}: ${response.status}`
          );
        } catch (error) {
          // Menangani error dengan informasi lebih lengkap
          if (error.response) {
            // Jika ada response error dari server
            console.error(
              `Gagal mengirim data untuk daerah ${namaDaerah}. Status: ${
                error.response.status
              }, Data: ${JSON.stringify(error.response.data)}`
            );
          } else if (error.request) {
            // Jika tidak ada response yang diterima
            console.error(
              `Gagal mengirim data untuk daerah ${namaDaerah}. Tidak ada response dari server. Request data: ${JSON.stringify(
                error.request
              )}`
            );
          } else {
            // Jika error terjadi selama setup request
            console.error(
              `Gagal mengirim data untuk daerah ${namaDaerah}. Error: ${error.message}`
            );
          }
        }

        // Delay 1 detik sebelum mengirim request berikutnya
        await delay(100); // Delay 1000 ms (1 detik)
      }

      console.log("Proses selesai, semua data telah dikirim.");
    });
}

// Jalankan fungsi untuk membaca CSV dan melakukan POST
processCSVAndPost();
