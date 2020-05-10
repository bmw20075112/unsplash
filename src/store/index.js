import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pics:[],
        selectPhoto:{}
    },

    getters:{
        pics(state){
            return state.pics;
        },

        selectPic(state){
            return state.selectPhoto;
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
        }
    },
    actions: {
        resultAction({commit},payload){
            commit('resultMutate',payload);
        },

        selectAction({commit},payload){
            commit('selectMutate',payload);
        }
    },
    modules: {
    }
})
