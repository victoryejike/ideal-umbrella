<template>
  <div
    id="message"
    :class="type"
  >
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'Error',
  props: {
    message: { type: String, required: true },
    type: { type: String, required: true },
  },
};
</script>

<style scoped>
  #message {
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  .success {
    color: #5e6ec2;
  }

  .error {
    color: #ff3a31;
  }
</style>
