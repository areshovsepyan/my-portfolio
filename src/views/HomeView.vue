<script setup>
import { onMounted } from 'vue';
import toast from '../../utils/toast';
import IntroductionSection from '@/components/IntroductionSection.vue';
import TechnologiesSection from '@/components/TechnologiesSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import TestimonialsSection from '@/components/TestimonialsSection.vue';

onMounted(() => {
  toast.warning(
    {
      title: 'Website Under Development',
      text: 'This website is currently in development. Most of the data shown is mock data and subject to change. Stay tuned for updates!',
    },
    {
      timeout: 10000,
    },
  );
});
</script>

<template>
  <IntroductionSection />
  <TechnologiesSection />
  <ProjectsSection />
  <TestimonialsSection />
</template>

<style lang="scss" scoped></style>
