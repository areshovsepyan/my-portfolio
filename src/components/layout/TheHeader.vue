<template>
  <header :class="{ hidden: isHidden && innerWidth < 1024 }">
    <Transition name="fade" mode="out-in">
      <RouterLink v-if="!isOnHomePage && innerWidth > 1024" to="/" class="back-link">
        <img src="/icons/icon_arrow-left.svg" alt="Arrow left" />
        back
      </RouterLink>
    </Transition>
    <nav>
      <ul>
        <li v-for="{ label, path } in routes" :key="label">
          <RouterLink class="social-links" :to="path">
            {{ label }}
          </RouterLink>
        </li>
      </ul>
      <ul v-if="innerWidth > 1024">
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
  </header>
</template>

<script>
import { useSocialStore } from '@/stores/social'
import { useResize } from '/composables/useResize.js'

export default {
  setup() {
    const { social } = useSocialStore()
    const { innerWidth } = useResize()
    return { social, innerWidth }
  },

  data: () => {
    return {
      routes: [
        { label: 'home', path: '/' },
        { label: 'education', path: '/education' },
        { label: 'experience', path: '/experience' },
        { label: 'contact', path: '/contact' },
      ],

      isHidden: false,
      lastScrollTop: 0,
      atTop: true,
    }
  },
  computed: {
    isOnHomePage() {
      return this.$route.fullPath === '/'
    },
  },
  methods: {
    handleScroll() {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        if (scrollTop === 0 || scrollTop < 50) {
          this.isHidden = false
          this.atTop = true
        } else if (scrollTop > this.lastScrollTop) {
          this.isHidden = true
        } else if (scrollTop < this.lastScrollTop) {
          this.isHidden = false
          this.atTop = false
        }

        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
      }, 300)
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped>
header {
  transition:
    transform var(--vt-transition-delay) ease,
    opacity var(--vt-transition-delay) ease;

  nav {
    max-width: 100%;
    padding: 1.2rem;
    gap: 1rem;
    overflow: hidden;

    ul {
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .social-links {
        padding: 0.25rem 0.5rem;

        @media (min-width: 1024px) {
          padding: 0.5rem 1rem;
        }
      }

      .social-icon {
        &:hover {
          img {
            filter: contrast(1);
          }
        }
      }
    }

    @media (min-width: 1024px) {
      padding: 1rem 1.5rem;
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    width: 95%;
    top: 1rem;
    left: 2.5%;
    z-index: 100;
  }

  @media (min-width: 1024px) {
    position: relative;

    .back-link {
      display: flex;
      justify-content: center;
      gap: 0.5rem;

      color: var(--vt-c-white);

      position: absolute;
      left: 0;
    }
  }
}
</style>
