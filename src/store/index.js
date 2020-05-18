import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pics:[],
        authorList:[],
        selectPhoto:{}
    },

    getters:{
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
