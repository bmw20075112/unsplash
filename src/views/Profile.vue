<template>
    <section>
        <!-- <button @click="current()">click</button> -->
        <button @click="signout()">signout</button>
        <!-- <PhotoWall /> -->
    </section>
</template>

<script>
import firebase from 'firebase';
import PhotoWall from '@/components/PhotoWall.vue';
export default {
    components:{
        PhotoWall
    },

    methods: {
        signout(){
            firebase.auth().signOut().then(()=>console.log('done'));
        },

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