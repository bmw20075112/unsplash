<template>
    <header class="dummy-box">
        <nav class="nav-align">
            <div class="brand">Imager</div>
            <ul class="nav-right">
                <SearchBar/>
                <router-link :to="{name:'Cart'}"><i class="fas fa-shopping-cart"></i></router-link>
                <router-link :to="{name:'Profile'}"><i class="fas fa-user"></i></router-link>
            </ul>
        </nav>
    </header>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
export default {
    components:{
        SearchBar
    }
}
</script>

<style lang='scss'>
.dummy-box{
    width: 100%;
    height: 50px;
}
.nav-align{
    background-color: $first;
    width: inherit;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 100;
}

.brand{
    font-size: 2rem;
    font-style: italic;
    margin-left: 0.5rem;
}
</style>