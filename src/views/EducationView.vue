<script setup>
import { useResize } from '/composables/useResize';
const { isOnMobile } = useResize();
</script>

<template>
  <section class="education-section">
    <p class="section-message">
      &lt; This is where you can explore my <br v-if="isOnMobile" />
      academic journey <br v-if="!isOnMobile" />
      and see the <strong> knowledge </strong> <br v-if="isOnMobile" />
      and <strong> skills </strong> I've gained along the way. /&gt;
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
