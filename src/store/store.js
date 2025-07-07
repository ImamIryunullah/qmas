import { createStore } from "vuex";
import qmas from "@/service/qmas";

// Modul untuk qmas
const storeqmas = {
  state: {
    userqmas: null,
    UserqmasIsLoggedIn: false,
    userqmasRole: null,
    isStoreqmasUpdated: false,
  },
  mutations: {
    setUserqmas(state, payload) {
      state.userqmas = payload;
    },
    setUserqmasIsLoggedIn(state, payload) {
      state.UserqmasIsLoggedIn = payload;
    },
    setUserqmasRole(state, role) {
      state.userqmasRole = role;
    },
    setIsStoreqmasUpdated(state, payload) {
      state.isStoreqmasUpdated = payload;
    },
  },
  actions: {
    async loginqmas(context, { email, password }) {
      try {
        const response = await qmas.LoginPost({
          email,
          password,
        });
        document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
        await context.dispatch("updateStoreqmas");
      } catch (err) {
        console.log(err.response.data.error);
        throw new Error(err.response.data.error);
      }
    },
    async updateStoreqmas(context) {
      try {
        const res = await qmas.getUserData();
        const userData = res.data;
        context.commit("setUserqmas", userData);
        context.commit("setUserqmasIsLoggedIn", true);
        context.commit("setUserqmasRole", userData.user.role);
      } catch (e) {
        console.log(e);
        context.commit("setUserqmas", null);
        context.commit("setUserqmasIsLoggedIn", false);
        context.commit("setUserqmasRole", null);
      }
      context.commit("setIsStoreqmasUpdated", true);
    },
    async logoutqmas(context) {
      try {
        await qmas.LogoutPost();
        context.commit("setUserqmas", null);
        context.commit("setUserqmasIsLoggedIn", false);
        context.commit("setUserqmasRole", null);
        document.cookie = "token=; path=/; secure; HttpOnly";
      } catch (error) {
        context.commit("setUserqmas", null);
        context.commit("setUserqmasIsLoggedIn", false);
        context.commit("setUserqmasRole", null);
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
    storeqmas, // Menambahkan modul qmas
    storeSidebar,
  },
});

export default store;
