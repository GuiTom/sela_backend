import { createRouter, createWebHistory } from 'vue-router'

import LoginViewVue from '@/pages/LoginView.vue'
// import FamilyDetailViewVue from '@/pages/FamilyDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/user_profile/Profile.vue')
    },
    {
      path: '/daily_detail',
      name: 'daily detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/daily_detail/DailyDetail.vue')
    },
    {
      path: '/anchor_list',
      name: 'anchor list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/anchor_list/AnchorList.vue')
    },
    {
      path: '/withdrawal_details',
      name: 'withdrawal details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/withdrawal_details/WithDrawalDetails.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    }

  ]
})

export default router
