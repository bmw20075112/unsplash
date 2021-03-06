import { mapState } from 'vuex';
import { db } from '../fetch/firebase';
import firebase from 'firebase/app';
import { getAuthorList } from '@/fetch/search.js'
let common = {
  data () {
    return {
      fas: 'fas',
      far: 'far'
    }
  },

  methods: {
    likeToggle (pic) {
      if (this.userID) {
        let order = this.likeList.findIndex(el => el.id === pic.id);
        let pushValue = {
          id: pic.id,
          width: pic.width,
          height: pic.width,
          description: pic.description,
          alt_description: pic.alt_description,
          links: {
            download_location: pic.links.download_location
          },
          urls: {
            regular: pic.urls.regular,
            small: pic.urls.small
          },
          user: {
            bio: pic.user.bio,
            first_name: pic.user.first_name,
            id: pic.user.id,
            instagram_username: pic.user.instagram_username,
            location: pic.user.location,
            name: pic.user.name,
            portfolio_url: pic.user.portfolio_url,
            profile_image: {
              large: pic.user.profile_image.large,
              small: pic.user.profile_image.small
            },
            twitter_username: pic.user.twitter_username,
            username: pic.user.username
          }
        }
        if (order === -1) {
          this.$store.commit('likeListMutate', { type: 'push', value: pushValue });
          this.$store.commit('notifyMutate');
          db.collection('users').doc(this.userName).update({
            likeList: firebase.firestore.FieldValue.arrayUnion(pushValue)
          });
        } else {
          this.$store.commit('likeListMutate', { type: 'splice', value: order });
          db.collection('users').doc(this.userName).update({
            likeList: firebase.firestore.FieldValue.arrayRemove(pushValue)
          });
        }
      } else {
        this.$router.push({ name: 'Identity' });
      }
    },

    loadEnd () {
      this.$store.commit('loadMutate', false);
    },

    toAuthor (username) {
      return getAuthorList(username, {
        per_page: 20
      })
        .then(data => {
          this.$store.commit('authorListMutate', data.data);
          this.$router.push({ name: 'Author', query: { user: username } });
        })
    }
  },

  computed: {
    ...mapState([
      'likeList',
      'load',
      'showModal',
      'userID',
      'userName',
      'windowWidth'
    ])
  }
}

export default common;
