import axios from "axios";
const baseURL = "http://192.168.10.2:3000/api"; // Ganti dengan domain Anda
const IMG = "http://192.168.10.2:3000/"; // Ganti dengan domain Anda
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
  GetAllPengaduanAdmin() {
    return API.get("/pengaduan");
  },
  CreateSuaraKonsumenAdmin(data) {
    return API.post("/berita", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getAllSuaraKonsumen() {
    return API.get("/berita");
  },
  getAllSuaraKonsumenPublish() {
    return API.get("/berita/publish");
  },
  getSuaraKonsumenByid(id) {
    return API.get(`/berita/${id}`);
  },
  UpdateSuaraKonsumen(id, data) {
    return API.put(`/berita/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  DeleteSuaraKonsumen(id, data) {
    return API.delete(`/berita/${id}`, data);
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
  /*Jabatan*/
  CreateJabatan(data) {
    return API.post(`/jabatans`, data);
  },
  DeleteJabatan(id) {
    return API.delete(`/jabatans/${id}`);
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
    let queryParams = {};
    if (status) {
      queryParams.statusPembayaran = status;
    }
    if (wilayahID) {
      queryParams.wilayahID = wilayahID;
    }
    if (daerahID) {
      queryParams.daerahID = daerahID;
    }
    const queryString = new URLSearchParams(queryParams).toString();
    return API.get(`/transaksi-anggota?${queryString}`);
  },
  getAllTransaksiAdmin() {
    return API.get("/transaksi-anggota/all");
  },
  UpdateTransaksiAnggotaAdmin(id, status) {
    return API.put(`/transaksi-anggota/${id}/${status}`);
  },
};
