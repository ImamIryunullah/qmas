import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "@/router";
import "font-awesome/css/font-awesome.min.css";
import store from "./store/store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "animate.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueEasyLightbox from "vue-easy-lightbox";
import Vue3SocialSharingPlugin from "vue3-social-sharing";
import "font-awesome/css/font-awesome.min.css";
const options = {
  confirmButtonColor: "#41b882",
  denyButtonColor: "#ff7674",
  reverseButton: false,
};
createApp(App)
  .use(store)
  .use(router)
  .use(ToastPlugin, { position: "top-right", duration: 1000 })
  .use(VueSweetalert2, options)
  .use(VueEasyLightbox)
  .use(Vue3SocialSharingPlugin)
  .mount("#app");
