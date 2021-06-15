<template>
  <Form
    ref="form"
    @submit="shakeErrorMessage"
  >
    <slot />
  </Form>
</template>

<script>

export default {
  name: 'BaseForm',
  props: {
    submit: { type: Function, require: false, default: null },
  },
  data() {
    return {

    };
  },
  methods: {
    shakeErrorMessage(data) {
      this.$refs.form.validate().then(({ valid }) => {
        if (!valid) {
          const { classList } = document.querySelector('.input-error-msg') ?? {};
          if (classList) {
            classList.add('shake');
            setTimeout(() => { classList.remove('shake'); }, 1000);
          }
        }
      });
      this.submit(data);
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
