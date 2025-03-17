<script setup>
import { ref } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';

const config = {
  autoplay: 10000,
  itemsToShow: 1,
  gap: 50,
  transition: 1500,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};

const testimonials = ref([
  {
    id: 0,
    from: {
      name: 'Alex Geana',
      position: 'CEO and Founder of OrderSpark',
      image: {
        url: 'alex',
        alt: 'Picture of Alex Geana',
      },
    },
    stars: 5,
    text: 'I really enjoyed working with Ara and look forward to working with him again. He’s a very talented developer, and I can’t recommend him enough. Ara was always present, reported his work in a timely manner, and, most importantly, consistently wrote clean, efficient code. He’s also a great person, and I thoroughly enjoyed getting to know him. He was one of the best members of my team and played a key role in helping us achieve our goals. Developers who communicate well and deliver on their promises are rare in tech, but Ara stands out as someone who does both effortlessly.',
  },
  {
    id: 1,
    from: {
      name: 'Anna Kolko',
      position: 'Project Manager at OrderSpark',
      image: {
        url: 'anna',
        alt: 'Picture of Anna Kolko',
      },
    },
    stars: 5,
    text: 'I had the privilege of working with Ara at OrderSpark. As a Project Manager I felt very confident working with him. Ara is a very passionate person and it also includes his attitude towards quality of his work, no matter the complexity or deadlines. Also should be highlighted his proactive problem-solving mindset which I observed during the OrderSpark platform development. He is positive, easy-going, willing to go extra mile to support the team. I do recommend him to any project. I’m confident about his professionalism and expertise.',
  },
]);
</script>

<template>
  <section class="testimonials-section">
    <Carousel v-bind="config">
      <Slide v-for="{ id, from, stars, text } in testimonials" :key="id">
        <div class="testimonial">
          <div class="testimonial-stars">
            <img v-for="star in stars" :key="star" src="/icons/icon_star.svg" alt="Star icon" />
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
