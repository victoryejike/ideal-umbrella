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
  border-radius: 32px;
  border-width: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  line-height: 150%;
  outline: 0;
  text-align: center;
}

.bold-text {
  font-weight: bold;
}

.l {
  padding: 12px 28px 12px 28px;
}

.m {
  padding: 7px 28px 7px 28px;
}

.s {
  font-size: 12px;
  padding: 5px 12px 5px 12px;
}

button:active {
  filter: brightness(85%);
  transform: translateY(4px);
}

.btn-icon {
  height: 32px;
  margin-left: 20px;
  width: 32px;
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
  border: 1px solid #2c43ad;
  color: #2c43ad;
}
</style>
