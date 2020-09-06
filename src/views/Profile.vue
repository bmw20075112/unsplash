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
            
            <div class="foo-wrapper">
                <h2 style="font-size:2rem;">{{$store.getters.userName}}</h2>
                <button @click="signout()" class="signout">Signout</button>
            </div>
        </div>
        <h3 style="font-size:1.5rem;">{{$store.getters.userName}}'s collection</h3>
        <h5 class="like-count">Total Counts: <span style="font-weight: bold">{{$store.getters.likeList.length}}</span></h5>
        <PhotoWall/>
    </section>
</template>

<script>
import {auth} from '../fetch/firebase.js'
import PhotoWall from '@/components/PhotoWall.vue';
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
            auth.signOut().then(()=>{
                this.$store.dispatch('userAction', {type: 'clear'});
                this.$store.dispatch('likeListAction', {type: 'clear'});
            }).then(()=>{
                this.$router.push({name: 'Home'});
            })
        },
    },
}
</script>

<style lang='scss'>
.profile-page{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
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
    align-self: center;
    margin: 1rem 0;
}

.foo-wrapper{
    margin-left: 0.5rem;
}

.like-count{
    color: $contrast;
}

.signout{
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    background-color: $second;
    color: $background;
    cursor: pointer;
    padding: 0.5rem 1rem;
    &:hover{
        box-shadow: 1px 1px 5px black;
    }
}
</style>