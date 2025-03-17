<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSocialStore } from '@/stores/social';
import { useResize } from '@/composables/useResize.js';

const router = useRouter();
const route = useRoute();

const { social } = useSocialStore();
const { isOnMobile } = useResize();

const routes = [
  { label: 'home', path: '/' },
  { label: 'projects', path: '/projects' },
  { label: 'experience', path: '/experience' },
  { label: 'contact', path: '/contact' },
];

const lastScrollTop = ref(0);
const isHidden = ref(false);
const atTop = ref(true);

const isOnHomePage = computed(() => route.fullPath === '/');

const handleScroll = function () {
  const timeout = setTimeout(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop === 0 || scrollTop < 150) {
      isHidden.value = false;
      atTop.value = true;
    } else if (scrollTop > lastScrollTop.value) {
      isHidden.value = true;
    } else if (scrollTop < lastScrollTop.value) {
      isHidden.value = false;
      atTop.value = false;
    }

    lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop;

    clearTimeout(timeout);
  }, 100);
};

const goBack = function () {
  if (window.history.length > 1) router.back();
  else router.push('/');
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header :class="{ hidden: isHidden }">
    <Transition name="fade" mode="out-in">
      <button v-if="!isOnHomePage && !isOnMobile" @click="goBack" class="btn-back">
        <img src="/icons/icon_arrow-left.svg" alt="Arrow left" />
        <span>back</span>
      </button>
    </Transition>

    <nav class="border-gradient-nav">
      <ul>
        <li v-for="{ label, path } in routes" :key="label">
          <RouterLink class="social-links" :to="path">
            {{ label }}
          </RouterLink>
        </li>
      </ul>
      <ul v-if="!isOnMobile">
        <li v-for="{ href, type, img: { alt, icon } } in social" :key="href">
          <a
            v-if="!type.toLocaleLowerCase().includes('phone')"
            class="social-icon"
            :href="href"
            :target="type === 'link' ? '_blank' : '_self'"
          >
            <img :src="`/icons/social/icon_${icon}.svg`" :alt="alt" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  top: 1rem;
  left: 0;
  z-index: 100;
  transition:
    transform var(--vt-transition-delay) ease,
    opacity var(--vt-transition-delay) ease;

  nav {
    max-width: 100%;
    padding: 1.2rem;
    gap: 1rem;
    overflow: hidden;

    @media (min-width: 1024px) {
      padding: 0.75rem 1.5rem;
    }

    ul {
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .social-links {
        padding: 0.25rem 0.5rem;

        @media (min-width: 1024px) {
          padding: 0.5rem 1rem;
        }
      }
    }
  }

  .btn-back {
    position: absolute;
    left: 2rem;
  }
}
</style>
