import { createStore } from "vuex";
import Lpkni from "@/service/lpkni";
import swi from "@/service/swi";

// Modul untuk Lpkni
const storeLpkni = {
  state: {
    userLpkni: null,
    UserLpkniIsLoggedIn: false,
    userLpkniRole: null,
    isStoreLpkniUpdated: false,
  },
  mutations: {
    setUserLpkni(state, payload) {
      state.userLpkni = payload;
    },
    setUserLpkniIsLoggedIn(state, payload) {
      state.UserLpkniIsLoggedIn = payload;
    },
    setUserLpkniRole(state, role) {
      state.userLpkniRole = role;
    },
    setIsStoreLpkniUpdated(state, payload) {
      state.isStoreLpkniUpdated = payload;
    },
  },
  actions: {
    async loginLpkni(context, { email, password }) {
      try {
        const response = await Lpkni.LoginPost({
          email,
          password,
        });
        document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
        await context.dispatch("updateStoreLpkni");
      } catch (err) {
        console.log(err.response.data.error);
        throw new Error(err.response.data.error);
      }
    },
    async updateStoreLpkni(context) {
      try {
        const res = await Lpkni.getUserData();
        const userData = res.data;
        context.commit("setUserLpkni", userData);
        context.commit("setUserLpkniIsLoggedIn", true);
        context.commit("setUserLpkniRole", userData.user.role);
      } catch (e) {
        console.log(e);
        context.commit("setUserLpkni", null);
        context.commit("setUserLpkniIsLoggedIn", false);
        context.commit("setUserLpkniRole", null);
      }
      context.commit("setIsStoreLpkniUpdated", true);
    },
    async logoutLpkni(context) {
      try {
        await Lpkni.LogoutPost();
        context.commit("setUserLpkni", null);
        context.commit("setUserLpkniIsLoggedIn", false);
        context.commit("setUserLpkniRole", null);
        document.cookie = "token=; path=/; secure; HttpOnly";
      } catch (error) {
        context.commit("setUserLpkni", null);
        context.commit("setUserLpkniIsLoggedIn", false);
        context.commit("setUserLpkniRole", null);
      }
    },
  },
};

// Modul untuk Swi
const storeswi = {
  namespaced: true, // Menambahkan namespace
  state: {
    userSwi: null,
    userLoggedInSwi: false,
    userRoleSwi: null,
  },
  mutations: {
    setUserSwi(state, payload) {
      state.userSwi = payload;
    },
    setUserLoggedInSwi(state, payload) {
      state.userLoggedInSwi = payload;
    },
    setUserRoleSwi(state, role) {
      state.userRoleSwi = role;
    },
  },
  actions: {
    async loginSwi(context, { email, password }) {
      try {
        const response = await swi.LoginPostSwi({
          email,
          password,
        });
        document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
        await context.dispatch("updateStoreSwi");
      } catch (err) {
        console.log(err.response.data.error);
        throw new Error(err.response.data.error);
      }
    },
    async updateStoreSwi(context) {
      try {
        const res = await swi.getUserDataSwi();
        const userData = res.data;
        context.commit("setUserSwi", userData);
        context.commit("setUserLoggedInSwi", true);
        context.commit("setUserRoleSwi", userData.user.role);
      } catch (e) {
        console.log(e);
        context.commit("setUserSwi", null);
        context.commit("setUserLoggedInSwi", false);
        context.commit("setUserRoleSwi", null);
      }
    },
    async logoutSwi(context) {
      try {
        await swi.LogoutPostSwi();
        context.commit("setUserSwi", null);
        context.commit("setUserLoggedInSwi", false);
        context.commit("setUserRoleSwi", null);
        document.cookie = "token=; path=/; secure; HttpOnly";
      } catch (error) {
        context.commit("setUserSwi", null);
        context.commit("setUserLoggedInSwi", false);
        context.commit("setUserRoleSwi", null);
      }
    },
  },
};
const storeSidebar = {
  namespaced: true, // Menambahkan namespace
  state: {
    isSidebarOpen: window.innerWidth > 768,
  },
  mutations: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
      console.log(state.isSidebarOpen);
    },
    setSidebarState(state, value) {
      state.isSidebarOpen = value;
    },
  },
  actions: {
    toggleSidebar(context) {
      context.commit("toggleSidebar");
    },
    setSidebarState(context, value) {
      context.commit("setSidebarState", value);
    },
  },
};
// Membuat store utama dengan kedua modul
const store = createStore({
  modules: {
    storeLpkni, // Menambahkan modul Lpkni
    storeswi, // Menambahkan modul Swi
    storeSidebar,
  },
});

export default store;
