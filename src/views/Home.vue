<template>
    <div class="home" :style='{backgroundImage:bgPath}'>
        <!-- <button @click='random'>go</button> -->
        <SearchBar class="home-search"/>
    </div>
</template>

<script>
import db from '../fetch/firebase';
import SearchBar from '@/components/SearchBar';
import {getRandom} from '@/fetch/search.js';
export default {
    components:{
        SearchBar
    },
    data() {
        return {
            cover:'@/assets/cover.jpg'
        }
    },
    methods: {
        random(){
            return getRandom()
            .then(data=>{
                console.log(data);
            })
            .catch(error=>{
                console.log(error);
            })
        }
    },

    computed: {
        bgPath(){
            return 'url('+ require("@/assets/cover.jpg")+')';
        }
    },
}
</script>

<style lang="scss">
.home{
    position: relative;
    max-width: 100vw;
    height: 100vh;
    margin-top: -1rem;
    background-size: cover;
    background-position: 47.5% center;
}

.home-search{
    position: absolute;
    left: 48.7%;
    top: 50%;
    transform: translate(-48.7%,-50%);
}

@media only screen and(max-width: $medium){
    
}
</style>