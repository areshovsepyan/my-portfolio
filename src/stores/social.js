import { defineStore } from 'pinia';

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
        label: 'Gumroad',
        href: 'https://arahovsepyan.gumroad.com/',
        type: 'link',
        img: {
          alt: 'Gumroad Icon',
          icon: 'gumroad',
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
      {
        label: 'areshovsepyan@yahoo.com',
        href: 'mailto:areshovsepyan@yahoo.com',
        type: 'email',
        img: {
          alt: 'Email Icon',
          icon: 'email',
        },
      },
    ],
  }),
  getters: {},
  actions: {},
});
