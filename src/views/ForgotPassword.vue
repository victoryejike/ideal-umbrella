<template>
  <div class="container">
    <form
      class="forgot-password-form"
      action=""
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
        :text="$t('forgot_password.phone')"
        type="phone"
        :placeholder="$t('register_screen.phone_placeholder')"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="verification-code"
        :text="$t('register_screen.verification_code_label')"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        type="with-button"
      >
        <template #button>
          <BaseRoundButton
            :text="$t('register_screen.send_code')"
            type="outline"
            size="s"
          />
        </template>
      </BaseUnderlinedInput>
      <BaseRoundButton
        class="send-btn"
        :text="$t('forgot_password.send')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="false"
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
      forgotPasswordTab: ['EMAIL', 'PHONE'],
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
}
</style>
