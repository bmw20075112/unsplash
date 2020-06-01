<template>
    <section>
        <ul class="pics-align">
            <li class="pic-wrapper" v-for="pic in pics" :key="pic.id">
                <img class="pic" :src="pic.urls.small" :alt="pic.alt_description" 
                @click="toPhoto(pic)">

                <div class="hover-info">
                    <div class="author ml" @click="toAuthor(pic.user.username)">
                        <img class="user-image" :src="pic.user.profile_image.small"
                        alt="Author Name">
                        <p class="user-name">{{pic.user.name}}</p>
                    </div>
                    
                    <div class="options" @click="likeToggle(pic)">
                        <i class="fa-heart like"
                        :class="[likeList.findIndex(el=>el.id===pic.id)!==-1? fas: far]">
                        </i>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import firebase from 'firebase';
import {db} from '../fetch/firebase';
import common from '@/mixins/common.js'
import {getAuthorList} from '@/fetch/search.js';
import {mapGetters} from 'vuex'
export default {
    mixins: [common],

    methods: {
        toPhoto(pic){
            this.$store.dispatch('selectAction',pic)
            .then(()=>{
                this.$store.dispatch('showModalAction', true);
                this.$router.push({name: this.$route.name, query:{id: pic.id}})
            })
        }
    },

    computed:{
        ...mapGetters([
            'showModal',
        ]),

        pics(){
            if(this.$route.name==='Author'){
                return this.$store.getters.authorList;
            }else if(this.$route.name==='Profile'){
                return this.$store.getters.likeList;
            }else{
                return this.$store.getters.pics;
            }
        },
    },

    created(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                db.collection('users').where("userID",'==', user.uid).get()
                .then(snapshots=>{
                    snapshots.docs.forEach(snapshot=>{
                        this.$store.dispatch('userAction', {type: 'id', value: snapshot.data().userID});
                        this.$store.dispatch('userAction', {type: 'name', value: snapshot.id});
                        this.$store.dispatch('likeListAction', snapshot.data().likeList);
                    })
                })
            }
        });
    },

    watch: {
        $route(){
            if('id' in this.$route.query){
                this.$store.dispatch('showModalAction', true);
                document.body.classList.add('freeze');
            }else{
                this.$store.dispatch('showModalAction', false);
                document.body.classList.remove('freeze');
            }
        }
    },
}
</script>

<style lang='scss'>
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
    align-items: flex-start;
}

.options{
    margin-right: 0.5rem;
}

.ml{
    margin-left: 0.5rem;
}

.author-mobile{
    margin-bottom: 0.5rem;
}

.freeze{
    overflow-y: hidden;
}

.like{
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

@media only screen and (max-width:$medium){
    .pics-align{
        column-gap: 0;
        column-width: unset;
        margin: unset;
    }

    .pic-wrapper{
        width: 100%;
        margin-bottom: 2rem;
    }

    .pic{
        width: 100%;
    }

    .pic-wrapper{
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

    .like{
        color: $contrast;
    }
}
</style>