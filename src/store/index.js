import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pics:[]
    },

    getters:{
        pics(state){
            return state.pics;
        }
    },

    mutations: {
        resultMutate(state,payload){
            state.pics=payload;
        }
    },
    actions: {
        resultAction({commit},payload){
            commit('resultMutate',payload);
        }
    },
    modules: {
    }
})
