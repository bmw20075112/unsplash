<template>
    <div>
        <section class="author-intro">
            <img :src="authorInfo.profile_image.large" alt="author's profile image"
            class="author-profile-image">
            <div class="author-info">
                <h1 class="author-name">{{authorInfo.name}}</h1>
                <i class="fas fa-map-marker-alt location" v-if="authorInfo.location">
                    {{authorInfo.location}}
                </i>

                <i class="fas fa-globe-americas social-link" v-if="authorInfo.portfolio_url">
                    <a :href="authorInfo.portfolio_url" target="_blank" class="social-link-text">
                        Site
                    </a>
                </i>

                <i class="fab fa-instagram-square social-link" v-if="authorInfo.instagram_username">
                    <a :href="instagramUrl" target="_blank" class="social-link-text">
                        Instagram
                    </a>
                </i>

                <i class="fab fa-twitter-square social-link" v-if="authorInfo.twitter_username">
                    <a :href="twitterUrl" target="_blank" class="social-link-text">
                        Twitter
                    </a>
                </i>
                <p class="bio">{{authorInfo.bio}}</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
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
.author-intro{
    max-width: $medium;
    display: flex;
    align-items: center;
    margin: 0 auto;
}

.author-info{
    padding: 0.5rem;
}

.author-profile-image{
    border-radius: 100%;
    padding-left: 0.5rem;
}

.author-name{
    font-size: 3rem;
}

.location{
    font-size: $social-size;
    padding: 0 0.5rem;
}

.social-link{
    color: $contrast;
    padding: 0 0.5rem;
    font-size: $social-size;
    &-text{
        text-decoration: none;
        color: $contrast;
        font-size: $social-size;
    }
}

.bio{
    padding-top: 1rem;
}
</style>