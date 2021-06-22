<template>
  <div class="container">
    <BaseForm
      ref="forgot-password-form"
      class="forgot-password-form"
      @submit="onSubmit"
    >
      <h1 class="forgot-password-text">
        {{ $t("forgot_password.forgot_password") }}
      </h1>
      <BaseNavigationTab
        :list="forgotPasswordTab"
        :width="10.6"
      />
      <BaseUnderlinedInput
        v-if="isEmail"
        class="input-field"
        name="email"
        :placeholder="$t('register_screen.email_placeholder')"
        rules="required|email"
        :text="$t('register_screen.email_label')"
      />
      <BaseUnderlinedInput
        v-if="!isEmail"
        class="input-field"
        name="phone"
        :placeholder="$t('register_screen.phone_placeholder')"
        rules="required|phone"
        :text="$t('forgot_password.phone')"
        type="tel"
      />
      <BaseUnderlinedInput
        class="input-field"
        :ismail="isEmail"
        name="otp"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="otp"
      />
      <BaseRoundButton
        class="send-btn btn-primary btn-md btn-bold"
        icon="arrow-right"
        :submit="true"
        :text="$t('forgot_password.send')"
      />
      <div class="forgot-password-div">
        {{ $t("forgot_password.already_have_account") }}
        <router-link
          class="login-link"
          to="/login"
        >
          {{ $t("forgot_password.login") }}
        </router-link>
      </div>
    </BaseForm>
  </div>
</template>

<script>

export default {
  name: 'ForgotPassword',
  data() {
    return {
      isEmail: true,
      forgotPasswordTab: [
        {
          name: this.$t('tab_titles.email'),
          handler: () => { this.isEmail = true; },
        },
        {
          name: this.$t('tab_titles.phone'),
          handler: () => { this.isEmail = false; },
        },
      ],
    };
  },
  methods: {
    async onSubmit(forgotPasswordData) {
      // call API...
      let response = null;
      try {
        const { data } = await this.$api.VERIFYFORGOTPASSWORDTOKEN(forgotPasswordData);
        response = data;
        console.log('response', response);
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        console.log(response.data);
      } else {
        const { form } = this.$refs['forgot-password-form'];
        form.setFieldError('otp', response.error);
      }
    },
  },
};
</script>

<style scoped>
.forgot-password-text {
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.input-field {
  margin-top: 2.5rem;
}

.forgot-password-form {
  max-width: 24rem;
}

.send-btn {
  margin-bottom: 22rem;
  margin-top: 3.125rem;
  min-width: 0;
}

@media (max-width: 30em) {
  .send-btn {
    min-width: 100%;
  }
}
</style>
