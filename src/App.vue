<script setup>
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';

import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHead } from '@vueuse/head';

useHead({
  title: 'Ara Hovsepyan | Vue.js Front-End Developer',
  meta: [
    {
      name: 'description',
      content:
        'Vue.js/Nuxt.js expert building fast, SEO-friendly web apps. Explore my portfolio and case studies.',
    },
    { property: 'og:title', content: 'Ara Hovsepyan | Vue.js Specialist' },
    {
      property: 'og:description',
      content: 'Front-end developer focused on Vue.js, Nuxt.js, and modern JavaScript.',
    },
  ],
});

const router = useRouter();
const route = useRoute();

const isAdminRoute = ref(false);

watch(
  () => route.path,
  (newPath) => {
    isAdminRoute.value = newPath.startsWith('/admin') || newPath.startsWith('/login');
  },
  { immediate: true },
);

router.afterEach((to, from) => {
  if (!to?.meta?.id || !from?.meta?.id) return;

  const toId = to.meta.id;
  const fromId = from.meta.id;

  to.meta.transition = toId > fromId ? 'slide-left' : 'slide-right';
});
</script>

<template>
  <Analytics v-if="!isAdminRoute" />
  <SpeedInsights v-if="!isAdminRoute" />

  <TheHeader v-if="!isAdminRoute" />

  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition" mode="out-in">
      <main :key="route.fullPath">
        <component :is="Component" />
      </main>
    </Transition>
  </router-view>

  <TheFooter v-if="!isAdminRoute" />
</template>
