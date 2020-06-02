import {mapGetters} from 'vuex';
import {db} from '../fetch/firebase';
import firebase from 'firebase';
import {getAuthorList} from '@/fetch/search.js'
let common={
    data() {
        return {
            fas:'fas',
            far:'far'
        }
    },

    methods: {
        likeToggle(pic){
            if(this.userID){
                let order=this.likeList.findIndex(el=>el.id===pic.id);
                let pushValue={
                    id: pic.id,
                    width: pic.width,
                    height: pic.width,
                    description: pic.description,
                    alt_description: pic.alt_description,
                    links:{
                        download_location: pic.links.download_location
                    },
                    urls:{
                        regular: pic.urls.regular,
                        small: pic.urls.small
                    },
                    user:{
                        bio: pic.user.bio,
                        first_name: pic.user.first_name,
                        id: pic.user.id,
                        instagram_username: pic.user.instagram_username,
                        location: pic.user.location,
                        name: pic.user.name,
                        portfolio_url: pic.user.portfolio_url,
                        profile_image:{
                            large: pic.user.profile_image.large,
                            small: pic.user.profile_image.small
                        },
                        twitter_username: pic.user.twitter_username,
                        username: pic.user.username
                    }
                }
                if(order===-1){
                    this.$store.dispatch('likeListAction', {type:'push', value: pushValue});
                    db.collection('users').doc(this.userName).update({
                        likeList: firebase.firestore.FieldValue.arrayUnion(pushValue)
                    });
                }else{
                    this.$store.dispatch('likeListAction', {type:'splice', value: order});
                    db.collection('users').doc(this.userName).update({
                        likeList: firebase.firestore.FieldValue.arrayRemove(pushValue)
                    });
                }
            }else{
                this.$router.push({name: 'Identity'});
            }
            
        },

        toAuthor(username){
            return getAuthorList(username,{
                per_page: 20
            })
            .then(data=>{
                console.log(data);
                this.$store.dispatch('authorListAction', data.data);
                this.$router.push({name:'Author', query:{user: username}});
            })
        }
    },

    computed: {
        ...mapGetters([
            'likeList',
            'showModal',
            'userID',
            'userName',
            'windowWidth'
        ]),
    },
}

export default common;