<template>
  <button
    class="btn-root-style"
    :disabled="isActive"
    type="button"
    @click="timeDelay(); forwardURL(); submit ? handleSubmit() : null"
  >
    <img
      v-if="img"
      :src="img"
      style="margin-right: 0.3rem;"
    >
    <span
      v-if="text"
      class="btn-text"
    >
      {{ text }}
    </span>
    <div
      v-if="icon"
      class="btn-right-icon"
      :style="(text) ? 'margin-left: 1.25rem;' : null"
    >
      <img
        v-if="icon === 'arrow-right'"
        src="@svg/arrow-right.svg"
        style="height: 2rem; width: 2rem;"
      >
      <img
        v-else-if="icon === 'loading'"
        src="@svg/loading.svg"
        style=" background-color: #fff; border-radius: 50%; height: 2rem; width: 2rem;"
      >
      <img
        v-else-if="icon === 'transparent-loading'"
        src="@svg/loading.svg"
        style="height: 2rem; width: 2rem;"
      >
      <img
        v-else-if="icon === 'transparent-loading-sm'"
        src="@svg/loading.svg"
        style="height: 0.75rem; margin-left: -0.8rem; width: 0.75rem;"
      >
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseRoundButton',
  props: {
    icon: { type: String, required: false, default: null },
    submit: { type: Boolean, required: false, default: false },
    text: { type: String, required: false, default: null },
    url: { type: String, required: false, default: null },
    img: { type: String, required: false, default: null },
  },
  data() {
    return { isActive: false };
  },
  methods: {
    forwardURL() {
      if (this.url !== null) { this.$router.push(this.url); }
    },
    handleSubmit() {
      this.$parent.validate().then(({ valid }) => {
        if (!valid) {
          const { classList } = document.querySelector('.input-error-msg-effect') ?? {};
          if (classList) {
            classList.add('shake');
            setTimeout(() => { classList.remove('shake'); }, 1000);
          }
        } else {
          this.$parent.$parent.submit();
        }
      });
    },
    // Prevent multiple click in short time
    timeDelay() {
      this.isActive = true;
      setTimeout(() => { this.isActive = false; }, 1000);
    },
  },
};
</script>

<style scoped>
.btn-root-style {
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

.btn-root-style:active {
  filter: brightness(85%);
  transform: translateY(0.25rem);
  transition: all 0.5s, filter 0s, transform 0s;
}

.btn-right-icon {
  align-items: center;
  display: flex;
}

.btn-text {
  white-space: nowrap;
}

.btn-bold {
  font-weight: bold;
}

.btn-unclickable {
  pointer-events: none;
}

/* Button Size Classes */
.btn-xxl {
  padding: 0.8125rem 3.875rem;
}

.btn-xl {
  padding: 0.75rem 2.5rem;
}

.btn-lg {
  padding: 0.75rem 1.75rem;
}

.btn-md {
  padding: 0.45rem 1.75rem;
}

.btn-sm {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
}

/* Button Type Classes */

.btn-primary {
  background: #2c43ad;
  color: #fff;
}

.btn-secondary {
  background: #5d6ec2;
  color: #fff;
}

.btn-outline-primary {
  background-color: transparent;
  border: 0.1rem solid #2c43ad;
  color: #2c43ad;
}

.btn-outline-secondary {
  background-color: transparent;
  border: 0.1rem solid #b4c5eb;
  color: #8598d7;
}

.btn-outline-danger {
  background-color: transparent;
  border: 0.1rem solid #ff3a31;
  border-radius: 0.5rem;
  color: #ff3a31;
}
</style>
