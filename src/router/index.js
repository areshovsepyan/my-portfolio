// import { api } from '@/utils/axios';
import { createRouter, createWebHistory } from 'vue-router';

import AdminLayout from '@/layouts/AdminLayout.vue';
import LoginLayout from '@/layouts/LoginLayout.vue';

import AdminDashboardView from '@/views/admin/DashboardView.vue';
import AdminExperienceView from '@/views/admin/ExperienceView.vue';
import AdminEducationView from '@/views/admin/EducationView.vue';
import AdminBannedIPsView from '@/views/admin/BannedIPsView.vue';
import AdminLogsView from '@/views/admin/LogsView.vue';
import AdminInboxView from '@/views/admin/InboxView.vue';

import HomeView from '@/views/HomeView.vue';
import EducationView from '@/views/EducationView.vue';
import ExperienceView from '@/views/ExperienceView.vue';
import ContactView from '@/views/ContactView.vue';

import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', alias: '/home', component: HomeView, meta: { title: 'Home', id: 1 } },
    { path: '/education', component: EducationView, meta: { title: 'Education', id: 2 } },
    { path: '/experience', component: ExperienceView, meta: { title: 'Experience', id: 3 } },
    { path: '/contact', component: ContactView, meta: { title: 'Contact', id: 4 } },
    {
      path: '/login',
      component: LoginLayout,
      beforeEnter: async (to, from, next) => {
        const token = localStorage.getItem('token');

        if (token) {
          const res = await fetch('/api/protected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) next('/admin');
          else {
            localStorage.removeItem('token');
            next();
          }
        } else next();
      },
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'dashboard', alias: '/admin', component: AdminDashboardView },
        { path: 'experience', component: AdminExperienceView },
        { path: 'education', component: AdminEducationView },
        { path: 'banned-ips', component: AdminBannedIPsView },
        { path: 'logs', component: AdminLogsView },
        { path: 'inbox', component: AdminInboxView },
      ],
      beforeEnter: async (to, from, next) => {
        const token = localStorage.getItem('token');

        if (token) {
          const res = await fetch('/api/protected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) next();
          else {
            localStorage.removeItem('token');
            next('/login');
          }
        } else next('/login');
      },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')) {
    document.body.style.backgroundColor = '#15161A';
    document.getElementById('app').style.padding = '2rem';
  }
  if (to.path.startsWith('/login')) {
    document.getElementById('app').style.paddingTop = '2rem';
  }
  next();
});

export default router;
