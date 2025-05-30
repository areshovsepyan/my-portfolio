<script setup>
defineProps({
  title: String,
  description: String,
  image: Object,
  slug: String,
  technologies: Array,
  versions: Object,
});
</script>

<template>
  <article class="product-card">
    <router-link :to="`/toolbox/${slug}`" class="product-link">
      <div class="image-container">
        <img :src="`/images/products/${image.url}.png`" loading="lazy" :alt="image.alt" />
      </div>

      <div class="product-details">
        <h2>{{ title }}</h2>

        <p class="product-description">{{ description }}</p>

        <ul class="product-versions">
          <li v-for="version in Object.keys(versions)" :key="version" :class="`badge-${version}`">
            {{ version }}
          </li>
        </ul>

        <ul class="product-technologies">
          <li v-for="technology in technologies" :key="technology" class="product-technology">
            {{ technology }}
          </li>
        </ul>
      </div>
    </router-link>
  </article>
</template>

<style lang="scss" scoped>
.product-card {
  border-radius: 1rem;
  background-color: var(--vt-c-gray-900);
  border: 1.5px solid var(--vt-c-gray-700);
  transition: all var(--vt-transition-delay);
  cursor: pointer;

  &:hover {
    scale: 1.01;
  }

  .product-link {
    all: unset;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;

    img {
      all: unset;
    }
  }

  .image-container {
    width: 100%;
    border-radius: 12px 12px 0 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .product-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .product-description {
      font-size: 18px;

      @media (min-width: 1024px) {
        font-size: 20px;
      }
    }

    .product-technologies {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;

      .product-technology {
        background-color: var(--vt-c-gray-700);
        color: var(--vt-c-gray-300);
        font-size: 14px;
        padding: 2px 12px;
        border-radius: 6px;

        @media (min-width: 1024px) {
          font-size: 16px;
        }
      }
    }

    .product-versions {
      display: flex;
      width: 100%;
      gap: 1rem;
      margin: 0.5rem 0 1rem 0;

      li {
        flex: 1;
        max-width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        padding: 3px;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.5px;

        @media (max-width: 1024px) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
