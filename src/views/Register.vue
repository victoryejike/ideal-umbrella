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
.register-form {
  max-width: 24rem;
}

.input-field {
  margin-top: 40px;
}

.phone-main-div {
  display: flex;
}

.country-main-div {
  margin-top: 40px;
  max-width: 120px;
}

.country-code-label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}

.input-group-icon {
  height: 1rem;
  padding: 0 0.6rem 0 0.6rem;
  width: 1rem;
}

.input-line {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}

.input-box {
  background-color: transparent;
  border: 0;
  color: #000;
  flex-grow: 1;
  font-size: 1rem;
  height: 2.5rem;
  margin-right: 0.6rem;
  outline: 0;
}

.code-input-div {
  display: flex;
  flex-wrap: wrap;
}

.input-phone {
  max-width: 3rem;
}

.input-agree-div {
  align-items: center;
  display: flex;
  margin-top: 60px;
  width: 440px;
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
  height: 20px;
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

@media (max-width: 480px) {
  .agree-text {
    font-size: 12px;
    line-height: 15px;
    margin-top: 0;
  }

  .input-agree-div {
    width: 220px;
  }

  .register-button {
    width: 100%;
  }
}
</style>
