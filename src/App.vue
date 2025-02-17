<template>
  <TheHeader />

  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <main :key="route.fullPath">
        <component :is="Component" />
      </main>
    </Transition>
  </router-view>

  <TheFooter />
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>
