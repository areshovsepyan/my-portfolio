import { defineStore } from 'pinia'

export const useSocialStore = defineStore('social', {
  state: () => ({
    social: [
      {
        label: 'Github',
        href: 'https://github.com/areshovsepyan/',
        type: 'link',
        img: {
          alt: 'Github Icon',
          icon: 'github',
        },
      },
      {
        label: 'Telegram',
        href: 'https://areshovsepyan.t.me/',
        type: 'link',
        img: {
          alt: 'Telegram Icon',
          icon: 'telegram',
        },
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ara-hovsepyan0/',
        type: 'link',
        img: {
          alt: 'LinkedIn Icon',
          icon: 'linkedin',
        },
      },
      // {
      //   label: 'Instagram',
      //   href: 'https://www.instagram.com/armares0/',
      //   type: 'link',
      //   img: {
      //     alt: 'Instagram Icon',
      //     icon: 'instagram',
      //   },
      // },
      // {
      //   label: 'X (formerly Twitter)',
      //   href: 'https://x.com/areshovsepyan',
      //   type: 'link',
      //   img: {
      //     alt: 'X Icon',
      //     icon: 'x',
      //   },
      // },
      {
        label: 'areshovsepyan@yahoo.com',
        href: 'mailto:areshovsepyan@yahoo.com',
        type: 'email',
        img: {
          alt: 'Email Icon',
          icon: 'email',
        },
      },
      {
        label: '+37477072487',
        href: 'tel:+37477072487',
        type: 'phone',
        img: {
          alt: 'Phone Icon',
          icon: 'phone',
        },
      },
    ],
  }),
  getters: {},
  actions: {},
})
