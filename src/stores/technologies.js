import { defineStore } from 'pinia';

export const useTechnologiesStore = defineStore('technologies', {
  state: () => ({
    technologies: [
      {
        label: 'HTML',
        img: {
          alt: 'HTML icon',
          icon: 'html',
        },
      },
      {
        label: 'CSS',
        img: {
          alt: 'CSS icon',
          icon: 'css',
        },
      },
      {
        label: 'Javascript',
        img: {
          alt: 'Javascript icon',
          icon: 'javascript',
        },
      },
      {
        label: 'Typescript',
        img: {
          alt: 'Typescript icon',
          icon: 'typescript',
        },
      },
      {
        label: 'Vue.JS',
        img: {
          alt: 'Vue icon',
          icon: 'vue',
        },
      },
      {
        label: 'Pinia',
        img: {
          alt: 'Pinia icon',
          icon: 'pinia',
        },
      },
      {
        label: 'Nuxt.JS',
        img: {
          alt: 'Nuxt icon',
          icon: 'nuxt',
        },
      },
      {
        label: 'Vuetify',
        img: {
          alt: 'Vuetify icon',
          icon: 'vuetify',
        },
      },
      {
        label: 'Vite',
        img: {
          alt: 'Vite icon',
          icon: 'vite',
        },
      },
      {
        label: 'Vercel',
        img: {
          alt: 'Vercel icon',
          icon: 'vercel',
        },
      },
      {
        label: 'SASS',
        img: {
          alt: 'SASS icon',
          icon: 'sass',
        },
      },
      {
        label: 'Tailwind',
        img: {
          alt: 'Tailwind icon',
          icon: 'tailwind',
        },
      },
      {
        label: 'Jest',
        img: {
          alt: 'Jest icon',
          icon: 'jest',
        },
      },
      {
        label: 'Figma',
        img: {
          alt: 'Figma icon',
          icon: 'figma',
        },
      },
      {
        label: 'Postman',
        img: {
          alt: 'Postman icon',
          icon: 'postman',
        },
      },
      {
        label: 'Apollo',
        img: {
          alt: 'Apollo icon',
          icon: 'apollo',
        },
      },
    ],
  }),
  getters: {},
  actions: {},
});
