<script setup>
import { Analytics } from '@vercel/analytics/vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

router.afterEach((to, from) => {
  const toId = to.meta.id;
  const fromId = from.meta.id;

  to.meta.transition = toId > fromId ? 'slide-left' : 'slide-right';
});
</script>

<template>
  <Analytics />
  <TheHeader />

  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition" mode="out-in">
      <main :key="route.fullPath">
        <component :is="Component" />
      </main>
    </Transition>
  </router-view>

  <TheFooter />
</template>
