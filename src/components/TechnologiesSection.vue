<template>
  <section class="technologies-section">
    <p class="description">
      These are the <br />
      technologies I’ve been using
    </p>
    <div class="technologies">
      <BaseCard
        class="card"
        v-for="{ label, img: { alt, icon } } in technologies"
        :key="label"
        :border_gradient="true"
      >
        <img :src="`/icons/technologies/icon_${icon}.svg`" :alt="alt" />
        {{ label }}
      </BaseCard>
    </div>
  </section>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue'
import { useTechnologiesStore } from '@/stores/technologies'

export default {
  setup() {
    const { technologies } = useTechnologiesStore()
    return { technologies }
  },
  components: {
    BaseCard,
  },
}
</script>

<style lang="scss" scoped>
.technologies-section {
  .description {
    color: var(--vt-c-gray-300);
    font-size: 32px;
    text-align: center;
    margin-bottom: 3rem;

    @media (min-width: 1024px) {
      font-size: 60px;
      margin-bottom: 6rem;
      text-align: start;
    }
  }

  .technologies {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'Nunito';
    color: var(--vt-c-white);

    @media (min-width: 1024px) {
      gap: 2rem;
      font-size: 18px;
      font-weight: 500;
    }

    .card {
      flex: 1;
      width: 0;
      justify-content: center;
      align-items: center;

      min-width: 115px;
      max-width: 130px;

      @media (min-width: 1024px) {
        min-width: 200px;
        max-width: 250px;
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
