import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authorList: [],
        likeList: [],
        pics: [],
        user: {},
        selectPhoto: {},
        showModal: false,
        windowWidth: 0
    },

    getters:{
        authorList(state){
            return state.authorList;
        },

        likeList(state){
            return state.likeList;
        },

        orientLandscape(state){
            if(state.selectPhoto.width>state.selectPhoto.height){
                return true;
            }else{
                return false;
            }
        },

        pics(state){
            return state.pics;
        },

        userID(state){
            return state.user.userID;
        },

        userName(state){
            return state.user.userName;
        },

        selectPic(state){
            return state.selectPhoto;
        },

        showModal(state){
            return state.showModal;
        },

        windowWidth(state){
            return state.windowWidth;
        }
    },

    mutations: {
        authorListMutate(state, payload){
            state.authorList=payload;
        },

        likeListMutate(state, payload){
            if(payload.type=='push'){
                state.likeList.push(payload.value);
            }else if(payload.type=='splice'){
                state.likeList.splice(payload.value, 1);
            }else if(payload.type=='clear'){
                state.likeList=[];
            }else{
                state.likeList=payload;
            }
        },

        resultMutate(state, payload){
            state.pics=payload;
        },

        selectMutate(state, payload){
            state.selectPhoto=payload;
        },

        showModalMutate(state, payload){
            state.showModal=payload;
        },

        userMutate(state, payload){
            if(payload.type=='id'){
                state.user.userID = payload.value;
            }else if(payload.type=='name'){
                state.user.userName = payload.value;
            }
        },

        widthMutate(state, payload){
            state.windowWidth=payload;
        }
    },

    actions: {
        authorListAction({commit}, payload){
            commit('authorListMutate', payload);
        },

        likeListAction({commit}, payload){
            commit('likeListMutate', payload);
        },

        resultAction({commit}, payload){
            commit('resultMutate', payload);
        },

        selectAction({commit}, payload){
            commit('selectMutate', payload);
        },

        showModalAction({commit}, payload){
            commit('showModalMutate', payload);
        },

        userAction({commit}, payload){
            commit('userMutate', payload);
        },

        widthAction({commit}, payload){
            commit('widthMutate', payload);
        }
    },
    modules: {
    }
})
