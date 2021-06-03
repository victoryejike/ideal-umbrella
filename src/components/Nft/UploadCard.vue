<template>
  <div class="label">
    {{ text }}
  </div>
  <div class="upload-box">
    {{ $t('single_collectible.file_type_text') }}
    <BaseRoundButton
      class="btn"
      :text="$t('single_collectible.upload_button_text')"
      type="primary"
      size="m"
    />
  </div>
</template>
<script>
export default {
  name: 'BaseUnderlinedInput',
  props: {
    text: { type: String, required: false, default: null },
  },
};
</script>
<style scoped>
.upload-box {
  align-items: center;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.25);
  border: 0.0625rem dashed rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  box-sizing: border-box;
  color: #808080;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-style: normal;
  font-weight: bold;
  height: 11.25rem;
  line-height: 150%;
  margin-bottom: 2.5rem;
  margin-top: 1.375rem;
  padding-top: 1.875rem;
  width: 32.5rem;
}

.btn {
  margin-top: 64.5px;
}

.label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 1.37rem;
}
</style>
