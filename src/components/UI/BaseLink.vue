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
  <a v-if="download" :href :rel :download :class="[link_class, { disabled: disabled }]">
    <slot></slot>
  </a>
  <a v-else :href :rel :target :class="[link_class, { disabled: disabled }]">
    <slot></slot>
  </a>
</template>
