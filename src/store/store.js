import { createStore } from "vuex";
import Api from "@/service/api";

const store = createStore({
  state: {
    user: null,
    userLoggedIn: false, // Default false untuk status login
    userRole: null,
    isStoreUpdated: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserIsLoggedIn(state, payload) {
      state.userLoggedIn = payload;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    setIsStoreUpdated(state, payload) {
      state.isStoreUpdated = payload;
    },
  },
  actions: {
    async login(context, { email, password }) {
      try {
        const response = await Api.LoginPost({
          email,
          password,
        });
        document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly`;
        await context.dispatch("updateStore");
      } catch (err) {
        console.log(err.response.data.error);
        throw new Error(err.response.data.error);
      }
    },
    async updateStore(context) {
      try {
        const res = await Api.getUserData();
        const userData = res.data;
        // console.log(userData);

        context.commit("setUser", userData);
        context.commit("setUserIsLoggedIn", true);
        context.commit("setUserRole", userData.user.role);
      } catch (e) {
        console.log(e);
        context.commit("setUser", null);
        context.commit("setUserIsLoggedIn", false);
        context.commit("setUserRole", null);
      }
      context.commit("setIsStoreUpdated", true);
    },
    async logout(context) {
      try {
        await Api.LogoutPost();
        context.commit("setUser", null);
        context.commit("setUserIsLoggedIn", false);
        context.commit("setUserRole", null);
        document.cookie = "token=; path=/; secure; HttpOnly";
      } catch (error) {
        context.commit("setUser", null);
        context.commit("setUserIsLoggedIn", false);
        context.commit("setUserRole", null);
      }
    },
  },
});

export default store;
