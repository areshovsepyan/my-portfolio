<script setup>
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

import { useResize } from '@/composables/useResize';
const { isOnMobile } = useResize();
</script>

<template>
  <section class="experience-section">
    <p class="section-greeting">
      &lt; This is where you can know me <br v-if="isOnMobile" />
      a little more <br v-if="!isOnMobile" />
      and see my whole experience <br v-if="isOnMobile" />
      as a <strong>Front-End Developer.</strong> /&gt;
    </p>
    <BaseButton>Download CV</BaseButton>

    <div class="cards-container">
      <BaseCard class="bg-gray">
        <div class="info-block">
          <h2 class="card-title">Front End Developer</h2>
          <p class="employment-type">Contract</p>
          <div class="date-block">
            <span>Jan 2020</span>
            <div class="dot"></div>
            <span>Present</span>
          </div>
          <p class="location">Yerevan, Armenia</p>
        </div>
        <div class="text-block">
          <h2 class="company-name">Direlli</h2>
          <p class="job-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p class="job-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  button {
    margin: 0 auto 6rem auto;

    @media (min-width: 1024px) {
      margin-bottom: 6rem;
    }
  }

  .info-block {
    flex: 1 0 auto;
  }

  .employment-type {
    font-size: 16px;
    color: var(--vt-c-purple-300);
    margin-bottom: 0.5rem;

    @media (min-width: 1024px) {
      font-size: 22px;
      margin-bottom: 1rem;
    }
  }

  .company-name {
    color: var(--vt-c-purple-300);
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .job-description {
    font-size: 14px;
    line-height: 30px;

    @media (min-width: 1024px) {
      font-size: 22px;
      line-height: 42px;
    }
  }

  .location {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }
}
</style>
