<template>
  <div class="container">
    <div class="header">
      <div class="title-div">
        <div ref="title">
          {{ title }}
        </div>
        <div
          class="title-underline"
          :style="{width: underlineWidth}"
        />
      </div>
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
  data() {
    return {
      underlineWidth: '8rem',
    };
  },
  mounted() {
    setTimeout(() => {
      const width = this.$refs.title.clientWidth / 16;
      this.underlineWidth = `${width}rem`;
    }, 100);
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

.title-div {
  font-size: 2rem;
  font-weight: bold;
}

.title-underline {
  background: #6374c3;
  height: 0.125rem;
  margin-top: 0.5rem;
  width: 9.4rem;
}
</style>
