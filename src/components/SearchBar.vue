<template>
    <div class="searchBar-wrapper">
        <input type="text" class="searchBar" placeholder="e.g. cat" v-model="term" @keyup.enter="search()" >
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
.searchBar-wrapper{
    display: flex;
    align-items: center;
    height: 2rem;
}

.searchBar{
    width: 8rem;
    height: 100%;
    font-size: 1rem;
    border: none;
    padding: 0.3rem;
}

.search-icon{
    font-size: 1rem;
    padding: 0.5rem;
    color: $third;
    background: $first;
    height: 100%;
    &:hover{
        color: $first;
        background-color: $third;
    }
}
</style>