<script setup>
import { useSocialStore } from '@/stores/social';

const { social } = useSocialStore();
</script>

<template>
  <footer>
    <nav class="border-gradient-nav">
      <p class="footer-text">Find me in:</p>

      <ul>
        <li v-for="{ href, type, img: { alt, icon } } in social" :key="href">
          <a
            v-if="!type.toLocaleLowerCase().includes('phone')"
            class="social-icon"
            :href="href"
            :target="type === 'link' ? '_blank' : '_self'"
          >
            <img :src="`/icons/social/icon_${icon}.svg`" :alt="alt" />
          </a>
        </li>
      </ul>
    </nav>

    <small>
      © 2025 Ara Hovsepyan ·
      <a href="https://github.com/areshovsepyan/my-portfolio/blob/master/LICENSE" target="_blank">
        MIT License
      </a>
    </small>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  flex-direction: column;

  nav {
    width: 100%;
    padding: 0.5rem 1.5rem;
    margin-bottom: 2rem;

    ul {
      margin-left: auto;
    }

    .footer-text {
      @media (min-width: 1024px) {
        font-size: 20px;
      }
    }
  }

  small {
    a {
      all: unset;
      font-size: smaller;
      color: var(--vt-c-purple-300);
      cursor: pointer;
    }
  }
}
</style>
