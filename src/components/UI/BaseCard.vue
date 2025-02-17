<template>
  <div
    class="card"
    :style="getBackgroundColor"
    :class="{ colored, 'border-gradient': border_gradient }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    border_gradient: {
      type: Boolean,
      default: false,
      required: false,
    },
    background_color: {
      type: Number,
      default: undefined, // from 1 to 4
      required: false,
    },
    colored: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    getBackgroundColor() {
      return this.background_color
        ? `backgroundColor: var(--vt-c-accent-${this.background_color})`
        : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;

  @media (min-width: 1024px) {
    gap: 2rem;
    padding: 2rem 4rem;
  }
}

.colored {
  justify-content: center;
  align-items: start;
  border-radius: 60px;
  color: var(--vt-c-gray-700);
}
</style>
