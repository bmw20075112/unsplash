<template>
  <div class="searchBar-wrapper">
    <input
      type="text"
      autofocus
      class="searchBar"
      placeholder="e.g. cat"
      v-model="term"
      @keyup.enter="search()"
    >
    <i
      class="fas fa-search search-icon"
      @click="search()"
    />
  </div>
</template>

<script>
import { searchPhotos } from '@/fetch/search';
export default {
  data () {
    return {
      term: ''
    }
  },

  methods: {
    search () {
      if (this.term) {
        return searchPhotos(this.term)
          .then(data => {
            const pics = data.data.results;
            this.$store.commit('resultMutate', pics);
            if (this.$route.name !== 'SearchRes') {
              this.$router.push({ name: 'SearchRes' });
            }
            this.term = '';
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
}
</script>

<style lang='scss'>
.searchBar{
  width: 12rem;
  height: 100%;
  font-size: 1rem;
  border: none;
  padding: 0.3rem;
}

.searchBar-wrapper{
  display: flex;
  align-items: center;
  height: 2rem;
}

.search-icon{
  height: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: $first;
  color: $third;
  cursor: pointer;
  &:hover{
    color: $first;
    background-color: $third;
  }
}

@media only screen and(max-width: $medium){
  .searchBar{
    width: 50vw;
  }
}
</style>
