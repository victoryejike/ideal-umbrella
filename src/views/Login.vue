<template>
  <div class="container">
    <BaseForm
      ref="login-form"
      class="login-form"
      @submit="onSubmit"
    >
      <h1 class="login-text">
        {{ $t("login_screen.login") }}
      </h1>
      <BaseNavigationTab
        class="tabs"
        :list="LoginTab"
        :width="10.6"
      />
      <BaseUnderlinedInput
        v-if="isEmail"
        class="input-group"
        name="email"
        :placeholder="$t('login_screen.email_placeholder')"
        rules="required|email"
        :text="$t('login_screen.email_text')"
      />
      <BaseUnderlinedInput
        v-if="!isEmail"
        class="input-group"
        country="country_code"
        name="phone"
        :placeholder="$t('login_screen.phone_placeholder')"
        :text="$t('login_screen.phone_text')"
        type="tel"
      />

      <BaseUnderlinedInput
        class="input-group"
        name="password"
        :placeholder="$t('login_screen.password_placehoder')"
        rules="required"
        :text="$t('login_screen.password_text')"
        type="password"
        @keyup.enter="$refs['login-btn'].$el.click()"
      />
      <BaseRoundButton
        ref="login-btn"
        class="login-btn btn-primary btn-md btn-bold"
        :icon="isLoading ? 'loading' : 'arrow-right'"
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
    </BaseForm>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      isEmail: true,
      LoginTab: [
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
    async onSubmit(formData) {
      this.isLoading = true;
      const { form } = this.$refs['login-form'];
      const response = await this.$api.LOGIN(formData);

      if (response?.success === true) {
        this.$store.dispatch('auth/login', response?.data);
        this.$router.push(this.$route.query.redirectFrom || '/profile');
      } else if (response?.success === false) {
        form.setFieldError('password', response?.error);
      } else {
        form.setFieldError('password', this.$t('axios.unexcepted_error'));
      }
      this.isLoading = false;
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
  min-width: 0;
}

.helper-div {
  font-size: 0.9rem;
  margin-top: 2.5rem;
}

.register-div {
  margin-top: 2rem;
}

@media (max-width: 30em) {
  .login-btn {
    min-width: 100%;
  }
}
</style>
