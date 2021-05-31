<template>
  <button
    ref="btn"
    :class="[type, size, {'bold-text':bold}]"
    @click="if(url.length !== 0) $router.push(url);"
  >
    {{ text }}
    <img
      v-if="icon == 'arrow-right'"
      src="@svg/arrow-right.svg"
      class="btn-icon"
    >
  </button>
</template>

<script>
export default {
  name: 'BaseRoundButton',
  props: {
    text: { type: String, required: true },
    type: { type: String, default: 'primary' },
    icon: { type: String, required: false, default: 'primary' },
    url: { type: String, required: false, default: '' },
    size: { type: String, required: false, default: 'l' },
    bold: { type: Boolean, required: false, default: false },
  },
};
</script>

<style scoped>
button {
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
}

.bold-text {
  font-weight: bold;
}

.l {
  padding: 0.75rem 1.75rem 0.75rem 1.75rem;
}

.m {
  padding: 0.45rem 1.75rem 0.45rem 1.75rem;
}

.s {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem 0.35rem 0.75rem;
}

button:active {
  filter: brightness(85%);
  transform: translateY(0.25rem);
  transition: all 0s;
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
  border: 1px solid #ff3a31;
  border-radius: 10px;
  color: #ff3a31;
}
</style>
