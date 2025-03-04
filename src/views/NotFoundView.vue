<script setup>
import { useResize } from '@/composables/useResize';
const { isOnMobile } = useResize();
</script>

<template>
  <section class="not-found">
    <h1 class="glitch">404</h1>
    <p class="section-greeting">
      &lt; Oops! This page doesn’t exist. <br v-if="isOnMobile" />
      The link you <br v-if="!isOnMobile" />
      followed may be broken, <br v-if="isOnMobile" />
      or the page has been moved. /&gt;
    </p>
    <router-link to="/">Go Home</router-link>
  </section>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
}
</style>
