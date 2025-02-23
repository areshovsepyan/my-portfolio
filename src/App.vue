<script setup>
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';

import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
