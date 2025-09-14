import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import Signin from './pages/Signin.vue';
import Signup from './pages/Signup.vue';
import { isAuthenticated } from './utils/auth';
import Users from './pages/Users.vue';
import Listings from './pages/Listings.vue';
import { initAuth } from './lib/auth-state';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/signin',
      component: Signin,
      meta: { requiresAuth: false },
      name: 'signin',
    },
    {
      path: '/signup',
      component: Signup,
      meta: { requiresAuth: false },
      name: 'signup',
    },
    {
      path: '/users',
      component: Users,
      meta: { requiresAuth: true },
      name: 'users',
    },
    {
      path: '/listings',
      component: Listings,
      meta: { requiresAuth: true },
      name: 'listings',
    },
    {
      path: '/',
      component: Dashboard,
      meta: { requiresAuth: true },
      name: 'dashboard',
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await initAuth();

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/signin', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
