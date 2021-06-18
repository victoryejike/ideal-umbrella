<template>
  <div class="container">
    <div class="header">
      <div class="title-div">
        <div
          class="title"
          :style="!underlined ? 'width: 100%':null"
        >
          {{ title }}
          <div
            v-if="underlined"
            class="title-underline"
          />
        </div>
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
    underlined: { type: Boolean, required: false, default: true },
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 6rem;
}

.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
}

.title-div {
  font-size: 2rem;
  font-weight: bold;
  width: 50%;
}

.title {
  display: inline-block;
  overflow: hidden;
}

.title-underline {
  background: #6374c3;
  height: 0.1rem;
  margin-top: 0.5rem;
}

@media (max-width: 46em) {
  .header {
    align-items: normal;
    flex-direction: column;
    margin-bottom: 3rem;
  }

  .title-div {
    margin-bottom: 2rem;
  }
}
</style>
