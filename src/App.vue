<template>
    <div id="app">
        <Header :style="{marginBottom: headerAlign}" />
        <keep-alive>
            <router-view />
        </keep-alive>

        <section class="modal" v-if="showModal" @click.stop.self="close()">
            <button>
                <i class="fas fa-arrow-left toLast" v-if="windowWidth>768" @click="toList(-1)"></i>
            </button>

            <button>
                <i class="fas fa-arrow-right toNext" v-if="windowWidth>768" @click="toList(1)"></i>
            </button>
            <PhotoModal class="modal-content"/>
        </section>
    </div>
</template>

<script>
import PhotoModal from '@/components/PhotoModal.vue';
import Header from '@/components/Header.vue';
import {mapGetters} from 'vuex';
export default {
    components:{
        PhotoModal,
        Header,
    },

    data() {
        return {
            from:''
        }
    },

    methods: {
        handleResize(){
            this.$store.dispatch('widthAction', window.innerWidth);
        },

        close(){
            this.$router.push({name: this.$route.name, query: null});
            this.$store.dispatch('showModalAction', false);
        },

        toList(num){
            let newOrder, source;
            let from=this.$route.name;
            const map = new Map([
                ['SearchRes', this.pics],
                ['Author', this.authorList],
                ['Profile', this.likeList]
            ]);
            source=map.get(from);
            newOrder=source.findIndex(el=>el.id===this.selectPic.id) + num;
            
            this.$store.dispatch('selectAction', source[newOrder]);
            this.$router.push({name: this.$route.name, query:{id: source[newOrder].id}});
        },
    },

    computed:{
        ...mapGetters([
            'authorList',
            'likeList',
            'pics',
            'selectPic',
            'showModal',
            'windowWidth'
        ]),

        headerAlign(){
            if(this.windowWidth<=768 && this.$route.name!=='Author'){
                return '50px';
            }else if(this.$route.name==='Home'){
                return '50px';
            }
            return '4rem';
        },

        newOder(){
            
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
