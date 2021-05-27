<template>
  <div class="container">
    <form
      class="register-form"
    />
    <h1 class="register-text">
      {{ $t("register_screen.register") }}
    </h1>
    <BaseNavigationTab
      :list="registerTab"
      :width="170"
    />
    <BaseUnderlinedInput
      class="login-password-input-group"
      :text="$t('register_screen.email_label')"
      :placeholder="$t('register_screen.email_placeholder')"
      name="email"
      type="text"
    />

    <BaseUnderlinedInput
      class="login-password-input-group"
      :text="$t('register_screen.phone_label')"

      :placeholder="$t('register_screen.phone_placeholder')"
      name="phone"
      type="phone"
    />
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
    <div class="input-agree-div">
      <div class="agree-text">
        {{ $t("register_screen.agree_text") }}
        <router-link to="/">
          {{ $t("register_screen.privacy_agreement") }}
        </router-link>
      </div>
    </div>
    <BaseRoundButton
      :text="$t('register_screen.register')"
      type="primary"
      icon="arrow-right"
      size="m"
      :bold="true"
    />
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
import BaseUnderlinedInput from '@/components/UI/BaseUnderlinedInput.vue';
import BaseNavigationTab from '@/components/UI/BaseNavigationTab.vue';
import BaseRoundButton from '@/components/UI/BaseRoundButton.vue';

export default {
  name: 'Register',
  components: {
    BaseUnderlinedInput,
    BaseNavigationTab,
    BaseRoundButton,
  },
  data() {
    return {
      registerTab: ['EMAIL', 'PHONE'],
    };
  },
};
</script>
