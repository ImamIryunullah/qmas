import axios from "axios";

const baseURL = "http://192.168.1.50:3000/api";
const IMG = "http://192.168.1.50:3000/";
const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default {
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
  getUserData() {
    return API.get("/data-anggota");
  },
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
  GetallJabatan() {
    return API.get("/jabatans");
  },
  GetJabatanByWilayahId(id) {
    return API.get(`/jabatan/wilayah/${id}`);
  },
  GetJabatanByDaerahId(id) {
    return API.get(`/jabatan/daerah/${id}`);
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
