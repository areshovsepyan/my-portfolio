<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/UI/BaseCard.vue';

const technologies = ref([
  {
    label: 'TypeScript',
    description: 'JavaScript but better',
    img: {
      alt: 'Typescript icon',
      icon: 'typescript',
    },
  },
  {
    label: 'Vue.JS',
    description: 'JavaScript framework',
    img: {
      alt: 'Vue icon',
      icon: 'vue',
    },
  },
  {
    label: 'Nuxt.JS',
    description: 'Vue framework',
    img: {
      alt: 'Nuxt icon',
      icon: 'nuxt',
    },
  },
  {
    label: 'Vite',
    description: 'Frontend build tool',
    img: {
      alt: 'Vite icon',
      icon: 'vite',
    },
  },
  {
    label: 'Git',
    description: 'Version control',
    img: {
      alt: 'Git icon',
      icon: 'git',
    },
  },
  {
    label: 'Tailwind',
    description: 'CSS framework',
    img: {
      alt: 'Tailwind icon',
      icon: 'tailwind',
    },
  },
  {
    label: 'Vercel',
    description: 'App deployment tool',
    img: {
      alt: 'Vercel icon',
      icon: 'vercel',
    },
  },
  {
    label: 'Apollo',
    description: 'Smart fetching tool',
    img: {
      alt: 'Apollo icon',
      icon: 'apollo',
    },
  },
]);
</script>

<template>
  <section class="technologies-section">
    <div class="section-header">
      <h1>
        These are the <br />
        <strong>technologies</strong>
        I’ve been using.
      </h1>
    </div>

    <div class="technologies">
      <BaseCard
        v-for="{ label, description, img: { alt, icon } } in technologies"
        :key="label"
        class="border-gradient"
      >
        <img :src="`/icons/technologies/icon_${icon}.svg`" :alt="alt" />
        <div class="card-text">
          {{ label }}
          <small>{{ description }}</small>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.technologies-section {
  .technologies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 0.5rem;
    font-family: 'Nunito';
    color: var(--vt-c-white);
    font-size: 18px;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media ((max-width: 1200px) and (min-width: 640px)) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 639px) {
      grid-template-columns: 1fr;
      font-size: 16px;
    }

    .card {
      align-items: center;
      padding: 0.8rem 1.5rem;
      border-radius: 12px;
      transition: all var(--vt-transition-delay);

      &-text {
        display: flex;
        flex-direction: column;

        small {
          color: var(--vt-c-gray-400);
        }
      }

      &:hover {
        background-color: var(--vt-c-gray-800);
        scale: 1.025;
      }
    }

    img {
      height: 60px;
      aspect-ratio: 1;
    }
  }
}
</style>
