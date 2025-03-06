import { useToast } from 'vue-toastification';

const toast = useToast();

export const error = (error) => {
  toast.error(typeof error === 'object' ? error.message : error);
};

export const success = (message) => {
  toast.success(message);
};

export default { error, success };
