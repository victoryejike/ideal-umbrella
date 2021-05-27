<template>
  <div class="container">
    <form
      class="register-form"
    />
    <h1 class="register-text">
      {{ $t("register_screen.register") }}
    </h1>
    <BaseUnderlinedInput
      class="login-password-input-group"
      :text="$t('register_screen.login_password_label')"
      :placeholder="$t('register_screen.login_password_placehoder')"
      name="loginPassword"
      type="password"
    />
    <BaseUnderlinedInput
      class="confirm-password-input-group"
      :text="$t('register_screen.confirm_password_label')"
      :placeholder="$t('register_screen.confirm_password_placehoder')"
      name="confirmPassword"
      type="password"
    />
  </div>
</template>

<script>
import BaseUnderlinedInput from '@/components/UI/BaseUnderlinedInput.vue';
// import BaseRoundButton from '@/components/UI/BaseRoundButton.vue';

export default {
  name: 'Register',
  components: { BaseUnderlinedInput },
  data() {
    return {

    };
  },
};
</script>
