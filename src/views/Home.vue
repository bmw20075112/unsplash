<template>
    <div>
        <div class="home" :style='{backgroundImage:bgPath}'></div>
    </div>
</template>

<script>
import {db} from '../fetch/firebase';
export default {
    data() {
        return {
            cover:'@/assets/cover.jpg'
        }
    },
    methods: {
        // random(){
        //     return getRandom()
        //     .then(data=>{
        //         console.log(data);
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //     })
        // }
    },

    computed: {
        bgPath(){
            return 'url('+ require("@/assets/cover.jpg")+')';
        },
    },
}
</script>

<style lang="scss">
.home{
    max-width: 100vw;
    height: calc(100vh - 50px);
    background-size: cover;
    background-position: 47.5% center;
}

</style>