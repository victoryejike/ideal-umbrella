<template>
  <div class="container">
    <div class="header">
      <span
        ref="title"
        class="title"
      >
        {{ title }}
      </span>
      <slot name="right" />
    </div>
    <slot name="content" />
  </div>
</template>

<script>

export default {
  name: 'IndexSection',
  props: {
    title: { type: String, required: true },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 6rem;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
}

.title {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: bold;
  white-space: nowrap;
}

.title::after {
  background: #6374c3;
  content: '';
  height: 0.125rem;
  margin-top: 0.5rem;
}
</style>
