<script setup>
import BaseCard from '@/components/UI/BaseCard.vue';
import { useResize } from '@/composables/useResize';
const { isOnMobile } = useResize();
</script>

<template>
  <section class="education-section">
    <p class="section-greeting">
      &lt; This is where you can explore my <br v-if="isOnMobile" />
      academic journey <br v-if="!isOnMobile" />
      and see the <strong> knowledge </strong> <br v-if="isOnMobile" />
      and <strong> skills </strong> I've gained along the way. /&gt;
    </p>

    <div class="cards-container">
      <BaseCard class="border-gray">
        <div class="info-block">
          <h2 class="card-title">Yerevan State University</h2>
          <p class="certificate-name">Certificate in advanced English</p>
          <div class="date-block">
            <span>Jan 2020</span>
            <div class="dot"></div>
            <span>Present</span>
          </div>
        </div>
        <div>
          <a href="">View Certificate</a>
        </div>
      </BaseCard>

      <BaseCard class="border-gray">
        <div class="info-block">
          <h2 class="card-title">Yerevan State University</h2>
          <p class="certificate-name">Certificate in advanced English</p>
          <div class="date-block">
            <span>Jan 2020</span>
            <div class="dot"></div>
            <span>Present</span>
          </div>
        </div>
        <div>
          <a href="">View Certificate</a>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  .section-greeting {
    margin-bottom: 6rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }

  .card {
    &-title {
      margin: 0;
    }

    @media (min-width: 1024px) {
      align-items: center;
    }

    .info-block {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      .certificate-name {
        color: var(--vt-c-purple-300);

        @media (min-width: 1024px) {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
