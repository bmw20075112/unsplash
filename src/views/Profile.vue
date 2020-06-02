<template>
    <section>
        <i class="fas fa-user nav-button"></i>
        <!-- <div class="profile">
            
            <input type="file" name="" id="" @change="onFileSelected">
            <button @click="upload">upload</button>
        </div> -->
        <button @click="signout()">signout</button>
        <PhotoWall />
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

<style>

</style>