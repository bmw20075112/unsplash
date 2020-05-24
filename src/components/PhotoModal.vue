<template>
    <section class="pic-only">
        <header class="pic-only_header">
            <div class="author  pic-only_author">
                <img class="user-image" :src="pic.user.profile_image.small"
                alt="Author Name">
                <p class="user-name black">{{pic.user.name}}</p>
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
        
        <figure class="modalPic-container">
            <img :class="[orient?landscape:portrait]"
            :src="pic.urls.regular" :alt="pic.alt_description">
        </figure>
        
        <div class="des">
            <p class="description">{{description}}</p>
        </div>
        <!-- <button>download</button> -->
    </section>
</template>

<script>
export default {
    data() {
        return {
            portrait:'pic_portrait',
            landscape:'pic_landscape',
        }
    },
    computed: {
        pic(){
            return this.$store.getters.selectPic;
        },

        orient(){
            return this.$store.getters.orientLandscape;
        },

        description(){
            let des= (this.pic.description || this.pic.alt_description).split(' ');
            if(des.length>30){
                return des.slice(0,29).join(' ')+'......';
            }
            return des.join(' ');
        }
    },
}
</script>

<style lang='scss'>
@import '../styles/user.scss';
.pic-only{
    width: 90vw;
    height: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: $background;
    border-radius: 1rem 1rem 0 0;
    overflow-y: auto;

    &_header{
        display: flex;
        padding: 0.5rem;
        justify-content: space-between;
        align-items: center;
    }
}

.des{
    flex-grow: 1;
    & .description{
        text-align: left;
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
}

.modalPic-container{
    max-height: 90%;
    width: 100%;
    overflow: auto;
}

.pic_landscape{
    max-height: 100%;
}

.pic_portrait{
    max-height: 100%;
}

.symbol-button{
    background-color: white;
    border: none;
    color: $second;
    box-shadow: 0 1px 3px grey;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    margin-left: 0.5rem;
    cursor: pointer;
}

@media only screen and (max-width:$medium){
    .pic-only{
        width: 100vw;
        height: unset;
        border-radius: 0;
        margin-top: 3rem;
    }

    .user-image{
        width: 1.5rem;
    }

    .modalPic-container{
        max-height: none;
    }

    .pic_portrait{
        max-height: none;
        width: 100%;
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