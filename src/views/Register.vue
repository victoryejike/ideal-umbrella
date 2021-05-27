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
    />

    <BaseUnderlinedInput
      class="input-field"
      :text="$t('register_screen.confirm_password_label')"
      :placeholder="$t('register_screen.confirm_password_placehoder')"
      name="confirmPassword"
      type="password"
    />
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

<style scoped>
.input-field {
  margin-top: 40px;
}

.input-agree-div {
  margin-top: 60px;
}

.agree-text {
  align-items: center;
  color: rgba(0, 0, 0, 0.75);
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin-left: 10px;
  margin-top: 4px;
  vertical-align: top;
}

#checkbox {
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-sizing: border-box;
  height: 20px;
  left: 130px;
  top: 910px;
  width: 20px;
}

.register-button {
  margin-top: 40px;
}

.login-div {
  align-items: center;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin-top: 40px;
}

.login-link {
  padding-left: 5px;
}
</style>
