<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';

import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
// import GumroadPromo from './components/GumroadPromo.vue';

useHead({
  title: 'Ara Hovsepyan | Senior Front-End Developer',
  meta: [
    {
      name: 'description',
      content:
        'Vue.js/Nuxt.js expert building fast, SEO-friendly web apps. Explore my portfolio and case studies.',
    },
    {
      name: 'keywords',
      content:
        'web developer, frontend developer, Vue.js developer, portfolio website, Armenian developer, Armenian web developer, Yerevan frontend developer, freelance developer Armenia, best Vue.js developer portfolio, minimalist web designer in Armenia',
    },
    { property: 'og:title', content: 'Ara Hovsepyan | Vue.js Specialist' },
    {
      property: 'og:description',
      content: 'Front-end developer focused on Vue.js, Nuxt.js, and modern JavaScript.',
    },
    { property: 'og:image', content: 'https://ara-hovsepyan.com/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://ara-hovsepyan.com/og-image.png' },
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

  <!-- <GumroadPromo /> -->

  <TheFooter v-if="!isAdminRoute" />
</template>
