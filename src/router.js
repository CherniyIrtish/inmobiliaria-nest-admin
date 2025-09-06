import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import Signin from './pages/Signin.vue';
import Signup from './pages/Signup.vue';
import { isAuthenticated } from './utils/auth';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/signin',
      component: Signin,
      meta: { requiresAuth: false },
    },
    {
      path: '/signup',
      component: Signup,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/signin', query: { redirect: to.fullPath } });
    // next({ path: '/signin' });
  } else {
    next();
  }
});

export default router;
