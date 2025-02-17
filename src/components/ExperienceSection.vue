<template>
  <section class="experience-section">
    <div class="text-box">
      <span>4 years of</span>
      <b>XP</b>
      <span>with one of the most popular front-end ecosystems </span>
    </div>
    <div class="technologies">
      <BaseCard
        class="card"
        v-for="({ label, img: { alt, icon } }, index) in favoriteTechnologies"
        :key="label"
        :background_color="index + 1"
        colored
      >
        <div class="image-box">
          <img :src="`/icons/technologies/icon_${icon}.svg`" :alt="alt" />
          <span> {{ label }}</span>
        </div>
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
  computed: {
    favoriteTechnologies() {
      return this.technologies.filter((tech) => {
        return (
          tech.label.toLowerCase() === 'javascript' ||
          tech.label.toLowerCase() === 'vue' ||
          tech.label.toLowerCase() === 'nuxt' ||
          tech.label.toLowerCase() === 'vite'
        )
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.experience-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;

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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'Nunito';

    .card {
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
    flex-direction: row;
    gap: 6rem;
  }
}
</style>
