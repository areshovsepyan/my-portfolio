<script setup>
defineProps({
  image: Object,
  title: String,
  technologies: Array,
});
</script>

<template>
  <div class="project-card">
    <div class="image-container">
      <img :src="image.url" :alt="image.alt" />
    </div>

    <div class="project-details">
      <h2>{{ title }}</h2>

      <div class="row-wrapper">
        <ul class="project-technologies">
          <li v-for="technology in technologies" :key="technology" class="project-technology">
            {{ technology }}
          </li>
        </ul>
        <div class="action-wrapper">
          <a href="">
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

  padding: 1rem 1rem 2rem 1rem;
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all calc(var(--vt-transition-delay) * 1.5);

      &:hover {
        scale: 1.1;
      }
    }
  }

  .project-details {
    h2 {
      color: var(--vt-c-gray-300);
      font-size: 24px;
      margin-bottom: 1rem;

      @media (min-width: 1024px) {
        font-size: 30px;
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
          color: var(--vt-c-gray-300);
          font-size: 16px;
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

        a {
          height: 33px;
          width: 33px;
          margin-inline: auto;

          @media (min-width: 1024px) {
            height: 36px;
            width: 36px;
          }

          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
