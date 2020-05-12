<template>
    <section>
        <h1>{{width}}</h1>
        <ul class="pics-align">
            <li class="pic-wrapper" v-for="pic in pics" :key="pic.id">
                <img class="pic" :src="pic.urls.small" :alt="pic.alt_description" @click="toPhoto(pic)">
                <div class="hover-info">
                    <div class="author ml">
                        <img class="user-image" :src="pic.user.profile_image.small"
                        alt="Author Name">
                        <p class="user-name">{{pic.user.name}}</p>
                    </div>

                    <div class="options">
                        <i class="fas fa-heart search-like"></i>
                    </div>
                </div>            
            </li>
        </ul>

        <section class="modal" v-if="showModal" @click.stop.self="close">
            <router-view class="modal-content"/>
        </section>
    </section>
</template>

<script>
import db from '../fetch/firebase';
export default {
    data() {
        return {
            likeList:{},
            width:0,
            showModal:false
        }
    },

    methods: {
        toPhoto(pic){
            this.$store.dispatch('selectAction',pic)
            .then(()=>{
                if(this.width<769){
                    this.$router.push({name:'Photo',params:{id:pic.id}});
                }else{
                    this.showModal=true;
                    this.$router.push({name:'PhotoModal',params:{id:pic.id}});
                }
            })
        },

        close(){
            this.$router.go(-1);
        },

        handleResize(){
            this.width=window.innerWidth;
        }
    },

    computed:{
        pics(){
            return this.$store.getters.pics;
        },

        url(){
            return this.$store.getters.pics.urls;
        },
    },

    watch: {
        $route(){
            if(this.$route.name==='Search'){
                this.showModal=false;
            }
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

<style lang='scss'>
@import '../styles/user.scss';
.pics-align{
    column-gap: 1rem;
    column-width: 300px;
    margin:0 1rem;
}

.pic-wrapper{
    position: relative;
    display: inline-block;
    margin-bottom:1rem;
    &:hover .hover-info{
        visibility: visible;
    }
    &:hover .pic{
        filter: brightness(80%);
    }
}

.pic{
    transition:all 0.5s ease;
}

.hover-info{
    visibility: hidden;
    position: absolute;
    width: 100%;
    top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.user-name{
    color: white;
}

.options{
    margin-right: 0.5rem;
}

.search-like{
    color: white;
    font-size: 1.6rem;
}

.ml{
    margin-left: 0.5rem;
}

//Modal Setting
.modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba( 0, 0, 0, 0.5);
    &-content{
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%,-25%);
    }
}

// @media only screen and (min-width:$large){
//     .pics-align{
//         column-count: 4;
//     }
// }

// @media only screen and(max-width:$large - 1)and(min-width:$medium){
//     .pics-align{
//         column-count: 3;
//     }
// }

// @media only screen and(max-width:$medium - 1)and(min-width:$mobile){
//     .pics-align{
//         column-count: 2;
//     }
// }
</style>