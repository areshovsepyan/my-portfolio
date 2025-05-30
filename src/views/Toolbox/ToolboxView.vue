<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../../utils/axios';
import toast from '../../../utils/toast';
import BaseProduct from '@/components/UI/BaseProduct.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useResize } from '@/composables/useResize';

const { isOnDesktop } = useResize();

const products = ref([]);
const isLoading = ref(false);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    products.value.length = 0;

    const { data } = await api.get('/pages?name=products');

    products.value = [...data];
  } catch (error) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="products-section">
    <p class="section-greeting">
      &lt; This is where you can explore <br v-if="!isOnDesktop" />
      the <strong>tools</strong> <br v-if="isOnDesktop" />
      and <strong>code kits</strong> I build to help and <br v-if="!isOnDesktop" />
      support the dev community. /&gt;
    </p>

    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />

    <div v-else-if="products.length" class="products-container">
      <BaseProduct
        v-for="{ id, title, description, image, slug, technologies, versions } in products"
        :key="id"
        :title
        :description
        :image
        :slug
        :technologies
        :versions
      />
    </div>
    <p v-else class="no-items">No kits found.</p>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  .section-greeting {
    margin-bottom: 6rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }
}
</style>
