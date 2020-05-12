<template>
    <section class="pic-only">
        <header class="pic-only_header">
            <div class="author  pic-only_author">
                <img class="user-image" :src="pic.user.profile_image.small"
                alt="Author Name">
                <p class="user-name  black">{{pic.user.name}}</p>
            </div>
            <div class="pic-only_symbol_wrapper">
                <button class="symbol-button mr">
                   <i class="fas fa-download"></i>
                </button>

                <button class="symbol-button">
                    <i class="fas  fa-heart"></i>
                </button>
            </div>
        </header>
        
        <figure :class="[orient?containerL:containerP]">
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
            portrait:'image_portrait',
            landscape:'image_landscape',
            containerL:'image-container_landscape',
            containerP:'image-container_portrait'
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
@import '../styles/user.scss';
.pic-only{
    width: 80vw;
    margin: 0 auto;
    background-color: $background;
    border-radius: 1rem;
    overflow: auto;
    
    &_description{
        text-align: left;
        padding: 1rem;
    }

    &_header{
        display: flex;
        padding: 0.5rem;
        justify-content: space-between;
        align-items: center;
    }
}

.image-container_portrait{
    height: 80vh;
}

.image_landscape{
    max-width:100%;
}

.image_portrait{
    max-height: 100%;
}

.symbol-button{
    background-color: white;
    border: solid 2px #ccc;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    
    cursor: pointer;
}

@media only screen and (max-width:$medium){
    .pic-only{
        width: 100vw;
        border-radius: 1rem 1rem 0 0;
    }

    .user-image{
        width: 1.5rem;
    }

    .image-container_portrait{
        height: unset;
    }
}

/* additional tools*/
.mr{
    margin-right: 2px;
}
.black{
    color:black;
}
</style>