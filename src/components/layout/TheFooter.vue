<template>
  <footer>
    <nav>
      <p class="footer-text">Find me in:</p>

      <ul>
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

    <small> Copyright © 2025 Ara Hovsepyan. </small>
  </footer>
</template>

<script>
export default {
  data: () => {
    return {
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
    }
  },

  methods: {
    getLinkHref(type, href) {
      if (type === 'link') return href
      if (type === 'email') return `mailto:${href}`
      if (type === 'phone') return `tel:${href}`
    },
  },
}
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    width: 95%;
    background: var(--vt-c-gray-800);
    border-radius: 100px;
    padding: 0.5rem 1.5rem;
    margin-bottom: 2rem;

    ul {
      display: flex;
      align-items: center;
      margin-left: auto;

      .social-icon {
        display: flex;
        align-items: center;
        padding: 0.4rem;
      }
    }

    @media (min-width: 1024px) {
      padding: 1rem 1.5rem;
      .footer-text {
        font-size: 20px;
      }
    }
  }
}
</style>
