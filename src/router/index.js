import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import EducationView from '@/views/EducationView.vue';
import ExperienceView from '@/views/ExperienceView.vue';
import ContactView from '@/views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Home', id: 0 } },
    { path: '/education', component: EducationView, meta: { title: 'Education', id: 1 } },
    { path: '/experience', component: ExperienceView, meta: { title: 'Experience', id: 2 } },
    { path: '/contact', component: ContactView, meta: { title: 'Contact', id: 3 } },
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
