<template>
    <section>
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
    </section>
</template>

<script>
import db from '../fetch/firebase';
export default {
    data() {
        return {
            likeList:{}
        }
    },

    methods: {
        toPhoto(pic){
            this.$store.dispatch('selectAction',pic)
            .then(()=>{
                this.$router.push({name:'Photo',params:{id:pic.id}});
            })
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