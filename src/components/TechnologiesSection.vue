<script setup>
import { computed } from 'vue';

import { Carousel, Slide, Navigation } from 'vue3-carousel';
import BaseCard from '@/components/UI/BaseCard.vue';

import { useTechnologiesStore } from '@/stores/technologies';
import { useResize } from '/composables/useResize';

const { technologies } = useTechnologiesStore();
const { innerWidth, isOnMobile } = useResize();

const config = computed(() => {
  return {
    itemsToShow: 'auto',
    gap: innerWidth.value > 1024 ? 20 : 10,
    transition: 300,
    wrapAround: true,
  };
});
</script>

<template>
  <section class="technologies-section">
    <p class="description">
      These are the <br />
      technologies I’ve been using
    </p>
    <div class="technologies">
      <Carousel v-bind="config">
        <Slide v-for="{ label, img: { alt, icon } } in technologies" :key="label">
          <BaseCard class="card" :border_gradient="true">
            <img :src="`/icons/technologies/icon_${icon}.svg`" :alt="alt" />
            {{ label }}
          </BaseCard>
        </Slide>
        <template v-if="!isOnMobile" #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.technologies-section {
  margin-bottom: 5rem;
  .description {
    color: var(--vt-c-gray-300);
    font-size: 32px;
    text-align: center;
    margin-bottom: 5rem;

    @media (min-width: 1024px) {
      font-size: 60px;
      margin-bottom: 8rem;
      text-align: start;
    }
  }

  .technologies {
    font-family: 'Nunito';
    color: var(--vt-c-white);

    @media (min-width: 1024px) {
      gap: 2rem;
      font-size: 18px;
      font-weight: 500;
    }

    .card {
      justify-content: center;
      align-items: center;

      width: 150px;
      height: 200px;

      @media (min-width: 1024px) {
        width: 250px;
        height: 300px;
      }
    }

    img {
      height: 48px;
      aspect-ratio: 1;

      @media (min-width: 1024px) {
        height: 96px;
      }
    }
  }
}
</style>
