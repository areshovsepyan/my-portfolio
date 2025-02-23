<script setup>
import { computed } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import { useTechnologiesStore } from '@/stores/technologies';
import { useResize } from '@/composables/useResize';
import BaseCard from '@/components/UI/BaseCard.vue';

const { technologies } = useTechnologiesStore();
const { innerWidth } = useResize();

const favoriteTechnologies = computed(() => {
  return technologies.filter((tech) => {
    return (
      tech.label.toLowerCase().includes('javascript') ||
      tech.label.toLowerCase().includes('vue') ||
      tech.label.toLowerCase().includes('nuxt') ||
      tech.label.toLowerCase().includes('vite')
    );
  });
});

const config = computed(() => {
  return {
    itemsToShow: 'auto',
    gap: innerWidth.value > 1024 ? 25 : 10,
    transition: 300,
  };
});
</script>

<template>
  <section class="experience-section">
    <div class="text-box">
      <span>4 years of</span>
      <b>XP</b>
      <span>with one of the most popular front-end ecosystems </span>
    </div>
    <div class="technologies">
      <Carousel v-bind="config">
        <Slide v-for="({ label, img: { alt, icon } }, index) in favoriteTechnologies" :key="label">
          <BaseCard class="bg-colored" :background_color="index + 1">
            <div class="image-box">
              <img :src="`/icons/technologies/icon_${icon}.svg`" :alt="alt" />
              <span> {{ label }}</span>
            </div>
          </BaseCard>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.experience-section {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .text-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1024px) {
      align-items: baseline;
      width: 25%;
    }

    span {
      line-height: normal;
      font-weight: 500;
      text-align: center;
      line-height: 1.3;

      @media (min-width: 1024px) {
        text-align: start;
        font-size: 16px;
      }
    }
    b {
      font-size: 80px;
      font-weight: 700;
      color: var(--vt-c-white);
      line-height: 1.4;
    }
  }

  .technologies {
    font-family: 'Nunito';

    @media (min-width: 1024px) {
      width: 75%;
    }

    .card {
      flex-direction: column;
      min-width: 220px;
      min-height: 190px;

      @media (min-width: 1024px) {
        min-width: 400px;
        min-height: 277px;
      }

      .image-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;

        img {
          height: 50px;
          aspect-ratio: 1;

          @media (min-width: 1024px) {
            height: 75px;
          }
        }

        span {
          font-size: 16px;
          font-weight: 700;

          @media (min-width: 1024px) {
            font-size: 24px;
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    align-items: center;
    flex-direction: row;
    gap: 6rem;
  }
}
</style>
