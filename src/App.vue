<template>
    <div id="app">
        <Header class="header-align" />

        <router-view />

        <section class="modal" v-if="showModal" @click.stop.self="close()">
            <PhotoModal class="modal-content"/>
        </section>
    </div>
</template>

<script>
import PhotoModal from '@/components/PhotoModal.vue'
import Header from '@/components/Header.vue'
export default {
    components:{
        PhotoModal,
        Header
    },

    methods: {
        close(){
            this.$router.go(-1);
            this.$store.dispatch('showModalAction', false);
        }
    },

    computed:{
        showModal(){
            return this.$store.getters.showModal;
        }
    },
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

.header-align{
    margin-bottom: 4rem;
}

@media only screen and (max-width:$medium){
    .modal-content{
        top: 0;
        bottom: 0;
        transform: translate(-50%,0);
    }
}
</style>
