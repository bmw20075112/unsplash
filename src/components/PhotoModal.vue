<template>
    <section class="pic-only">
        <div class="progress" :style="{width: progressPercent}"></div>
        <header class="pic-only_header">
            <div class="author  pic-only_author">
                <img class="user-image" :src="pic.user.profile_image.small"
                alt="Author Name">
                <p class="user-name black">{{pic.user.name}}</p>
            </div>
            <div class="pic-only_symbol_wrapper">
                <button class="symbol-button mr" @click="download(pic.links.download_location)">
                    <i class="fas fa-download"></i>
                </button>

                <button class="symbol-button">
                    <i class="far  fa-heart"></i>
                </button>
            </div>
        </header>
        
        <figure class="modalPic-container">
            <img :class="[orient?landscape:portrait]"
            :src="pic.urls.regular" :alt="pic.alt_description">
        </figure>
        
        <div class="des">
            <p class="description">{{description}}</p>
        </div>
        <!-- <button>download</button> -->
    </section>
</template>

<script>
import {downloadPic} from '@/fetch/search.js';
export default {
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
            return downloadPic(downloadLink)
            .then(res=>{
                let xhr=new XMLHttpRequest();
                xhr.open('GET', res.data.url);
                xhr.responseType='blob';
                xhr.addEventListener('progress', evt=>{
                    if(evt.lengthComputable){
                        let percentComplete = (evt.loaded / evt.total).toFixed(2);
                        this.progress=percentComplete;
                    }
                })

                xhr.addEventListener('loadend', evt=>{
                    this.progress=0;
                })

                xhr.onload=function(){
                    if(xhr.status != 200){
                        alert(`Error ${xhr.status}: ${xhr.statusText}`);
                    }else{
                        let response= xhr.response;
                        const url = window.URL.createObjectURL(new Blob([response]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${picID}.jpeg`);
                        document.body.appendChild(link);
                        link.click();
                    }
                }
                xhr.send();
            })
            
        }
    },

    computed: {
        pic(){
            return this.$store.getters.selectPic;
        },

        downloadLink(){
            return this.pic.links.download_location+`?client_id=${accessKeys.client_id}`;
        },

        progressPercent(){
            return this.progress*100+'%';
        },

        orient(){
            return this.$store.getters.orientLandscape;
        },

        description(){
            let des= this.pic.description || this.pic.alt_description;
            if(!des){
               return '';
            }
            let res= des.split(' ');
            if(res.length>30){
                return res.slice(0,29).join(' ')+'......';
            }
            return res.join(' ');
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
    flex-grow: 1;
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
    max-height: 100%;
}

.pic_portrait{
    max-height: 100%;
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