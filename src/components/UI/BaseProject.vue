<script setup>
import { useResize } from '@/composables/useResize.js';

const { isOnMobile } = useResize();

defineProps({
  image: Object,
  title: String,
  description: String,
  technologies: Array,
  repo_url: String,
  website_url: String,
});
</script>

<template>
  <div class="project-card">
    <div class="image-container">
      <img
        v-if="!isOnMobile"
        :src="`/images/projects/${image.url}.png`"
        loading="lazy"
        :alt="image.alt"
      />
      <img
        v-else
        :src="`/images/projects/${image.url}-mobile.png`"
        loading="lazy"
        :alt="image.alt"
      />
    </div>

    <div class="project-details">
      <h2>{{ title }}</h2>

      <p class="description">{{ description }}</p>

      <div class="row-wrapper">
        <ul class="project-technologies">
          <li v-for="technology in technologies" :key="technology" class="project-technology">
            {{ technology }}
          </li>
        </ul>
        <div class="action-wrapper">
          <a v-if="repo_url" :href="repo_url" target="_blank">
            <img src="/icons/base/icon_octocat.svg" alt="GitHub repo" />
          </a>
          <a :href="website_url" target="_blank">
            <img src="/icons/base/icon_external-link.svg" alt="External link icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1rem;
  }

  padding: 2rem;
  border-radius: 1rem;

  background: radial-gradient(
    100% 100% at 0 50%,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );

  .image-container {
    width: 100%;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    padding-bottom: 2rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all calc(var(--vt-transition-delay) * 1.5);

      @media (min-width: 1024px) {
        &:hover {
          scale: 1.025;
        }
      }
    }
  }

  .project-details {
    h2 {
      margin-bottom: 1rem;
    }

    .description {
      margin-bottom: 2rem;
      font-size: 18px;

      @media (min-width: 1024px) {
        font-size: 20px;
      }
    }

    .row-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;

      .project-technologies {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        .project-technology {
          font-size: 16px;
          color: var(--vt-c-gray-300);
          background-color: var(--vt-c-gray-700);
          padding: 6px 16px;
          border-radius: 8px;
          transition: all var(--vt-transition-delay);

          @media (min-width: 1024px) {
            font-size: 18px;
          }

          &:hover {
            scale: 1.1;
          }
        }
      }

      .action-wrapper {
        display: flex;
        justify-content: center;
        gap: 0.5rem;

        a {
          height: 25px;
          width: 25px;
          margin: 4px auto;

          @media (min-width: 1024px) {
            margin: 5.5px auto;
          }

          img {
            transition: all var(--vt-transition-delay);
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
