<template>
  <Form
    @submit="onSubmit"
  >
    <Field
      name="csrf_token"
      type="hidden"
      :value="csrfToken"
    />
    <slot />
  </Form>
</template>

<script>
import { Field } from 'vee-validate';

export default {
  name: 'BaseForm',
  components: { Field },
  props: {
    onSubmit: { type: Function, require: false, default: null },
  },
  data() {
    return {
      csrfToken: null,
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
