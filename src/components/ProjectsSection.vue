<script setup>
import { ref } from 'vue';
import BaseProject from '@/components/UI/BaseProject.vue';

const projects = ref([
  {
    title: 'OrderSpark',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Pinia', 'Nuxt'],
    image: {
      url: '/images/project-1.jpg',
      alt: '',
    },
  },
  {
    title: 'OrderSpark',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Pinia', 'Nuxt'],
    image: {
      url: '/images/project-2.jpg',
      alt: '',
    },
  },
  {
    title: 'OrderSpark',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Pinia', 'Nuxt'],
    image: {
      url: '/images/project-3.jpg',
      alt: '',
    },
  },
]);
</script>

<template>
  <section class="projects-section">
    <h1 class="section-header">
      Here are some<br />
      of my <strong>featured projects</strong>.
    </h1>

    <div class="projects">
      <BaseProject
        v-for="{ title, technologies, image } in projects"
        :key="title"
        :title
        :technologies
        :image
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.projects-section {
  @media (min-width: 1024px) {
    align-items: center;
    flex-direction: row;
    gap: 6rem;
  }
  .projects {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    font-family: 'Nunito';

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
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
          height: 68px;
          aspect-ratio: 1;

          @media (min-width: 1024px) {
            height: 96px;
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
}
</style>
