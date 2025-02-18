import { defineStore } from 'pinia'

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
        label: 'Nuxt.JS',
        img: {
          alt: 'Nuxt icon',
          icon: 'nuxt',
        },
      },
      {
        label: 'Vite',
        img: {
          alt: 'Vite icon',
          icon: 'vite',
        },
      },
    ],
  }),
  getters: {},
  actions: {},
})
