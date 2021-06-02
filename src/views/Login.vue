<template>
  <div class="container">
    <form
      class="login-form"
      @submit.prevent
    >
      <h1 class="login-text">
        {{ $t("login_screen.login") }}
      </h1>
      <BaseUnderlinedInput
        class="input-group"
        :text="$t('login_screen.username_text')"
        :placeholder="$t('login_screen.username_placeholder')"
        name="username"
      />
      <BaseUnderlinedInput
        class="input-group"
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
.login-form {
  max-width: 24rem;
}

.login-text {
  font-size: 2rem;
  font-weight: bold;
}

.input-group {
  margin-top: 2.5rem;
}

.login-btn {
  margin-top: 3.75rem;
  min-width: 100%;
}

.helper-div {
  font-size: 0.9rem;
  margin-top: 2.5rem;
}

.register-div {
  color: rgba(0, 0, 0, 0.75);
  margin-top: 2rem;
}

@media (min-device-width: 30em) {
  .login-btn {
    min-width: 0% !important;
  }
}
</style>
