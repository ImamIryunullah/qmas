import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "@/router";
import "font-awesome/css/font-awesome.min.css";
import store from "./store/store";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueEasyLightbox from "vue-easy-lightbox";
createApp(App)
  .use(store)
  .use(router)
  .use(ToastPlugin, { position: "top-right", duration: 1000 })
  .use(VueEasyLightbox)
  .mount("#app");
