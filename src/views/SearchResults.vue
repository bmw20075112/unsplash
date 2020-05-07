<template>
    <section>
        <ul class="pics-align">
            <li class="pic-wrapper" v-for="pic in pics" :key="pic.id">
                <img class="pic" :src="pic.urls.small" :alt="pic.alt_description">
                <div class="hover-info">
                    <div class="author">
                        <img class="user-image" :src="pic.user.profile_image.small"
                        alt="Author Name">
                        <p class="user-name">{{pic.user.name}}</p>
                    </div>

                    <div class="options">
                        <i class="fas fa-heart" :class="{'fas':true}"></i>
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

    computed:{
        pics(){
            return this.$store.getters.pics;
        },

        url(){
            return this.$store.getters.pics.urls;
        },

        like(){
            if(true){
                return{
                'fas':true
                }
            }
            
        }
    },

    // created(){
    //     db.collection('user').doc('hi').onSnapshot(snapshot=>{
    //         snapshot.
    //     })
    // }
}
</script>

<style lang='scss'>
.pics-align{
    column-gap: 1rem;
    column-width: 300px;
    margin:0 1rem;
}

.user-image{
    border-radius: 100%;
    display: inline-block;
}

.user-name{
    display: inline-block;
    margin-left: 0.5rem;
    color: white;
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
    top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.author{
    display: flex;
    align-items: center;
    margin-left: 1rem;
}

.options{
    margin-right: 1rem;;
}

.fa-heart{
    color: white;
    font-size: 1.6rem;
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