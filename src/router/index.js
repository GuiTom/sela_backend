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
    // 登录
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    // 个人中心
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/user_profile/Profile.vue')
    },
    // 每日数据详情
    {
      path: '/daily_detail',
      name: 'daily detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/daily_detail/DailyDetail.vue')
    },
    // 主播管理
    {
      path: '/anchor_list',
      name: 'anchor list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/anchor_list/AnchorList.vue')
    },
    //提现详情
    {
      path: '/withdrawal_details',
      name: 'withdrawal details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/withdrawal_details/index.vue')
    },
    //提现记录
    {
      path: '/withdraw_records',
      name: 'withdraw records',
      component: () => import('../pages/withdrawal_records/index.vue')
    }

  ]
})

export default router
