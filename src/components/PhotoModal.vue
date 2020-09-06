<template>
    <section class="pic-only">
        <div class="progress" :style="{width: progressPercent}"></div>
        
        <header class="pic-only_header">
            <div class="author  pic-only_author">
                <img class="user-image" :src="pic.user.profile_image.small"
                alt="Author Name">
                <p class="user-name black" @click="toAuthor(pic.user.username)">{{nameLimit}}</p>
            </div>
            <div class="pic-only_symbol_wrapper">
                <button class="symbol-button mr" @click="download(pic.links.download_location)">
                    <i class="fas fa-download"></i>
                </button>

                <button class="symbol-button" @click="likeToggle(pic)">
                    <i class="fa-heart like-mobile"
                        :class="[likeList.findIndex(el=>el.id===pic.id)!==-1? fas: far]">
                    </i>
                </button>
            </div>
        </header>
        
        <Spinner />

        <figure class="modalPic-container fade" v-show="!load">
            <img :class="[orient?landscape:portrait]"
            :src="pic.urls.regular" :alt="pic.alt_description" @load="loadEnd">
            <figcaption class="reference">
                Photo by <a target="_blank" rel="noopener noreferrer" :href='userLink'>{{nameLimit}}</a> 
                on <a target="_blank" rel="noopener noreferrer"
                href="https://unsplash.com/?utm_source=Imager&utm_medium=referral">Unsplash</a>
            </figcaption>
        </figure>
        
        <div class="des">
            <p class="description">{{description}}</p>
        </div>

        <Notify class="notify-align"/>
    </section>
</template>

<script>
import {blobDecode} from '@/fetch/search.js';
import Notify from '@/components/Notify.vue';
import Spinner from '@/components/Spinner.vue';
import common from '@/mixins/common.js';
import axios from "axios";
export default {
    mixins: [common],
    components:{
        Notify,
        Spinner
    },
    data() {
        return {
            progress: 0,
            portrait:'pic_portrait',
            landscape:'pic_landscape',
        }
    },

    methods: {
        download(downloadLink){
            let picID=this.pic.id;
            return blobDecode(downloadLink)
            .then(res=>{
                axios.get(res.data.url, {
                    responseType: 'blob',
                    onDownloadProgress: event=>{
                        let percentComplete = Math.round((event.loaded / event.total)*100);
                        this.progress=percentComplete;
                    },
                }).then(response =>{
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
        description(){
            let des= this.pic.description || this.pic.alt_description;
            if(!des){
               return '';
            }
            return des;
        },

        downloadLink(){
            return this.pic.links.download_location+`?client_id=${accessKeys.client_id}`;
        },

        nameLimit(){
            if(this.windowWidth>768){
                if(this.pic.user.name.length>30){
                    return this.pic.user.first_name;
                }
                return this.pic.user.name;
            }else if(this.windowWidth<=768 && this.windowWidth>480){
                if(this.pic.user.name.length>25){
                    return this.pic.user.first_name;
                }
                return this.pic.user.name;
            }else{
                if(this.pic.user.name.length>20){
                    return this.pic.user.first_name;
                }
                return this.pic.user.name;
            }
        },

        orient(){
            return this.$store.getters.orientLandscape;
        },

        pic(){
            return this.$store.getters.selectPic;
        },

        progressPercent(){
            if(this.progress!==100){
                return this.progress+'%';
            }else{
                return 0;
            }
        },

        userLink(){
            return `https://unsplash.com/@${this.pic.user.username}?utm_source=Imager&utm_medium=referral`
        }
    },
}
</script>

<style lang='scss'>
@import '../styles/user.scss';
.progress{
    position: absolute;
    background-color: $contrast;
    height: 5px;
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

.des{
    flex-flow: 1;
    & .description{
        text-align: left;
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
}

.modalPic-container{
    // max-height: 90%;
    width: 100%;
    overflow: auto;
}

.pic_landscape{
    max-height: 97%;
}

.pic_portrait{
    max-height: 97%;
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

.reference{
    font-size: 0.8rem;
    color: grey;
    & a{
        color: $contrast;
    }
}

.like-mobile{
    cursor: pointer;
    color: $contrast;
}

.fade{
    animation: fade 0.3s ease-in;
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
    .pic-only{
        width: 100vw;
        height: unset;
        border-radius: 0;
        margin-top: 3rem;
    }

    .user-image{
        width: 1.5rem;
    }

    .modalPic-container{
        max-height: none;
        overflow: unset;
    }

    .pic_portrait{
        max-height: none;
        width: 100%;
    }
}

/* additional tools*/
.mr{
    margin-right: 2px;
}
.black{
    color:black;
}
</style>