import axios from "axios";

const baseURL = "http://192.168.1.50:3000/api";
const IMG = "http://192.168.1.50:3000/";
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
  /*Admin*/
  getAllUserData() {
    return API.get("/data-anggota/all");
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
  GetJabatanByWilayahIdAdmin(id) {
    return API.get(`/jabatans/wilayah/${id}`);
  },
  GetJabatanByDaerahIdAdmin(id) {
    return API.get(`/jabatans/daerah/${id}`);
  },
  /*Image*/
  getfullpathImage(img) {
    return `${IMG}${img}`;
  },
};
