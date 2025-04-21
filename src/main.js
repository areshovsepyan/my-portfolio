import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { motionPlugin } from '@oku-ui/motion';

import App from './App.vue';
import Toast from 'vue-toastification';
import router from './router';

import VueGtag from 'vue-gtag';

const app = createApp(App);

app.use(createPinia());

app.use(motionPlugin);

app.use(router);

app.use(
  VueGtag,
  {
    config: { id: 'G-D8F0BB5FJZ' },
  },
  router,
);

app.use(Toast, {
  closeButton: false,
  position: 'top-right',
  timeout: 3000,
  maxToasts: 10,
  closeOnClick: true,
  hideProgressBar: true,
});

app.mount('#app');
