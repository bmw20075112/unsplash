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
            {
                path: 'about',
                name: 'About',
                component: () => import('@/views/About.vue'),
            }
        ]
    },

    {
        path: '/photo/:id',
        name: 'Photo',
        component: () => import('@/views/Photo.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
