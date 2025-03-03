import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import Toast from 'vue-toastification';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Toast, {
  closeButton: false,
  position: 'top-right',
  timeout: 3000,
  maxToasts: 10,
  closeOnClick: true,
  hideProgressBar: true,
});

app.mount('#app');
