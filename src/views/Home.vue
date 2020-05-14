<template>
    <div class="home" :style='{backgroundImage:bgPath}'>
        <!-- <button @click='random'>go</button> -->

    </div>
</template>

<script>
import {getRandom} from '@/fetch/search.js';
export default {
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
    width: 100vw;
    height: 100vh;
    background-size: cover;
}

.home-cover{
    
}
</style>