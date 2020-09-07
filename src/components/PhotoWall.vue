<template>
  <section>
    <h1 v-if="picsNow.length===0">
      {{ noPics }}
    </h1>
    <ul
      class="pics-align"
      v-else
    >
      <li
        class="pic-wrapper"
        v-for="(pic, index) in picsNow"
        :key="pic.id"
      >
        <img
          class="pic"
          :src="pic.urls.small"
          :alt="pic.alt_description"
          @click="toPhoto(pic, index)"
        >

        <div class="hover-info">
          <div
            class="author ml"
            @click="toAuthor(pic.user.username)"
          >
            <img
              class="user-image"
              :src="pic.user.profile_image.small"
              alt="Author Name"
            >
            <p class="user-name">
              {{ nameLimit[index] }}
            </p>
          </div>

          <div
            class="options"
            @click="likeToggle(pic)"
          >
            <i
              class="fa-heart like"
              :class="[likeList.findIndex(el=>el.id===pic.id)!==-1? fas: far]"
            />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { auth, db } from '../fetch/firebase';
import common from '@/mixins/common.js'
import { mapState } from 'vuex'
export default {
  mixins: [common],

  data () {
    return {
      noPics: ''
    }
  },

  methods: {
    toPhoto (pic) {
      this.$store.commit('selectMutate', pic)
      this.$store.commit('showModalMutate', true);
      this.$router.push({ name: this.$route.name, query: { id: pic.id } })
    },

    showRes (val) {
      if (val) {
        this.noPics = 'You haven\'t added any image into your collection';
      } else {
        this.noPics = 'Sorry, there is no image correspond to what you searched.';
      }
    }
  },

  computed: {
    ...mapState([
      'authorList',
      'likeList',
      'pics',
      'showModal'
    ]),

    nameLimit () {
      return this.picsNow.map(pic => {
        if (this.windowWidth > 768) {
          if (pic.user.name.length > 30) {
            return pic.user.first_name;
          }
          return pic.user.name;
        } else if (this.windowWidth <= 768 && this.windowWidth > 480) {
          if (pic.user.name.length > 25) {
            return pic.user.first_name;
          }
          return pic.user.name;
        } else {
          if (pic.user.name.length > 20) {
            return pic.user.first_name;
          }
          return pic.user.name;
        }
      });
    },

    picsNow () {
      if (this.$route.name === 'Author') {
        return this.authorList;
      } else if (this.$route.name === 'Profile') {
        this.showRes(true);
        return this.likeList;
      } else {
        this.showRes(false);
        return this.pics;
      }
    }
  },

  created () {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').where('userID', '==', user.uid).get()
          .then(snapshots => {
            snapshots.docs.forEach(snapshot => {
              this.$store.commit('userMutate', { type: 'id', value: snapshot.data().userID });
              this.$store.commit('userMutate', { type: 'name', value: snapshot.id });
              this.$store.commit('likeListMutate', snapshot.data().likeList);
            })
          })
      }
    });
  },

  watch: {
    $route () {
      if ('id' in this.$route.query) {
        this.$store.commit('showModalMutate', true);
        document.body.classList.add('freeze');
      } else {
        this.$store.commit('showModalMutate', false);
        document.body.classList.remove('freeze');
        this.$store.commit('loadMutate', true);
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../styles/spinner.scss';
.author-mobile{
  margin-bottom: 0.5rem;
}

.freeze{
  overflow-y: hidden;
}

.hover-info{
  visibility: hidden;
  position: absolute;
  width: 100%;
  top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.like{
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.ml{
  margin-left: 0.5rem;
}

.options{
  margin-right: 0.5rem;
}

.pic{
  transition:all 0.5s ease;
}

.pics-align{
  column-gap: 1rem;
  column-width: 300px;
  margin:0 1rem;
}

.pic-wrapper{
  position: relative;
  width: 100%;
  display: inline-block;
  margin-bottom:1rem;
  &:hover .hover-info{
      visibility: visible;
  }
  &:hover .pic{
      filter: brightness(80%);
  }
}
@media only screen and (max-width:$medium){
  .like{
    color: $contrast;
  }

  .pic{
    width: 100%;
  }

  .pics-align{
    column-gap: 0;
    column-width: unset;
    margin: unset;
  }

  .pic-wrapper{
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    & .hover-info{
      visibility: visible;
      position: unset;
      top: unset;
      margin-top: 0.3rem;
    }

    &:hover .hover-info{
      visibility: visible;
    }

    &:hover .pic{
      filter: none;
    }
  }
}
</style>
