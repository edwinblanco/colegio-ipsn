// store/modules/auth.js
export default {
    namespaced: true,
    state: {
      user: null, // Almacena la información del usuario
      isAuthenticated: false, // Para saber si el usuario está autenticado
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
        state.isAuthenticated = true;
      },
      LOGOUT(state) {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    actions: {
      login({ commit }, userData) {
        commit('SET_USER', userData);
      },
      logout({ commit }) {
        commit('LOGOUT');
      }
    },
    getters: {
      getUser(state) {
        return state.user;
      },
      isAuthenticated(state) {
        return state.isAuthenticated;
      }
    }
  };
