<script setup>
import { ref, onMounted } from 'vue';
import BaseLink from './UI/BaseLink.vue';
import BaseButton from './UI/BaseButton.vue';

const showPromo = ref(false);

onMounted(() => {
  const hasSeenPromo = sessionStorage.getItem('gumroad-promo-seen');
  if (!hasSeenPromo) {
    setTimeout(() => {
      showPromo.value = true;
      sessionStorage.setItem('gumroad-promo-seen', 'true');
    }, 5000);
  }
});

const closePromo = () => {
  showPromo.value = false;
};
</script>

<template>
  <transition name="slide-up-fade">
    <div v-if="showPromo" class="gumroad-promo">
      <div class="gumroad-promo__content">
        <div class="gumroad-promo__text">
          <h3>New on Gumroad</h3>
          <p>Check out my latest Vue Composables Kit and other developer tools on Gumroad!</p>
          <BaseLink
            @click="closePromo"
            class="gumroad-promo__link"
            href="https://arahovsepyan.gumroad.com"
            target="_blank"
            rel="noopener"
          >
            Visit Store →
          </BaseLink>
        </div>

        <BaseButton @click="closePromo" class="gumroad-promo__close" btn_class="btn-tertiary">
          ✕
        </BaseButton>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.gumroad-promo {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--vt-c-purple-800);
  padding: 1rem;
  z-index: 1000;

  @media (min-width: 1024px) {
    padding: 2rem;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__text {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.25rem;

    h3 {
      color: var(--vt-c-white);
      font-size: 1.25rem;
      font-weight: 600;

      @media (min-width: 1024px) {
        font-size: 1.75rem;
      }
    }

    p {
      color: var(--vt-c-gray-300);
      margin-bottom: 0.5rem;
      font-size: 1rem;

      @media (min-width: 1024px) {
        font-size: 1.25rem;
      }
    }
  }
  &__link {
    border-radius: 0;
    min-width: 200px;

    @media (max-width: 1024px) {
      min-width: 160px;
      height: 40px;
    }
  }
}
</style>
