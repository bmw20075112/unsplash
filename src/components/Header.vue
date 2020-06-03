<template>
    <header>
        <nav class="nav-align">
            <div class="brand" @click="goHome()">Imager</div>

            <div class="container menu" :class="{change: isTrue}" @click="isTrue = !isTrue">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            
            <ul class="nav-right" :style="{visibility: showMenu}">
                
                <div class="search-wrapper">
                    <input type="text" class="input-bar" autofocus placeholder="e.g. cat" 
                    v-model="term" @keyup.enter="search()">
                    <i class="fas fa-search search-button" @click="search()"></i>                 
                </div>

                <div class="button-wrapper" @click="close">
                    <span class="menu-text">Profile</span><i class="fas fa-user nav-button"></i>
                </div>
            </ul>
        </nav>
    </header>
</template>

<script>
import {searchPhotos} from '@/fetch/search';
export default {
    data() {
        return {
            term:'',
            isTrue: false
        }
    },

    methods: {
        goHome(){
            if(this.$route.name==='Home'){
                this.$router.go();
            }else{
                this.$router.push({name:'Home'})
            }
        },

        search(){
            if(this.term){
                return searchPhotos(this.term)
                .then(data=>{
                    const pics=data.data.results;
                    console.log(data);
                    this.$store.dispatch('resultAction',pics);
                    if(this.$route.name!=='SearchRes'){
                        this.$router.push({name:'SearchRes'});
                    }else if(this.$route.name=='SearchRes'){
                        if(!('id' in this.$route.query)){
                            this.$store.dispatch('showModalAction', false);
                        }
                    }
                    this.term='';
                    this.isTrue=false;
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        },

        close(){
            if(this.$route.name !== 'Profile'){
                this.$router.push({name:'Profile'});
            }
            this.isTrue=false;
        }
    },

    computed: {
        windowWidth(){
            return this.$store.getters.windowWidth;
        },

        showMenu(){
            if(this.windowWidth<=540){
                if(this.isTrue){
                    return 'visible';
                }else{
                    return 'hidden';
                }
            }else{
                return 'visible';
            }
        },

        windowWidth(){
            return this.$store.getters.windowWidth;
        },

        showModal(){
            return this.$store.getters.showModal;
        }
    },
}
</script>

<style lang='scss'>
@import '../styles/menu.css';
.nav-align{
    background-color: $first;
    width: 100%;
    height: $nav-height;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 100;
}

.brand{
    cursor: pointer;
    font-size: 2rem;
    font-style: italic;
    margin-left: 1rem;
    font-weight: bold;
    &:hover, &:focus{
        font-size: 2.1rem;
    }
}

.nav-right{
    display: flex;
    position: relative;
}

.button-wrapper{
    &:hover{
        background-color: $second;
    }

    &:hover .nav-button{
        color:$background;
    }    
}

.search-wrapper{
    position: relative;
    height: 100%;
}

.input-bar{
    width: 10rem;
    line-height: $nav-height - 20px;
    position: absolute;
    right: -50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: $nav-height / 2;
}

.search-button{
    color: $third;
    cursor: pointer;
    font-size: $nav-height / 2;
    line-height: $nav-height;
    margin: 0 1rem;
}

.nav-button{
    color: $third;
    cursor: pointer;
    font-size: $nav-height / 2;
    line-height: $nav-height;
    margin: 0 1rem;
}

.menu{
    display: none;
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(0%,-50%);
    margin-right: 1rem;
}

.menu-text{
    display: none;
}

.router-link-exact-active{
    & .nav-button{
        color: $background;
    }
    background-color: $second;
    cursor: default;
}

@media only screen and (max-width: $mobile){
    .showMenu{
        visibility: visible;
    }
    .nav-right{
        // visibility: hidden;
        display: flex;
        flex-direction: column-reverse;
        position: absolute;
        margin-top: $nav-height;
        right: 0;
        width: 100%;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .search-wrapper{
        position: relative;
        height: $nav-height - 5px;
        display: flex;
        align-items: center;
    }

    .search-button{
        font-size: 2rem;
        line-height: 43px;
        width: 20%;
        margin: 0;
        background-color: $second;
        color: $background;
        &:active{
            color: $third;
        }
    }

    .nav-button{
        display: none;
    }

    .input-bar{
        position: unset;
        right: unset;
        transform: unset;
        width: 80%;
        line-height: 2rem;
        font-size: 2rem;
    }

    .menu{
        display: unset;
    }

    .menu-text{
        display: block;
        font-size: 2rem;
        color: $background;
        user-select: none;
    }

    .router-link-exact-active{
        & .nav-button{
            color: unset;
        }
        background-color: unset;
    }
}
</style>