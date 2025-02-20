<script setup>
import { useResize } from '/composables/useResize';
const { isOnMobile } = useResize();
</script>

<template>
  <section class="experience-section">
    <p class="section-message">
      &lt; This is where you can know me <br v-if="isOnMobile" />
      a little more <br v-if="!isOnMobile" />
      and see my whole experience <br v-if="isOnMobile" />
      as a <strong>Front-End Developer.</strong> /&gt;
    </p>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }
}
</style>
