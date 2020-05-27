import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showModal: false,
        pics: [],
        authorList: [],
        selectPhoto: {}
    },

    getters:{
        showModal(state){
            return state.showModal;
        },

        pics(state){
            return state.pics;
        },

        selectPic(state){
            return state.selectPhoto;
        },

        authorList(state){
            return state.authorList;
        },

        orientLandscape(state){
            if(state.selectPhoto.width>state.selectPhoto.height){
                return true;
            }else{
                return false;
            }
        }
    },

    mutations: {
        showModalMutate(state,payload){
            state.showModal=payload;
        },

        resultMutate(state,payload){
            state.pics=payload;
        },

        selectMutate(state,payload){
            state.selectPhoto=payload;
        },

        authorListMutate(state,payload){
            state.authorList=payload;
        }
    },
    actions: {
        showModalAction({commit}, payload){
            commit('showModalMutate', payload);
        },

        resultAction({commit},payload){
            commit('resultMutate',payload);
        },

        selectAction({commit},payload){
            commit('selectMutate',payload);
        },

        authorListAction({commit},payload){
            commit('authorListMutate',payload);
        }
    },
    modules: {
    }
})
