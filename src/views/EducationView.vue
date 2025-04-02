<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../utils/axios';
import toast from '../../utils/toast';
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useResize } from '@/composables/useResize';

const { isOnDesktop } = useResize();

const education = ref([]);
const isLoading = ref(false);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    education.value.length = 0;

    const { data } = await api.get('/pages?name=education');

    education.value = [...data];
  } catch (error) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="education-section">
    <p class="section-greeting">
      &lt; This is where you can explore my <br v-if="!isOnDesktop" />
      academic journey <br v-if="isOnDesktop" />
      and see the <strong> knowledge </strong> <br v-if="!isOnDesktop" />
      and <strong> skills </strong> I've gained along the way. /&gt;
    </p>

    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />

    <div v-else-if="education.length" class="cards-container">
      <BaseCard v-for="item in education" :key="item.id" class="border-gray">
        <div class="info-block">
          <h2 class="card-title">{{ item.institution }}</h2>
          <p class="certificate-name">
            {{ item.title }}<span v-if="item.field_of_study"> - {{ item.field_of_study }}</span>
          </p>

          <div class="date-block">
            <span>{{ item.start_year }}</span>
            <div class="dot-green"></div>
            <span>{{ item.end_year }}</span>
          </div>
        </div>
        <div>
          <a v-if="item.certificate_url" :href="item.certificate_url" target="_blank"
            >View Certificate</a
          >
        </div>
      </BaseCard>
    </div>
    <p v-else class="no-items">No data found.</p>
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
