<template>
    <section class="pic-only">
        <header class="pic-only_header">
            <div class="author  pic-only_author">
                <img class="user-image" :src="pic.user.profile_image.small"
                alt="Author Name">
                <p class="user-name  black">{{pic.user.name}}</p>
            </div>
            <div class="pic-only_symbol_wrapper">
                <i class="far  fa-arrow-alt-circle-down  pic-only_symbol"></i>
                <i class="fas  fa-heart  pic-only_symbol"></i>
            </div>
        </header>
        
        <figure class="pic-only_container">
            <img :class="[orient?landscape:portrait]"
            :src="pic.urls.regular" :alt="pic.alt_description">
        </figure>

        <p class="pic-only_description">{{pic.description || pic.alt_description}}</p>
        
        <!-- <button>download</button> -->
    </section>
</template>

<script>
export default {
    data() {
        return {
            portrait:'pic-only-image_portrait',
            landscape:'pic-only-image_landscape'
        }
    },
    computed: {
        pic(){
            return this.$store.getters.selectPic;
        },

        orient(){
            return this.$store.getters.orientLandscape;
        }
    },
}
</script>

<style lang='scss'>
@import '../styles/user.css';
.pic-only{
    width: 100vw;
    height: 80vh;
    margin: 0 auto;

    &_container{
        width: inherit;
        background-color: silver;
    }

    &-image_landscape{
        height:auto;
    }

    &-image_portrait{
        max-height: 45rem;
        
    }

    &_description{
        text-align: left;
        margin: 1rem;
    }

    &_header{
        display: flex;
        margin-bottom: 0.5rem;
        justify-content: space-between;
        align-items: center;
    }

    &_symbol_wrapper{
        margin-right: 0.5rem;
    }

    &_symbol{
        font-size: 2rem;
        color: silver;
    }
}

// @media only screen and (max-width:$large){
//     .pic-only{
//         &_symbol{
//             font-size: 2rem;
//         }
//     }
    
// }


/* additional tools*/

.black{
    color:black;
}
</style>