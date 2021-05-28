<template>
  <div class="container">
    <form
      class="login-form"
      action=""
    >
      <h1 class="login-text">
        {{ $t("login_screen.login") }}
      </h1>
      <BaseUnderlinedInput
        class="username-input-group"
        :text="$t('login_screen.username_text')"
        :placeholder="$t('login_screen.username_placeholder')"
        name="username"
      />
      <BaseUnderlinedInput
        class="password-input-group"
        :text="$t('login_screen.password_text')"
        :placeholder="$t('login_screen.password_placehoder')"
        name="password"
        type="password"
      />
      <BaseRoundButton
        class="login-btn"
        :text="$t('login_screen.login')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="true"
      />
      <div class="helper-div">
        <router-link
          class="forgot-pass-link"
          to="/forgot-password"
        >
          {{ $t("login_screen.forgot_password") }}
        </router-link>
        <div class="register-div">
          {{ $t("login_screen.not_a_member") }}
          <router-link
            class="register-link"
            to="/register"
          >
            {{ $t("login_screen.registered") }}
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.login-form {
  max-width: 24rem;
}

.login-text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
}

.username-input-group {
  margin-bottom: 2.5rem;
}

.password-input-group {
  margin-bottom: 3.75rem;
}

.helper-div {
  font-size: 0.9rem;
  margin-top: 2.5rem;
}

.register-div {
  color: rgba(0, 0, 0, 0.75);
  margin-top: 1.5rem;
}

@media (min-device-width: 29rem) {
  .login-btn {
    width: 39% !important;
  }
}

.login-btn {
  width: 100%;
}
</style>
