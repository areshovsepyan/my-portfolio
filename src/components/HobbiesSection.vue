<script setup>
import { Motion } from '@oku-ui/motion';
</script>

<template>
  <section class="hobbies-section">
    <ul>
      <li>
        <Motion
          as="p"
          :initial="{ opacity: 0, y: 100 }"
          :in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ threshold: 0, once: true }"
          :transition="{ duration: 1.5, ease: 'easeOut' }"
        >
          Javascript
        </Motion>
      </li>
      <li>
        <Motion
          as="p"
          :initial="{ opacity: 0, y: 200 }"
          :in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ threshold: 0, once: true }"
          :transition="{ duration: 1.5, ease: 'easeOut' }"
        >
          Vue
        </Motion>
      </li>
      <li>
        <Motion
          as="p"
          :initial="{ opacity: 0, y: 300 }"
          :in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ threshold: 0, once: true }"
          :transition="{ duration: 1.5, ease: 'easeOut' }"
        >
          Coffee
        </Motion>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.hobbies-section {
  display: flex;
  justify-content: center;
  margin: 9rem 0 7rem 0;

  @media (min-width: 1024px) {
    margin: 7rem 0 5rem 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5rem;

    @media (min-width: 1024px) {
      gap: 7rem;
    }

    li {
      text-align: center;

      &:nth-child(1) {
        color: var(--vt-c-purple-300);
      }
      &:nth-child(2) {
        color: var(--vt-c-purple-600);
      }
      &:nth-child(3) {
        color: var(--vt-c-purple-800);
      }

      p {
        font-size: 50px;
        font-weight: 600;

        @media (min-width: 1024px) {
          font-size: 100px;
        }
      }
    }
  }
}
</style>
