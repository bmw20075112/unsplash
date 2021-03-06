import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index.js';
import { auth } from '../fetch/firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },

  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },

  {
    path: '/searchRes',
    name: 'SearchRes',
    component: () => import('@/views/SearchResults.vue')
  },

  {
    path: '/author',
    name: 'Author',
    component: () => import('@/views/Author.vue')
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/identity',
    name: 'Identity',
    component: () => import('@/views/Identity.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
  }
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    auth.onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        // no user signed in, reject
        store.commit('isModeLoginMutate', true);
        next({ name: 'Identity' })
      }
    });
  } else {
    next();
  }
})

export default router
