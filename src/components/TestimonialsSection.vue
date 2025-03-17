<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../utils/axios';
import toast from '../../utils/toast';
import { Carousel, Slide, Pagination } from 'vue3-carousel';

const config = {
  autoplay: 10000,
  itemsToShow: 1,
  gap: 50,
  transition: 1500,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};

const testimonials = ref([]);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    testimonials.value.length = 0;

    const { data } = await api.get('/pages?name=testimonials');

    testimonials.value = [...data];
  } catch (error) {
    toast.error(error);
  }
};
</script>

<template>
  <section class="testimonials-section">
    <Carousel v-if="testimonials.length" v-bind="config">
      <Slide v-for="{ id, from, stars, text } in testimonials" :key="Number(id)">
        <div class="testimonial">
          <div class="testimonial-stars">
            <img
              v-for="star in Number(stars)"
              :key="star"
              src="/icons/icon_star.svg"
              alt="Star icon"
            />
          </div>

          <p class="testimonial-text">"{{ text }}"</p>

          <div class="from">
            <img
              :src="`/images/people/${from.image.url}.jpeg`"
              :alt="from.image.alt"
              class="from-image"
            />
            <div class="from-info">
              <p class="from-name">{{ from.name }}</p>
              <p class="from-position">{{ from.position }}</p>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<style lang="scss" scoped>
.testimonials-section {
  display: flex;
  justify-content: center;
  padding-bottom: 7rem;

  @media (min-width: 1024px) {
    padding-bottom: 10rem;
  }

  .testimonial {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    &-stars {
      display: flex;
      gap: 6px;

      img {
        width: 24px;

        @media (min-width: 1024px) {
          width: 36px;
        }
      }
    }

    &-text {
      font-style: italic;
      text-align: center;
      color: var(--vt-c-gray-300);
      font-size: 16px;

      @media (min-width: 1024px) {
        font-size: 20px;
      }
    }

    .from {
      display: flex;
      align-items: center;
      gap: 1rem;

      &-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      &-name {
        color: var(--vt-c-white);
        font-size: 18px;
      }
      &-position {
        font-size: 14px;
      }
    }
  }
}
</style>
