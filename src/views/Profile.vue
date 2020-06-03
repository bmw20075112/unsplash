<template>
    <section>
        <div class="profile-image">
            <img src="" alt="">
        </div>
        <i class="fas fa-user profile"></i>
        <!-- <div class="profile">
            
            <input type="file" name="" id="" @change="onFileSelected">
            <button @click="upload">upload</button>
        </div> -->
        <button @click="signout()">signout</button>
        <PhotoWall class="profile-wall"/>
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
                this.$router.push({name: 'Home'});
            });
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
.profile-wall{
    max-width: 1200px;
}
.profile{
    color: $second;
    font-size: 3rem;
    padding: 1rem;
    border-radius: 100%;
    border: 5px solid $second;
}
</style>