<template>
    <section>
        <ul class="pics-align">
            <li class="pic-wrapper" v-for="pic in pics" :key="pic.id">
                <img :src="pic.urls.small" :alt="pic.alt_description">
                <div class="hover-info">
                    <img class="user-image" :src="pic.user.profile_image.small"
                    alt="Author Name">
                    <p class="user-name">{{pic.user.name}}</p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    computed:{
        pics(){
            return this.$store.getters.pics;
        },

        url(){
            return this.$store.getters.pics.urls;
        }
    }
}
</script>

<style lang='scss'>
.pics-align{
    column-gap: 1rem;
    column-width: 300px;
    margin:0 1rem;
}

.user-image{
    border-radius: 50%;
    display: inline-block;
}

.user-name{
    display: inline-block;
}

.pic-wrapper{
    position: relative;
    display: inline-block;
    margin-bottom:1rem;
    &:hover .hover-info{
        visibility: visible;
    }
}

.hover-info{
    position: absolute;
    visibility: hidden;
    display: flex;
    align-items: center;
    bottom: 5rem;
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