<script setup>
import { event } from 'vue-gtag';
import BaseLink from './UI/BaseLink.vue';

function trackViewCVClick() {
  event('view_cv_click', {
    event_category: 'engagement',
    event_label: 'View CV Link',
    value: 1,
  });
}
</script>

<template>
  <section class="introduction-section">
    <!-- PICTURE BOX REMOVED TIL I FIND PRO HEAD SHOT -->

    <div v-if="false" class="image-box">
      <img class="profile-picture" src="/images/brackets.jpg" alt="HTML brackets" />
    </div>

    <div class="text-box">
      <span>BASED IN ARMENIA</span>
      <h3>Hi, I'm Ara</h3>
      <p>
        a coding wizard with <strong>5+ years</strong> of experience in
        <strong>Front-End Development</strong>, crafting intuitive, visually stunning, and highly
        functional web applications.
      </p>
      <div class="actions">
        <BaseLink
          @click="trackViewCVClick"
          href="/ara-hovsepyan-cv-2025.pdf"
          target="_blank"
          rel="noopener"
        >
          View CV
        </BaseLink>
        <RouterLink to="/experience"> See experiences </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.introduction-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .text-box {
    flex: 1;
    text-align: center;

    h3 {
      color: var(--vt-c-white);
      font-size: 48px;
      font-weight: 500;
      padding: 0.5rem 0 1rem 0;

      @media (min-width: 1024px) {
        font-size: 72px;
      }
    }

    p {
      text-align: center;
      line-height: 30px;
      max-width: 650px;
      font-size: 18px;

      @media (min-width: 1024px) {
        max-width: 850px;
        font-size: 24px;
        text-align: start;
        line-height: 42px;
      }
    }

    span {
      color: var(--vt-c-green);
      font-size: 12px;
      font-weight: 600;

      @media (min-width: 1024px) {
        font-size: 14px;
        padding-left: 5px;
      }
    }

    strong {
      color: var(--vt-c-white);
    }

    .actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 3rem 0;

      @media (min-width: 1024px) {
        flex-direction: row;
        gap: 4rem;
      }
    }

    @media (min-width: 1024px) {
      text-align: start;
    }
  }

  .image-box {
    flex: 1;
    display: flex;

    .profile-picture {
      // background-color: var(--vt-c-purple-800);
      // background: linear-gradient(135deg, var(--vt-c-purple-600) 0%, var(--vt-c-purple-800) 50%);
      border-radius: 50%;
      width: 125px;
      height: 125px;
      margin-inline: auto;
      border: 1.5px solid var(--vt-c-gray-300);

      @media (min-width: 1024px) {
        width: 350px;
        height: 350px;
        align-self: flex-start;
      }
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
