import { createRouter, createWebHashHistory } from 'vue-router'


// import FamilyDetailViewVue from '@/pages/FamilyDetailView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/index.vue')
    },
    // 登录
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/login/index.vue')
    },
    // 个人中心
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/user_profile/index.vue'),
      meta: { requiresAuth: true },
    },
    // 设置
    {
      path: '/setting',
      name: 'setting',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/setting/index.vue'),
      meta: { requiresAuth: true },
    },
    // 修改密码
    {
      path: '/changePassword',
      name: 'change password',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/setting/changePassword/index.vue'),
      meta: { requiresAuth: true },
    },
    // 每日数据详情
    {
      path: '/daily_detail',
      name: 'daily detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/daily_detail/index.vue'),
      meta: { requiresAuth: true }
    },
    // 主播管理
    {
      path: '/anchor_list',
      name: 'anchor list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/anchor_list/index.vue'),
      meta: { requiresAuth: true },
    },
    // 邀请主播
    {
      path: '/anchor_invite',
      name: 'anchor invite',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/anchor_invite/index.vue'),
      meta: { requiresAuth: true },
    },
    // 活动列表
    {
      path: '/activity_list',
      name: 'activity list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/activity_list/index.vue'),
      meta: { requiresAuth: true },
    },
    //提现详情
    {
      path: '/withdrawal_details',
      name: 'withdrawal details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/withdrawal_details/index.vue'),
      meta: { requiresAuth: true },
    },
    //提现记录
    {
      path: '/withdraw_records',
      name: 'withdraw records',
      component: () => import('../pages/withdrawal_records/index.vue'),
      meta: { requiresAuth: true },
    }

  ]
})
// 全局前置守卫  
router.beforeEach((to, from, next) => {
  // 检查用户是否登录，这里只是一个示例，你需要根据你的应用来实现具体的逻辑  
  const isAuthenticated = !!localStorage.getItem('authorization'); // 假设我们将用户令牌存储在 localStorage 中  

  // 检查要访问的路由是否需要认证  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这个路由需要认证，检查是否已登录  
    if (!isAuthenticated) {
      // 未登录，跳转到登录页面  
      next({ name: 'login' });
    } else {
      // 已登录，正常进入  
      next();
    }
  } else {
    // 这个路由不需要认证，直接进入  
    next();
  }
});
export default router
