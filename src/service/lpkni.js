import axios from "axios";
const baseURL = "https://lpkni.id/api"; // Ganti dengan domain Anda
const IMG = "https://lpkni.id/"; // Ganti dengan domain Anda
const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default {
  /*Pengaduan*/
  CreatePengaduanKonsumen(data) {
    return API.post("/pengaduan/konsumen", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  CreatePengaduanAnggota(data) {
    return API.post("/pengaduan/anggota", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  /*Auth*/
  LoginPost(data) {
    return API.post("/auth/login", data);
  },
  LogoutPost() {
    return API.post("/auth/logout");
  },
  /*User Anggota LPKNI*/
  CreateUser(data) {
    return API.post("/user", data);
  },
  RequesTokenResetPassword(data) {
    return API.post("/auth/reset-password-token", data);
  },
  RequestResetPassword(data) {
    return API.post("/auth/reset-password", data);
  },
  CheckpasswordToken(token) {
    return API.get(`/auth/check-password-token/${token}`);
  },
  ChangePassword(token, data) {
    return API.post(`/auth/reset-password/${token}`, data);
  }, //$2a$10$YH4DB5Dw7v5n/H3QSqNiS.ts9HKYkk5buZDOwjBRyIjSufnAwunXm
  CreateDataUserImage(data) {
    return API.post("/data-anggota", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  UpdateDataUserImage(data) {
    return API.put("/data-anggota", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  CreatePembayaranAnggota(data) {
    return API.post("/transaksi-anggota", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  UpdateStatusAnggota(id, data) {
    return API.put(`/data-anggota/update-status/${id}`, data);
  },
  getUserData() {
    return API.get("/data-anggota");
  },

  /*Wilayah*/
  getAllWilayah() {
    return API.get("/wilayah");
  },
  /*Daerah*/
  getAllDaerah() {
    return API.get(`/daerah`);
  },
  getDaerahByWilayahId(id) {
    return API.get(`/daerah/wilayah/${id}`);
  },
  /*Berita*/
  GetallKategoriBerita() {
    return API.get("/berita/kategori");
  },
  GetAllBerita() {
    return API.get("/berita");
  },
  GetBeritaById(id) {
    return API.get(`/berita/${id}`);
  },
  DeleteBerita(id) {
    return API.delete(`/berita/${id}`);
  },
  /*Jabatan*/
  CreateJabatan(data) {
    return API.post(`/jabatans`, data);
  },
  GetallJabatan() {
    return API.get("/jabatans");
  },
  GetJabatanByWilayahId(id) {
    return API.get(`/jabatan/wilayah/${id}`);
  },
  GetJabatanByDaerahId(id) {
    return API.get(`/jabatan/daerah/${id}`);
  },
  GetJabatanByWilayahDaerahId(wilayah_id, daerah_id) {
    return API.get(`/jabatan/wilayah/${wilayah_id}/daerah/${daerah_id}`);
  },
  /*Image*/
  getfullpathImage(img) {
    return `${IMG}${img}`;
  },
  getHealthlpkni() {
    return API.get("/health");
  },

  /*Admin*/
  getAllUserData() {
    return API.get("/data-anggota/all");
  },
  GetJabatanByWilayahIdAdmin(id) {
    return API.get(`/jabatans/wilayah/${id}`);
  },
  GetJabatanByDaerahIdAdmin(id) {
    return API.get(`/jabatans/daerah/${id}`);
  },
  GetTransaksiByStatus(status) {
    return API.get(`/transaksi-anggota/status/${status}`);
  },
  GetTransaksiByStatusByWilayahByDaerah(status, wilayahID, daerahID) {
    // Membuat object untuk menyimpan parameter query
    let queryParams = {};

    // Menambahkan parameter ke queryParams jika ada
    if (status) {
      queryParams.statusPembayaran = status;
    }
    if (wilayahID) {
      queryParams.wilayahID = wilayahID;
    }
    if (daerahID) {
      queryParams.daerahID = daerahID;
    }

    // Mengubah queryParams object menjadi string query
    const queryString = new URLSearchParams(queryParams).toString();

    // Menggunakan queryString dalam request GET
    return API.get(`/transaksi-anggota?${queryString}`);
  },
};
