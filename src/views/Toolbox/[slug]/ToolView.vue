<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { api } from '../../../../utils/axios';
import toast from '../../../../utils/toast';
import BaseProductSkeleton from '@/components/UI/BaseProductSkeleton.vue';
import BaseProductContent from '@/components/UI/BaseProductContent.vue';

const route = useRoute();
const router = useRouter();

const product = ref(null);
const notFound = ref(false);
const isLoading = ref(false);

const metaTitle = computed(() =>
  product.value ? `${product.value.title} – My Toolbox` : 'Loading…',
);
const metaDescription = computed(() => product.value?.description || 'Loading product...');
const ogImage = computed(() =>
  product.value?.image?.url ? `/images/products/${product.value.image.url}.png` : '',
);

useHead({
  title: metaTitle,
  meta: [
    { name: 'description', content: metaDescription },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:type', content: 'website' },
  ],
});

const fetchProduct = async () => {
  try {
    isLoading.value = true;

    const res = await api.get(`/toolbox?slug=${route.params.id}`);

    if (res.status !== 200 || !res.data) {
      throw new Error('Product Not Found!');
    }

    product.value = res.data;
  } catch ({ error }) {
    toast.error(error);
    notFound.value = true;
    router.replace('/404');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchProduct());
</script>

<template>
  <div class="product-page">
    <BaseProductSkeleton v-if="isLoading" :isLoading />
    <BaseProductContent
      v-else-if="!isLoading && !notFound && product"
      :title="product.title"
      :description="product.description"
      :image="product.image"
      :technologies="product.technologies"
      :versions="product.versions"
    />
  </div>
</template>

<style lang="scss" scoped>
.product-page {
  padding: 0 0 3rem 0;

  @media (min-width: 1024px) {
    padding: 3rem 0 5rem 0;
  }
}
</style>
