<script setup>
defineProps({
  isLoading: Boolean,
});
</script>

<template>
  <div v-if="isLoading" class="skeleton">
    <div class="skeleton-image"></div>

    <div class="skeleton-title"></div>

    <ul class="skeleton-list">
      <li v-for="n in 3" :key="n" class="skeleton-line"></li>
    </ul>

    <div class="skeleton-technologies">
      <div v-for="n in 4" :key="n" class="skeleton-technology"></div>
    </div>

    <hr class="divider" />

    <div class="skeleton-tabs">
      <div class="skeleton-tab"></div>
      <div class="skeleton-tab"></div>
    </div>

    <ul class="skeleton-version-details">
      <li v-for="n in 4" :key="n">
        <div class="skeleton-text short"></div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  animation: pulse-skeleton 1.5s infinite ease-in-out;

  .skeleton-image {
    width: 100%;
    height: 360px;
    background-color: #1e1e1e;
    border-radius: 8px;
    margin-bottom: 3rem;

    @media (max-width: 1024px) {
      height: 140px;
    }
  }

  .skeleton-title {
    height: 28px;
    width: 40%;
    background-color: #2a2a2a;
    border-radius: 4px;
    margin-bottom: 1rem;

    @media (max-width: 1024px) {
      font-size: 24px;
    }
  }

  .skeleton-text {
    height: 20px;
    background-color: #2a2a2a;
    border-radius: 4px;
    margin-bottom: 0.5rem;

    @media (max-width: 1024px) {
      font-size: 16px;
    }

    &.short {
      width: 40%;
    }

    &.long {
      width: 80%;
    }
  }

  .skeleton-technologies {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1.5rem 0;

    .skeleton-technology {
      width: 100px;
      height: 26px;
      background-color: #2a2a2a;
      border-radius: 6px;
      display: inline-block;
    }
  }

  .skeleton-version-details {
    padding-left: 1.25rem;

    li {
      list-style-type: circle;
    }
  }

  .skeleton-tabs {
    margin: 1.5rem 0;

    .skeleton-tab {
      width: 100px;
      height: 34px;
      background-color: #2a2a2a;
      border-radius: 6px;
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  .skeleton-list {
    list-style: none;
    padding: 0;

    .skeleton-line {
      height: 16px;
      background-color: #2a2a2a;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      width: 90%;
    }
  }
}
</style>
