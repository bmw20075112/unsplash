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
        meta:{toModalView:true}
    },

    {
        path: '/photoModal/:id',
        name: 'PhotoModal',
        component: () => import('@/views/PhotoModal.vue'),
        beforeEnter: (to, from, next) => {
            if(from.matched.some(view=>view.meta.toModalView)){
                next();
            }
        }
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
