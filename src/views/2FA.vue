<template>
  <div class="container">
    <h1 class="twofa-text">
      {{ $t("2fa_screen.title") }}
    </h1>
    <BaseForm
      ref="twofa-form"
      v-slot="{ isLoading }"
      class="twofa-form"
      @submit="onSubmit"
    >
      <BaseUnderlinedInput
        class="input-group"
        name="otp_code"
        :placeholder="$t('2fa_screen.otp_placeholder')"
        rules="required|otp"
        :text="$t('2fa_screen.otp_text')"
        type="number"
      />
      <BaseRoundButton
        ref="twofa-btn"
        class="twofa-btn btn-primary btn-md btn-bold"
        :icon="isLoading ? 'loading' : 'arrow-right'"
        :submit="true"
        :text="$t('2fa_screen.submit')"
      />
    </BaseForm>
  </div>
</template>

<script>

export default {
  name: '2FA',
  data() {
    return {
    };
  },
  computed: {
    formData() { return JSON.parse(this.$route.params.formData); },
  },
  methods: {
    async onSubmit(formData) {
      //
    },
  },
};
</script>

<style scoped>
.twofa-form {
  max-width: 24rem;
}

.twofa-text {
  font-size: 2rem;
  font-weight: bold;
}

.input-group {
  margin-top: 2.5rem;
}

.twofa-btn {
  margin-top: 3.75rem;
  min-width: 0;
}

@media (max-width: 30em) {
  .twofa-btn {
    min-width: 100%;
  }
}
</style>
