import { ref } from 'vue';

const BASE = import.meta.env.VITE_STORAGE_BASE_URL;

const encodePath = (path) => encodeURIComponent(path);

export function useStorage() {
  const loading = ref(false);

  const getImage = (path) => `${BASE}/${encodePath(`images/${path}`)}?alt=media`;

  const getDocument = (path) => `${BASE}/${encodePath(`documents/${path}`)}?alt=media`;

  const preloadImage = (path) => {
    loading.value = true;
    const img = new Image();
    img.src = getImage(path);
    img.onload = () => (loading.value = false);
  };

  return {
    getImage,
    getDocument,
    preloadImage,
    loading,
  };
}
