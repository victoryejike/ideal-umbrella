<template>
  <div class="container">
    <Form
      class="login-form"
      @submit="onSubmit"
    >
      <h1 class="login-text">
        {{ $t("login_screen.login") }}
      </h1>
      <BaseUnderlinedInput
        class="input-group"
        name="username"
        :placeholder="$t('login_screen.username_placeholder')"
        rules="required|username"
        :text="$t('login_screen.username_text')"
      />
      <BaseUnderlinedInput
        class="input-group"
        name="password"
        :placeholder="$t('login_screen.password_placehoder')"
        rules="required|password"
        :text="$t('login_screen.password_text')"
        type="password"
      />
      <BaseRoundButton
        class="login-btn btn-primary btn-md btn-bold"
        icon="arrow-right"
        :submit="true"
        :text="$t('login_screen.login')"
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
    </Form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    onSubmit(data) {
      // call API...
    },
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
