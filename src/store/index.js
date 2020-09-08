import { db } from '../fetch/firebase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorList: [],
    idFeedback: null,
    isModeLogin: true,
    likeList: [],
    load: true,
    pics: [],
    userID: '',
    userIDCheck: false,
    userName: '',
    selectPhoto: {},
    showModal: false,
    showNotify: false,
    windowWidth: 0
  },

  getters: {
    orientLandscape (state) {
      if (state.selectPhoto.width > state.selectPhoto.height) {
        return true;
      } else {
        return false;
      }
    }
  },

  mutations: {
    authorListMutate (state, payload) {
      state.authorList = payload;
    },

    idFeedbackMutate (state, payload) {
      state.idFeedback = payload;
    },

    isModeLoginMutate (state, payload) {
      state.isModeLogin = payload;
    },

    likeListMutate (state, payload) {
      if (payload.type === 'push') {
        state.likeList.push(payload.value);
      } else if (payload.type === 'splice') {
        state.likeList.splice(payload.value, 1);
      } else if (payload.type === 'clear') {
        state.likeList = [];
      } else {
        state.likeList = payload;
      }
    },

    loadMutate (state, payload) {
      state.load = payload;
    },

    resultMutate (state, payload) {
      state.pics = payload;
    },

    selectMutate (state, payload) {
      state.selectPhoto = payload;
    },

    showModalMutate (state, payload) {
      state.showModal = payload;
    },

    notifyMutate (state) {
      state.showNotify = true;
      setTimeout(() => {
        state.showNotify = false;
      }, 2500);
    },

    userIDCheckMutate (state, payload) {
      state.userIDCheck = payload;
    },

    userMutate (state, payload) {
      if (payload.type === 'id') {
        state.userID = payload.value;
      } else if (payload.type === 'name') {
        state.userName = payload.value;
      } else if (payload.type === 'clear') {
        state.userID = '';
        state.userName = '';
      }
    },

    widthMutate (state, payload) {
      state.windowWidth = payload;
    }
  },

  actions: {
    checkUniqueName ({ commit }, name) {
      db.collection('users').doc(name).get()
        .then(doc => {
          if (doc.exists) {
            commit('idFeedbackMutate', 'This account is already created');
            commit('userIDCheckMutate', false);
          } else {
            commit('idFeedbackMutate', null);
            commit('userIDCheckMutate', true);
          }
        })
    }
  },
  modules: {
  }
})
