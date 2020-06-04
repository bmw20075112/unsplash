<template>
    <div>
        <transition name="notify">
            <div v-show="showNotify" class="notify">
                <p class="note">You have added this photo to your collection</p>
                <button @click='goProfile'>Profile</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    methods: {
        goProfile(){
            this.$router.push({name: 'Profile'});
        }
    },

    computed:{
        showNotify(){
            return this.$store.getters.showNotify;
        }
    }
}
</script>

<style lang='scss'>
.notify{
    width: 100%;
    height: 50px;
    background-color: $second;
    color: $background;
}
.note{
    display: inline-block;
}

.notify-enter-active{
    animation: notify 0.5s forwards;
}

.notify-leave-active{
    animation: notify 0.5s forwards reverse;
}

@keyframes notify{
    0%{
        opacity: 0;
    }

    100%{
        opacity: 100%;
    }
}
</style>