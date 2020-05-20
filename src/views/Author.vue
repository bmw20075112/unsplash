<template>
    <div class="author-page-wrapper">
        <section class="author-intro">
            <img :src="authorInfo.profile_image.large" alt="author's profile image"
            class="author-profile-image">
            <div class="author-info">
                <div class="name-wrappe">
                    <h1 class="author-name">{{authorInfo.name}}</h1>
                </div>
                

                <div class="location-wrapper">
                    <i class="fas fa-map-marker-alt location" v-if="authorInfo.location">
                        <span class="font-fix location-text">{{authorInfo.location}}</span>
                    </i>
                </div>

                <div class="icon-group">
                    <i class="fas fa-globe-americas social-link" v-if="authorInfo.portfolio_url">
                        <a :href="authorInfo.portfolio_url" target="_blank" class="social-link-text">
                            <span class="font-fix">Site</span>
                        </a>
                    </i>
                
                
                    <i class="fab fa-instagram-square social-link" v-if="authorInfo.instagram_username">
                        <a :href="instagramUrl" target="_blank" class="social-link-text">
                            <span class="font-fix">IG</span>
                        </a>
                    </i>

                    <i class="fab fa-twitter-square social-link" v-if="authorInfo.twitter_username">
                        <a :href="twitterUrl" target="_blank" class="social-link-text">
                            <span class="font-fix">Twitter</span>
                        </a>
                    </i>
                    
                </div>
            </div>
        </section>

        <section class="author-bio">
            <p class="bio">{{authorInfo.bio}}</p>
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
$social-size-medium: 1.2rem;
$social-size-mobile: 0.8rem;
.author-page-wrapper{
    min-width: $medium;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}

.author-intro{
    display: flex;
    align-items: center;
}

.author-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.author-profile-image{
    border-radius: 100%;
    padding: 0 0.5rem;
}

.author-name{
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    
}


.location, .social-link{
    font-size: $social-size;
    padding: 0 0.5rem;
}

.location{
    margin-bottom: 1rem;
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

.bio{
    max-width: $medium;
    padding: 1rem;
    text-align: left;
}

@media only screen and (max-width: $medium){
    .author-page-wrapper{
        min-width: unset;
        width: 100vw;
    }

    .author-name{
        font-size: 2rem;
    }

    .social-link, .location{
        font-size: $social-size-medium;
    }
    .social-link-text{
        font-size: $social-size-medium;
    }
}

@media only screen and (max-width: $mobile){ 
    // .author-intro{
    //     align-self: start;
    // }

    .author-info{
        align-items: center;
    }

    .author-name{
        font-size: 5vw;
    }

    .location, .social-link{
        font-size: $social-size-mobile;
        padding: 0 0.4rem;
    }

    .location{
        font-size: $social-size-mobile;
    }
    .social-link-text{
        font-size: $social-size-mobile;
    }
}
</style>