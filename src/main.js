import './assets/main.scss';

import { createApp } from 'vue';
import { createGtag } from 'vue-gtag';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client';
import { motionPlugin } from '@oku-ui/motion';

import App from './App.vue';
import Toast from 'vue-toastification';
import router from './router';

const app = createApp(App);

const gtag = createGtag({
  tagId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  pageTracker: {
    router,
  },
});

const head = createHead();

app.use(createPinia());

app.use(motionPlugin);

app.use(router);

app.use(gtag);

app.use(head);

app.use(Toast, {
  closeButton: false,
  position: 'top-right',
  timeout: 3000,
  maxToasts: 10,
  closeOnClick: true,
  hideProgressBar: true,
});

app.mount('#app');
