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
                    
                    <div class="options" @click="likeToggle(pic.id)">
                        <i class="fa-heart like"
                        :class="[likeList.findIndex(el=>el===pic.id)!==-1? fas: far]">
                        </i>
                    </div>
                </div>            
            </li>
        </ul>
    </section>
</template>

<script>
import firebase from 'firebase';
import db from '../fetch/firebase';
import {getAuthorList} from '@/fetch/search.js';
export default {
    data() {
        return {
            uid: '',
            docID: '',
            destination:'',
            fas:'fas',
            far:'far'
        }
    },

    methods: {
        toPhoto(pic){
            this.$store.dispatch('selectAction',pic)
            .then(()=>{
                this.$store.dispatch('showModalAction', true);
                this.$router.push({name: this.destination, query:{id: pic.id}})
            })
        },

        toAuthor(username){
            return getAuthorList(username,{
                per_page: 20
            })
            .then(data=>{
                console.log(data);
                this.$store.dispatch('authorListAction', data.data);
                this.$router.push({name:'Author'});
            })
        },

        likeToggle(id){
            if(firebase.auth().currentUser){
                if(this.likeList.findIndex(el=>el===id)===-1){
                    this.$store.dispatch('likeListAction', {type:'push', value: id});
                    db.collection('users').doc(this.docID).update({
                    likeList: firebase.firestore.FieldValue.arrayUnion(id)
                });
                    

                }else{
                    this.$store.dispatch('likeListAction', {type:'splice', value: id});
                    db.collection('users').doc(this.docID).update({
                        likeList: firebase.firestore.FieldValue.arrayRemove(id)
                    });
                }
            }else{
                this.$router.push({name: 'Identity'});
            }
            
        },
    },

    computed:{
        pics(){
            if(this.$route.name==='Author'){
                return this.$store.getters.authorList;
            }else{
                return this.$store.getters.pics;
            }
        },

        showModal(){
            return this.$store.getters.showModal;
        },

        likeList(){
            return this.$store.getters.likeList;
        }
    },

    created(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.uid=user.uid;
                db.collection('users').where("userID",'==', user.uid).get()
                .then(docs=>{
                    docs.forEach(doc=>{
                        this.docID=doc.id;
                    })
                })
            }
        })
    },

    mounted(){
        this.destination=this.$route.name;
    },

    watch: {
        $route(){
            if(this.$route.query.id===undefined){
                this.$store.dispatch('showModalAction', false);
                document.body.classList.remove('freeze');
            }else{
                document.body.classList.add('freeze');
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

    .search-like{
        color: grey;
    }
}
</style>