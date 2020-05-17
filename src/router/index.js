import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

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
            },
        ]
    },

    {
        path:'/profile',
        name:'Profile',
        component:()=> import('@/views/Profile.vue'),
        meta:{
            requiresAuth:true
        }
    },

    {
        path:'/identity',
        name:'Identity',
        component:()=> import('@/views/Identity.vue'),
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

router.beforeEach((to,from,next)=>{
	//check to see if route requires auth
	if(to.matched.some(rec=>rec.meta.requiresAuth)){
		firebase.auth().onAuthStateChanged(user=>{
            if(user){
                next();
            }else{
                // no user signed in, reject
                next({name:'Identity'});
            }
        });
		
	}else{
		next();
	}
})

export default router
