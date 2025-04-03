<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../utils/axios';
import toast from '../../utils/toast';
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useResize } from '@/composables/useResize';

const { isOnDesktop } = useResize();

const experience = ref([]);
const isLoading = ref(false);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    experience.value.length = 0;

    const { data } = await api.get('/pages?name=experience');

    experience.value = [...data];
  } catch (error) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="experience-section">
    <p class="section-greeting">
      &lt; This is where you can know me <br v-if="!isOnDesktop" />
      a little more <br v-if="isOnDesktop" />
      and see my whole experience <br v-if="!isOnDesktop" />
      as a <strong>Front-End Developer.</strong> /&gt;
    </p>
    <BaseButton>Download CV</BaseButton>

    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />

    <div v-else-if="experience.length" class="cards-container">
      <BaseCard v-for="item in experience" :key="item.id" class="bg-gray">
        <div class="info-block">
          <h2 class="card-title">{{ item.position }}</h2>
          <p class="employment-type">{{ item.employment_type }}</p>
          <div class="date-block">
            <span>{{ item.start_date }}</span>
            <div class="dot-gray"></div>
            <span>{{ item.end_date }}</span>
          </div>
          <p class="location">{{ item.location }}</p>
        </div>

        <div class="text-block">
          <a
            class="company-name"
            v-if="item.company_website"
            :href="item.company_website"
            target="_blank"
          >
            {{ item.company }}
          </a>
          <h2 v-else>
            {{ item.company }}
          </h2>
          <p class="job-description">
            {{ item.description }}
          </p>
          <ul class="job-bullet-points" v-if="item.bullet_points.length">
            <li
              v-for="bullet_point in item.bullet_points"
              :key="bullet_point"
              class="job-bullet-point"
            >
              <p>{{ bullet_point }}</p>
            </li>
          </ul>
          <ul class="job-technologies">
            <li v-for="(technology, index) in item.technologies" :key="technology">
              <div v-if="index" class="dot-purple"></div>
              {{ technology }}
            </li>
          </ul>
        </div>
      </BaseCard>
    </div>
    <p v-else class="no-items">No experiences found.</p>
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 1rem 0 5rem 0;

  button {
    margin: 0 auto 6rem auto;

    @media (min-width: 1024px) {
      margin-bottom: 6rem;
    }
  }

  .info-block {
    flex: 1 0 auto;
  }

  .text-block {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .employment-type {
    font-size: 16px;
    color: var(--vt-c-green);
    margin-bottom: 0.5rem;

    @media (min-width: 1024px) {
      font-size: 22px;
      margin-bottom: 1rem;
    }
  }

  .company-name {
    color: var(--vt-c-purple-300);
    font-size: 22px;
    font-weight: 600;
  }

  .job {
    &-description {
      font-size: 14px;
      line-height: 1.5;

      @media (min-width: 1024px) {
        font-size: 20px;
        line-height: 1.7;
      }
    }

    &-bullet-points {
      display: flex;
      flex-direction: column;
      padding-left: 14px;
      gap: 0.5rem;

      @media (min-width: 1024px) {
        gap: 1rem;
      }

      li {
        list-style-type: disc;

        p {
          font-size: 13px;
          font-style: italic;

          @media (min-width: 1024px) {
            font-size: 18px;
            line-height: 1.5;
          }
        }
      }
    }

    &-technologies {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;

      @media (min-width: 1024px) {
        gap: 0.75rem;
      }

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: var(--vt-c-purple-300);
        font-size: 13px;

        @media (min-width: 1024px) {
          font-size: 16px;
          gap: 0.75rem;
        }
      }
    }
  }

  .location {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    padding: 4rem 0;
  }
}
</style>
