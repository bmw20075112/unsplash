<template>
  <header>
    <nav class="nav-align">
      <div
        class="brand"
        @click="goHome()"
      >
        Imager
      </div>

      <div
        class="container menu"
        :class="{change: isTrue}"
        @click="isTrue = !isTrue"
      >
        <div class="bar1" />
        <div class="bar2" />
        <div class="bar3" />
      </div>

      <ul
        class="nav-right"
        :style="{visibility: showMenu}"
      >
        <div class="search-wrapper">
          <input
            autofocus
            class="input-bar"
            placeholder="e.g. cat"
            type="text"
            v-model="term"
            @keyup.enter="search()"
          >

          <i
            class="fas fa-search search-button"
            @click="search()"
          />
        </div>

        <div
          class="button-wrapper"
          @click="close"
        >
          <span class="menu-text">Profile</span>
          <i class="fas fa-user nav-button" />
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import { searchPhotos } from '@/fetch/search';
export default {
  data () {
    return {
      isTrue: false,
      term: ''
    }
  },

  methods: {
    close () {
      if (this.$route.name !== 'Profile') {
        this.$router.push({ name: 'Profile' })
          .catch(() => {
            return null;
          })
      }

      this.isTrue = false
    },

    goHome () {
      if (this.$route.name === 'Home') {
        this.$router.go();
      } else {
        this.$router.push({ name: 'Home' });
      }
    },

    search () {
      if (this.term) {
        return searchPhotos(this.term)
          .then(fetchData => {
            const pics = fetchData.data.results;
            this.$store.commit('resultMutate', pics);
            if (this.$route.name !== 'SearchRes') {
              this.$router.push({ name: 'SearchRes' });
            } else if (this.$route.name === 'SearchRes') {
              if (!('id' in this.$route.query)) {
                this.$store.commit('showModalMutate', false);
              }
            }

            this.term = '';
            this.isTrue = false;
          })
          .catch(error => {
            alert(error);
          })
      }
    }
  },

  computed: {
    ...mapState([
      'showModal',
      'windowWidth'
    ]),

    showMenu () {
      if (this.windowWidth <= 540) {
        if (this.isTrue) {
          return 'visible'
        } else {
          return 'hidden'
        }
      } else {
        return 'visible'
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../styles/menu.css';
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

.input-bar{
  width: 10rem;
  line-height: $nav-height - 20px;
  position: absolute;
  right: -50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: $nav-height / 2;
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

.nav-align{
  background-color: $first;
  width: 100%;
  height: $nav-height;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
}

.nav-button{
  color: $third;
  cursor: pointer;
  font-size: $nav-height / 2;
  line-height: $nav-height;
  margin: 0 1rem;
}

.nav-right{
  display: flex;
  position: relative;
}

.router-link-exact-active{
  & .nav-button{
    color: $background;
  }
  background-color: $second;
  cursor: default;
}

.search-button{
  color: $third;
  cursor: pointer;
  font-size: $nav-height / 2;
  line-height: $nav-height;
  margin: 0 1rem;
}

.search-wrapper{
  position: relative;
  height: 100%;
}

@media only screen and (max-width: $mobile){
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

  .nav-button{
    display: none;
  }

  .nav-right{
    // visibility: hidden;
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    margin-top: $nav-height;
    right: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .router-link-exact-active{
    & .nav-button{
      color: unset;
    }
    background-color: unset;
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

  .showMenu{
    visibility: visible;
  }
}
</style>
