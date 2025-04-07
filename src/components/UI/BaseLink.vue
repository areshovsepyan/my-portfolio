<script setup>
defineProps({
  link_class: { String, default: 'link-primary' },
  href: { String, required: true },
  target: { String, default: '_self' },
  rel: { String, default: '' },
  download: { String, default: '' },
  disabled: { Boolean, default: false },
});
</script>

<template>
  <a v-if="download" :class="link_class" :href :rel :download :disabled>
    <slot></slot>
  </a>
  <a v-else :class="link_class" :href :rel :target :disabled>
    <slot></slot>
  </a>
</template>
