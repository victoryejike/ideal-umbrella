<template>
  <div class="container">
    <form
      class="login-form"
      action=""
    >
      <h2 class="login-text">
        {{ $t("login_screen.login") }}
      </h2>
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
        :text="$t('login_screen.login')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="true"
      />
      <div class="extra-div">
        <a
          class="forgot-pass-link"
          href="#"
        >{{
          $t("login_screen.forgot_password")
        }}</a>
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
import BaseUnderlinedInput from '@/components/UI/BaseUnderlinedInput.vue';
import BaseRoundButton from '@/components/UI/BaseRoundButton.vue';

export default {
  name: 'Login',
  components: { BaseUnderlinedInput, BaseRoundButton },
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

.login-text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
}

.login-form {
  margin-right: 220px;
}

.username-input-group {
  margin-bottom: 40px;
}

.password-input-group {
  margin-bottom: 70px;
}

.extra-div {
  margin-top: 50px;
}

.register-div {
  color: rgba(0, 0, 0, 0.75);
  margin-top: 25px;
}
</style>
