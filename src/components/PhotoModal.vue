<template>
  <section class="pic-only">
    <div
      class="progress"
      :style="{width: progressPercent}"
    />

    <header class="pic-only_header">
      <div class="author  pic-only_author">
        <img
          class="user-image"
          :src="selectPhoto.user.profile_image.small"
          alt="Author Name"
        >
        <p
          class="user-name black"
          @click="toAuthor(selectPhoto.user.username)"
        >
          {{ nameLimit }}
        </p>
      </div>
      <div class="pic-only_symbol_wrapper">
        <button
          class="symbol-button mr"
          @click="download(selectPhoto.links.download_location)"
        >
          <i class="fas fa-download" />
        </button>

        <button
          class="symbol-button"
          @click="likeToggle(selectPhoto)"
        >
          <i
            class="fa-heart like-mobile"
            :class="[likeList.findIndex(el=>el.id===selectPhoto.id)!==-1? fas: far]"
          />
        </button>
      </div>
    </header>

    <Spinner />

    <figure
      class="modalPic-container fade"
      v-show="!load"
    >
      <img
        :class="[orientLandscape?landscape:portrait]"
        :src="selectPhoto.urls.regular"
        :alt="selectPhoto.alt_description"
        @load="loadEnd"
      >
      <figcaption class="reference">
        Photo by <a
          target="_blank"
          rel="noopener noreferrer"
          :href='userLink'
        >{{ nameLimit }}</a>
        on <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://unsplash.com/?utm_source=Imager&utm_medium=referral"
        >Unsplash</a>
      </figcaption>
    </figure>

    <div class="des">
      <p class="description">
        {{ description }}
      </p>
    </div>

    <Notify class="notify-align" />
  </section>
</template>

<script>
import { blobDecode } from '@/fetch/search.js';
import { mapState } from 'vuex';
import accessKeys from '../fetch/access-key.js';
import Notify from '@/components/Notify.vue';
import Spinner from '@/components/Spinner.vue';
import common from '@/mixins/common.js';
import axios from 'axios';
export default {
  mixins: [common],
  components: {
    Notify,
    Spinner
  },
  data () {
    return {
      progress: 0,
      portrait: 'pic_portrait',
      landscape: 'pic_landscape'
    }
  },

  methods: {
    download (downloadLink) {
      let picID = this.selectPhoto.id;
      return blobDecode(downloadLink)
        .then(res => {
          axios.get(res.data.url, {
            responseType: 'blob',
            onDownloadProgress: event => {
              let percentComplete = Math.round((event.loaded / event.total) * 100);
              this.progress = percentComplete;
            }
          }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${picID}.jpeg`);
            document.body.appendChild(link);
            link.click();
          })
        })
    }
  },

  computed: {
    ...mapState([
      'selectPhoto'
    ]),

    description () {
      let des = this.selectPhoto.description || this.selectPhoto.alt_description;
      if (!des) {
        return '';
      }
      return des;
    },

    downloadLink () {
      return this.selectPhoto.links.download_location + `?client_id=${accessKeys.client_id}`;
    },

    nameLimit () {
      if (this.windowWidth > 768) {
        if (this.selectPhoto.user.name.length > 30) {
          return this.selectPhoto.user.first_name;
        }
        return this.selectPhoto.user.name;
      } else if (this.windowWidth <= 768 && this.windowWidth > 480) {
        if (this.selectPhoto.user.name.length > 25) {
          return this.selectPhoto.user.first_name;
        }
        return this.selectPhoto.user.name;
      } else {
        if (this.selectPhoto.user.name.length > 20) {
          return this.selectPhoto.user.first_name;
        }
        return this.selectPhoto.user.name;
      }
    },

    orientLandscape () {
      return this.$store.getters.orientLandscape;
    },

    progressPercent () {
      if (this.progress !== 100) {
        return this.progress + '%';
      } else {
        return 0;
      }
    },

    userLink () {
      return `https://unsplash.com/@${this.selectPhoto.user.username}?utm_source=Imager&utm_medium=referral`;
    }
  }
}
</script>

<style lang='scss'>
@import '../styles/user.scss';
.des{
  flex-flow: 1;
  & .description{
    text-align: left;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
}

.fade{
  animation: fade 0.3s ease-in;
}

.like-mobile{
  cursor: pointer;
  color: $contrast;
}

.modalPic-container{
  // max-height: 90%;
  width: 100%;
  overflow: auto;
}

.pic_landscape{
  max-height: 97%;
}

.pic-only{
  width: 90vw;
  height: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: $background;
  border-radius: 1rem 1rem 0 0;
  overflow-y: auto;

  &_header{
    display: flex;
    padding: 0.5rem;
    justify-content: space-between;
    align-items: center;
  }
}

.pic_portrait{
  max-height: 97%;
}

.progress{
  position: absolute;
  background-color: $contrast;
  height: 5px;
}

.reference{
  font-size: 0.8rem;
  color: grey;
  & a{
      color: $contrast;
  }
}

.symbol-button{
  background-color: white;
  border: none;
  color: grey;
  box-shadow: 0 1px 3px grey;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:focus{
      outline: none;
  }
}
@keyframes fade{
  0%{
    opacity: 0.2;
  }

  100%{
    opacity: 1;
  }
}

@media only screen and (max-width:$medium){
  .modalPic-container{
    max-height: none;
    overflow: unset;
  }

  .pic-only{
    width: 100vw;
    height: unset;
    border-radius: 0;
    margin-top: 3rem;
  }

  .pic_portrait{
    max-height: none;
    width: 100%;
  }

  .user-image{
    width: 1.5rem;
  }
}

/* additional tools*/
.black{
  color:black;
}

.mr{
  margin-right: 2px;
}
</style>
