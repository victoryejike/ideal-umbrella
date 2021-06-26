<template>
  <div
    class="nft-card"
  >
    <div v-if="btn === 'true'">
      <BaseRoundButton
        class="btn-outline-primary btn-sm"
        :text="btntext"
      />
    </div>
    <div
      class="img-container"
      :class="{'top': btn == 'false'}"
    >
      <img
        :src="img"
      >
    </div>
    <div
      class="type"
    >
      <h5>{{ type }}</h5>
      <p class="text">
        {{ text }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConnetCard',
  props: {
    btn: { type: String, required: true },
    type: { type: String, required: true },
    img: { type: String, required: false, default: null },
    btntext: { type: String, required: false, default: null },
    text: { type: String, required: false, default: null },
  },
};

</script>

<style scoped>
.nft-card {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 1.4375rem;
  margin-right: 1.875rem;
  margin-top: 1.875rem;
  padding: 1.25rem;
  width: 16.625rem !important;
}

.img-container {
  height: 6rem;
  padding: 2rem;
  text-align: center;
}

.type {
  font-size: 1.25rem;
  font-variant-caps: all-petite-caps;
  text-align: center;
}

.top {
  margin-top: 2rem;
}

.type p {
  color: #808080;
  font-size: 0.7rem;
}

.relative {
  position: relative;
  top: 80%;
}
</style>
