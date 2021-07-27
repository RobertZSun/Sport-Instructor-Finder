import { createRouter, createWebHistory } from 'vue-router';

const CoachesList = ()=> import('./pages/coaches/CoachesList');
const CoachDetail = ()=> import('./pages/coaches/CoachDetail');
const CoachRegistration = ()=> import('./pages/coaches/CoachRegistration');
const ContactCoach = ()=> import('./pages/requests/ContactCoach');
const RequestsReceived = ()=> import('./pages/requests/RequestsReceived');
const NotFound = ()=> import('./pages/NotFound');
const UserAuth = ()=> import('@/pages/auth/UserAuth');

import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id', component: CoachDetail, props: true, children: [
        { path: 'contact', component: ContactCoach }
      ]
    },
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/request', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)*', component: NotFound }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
