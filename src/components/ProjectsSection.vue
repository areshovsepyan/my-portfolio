<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../utils/axios';
import toast from '../../utils/toast';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import BaseProject from '@/components/UI/BaseProject.vue';

const featuredProjects = ref([]);
const isLoading = ref(false);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    featuredProjects.value.length = 0;

    const { data } = await api.get('/pages?name=projects');

    featuredProjects.value = [...data.filter((project) => project.featured)];
  } catch (error) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="projects-section">
    <div class="section-header">
      <h1>
        Here are some<br />
        of my <strong>featured projects</strong>.
      </h1>
      <RouterLink to="/projects"> See projects </RouterLink>
    </div>

    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />

    <div v-else-if="featuredProjects.length" class="projects-container">
      <BaseProject
        v-for="{
          title,
          description,
          technologies,
          image,
          website_url,
          repo_url,
        } in featuredProjects"
        :key="title"
        :title
        :description
        :technologies
        :image
        :website_url
        :repo_url
      />
    </div>
    <p v-else class="no-items">No featured projects found.</p>
  </section>
</template>

<style lang="scss" scoped>
.projects-section {
  @media (min-width: 1024px) {
    align-items: center;
    flex-direction: row;
    gap: 6rem;
  }

  .header-box {
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
