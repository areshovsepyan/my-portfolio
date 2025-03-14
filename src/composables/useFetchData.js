import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { admin } from '../../utils/axios.js';
import toast from '../../utils/toast.js';

export function useFetchData() {
  const isLoading = ref(false);
  const isRotating = ref(false);
  const dataList = ref([]);
  const route = useRoute();

  const fetchData = async () => {
    try {
      isLoading.value = true;
      dataList.value.length = 0;

      const category = route.path.split('/').pop();
      const { data } = await admin.get(`/data?category=${category}`);

      dataList.value = [...data];
    } catch ({ error }) {
      toast.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const manualFetchData = async () => {
    try {
      if (isLoading.value) return;
      isRotating.value = true;

      await fetchData();
    } catch ({ error }) {
      toast.error(error);
    } finally {
      isRotating.value = false;
    }
  };

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  onMounted(fetchData);

  // watch(() => route.path, fetchData, { immediate: true });

  return {
    isLoading,
    isRotating,
    dataList,
    generateId,
    manualFetchData,
  };
}
