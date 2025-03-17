import { h } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const error = (error, config) => {
  toast.error(typeof error === 'object' ? error.message : error, config);
};

export const success = (message, config) => {
  toast.success(message, config);
};

export const info = (message, config) => {
  toast.info(message, config);
};
export const warning = ({ title, text }, config) => {
  toast.warning(h('div', {}, [h('h2', {}, title || ''), h('p', {}, text || '')]), config);
};

export default { error, success, info, warning };
