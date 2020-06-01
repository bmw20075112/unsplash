<template>
    <section>
        <!-- <button @click="current()">click</button> -->
        <button @click="signout()">signout</button>
        <input type="file" name="" id="" @change="onFileSelected">
        <button @click="upload">upload</button>
        <!-- <PhotoWall /> -->
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
            firebase.auth().signOut().then(()=>console.log('done'));
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

        // current(){
        //     firebase.auth().onAuthStateChanged(user=>{
        //         if(user){
        //             console.log(user);
        //         }
        //     });
        // },
    },
}
</script>

<style>

</style>