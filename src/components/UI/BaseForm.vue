<template>
  <Form
    ref="vee-validate-form"
    v-bind="$attrs"
    @submit="onSubmit"
  >
    <Field
      name="csrf_token"
      rules="required"
      type="hidden"
      :value="csrfToken"
    />
    <slot />
  </Form>
</template>

<script>
import { Field, Form } from 'vee-validate';

export default {
  name: 'BaseForm',
  components: { Field, Form },
  props: {
    onSubmit: { type: Function, require: false, default: null },
  },
  data() {
    return {
      csrfToken: 'CIwNZNlR4XbisJF39I8yWnWX9wX4WFoz',
    };
  },
  computed: {
    form() { return this.$refs['vee-validate-form']; },
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
