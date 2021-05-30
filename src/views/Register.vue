<template>
  <div class="container">
    <form
      class="register-form"
    >
      <h1 class="register-text">
        {{ $t("register_screen.register") }}
      </h1>
      <BaseNavigationTab
        class="tabs"
        :list="registerTab"
        :width="10.6"
      />
      <BaseUnderlinedInput
        class="input-field"
        :text="$t('register_screen.email_label')"
        :placeholder="$t('register_screen.email_placeholder')"
        name="email"
        type="text"
      />
      <BaseUnderlinedInput
        class="input-field"
        :text="$t('register_screen.phone_label')"
        :placeholder="$t('register_screen.phone_placeholder')"
        name="phone"
        type="phone"
      />
      <BaseUnderlinedInput
        class="input-field"
        :text="$t('register_screen.login_password_label')"
        :placeholder="$t('register_screen.login_password_placehoder')"
        name="loginPassword"
        type="password"
      >
        <template #icon>
          <img src="@svg/password-lock.svg">
        </template>
      </BaseUnderlinedInput>

      <BaseUnderlinedInput
        class="input-field"
        :text="$t('register_screen.confirm_password_label')"
        :placeholder="$t('register_screen.confirm_password_placehoder')"
        name="confirmPassword"
        type="password"
      >
        <template #icon>
          <img src="@svg/password-lock.svg">
        </template>
      </BaseUnderlinedInput>
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
      <div class="input-agree-div">
        <input
          id="checkbox"
          v-model="checked"
          type="checkbox"
        >
        <div class="agree-text">
          {{ $t("register_screen.agree_text") }}
          <router-link to="/">
            {{ $t("register_screen.privacy_agreement") }}
          </router-link>
        </div>
      </div>
      <BaseRoundButton
        class="register-button"
        :text="$t('register_screen.register')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="true"
      />
    </form>
    <div class="login-div">
      {{ $t("register_screen.already_have_account") }}
      <router-link
        class="login-link"
        to="/login"
      >
        {{ $t("register_screen.login") }}
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      registerTab: ['EMAIL', 'PHONE'],
    };
  },

};
</script>

<style scoped>
.register-form {
  max-width: 24rem;
}

.register-text {
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.input-field {
  margin-top: 2.5rem;
}

.phone-main-div {
  display: flex;
}

.country-main-div {
  margin-top: 2.5rem;
  max-width: 7.5rem;
}

.input-agree-div {
  align-items: center;
  display: flex;
  margin-top: 3.75rem;
  width: 27.5rem;
}

.agree-text {
  align-items: center;
  color: rgba(0, 0, 0, 0.75);
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin-left: 0.625rem;
  margin-top: 0.25rem;
  vertical-align: top;
}

#checkbox {
  height: 1.25rem;
  width: 1.25rem;
}

.register-button {
  margin-top: 2.5rem;
}

.login-div {
  align-items: center;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin-top: 2.5rem;
}

.login-link {
  padding-left: 0.3125rem;
}

@media (max-width: 30em) {
  .agree-text {
    font-size: 0.75rem;
    line-height: 0.9375rem;
    margin-top: 0;
  }

  .input-agree-div {
    width: 13.75rem;
  }

  .register-button {
    width: 100%;
  }
}
</style>
