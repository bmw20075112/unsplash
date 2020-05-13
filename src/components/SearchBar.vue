<template>
    <div>
        <input type="text" class="searchBar" v-model="term">
        <i class="fas fa-search search-icon" @click="search()"></i>
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
                return searchPhotos(this.term)
                .then(data=>{
                    const pics=data.data.results;
                    console.log(data);
                    this.$store.dispatch('resultAction',pics);
                    this.term='';
                    this.$router.push({name:'Search'});
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
.searchBar{
    width: 10rem;
    height: 45px;
    border-radius: 20%;
    font-size: 1rem;
}

.search-icon{

}
</style>