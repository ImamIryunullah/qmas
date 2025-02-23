import axios from "axios";

const baseURL = "http://192.168.1.50:4000/api/swi";
const IMG = "http://192.168.1.50:4000/swi/";
const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default {
  LoginPostSwi(data) {
    return API.post("/auth/login", data);
  },
  LogoutPostSwi() {
    return API.post("/auth/logout");
  },
  /*User SWI*/
  CreateUserSwi(data) {
    return API.post("/user", data);
  },
  getUserDataSwi() {
    return API.get("/data-swi");
  },
  CreateDataUserImage(data) {
    return API.post("/data-swi", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  UpdateDataUserImage(data) {
    return API.put("/data-anggota", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  CreatePembayaranSWI(data) {
    return API.post("/transaksi-anggota", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getfullpathImageSwi(img) {
    return `${IMG}${img}`;
  },
  getHealthSwi() {
    return API.get("/health");
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
};
