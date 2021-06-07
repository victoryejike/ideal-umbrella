<template>
  <div class="label">
    {{ text }}
  </div>
  <div class="upload-box">
    {{ $t('collectible.file_type_text') }}
    <BaseRoundButton
      class="upload-button btn-primary btn-md btn-bold"
      :text="$t('collectible.upload_button_text')"
    />
  </div>
</template>
<script>
export default {
  name: 'UploadCard',
  props: {
    text: { type: String, required: false, default: null },
  },
};
</script>
<style scoped>
.upload-box {
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  border: 0.0625rem dashed rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  box-sizing: border-box;
  color: #808080;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 11.25rem;
  line-height: 150%;
  margin-bottom: 2.5rem;
  margin-top: 1.375rem;
  padding-top: 1.875rem;
  width: 32.5rem;
}

.upload-button {
  margin-top: 4rem;
}

.label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 1.37rem;
}

@media (max-width: 37em) {
  .upload-box {
    font-size: 0.75rem;
    width: 100%;
  }
}
</style>
