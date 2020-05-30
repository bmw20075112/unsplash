import {mapGetters} from 'vuex';
import db from '../fetch/firebase';
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
        likeToggle(id){
            if(this.userID){
                let order=this.likeList.findIndex(el=>el===id);
                if(order===-1){
                    this.$store.dispatch('likeListAction', {type:'push', value: id});
                    db.collection('users').doc(this.userName).update({
                    likeList: firebase.firestore.FieldValue.arrayUnion(id)
                });
                    

                }else{
                    this.$store.dispatch('likeListAction', {type:'splice', value: order});
                    db.collection('users').doc(this.userName).update({
                        likeList: firebase.firestore.FieldValue.arrayRemove(id)
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
            'userID',
            'userName',
            'likeList'
        ]),
    },
}

export default common;