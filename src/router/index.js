import { createRouter, createWebHistory } from 'vue-router';

import AdminLayout from '@/layouts/AdminLayout.vue';
import LoginLayout from '@/layouts/LoginLayout.vue';

import DashboardView from '@/views/DashboardView.vue';
import UserManagementView from '@/views/UserManagementView.vue';
import SettingsView from '@/views/SettingsView.vue';

import HomeView from '@/views/HomeView.vue';
import EducationView from '@/views/EducationView.vue';
import ExperienceView from '@/views/ExperienceView.vue';
import ContactView from '@/views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', alias: '/home', component: HomeView, meta: { title: 'Home', id: 0 } },
    { path: '/education', component: EducationView, meta: { title: 'Education', id: 1 } },
    { path: '/experience', component: ExperienceView, meta: { title: 'Experience', id: 2 } },
    { path: '/contact', component: ContactView, meta: { title: 'Contact', id: 3 } },
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
        { path: 'dashboard', alias: '/admin', component: DashboardView },
        { path: 'users', component: UserManagementView },
        { path: 'settings', component: SettingsView },
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

export default router;
