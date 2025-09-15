import { createRouter, createWebHistory } from 'vue-router';
import Signin from './pages/Signin.vue';
import Signup from './pages/Signup.vue';
import { isAuthenticated } from './utils/auth';
import Users from './pages/Users.vue';
import Listings from './pages/Listings.vue';
import { getCurrentUser, initAuth } from './lib/auth-state';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/signin', component: Signin, meta: { requiresAuth: false }, name: 'signin' },
    { path: '/signup', component: Signup, meta: { requiresAuth: false }, name: 'signup' },

    // admin-only
    { path: '/users', component: Users, meta: { requiresAuth: true, adminOnly: true }, name: 'users' },

    // non-admin-only
    { path: '/listings', component: Listings, meta: { requiresAuth: true, userOnly: true }, name: 'listings' },
    {
      path: '/',
      redirect: () => {
        if (!isAuthenticated()) return { name: 'signin' };
        const currentUser = getCurrentUser();
        return currentUser?.admin ? { name: 'users' } : { name: 'listings' };
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        if (!isAuthenticated()) return { name: 'signin' };
        const currentUser = getCurrentUser();
        return currentUser?.admin ? { name: 'users' } : { name: 'listings' };
      },
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const currentUser = await initAuth();

  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next({ name: 'signin', query: { redirect: to.fullPath } });
  }

  if (to.meta.adminOnly && !currentUser?.admin) {
    return next({ name: 'listings' });
  }

  if (to.meta.userOnly && currentUser?.admin) {
    return next({ name: 'users' });
  }

  return next();
});

export default router;
