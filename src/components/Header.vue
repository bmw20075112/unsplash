<template>
    <header>
        <nav class="nav-align">
            <div class="brand" @click="goHome()">Imager</div>
            <ul class="nav-right">
                <router-link class="button-wrapper" :to="{name:'Search'}" v-if="$route.name!='Home'">
                    <i class="fas fa-search nav-button"></i>
                </router-link>

                <router-link class="button-wrapper" :to="{name:'Profile'}">
                    <i class="fas fa-user nav-button"></i>
                </router-link>
            </ul>
        </nav>
    </header>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
export default {
    components:{
        SearchBar
    },

    methods: {
        goHome(){
            if(this.$route.name==='Home'){
                this.$router.go();
            }else{
                this.$router.push({name:'Home'})
            }
        }
    },
}
</script>

<style lang='scss'>
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

.nav-right{
    display: flex;
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

.button-wrapper{
    &:hover{
        background-color: $second;
    }

    &:hover .nav-button{
        color:$background;
    }    
}

.nav-button{
    color: $third;
    font-size: $nav-height / 2;
    line-height: $nav-height;
    margin: 0 1rem;
}

.router-link-exact-active{
    & .nav-button{
        color:$background;
    }
    background-color: $second;
    cursor: default;
}
</style>