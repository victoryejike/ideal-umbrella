<template>
  <button
    class="btn"
    :class="[type, size, {'bold-text':bold}]"
    @click="forwardURL"
  >
    {{ text }}
    <img
      v-if="icon == 'arrow-right'"
      src="@svg/arrow-right.svg"
      class="btn-icon"
      width="32"
      height="32"
    >
  </button>
</template>

<script>
export default {
  name: 'BaseRoundButton',
  props: {
    text: { type: String, required: true },
    bold: { type: Boolean, required: false, default: false },
    icon: { type: String, required: false, default: null },
    size: { type: String, required: false, default: 'l' },
    type: { type: String, required: false, default: 'primary' },
    url: { type: String, required: false, default: null },
  },
  methods: {
    forwardURL() {
      if (this.url !== null) { this.$router.push(this.url); }
    },
  },
};
</script>

<style scoped>
.btn {
  align-items: center;
  border-radius: 2rem;
  border-width: 0;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  line-height: 150%;
  outline: 0;
  text-align: center;
  transition: all 0.5s, filter 0s, transform 0s;
}

.bold-text {
  font-weight: bold;
}

.xl {
  padding: 0.75rem 2.5rem;
}

.l {
  padding: 0.75rem 1.75rem;
}

.m {
  padding: 0.45rem 1.75rem;
}

.s {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
}

.btn:active {
  filter: brightness(85%);
  transform: translateY(0.25rem);
  transition: all 0.5s, filter 0s, transform 0s;
}

.btn-icon {
  height: 2rem;
  margin-left: 1.25rem;
  width: 2rem;
}

.primary {
  background: #2c43ad;
  color: #fff;
}

.secondary {
  background: #5d6ec2;
  color: #fff;
}

.outline {
  background-color: transparent;
  border: 0.1rem solid #2c43ad;
  color: #2c43ad;
}

.outline-danger {
  background-color: transparent;
  border: 0.1rem solid #ff3a31;
  border-radius: 0.5rem;
  color: #ff3a31;
}
</style>
