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
                    if(this.$route.name!=='SearchRes'){
                        this.$router.push({name:'SearchRes'});
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        }
    },
}
</script>

<style lang='scss'>
.searchBar{
    width: 10rem;
    height: $nav-height / 2;
    font-size: 1rem;
}

.search-icon{
    font-size: 5rem;
}

@media only screen and(max-width: $medium){
    .searchBar{
        width: 5rem;
    }
}
</style>