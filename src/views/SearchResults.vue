<template>
    <section>
        <ul class="pics-align">
            <li class="pic-wrapper" v-for="pic in pics" :key="pic.id">
                <!-- <div :style="{background:}"></div> -->
                <img :src="pic.urls.small" :alt="pic.alt_description">

                <!-- <p>{{pic.description}}</p> -->
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },

    computed:{
        pics(){
            return this.$store.getters.pics;
        },

        url(){
            return this.$store.getters.pics.urls;
        }
    }
}
</script>

<style lang='scss'>
.pics-align{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 auto;
}
.pic-wrapper{
    height:250px;
}
</style>