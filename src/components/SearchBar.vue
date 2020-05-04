<template>
    <div>
        <input type="text" v-model="term">
        <button @click="search()">Search</button>
    </div>
</template>

<script>
import {searchPhotos} from '@/fetch/search';
export default {
    data() {
        return {
            term:'',
        }
    },

    methods: {
        search(){
            if(this.term){
                return searchPhotos(this.term,{
                    orientation:'landscape'
                })
                .then(data=>{
                    const pics=data.data.results;
                    console.log(data);
                    this.$store.dispatch('resultAction',pics);
                    this.term='';
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        }
    },
}
</script>

<style>

</style>