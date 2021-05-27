<template>
  <input
    :placeholder="placeholder"
    :type="text"
  >
</template>
<script>
export default {
  name: 'ForgotPasswordInput',
  props: {
    text: { type: String, required: false, default: null },
    placeholder: { type: String, required: true },
  },
};
</script>
<style scoped>
.flex{
  display:flex;
}
.mt-15{
    margin-top: 15px;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: inherit;
  font-size: 16px;
}
select::-ms-expand {
  display: none;
}
.input-phone input{
  border: none;
  width: 200px;
  color: rgba(0, 0, 0, 0.25);
  background: inherit;
  font-size: 16px;
}
input:focus, textarea:focus, select:focus{
    outline: none;
}
</style>
