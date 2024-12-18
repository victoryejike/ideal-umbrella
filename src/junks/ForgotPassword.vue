<template>
  <div class="container">
    <BaseForm
      ref="forgot-password-form"
      v-slot="{ isLoading }"
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
        type="email"
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
        :extra-data="{validateField: ['email','phone'], otpType: OtpType.FORGOT_PASSWORD}"
        name="otp"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="otp"
      />
      <BaseRoundButton
        class="send-btn btn-primary btn-md btn-bold"
        :icon="isLoading ? 'loading' : 'arrow-right'"
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
import { OtpType } from '@/utils/enums';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      OtpType,
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
      let response = null;
      try {
        const { data } = await this.$api.VERIFY_FORGOT_PASSWORD_TOKEN(forgotPasswordData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        this.$router.push({ name: 'UpdatePassword', params: { token: response.data } });
      } else {
        this.$toast.error(response?.error);
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
