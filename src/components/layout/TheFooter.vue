<template>
  <footer>
    <nav>
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

    <small> Copyright © 2025 Ara Hovsepyan. </small>
  </footer>
</template>

<script>
import { useSocialStore } from '@/stores/social'

export default {
  setup() {
    const { social } = useSocialStore()
    return { social }
  },
}
</script>

<style lang="scss" scoped>
footer {
  flex-direction: column;

  nav {
    width: 95%;
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
}
</style>
