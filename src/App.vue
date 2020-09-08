<template>
  <div id="app">
    <Header :style="{marginBottom: headerAlign}" />
    <keep-alive>
      <router-view />
    </keep-alive>

    <Notify class="notify-align" />

    <section
      class="modal"
      v-if="showModal"
      @click.stop.self="close()"
    >
      <button
        class="detectArea toLast"
        @click="toList(-1)"
        :disabled='disabledL'
        v-if="windowWidth>768"
      >
        <i
          class="fas fa-arrow-left"
          :class="{disabled: disabledL}"
        />
      </button>

      <button
        class="detectArea toNext"
        @click="toList(1)"
        :disabled='disabledR'
        v-if="windowWidth>768"
      >
        <i
          class="fas fa-arrow-right"
          :class="{disabled: disabledR}"
        />
      </button>
      <PhotoModal class="modal-content" />
    </section>
  </div>
</template>

<script>
import PhotoModal from '@/components/PhotoModal.vue';
import Header from '@/components/Header.vue';
import Notify from '@/components/Notify.vue';
import { mapState } from 'vuex';
export default {
  components: {
    PhotoModal,
    Header,
    Notify
  },

  data () {
    return {
      from: '',
      disabled: 'disabled'
    }
  },

  methods: {
    handleResize () {
      this.$store.commit('widthMutate', window.innerWidth);
    },

    close () {
      this.$router.push({ name: this.$route.name, query: null })
        .catch(err => {
          return err;
        })
      this.$store.commit('showModalMutate', false);
    },

    toList (num) {
      this.$store.commit('loadMutate', true);
      let newOrder = this.order + num;
      this.$store.commit('selectMutate', this.source[newOrder]);
      this.$router.replace({ name: this.$route.name, query: { id: this.source[newOrder].id } });
    }
  },

  computed: {
    ...mapState([
      'authorList',
      'likeList',
      'pics',
      'selectPhoto',
      'showModal',
      'windowWidth'
    ]),

    headerAlign () {
      if (this.windowWidth <= 768 && this.$route.name !== 'Author') {
        return '50px';
      } else if (this.$route.name === 'Home') {
        return '50px';
      }
      return '4rem';
    },

    disabledL () {
      if (this.$route.name === 'Identity') {
        return true;
      } else {
        if (this.order === 0) {
          return true;
        } else {
          return false;
        }
      }
    },

    disabledR () {
      if (this.$route.name === 'Identity') {
        return true;
      } else {
        if (this.order === this.source.length - 1) {
          return true;
        } else {
          return false;
        }
      }
    },

    order () {
      if (this.$route.name === 'Identity') {
        return null;
      } else {
        return this.source.findIndex(el => el.id === this.selectPhoto.id);
      }
    },

    source () {
      const map = new Map([
        ['SearchRes', this.pics],
        ['Author', this.authorList],
        ['Profile', this.likeList],
        ['Identity', null]
      ]);
      return map.get(this.$route.name);
    }
  },

  created () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed () {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style lang="scss">
@import './styles/modal.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.notify-align{
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%,0);
}

@media only screen and (max-width:$medium){
  .header-align{
    margin-bottom: $nav-height;
  }
  .modal-content{
    top: 0;
    bottom: 0;
    transform: translate(-50%,0);
  }
}
</style>
