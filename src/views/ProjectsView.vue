<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../utils/axios';
import toast from '../../utils/toast';
import BaseProject from '@/components/UI/BaseProject.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useResize } from '@/composables/useResize';

const { isOnDesktop } = useResize();

const projects = ref([]);
const isLoading = ref(false);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    projects.value.length = 0;

    const { data } = await api.get('/pages?name=projects');

    projects.value = [...data];
  } catch (error) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="projects-section">
    <p class="section-greeting">
      &lt; This is where you can explore my <br v-if="!isOnDesktop" />
      work <br v-if="isOnDesktop" />
      and see the projects that showcase <br v-if="!isOnDesktop" />
      my <strong>skills</strong> and <strong>creativity</strong>. /&gt;
    </p>

    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />

    <div v-else-if="projects.length" class="projects-container">
      <BaseProject
        v-for="{ title, technologies, image } in projects"
        :key="title"
        :title
        :technologies
        :image
      />
    </div>
    <p v-else class="no-items">No projects found.</p>
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

  .card {
    &-title {
      margin: 0;
    }

    @media (min-width: 1024px) {
      align-items: center;
    }

    .info-block {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      .certificate-name {
        color: var(--vt-c-purple-300);

        @media (min-width: 1024px) {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
