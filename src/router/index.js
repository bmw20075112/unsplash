import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component:()=>import('@/views/Home.vue')
    },

    {
        path: '/search',
        name: 'Search',
        component:()=>import('@/views/Search.vue')
    },

    {
        path: '/searchRes',
        name: 'SearchRes',
        component: () => import('@/views/SearchResults.vue'),
        children:[
            {
                path: ':id',
                name: 'PhotoModal',
                component: () => import('@/views/PhotoModal.vue'),
                meta:{
                    showModal:true
                }
            },
        ]
    },

    {
        path:'/profile',
        name:'Profile',
        component:()=> import('@/views/Profile.vue')
    },

    {
        path:'/cart',
        name:'Cart',
        component:()=> import('@/views/Cart.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
