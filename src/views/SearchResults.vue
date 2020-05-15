<template>
    <section>
        <ul class="pics-align">
            <li class="pic-wrapper" v-for="pic in pics" :key="pic.id">
                <div class="author ml author-mobile" v-if="width<=768">
                    <img class="user-image" :src="pic.user.profile_image.small"
                    alt="Author Name">
                    <p class="user-name">{{pic.user.name}}</p>
                </div>

                <img class="pic" :src="pic.urls.small" :alt="pic.alt_description" @click="toPhoto(pic)">
                <div class="hover-info" v-if="width>768">
                    <div class="author ml">
                        <img class="user-image" :src="pic.user.profile_image.small"
                        alt="Author Name">
                        <p class="user-name">{{pic.user.name}}</p>
                    </div>

                    <div class="options" @click="likeToggle(pic.id)">
                        <i class="fas fa-heart search-like" :class="{'like-click':likeList.findIndex(el=>el===pic.id)!==-1}"></i>
                    </div>
                </div>            
            </li>
        </ul>

        <section class="modal" v-if="showModal" @click.stop.self="close">
            <router-view class="modal-content"/>
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            likeList:[],
            width:0,
            showModal:false,
        }
    },

    methods: {
        toPhoto(pic){
            this.$store.dispatch('selectAction',pic)
            .then(()=>{
                this.showModal=true;
                document.body.classList.add('freeze-bg');
                this.$router.push({name:'PhotoModal', params:{id:pic.id}});
            })
        },

        close(){
            this.$router.go(-1);
        },

        likeToggle(id){
            if(this.likeList.findIndex(el=>el===id)===-1){
                this.likeList.push(id);
            }else{
                this.likeList.splice(id,1);
            }
        },

        handleResize(){
            this.width=window.innerWidth;
        }
    },

    computed:{
        pics(){
            return this.$store.getters.pics;
        },

        url(){
            return this.$store.getters.pics.urls;
        },
    },

    created(){
        window.addEventListener('resize',this.handleResize);
        this.handleResize();
    },

    destroyed(){
       window.removeEventListener('resize',this.handleResize);
    },

    watch: {
        $route(){
            if(this.$route.name==='SearchRes'){
                document.body.classList.remove('freeze-bg');
                this.showModal=false;
            }else if(this.$route.name==='PhotoModal'){
                this.showModal=true;
            }
        }
    }
}
</script>

<style lang='scss'>
@import '../styles/user.scss';
.pics-align{
    column-gap: 1rem;
    column-width: 300px;
    margin:0 1rem;
}

.pic-wrapper{
    position: relative;
    display: inline-block;

    margin-bottom:1rem;
    &:hover .hover-info{
        visibility: visible;
    }
    &:hover .pic{
        filter: brightness(80%);
    }
}

.pic{
    transition:all 0.5s ease;
}

.hover-info{
    visibility: hidden;
    position: absolute;
    width: 100%;
    top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.options{
    margin-right: 0.5rem;
}

.search-like{
    color: white;
    font-size: 1.6rem;
    cursor: pointer;
    // &:hover{
    //     color: $contrast;
    // }
}

.like-click{
    color: $contrast;
}
.ml{
    margin-left: 0.5rem;
}

.author-mobile{
    margin-bottom: 0.5rem;
}

//Modal Setting
.modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba( 0, 0, 0, 0.5);
    &-content{
        position: absolute;
        left: 50%;
        top: 75%;
        transform: translate(-50%,-75%);
        overflow: auto;
    }
}

.freeze-bg{
    overflow-y: hidden;
}

@media only screen and (max-width:$medium){
    .pics-align{
        column-gap: 0;
        column-width: unset;
        margin: unset;
    }

    .pic-wrapper{
        width: 100%;
        margin-bottom: 3rem;
    }

    .pic{
        width: 100%;
    }
//
    .pic-wrapper{
        &:hover .hover-info{
            visibility: hidden;
        }
        &:hover .pic{
            filter: unset;
        }
    }

    .hover-info{
        visibility: visible;
        position: absolute;
        width: 100%;
        top: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .modal-content{
        top: 0;
        bottom: 0;
        transform: translate(-50%,0);
    }
}
</style>