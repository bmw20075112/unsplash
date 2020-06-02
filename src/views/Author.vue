<template>
    <div class="author-page-wrapper">
        <section class="author-intro">
            <img :src="authorInfo.profile_image.large" alt="author's profile image"
            class="author-profile-image">
            <div class="author-info">
                <h2 class="author-name">{{authorInfo.name}}</h2>
            
                <div class="icon-group">
                    <i class="fab fa-instagram-square social-link" v-if="authorInfo.instagram_username">
                        <a :href="instagramUrl" target="_blank" rel="noopener noreferrer"
                        class="social-link-text">
                            <span class="font-fix">IG</span>
                        </a>
                    </i>

                    <i class="fab fa-twitter-square social-link" v-if="authorInfo.twitter_username">
                        <a :href="twitterUrl" target="_blank" rel="noopener noreferrer"
                        class="social-link-text">
                            <span class="font-fix">Twitter</span>
                        </a>
                    </i>
                    
                    <i class="fas fa-globe-americas social-link" v-if="authorInfo.portfolio_url">
                        <a :href="authorInfo.portfolio_url" target="_blank" rel="noopener noreferrer"
                        class="social-link-text">
                            <span class="font-fix">Website</span>
                        </a>
                    </i>
                </div>
            </div>
        </section>

        <section class="author-bio">
            <i class="fas fa-map-marker-alt location" v-if="authorInfo.location">
                <span class="font-fix location-text">{{authorInfo.location}}</span>
            </i>
            <p class="bio">{{authorInfo.bio}}</p>
        </section>

        <h3 class="collection-name">{{authorInfo.first_name}}'s Photos</h3>
        <hr class="cutLine">

        <PhotoWall/>

    </div>
</template>

<script>
import PhotoWall from '@/components/PhotoWall.vue';
export default {
    components:{
        PhotoWall
    },

    computed: {
        authorList(){
            return this.$store.getters.authorList;
        },

        authorInfo(){
            return this.$store.getters.authorList[0].user;
        },

        instagramUrl(){
            return `https://www.instagram.com/${this.authorInfo.instagram_username}`
        },

        twitterUrl(){
            return `https://twitter.com/${this.authorInfo.twitter_username}`
        }
    },
}
</script>

<style lang='scss'>
$social-size: 1.5rem;
$social-size-mobile: 1.2rem;
.author-page-wrapper{
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.author-intro{
    display: flex;
    align-items: center;
    align-self: center;
}

.author-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.author-profile-image{
    border-radius: 100%;
    padding: 0 1rem;
}

.author-name{
    font-size: 3rem;
    line-height: 1.2;
    text-align: center;
    font-weight: bold;
}

.social-link{
    font-size: $social-size;
    padding: 1rem 0.5rem 0 0.5rem;
}

.location-text{
    padding-left: 0.3rem;
}

.social-link{
    color: $contrast;
    &-text{
        text-decoration: none;
        color: $contrast;
        font-size: $social-size;
        padding-left: 0.3rem;
    }
}

.font-fix{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
}

.location{
    margin: 1rem 0;
}

.author-bio{
    padding: 0.5rem 1rem 3rem 1rem;
    text-align: center;
}

.bio{
    max-width: $medium;
    margin: 0 auto;
}

.cutLine{
    width: 95%;
    border: 1px dashed grey;
}

.collection-name{
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: -0.5rem;
}

@media only screen and (max-width: $medium){
    .author-name{
        font-size: 7vw;
        text-align: left;
    }

    .author-bio{
        text-align: left;
    }

    .icon-group{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .author-info{
        // align-items: center;
        align-items: flex-start;
    }
}

@media only screen and (max-width: $mobile){
    

    .social-link{
        font-size: $social-size-mobile;
        padding: 1rem 0.5rem 0 0;
        &-text{
            font-size: $social-size-mobile;
        }
    }

    .collection-name{
        font-size: 6vw;
    }
}
</style>