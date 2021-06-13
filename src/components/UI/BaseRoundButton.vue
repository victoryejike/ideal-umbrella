<template>
  <button
    class="btn-root-style"
    :disabled="isActive"
    type="button"
    @click="timeDelay(); forwardURL(); submit ? onSubmit() : null"
  >
    <div class="btn-left-icon">
      <slot name="icon" />
    </div>
    <span class="btn-text">
      {{ text }}
    </span>
    <img
      v-if="icon === 'arrow-right'"
      class="btn-right-icon"
      height="32"
      src="@svg/arrow-right.svg"
      width="32"
    >
  </button>
</template>

<script>
export default {
  name: 'BaseRoundButton',
  props: {
    icon: { type: String, required: false, default: null },
    submit: { type: Boolean, required: false, default: false },
    text: { type: String, required: true },
    url: { type: String, required: false, default: null },
  },
  data() {
    return { isActive: false };
  },
  methods: {
    forwardURL() {
      if (this.url !== null) { this.$router.push(this.url); }
    },
    onSubmit() {
      this.$parent.validate().then(({ valid }) => {
        if (!valid) {
          const { classList } = document.querySelector('.input-error-msg') ?? {};
          if (classList) {
            classList.add('shake');
            setTimeout(() => { classList.remove('shake'); }, 1000);
          }
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

.btn-left-icon {
  align-items: center;
  display: flex;
  margin-right: 0.375rem;
}

.btn-right-icon {
  height: 2rem;
  margin-left: 1.25rem;
  width: 2rem;
}

.btn-text {
  white-space: nowrap;
}

.btn-bold {
  font-weight: bold;
}

/* Button Size Classes */

.btn-xl {
  padding: 0.75rem 2.5rem;
}

.btn-lg {
  padding: 0.75rem 1.75rem;
}

.btn-md-2 {
  padding: 0.6875rem 1.25rem;
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
