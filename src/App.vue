<template>
    <div id="app">
        <Header :style="{marginBottom:headerAlign}" />

        <keep-alive>
            <router-view />
        </keep-alive>

        <section class="modal" v-if="showModal" @click.stop.self="close()">
            <PhotoModal class="modal-content"/>
        </section>

        <section class="modal" v-if="showAuth" @click.stop.self="closeAuth()">
            <IdentityComp class="modal-authContent"/>
        </section>
    </div>
</template>

<script>
import IdentityComp from '@/components/IdentityComp.vue';
import PhotoModal from '@/components/PhotoModal.vue';
import Header from '@/components/Header.vue';
export default {
    components:{
        PhotoModal,
        Header,
        IdentityComp
    },

    data() {
        return {
            width: 0,
        }
    },

    methods: {
        handleResize(){
            this.width=window.innerWidth;
        },

        close(){
            this.$router.go(-1);
            this.$store.dispatch('showModalAction', false);
        },

        closeAuth(){
            this.$router.go(-1);
            this.$store.dispatch('showAuthAction', false);
        },
    },

    computed:{
        showModal(){
            return this.$store.getters.showModal;
        },

        showAuth(){
            return this.$store.getters.showAuth;
        },

        headerAlign(){
            if(this.width<=768 && this.$route.name!=='Author'){
                return '50px';
            }
            return '4rem';
        }
    },

    created(){
        window.addEventListener('resize',this.handleResize);
        this.handleResize();
    },

    destroyed(){
       window.removeEventListener('resize',this.handleResize);
    }
}
</script>

<style lang="scss">
@import './styles/modal.scss';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}


@media only screen and (max-width:$medium){
    .header-align{
        margin-bottom: $nav-height;
    }
    .modal-content{
        top: 0;
        bottom: 0;
        transform: translate(-50%,0);
    }
}
</style>
