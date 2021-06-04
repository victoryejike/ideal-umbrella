<template>
  <div class="container">
    <form
      class="forgot-password-form"
      @submit.prevent
    >
      <h1 class="forgot-password-text">
        {{ $t("forgot_password.forgot_password") }}
      </h1>
      <BaseNavigationTab
        :list="forgotPasswordTab"
        :width="10.6"
      />
      <BaseUnderlinedInput
        class="input-field"
        :placeholder="$t('register_screen.phone_placeholder')"
        :text="$t('forgot_password.phone')"
        type="phone"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="verification-code"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="with-button"
      >
        <template #button>
          <BaseRoundButton
            size="s"
            :text="$t('register_screen.send_code')"
            type="outline"
          />
        </template>
      </BaseUnderlinedInput>
      <BaseRoundButton
        :bold="false"
        class="send-btn"
        icon="arrow-right"
        size="m"
        :text="$t('forgot_password.send')"
        type="primary"
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
    </form>
  </div>
</template>

<script>

export default {
  name: 'ForgotPassword',
  data() {
    return {
      forgotPasswordTab: [
        this.$t('tab_titles.email'), this.$t('tab_titles.phone'),
      ],
    };
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
  min-width: 100%;
}

@media (min-device-width: 30em) {
  .send-btn {
    min-width: 0% !important;
  }
}
</style>
