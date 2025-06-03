<script setup>
import { ref, computed } from 'vue';
import BaseLink from './BaseLink.vue';
import { useResize } from '@/composables/useResize.js';

const { isOnMobile } = useResize();

const props = defineProps({
  title: String,
  description: String,
  image: String,
  technologies: Array,
  versions: Object,
});

const selected = ref('free');

const selectedVersion = computed(() => props.versions[selected.value]);

const sortedFeatures = computed(() => {
  return [...selectedVersion.value.features].sort((a, b) => {
    if (a === 'and more...') return 1;
    if (b === 'and more...') return -1;
    return a.localeCompare(b);
  });
});
</script>

<template>
  <section class="product-content">
    <div class="product-image">
      <img :src="`/images/products/${image.url}-big.png`" :alt="image.alt" />
    </div>

    <h1 class="product-title">{{ title }}</h1>

    <p class="product-description">{{ description }}</p>

    <div class="product-technologies">
      <span v-for="tech in technologies" :key="tech" class="product-technology">
        {{ tech }}
      </span>
    </div>

    <hr class="divider" />

    <ul class="product-versions-tabs">
      <li v-for="version in Object.keys(versions)" :key="version">
        <button
          @click="selected = version"
          :class="[`badge-${version}`, { active: selected === version }]"
        >
          {{ version }}
        </button>
      </li>
    </ul>

    <div v-if="selectedVersion" class="version-details">
      <h3 class="version-title">{{ selectedVersion.description }}</h3>

      <ul class="version-features">
        <li v-for="(feature, index) in sortedFeatures" :key="index">
          {{ feature }}
        </li>
      </ul>

      <p v-if="selectedVersion.isComingSoon" class="coming-soon">Coming Soon</p>

      <div v-if="selectedVersion.isAvailable" class="version-links">
        <BaseLink
          :href="selectedVersion.purchaseUrl"
          :disabled="!selectedVersion.purchaseUrl || !selectedVersion.isAvailable"
          target="_blank"
          class="buy-link"
        >
          {{ selectedVersion.cta }}
        </BaseLink>

        <p v-if="selectedVersion.repoUrl" class="repo-message">
          Need to peek under the hood?
          <br v-if="isOnMobile" />
          <a :href="selectedVersion.repoUrl" target="_blank">View the source →</a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.product-content {
  padding: 0;

  .product-image {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 3rem;

    img {
      width: 100%;
      max-height: 360px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .product-title {
    font-size: 28px;
    font-weight: bold;
    text-align: start;
    margin-bottom: 1rem;

    @media (max-width: 1024px) {
      font-size: 24px;
    }
  }

  .product-description {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 1.5rem;

    @media (max-width: 1024px) {
      line-height: 24px;
      font-size: 16px;
    }
  }

  .product-technologies {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;

    .product-technology {
      background-color: var(--vt-c-gray-700);
      color: var(--vt-c-gray-300);
      font-size: 14px;
      padding: 4px 12px;
      border-radius: 6px;

      @media (min-width: 1024px) {
        font-size: 16px;
      }
    }
  }

  .product-versions-tabs {
    display: flex;
    gap: 1rem;
    margin: 2.5rem 0;

    li {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        border-radius: 4px;
        padding: 6px 2rem;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.75px;
        font-size: 16px;

        @media (max-width: 1024px) {
          font-size: 14px;
        }
      }
    }
  }

  .version-details {
    .version-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      line-height: 28px;

      @media (min-width: 1024px) {
        font-size: 22px;
      }
    }

    .version-features {
      padding-left: 1.25rem;
      margin-bottom: 2.5rem;

      li {
        list-style-type: disc;
        font-weight: 500;
        margin-bottom: 0.5rem;

        @media (min-width: 1024px) {
          font-size: 18px;
        }
      }
    }

    .coming-soon {
      display: inline-block;
      background-color: #ff9800;
      color: #111;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.25px;
      padding: 6px 16px;
      border-radius: 999px;
      text-transform: uppercase;
      margin-left: 0.75rem;
      rotate: -5deg;

      @media (min-width: 1024px) {
        font-size: 16px;
      }
    }

    .version-links {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      margin-top: 3.5rem;

      a {
        border-radius: 4px;
        min-width: unset;
      }

      .repo-message {
        font-size: 16px;
        font-style: italic;
        a {
          font-size: 16px;
        }
      }

      .buy-link {
        background-color: var(--vt-c-purple-800);
        color: var(--vt-c-white);
      }
    }
  }
}
</style>
