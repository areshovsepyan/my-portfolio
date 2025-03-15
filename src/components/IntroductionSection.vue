<script setup>
import BaseButton from './UI/BaseButton.vue';
</script>

<template>
  <section class="introduction-section">
    <div class="image-box">
      <div class="profile-picture"></div>
    </div>
    <div class="text-box">
      <span>BASED IN ARMENIA</span>
      <h3>Hi, I'm Ara</h3>
      <p>
        a coding wizard with <strong>4+ years</strong> of experience in
        <strong>Front-End Development</strong>, crafting intuitive, visually stunning, and highly
        functional web applications.
      </p>
      <div class="actions">
        <BaseButton>Download CV</BaseButton>
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
        font-size: 24px;
        text-align: start;
        line-height: 42px;
      }
    }

    span {
      color: var(--vt-c-purple-300);
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

    .profile-picture {
      background-color: var(--vt-c-gray-700);
      border-radius: 50%;
      width: 125px;
      height: 125px;
      margin-inline: auto;

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
