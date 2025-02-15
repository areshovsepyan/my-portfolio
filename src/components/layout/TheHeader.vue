<template>
  <header :class="{ hidden: isHidden && innerWidth < 1024 }">
    <Transition name="fade" mode="out-in">
      <RouterLink v-if="!isOnHomePage && innerWidth > 1024" to="/" class="back">
        <img src="/icons/icon_arrow-left.svg" alt="Arrow left" />
        back
      </RouterLink>
    </Transition>
    <nav>
      <ul>
        <li v-for="{ label, path } in routes" :key="label">
          <RouterLink :to="path">
            {{ label }}
          </RouterLink>
        </li>
      </ul>
      <ul v-if="innerWidth > 1024">
        <li v-for="{ href, type, img: { alt, icon } } in social" :key="href">
          <a
            class="social-icon"
            :href="getLinkHref(type, href)"
            :target="type === 'link' ? '_blank' : '_self'"
          >
            <img :src="`/icons/icon_${icon}.svg`" :alt="alt" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      routes: [
        { label: 'home', path: '/' },
        { label: 'education', path: '/education' },
        { label: 'experience', path: '/experience' },
        { label: 'contact', path: '/contact' },
      ],

      social: [
        {
          href: 'https://github.com/areshovsepyan/',
          type: 'link',
          img: {
            alt: 'Github Icon',
            icon: 'github',
          },
        },
        {
          href: 'https://www.linkedin.com/in/ara-hovsepyan0/',
          type: 'link',
          img: {
            alt: 'LinkedIn Icon',
            icon: 'linkedin',
          },
        },
        {
          href: 'areshovsepyan@yahoo.com',
          type: 'email',
          img: {
            alt: 'Email Icon',
            icon: 'email',
          },
        },
      ],

      innerWidth: window.innerWidth,

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
    getLinkHref(type, href) {
      if (type === 'link') return href
      if (type === 'email') return `mailto:${href}`
      if (type === 'phone') return `tel:${href}`
    },

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

    onResize() {
      this.innerWidth = window.innerWidth
    },
  },

  mounted() {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;

  transition:
    transform var(--vt-transition-delay) ease,
    opacity var(--vt-transition-delay) ease;

  nav {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    background: var(--vt-c-gray-800);
    border-radius: 100px;
    max-width: 100%;
    overflow: hidden;
    padding: 1.2rem;

    ul {
      display: flex;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;

      .social-icon {
        display: flex;
        align-items: center;
        padding: 0.4rem;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      a {
        padding: 6px 12px;

        @media (min-width: 1024px) {
          padding: 0.5rem 1rem;
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
    z-index: 1;
  }

  @media (min-width: 1024px) {
    position: relative;
    margin-bottom: 7rem;

    .back {
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
