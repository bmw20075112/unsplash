<template>
    <section class="profile-page">
        <!-- <div class="profile">
            
            <input type="file" name="" id="" @change="onFileSelected">
            <button @click="upload">upload</button>
        </div> -->
        <div class="profile-wrapper">
            <div class="">
                <i class="fas fa-user profile"></i>
            </div>
            
            <div class="">
                <h2>{{$store.getters.userName}}</h2>
                <button @click="signout()">signout</button>
            </div>
        </div>
        <PhotoWall/>
    </section>
</template>

<script>
import firebase from 'firebase';
import PhotoWall from '@/components/PhotoWall.vue';
import {storage} from '../fetch/firebase.js';
export default {
    components:{
        PhotoWall
    },

    data() {
        return {
            selectedFile: null
        }
    },

    methods: {
        signout(){
            firebase.auth().signOut().then(()=>{
                this.$store.dispatch('userAction', {type: 'clear'});
                this.$store.dispatch('likeListAction', {type: 'clear'});
            }).then(()=>{
                this.$router.push({name: 'Home'});
            })

        },

        onFileSelected(e){
            this.selectedFile = e.target.files[0];
            console.log(e);
        },

        upload(){
            storage.ref('photo/'+ this.selectedFile.name).put(this.selectedFile)
            .then(res=>{
                console.log(res);
            })
        }
    },
}
</script>

<style lang='scss'>
.profile-page{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile{
    color: $second;
    font-size: 3rem;
    padding: 1rem;
    border-radius: 100%;
    border: 5px solid $second;
}

.profile-wrapper{
    display: flex;
    align-items: center;
    margin: 1rem 0;
}
</style>