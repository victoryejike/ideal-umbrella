<template>
  <div class="container">
    <form
      class="forgot-password-form"
      action=""
    >
      <h1 class="forgot-password-text">
        {{ $t("forgot_password.forgot_password") }}
      </h1>
      <BaseNavigationTab
        :list="forgotPasswordTab"
        :width="170"
      />
      <div class="flex input border-bottom-dark p10 mt-30 mb-20">
        <div class="country-code">
          <label>{{ $t('forgot_password.country_code') }}</label>
          <CountryCode />
        </div>
        <div class="ml-30 mt-4 input-phone">
          <div>
            <BaseUnderlinedInput
              class="input-field"
              :text="$t('forgot_password.phone')"
              :placeholder="$t('register_screen.phone_placeholder')"
            />
          </div>
        </div>
      </div>
      <div class="input p10 mt-30 mb-20">
        <div>
          <div class="mt-15">
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
          </div>
        </div>
      </div>
      <BaseRoundButton
        :text="$t('forgot_password.send')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="false"
      />
      <div class="forgot_password-div mt-30">
        {{ $t("forgot_password.already_have_account") }}
        <router-link
          class="login-link"
          to="/login"
        >
          {{ $t("forgot_password.login") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import BaseRoundButton from '@/components/UI/BaseRoundButton.vue';
import BaseUnderlinedInput from '@/components/UI/BaseUnderlinedInput.vue';
import CountryCode from '@/components/ForgotPassword/CountryCode.vue';
// import Input from '@/components/ForgotPassword/Input.vue';
import BaseNavigationTab from '@/components/UI/BaseNavigationTab.vue';

export default {
  name: 'Login',
  components: {
    BaseRoundButton, BaseNavigationTab, CountryCode, BaseUnderlinedInput,
  },
  data() {
    return {
      forgotPasswordTab: ['EMAIL', 'PHONE'],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.mt-10{
    margin-top: 10px;
}
.mt-30{
  margin-top: 30px;
}
.mt-4{
  margin-top: 4px;
}
.ml-30{
  margin-left: 30px;
}
.mb-20{
  margin-bottom: 20px;
}
.send-code button{
  float: right;
}
.border-bottom-dark{
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
.flex{
  display:flex;
}
.w-full{
  width: 100%;
}
.p10{
  padding: 10px
}
label{
  color: rgba(0, 0, 0, 0.75);
  font-size: 14px;
}
.input-phone .input-line{
  border-bottom: none !important
}
.mt-15{
    margin-top: 15px;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: inherit;
  font-size: 16px;
}
select::-ms-expand {
  display: none;
}
.input input{
  border: none;
  width: 200px;
  color: rgba(0, 0, 0, 0.25);
  background: inherit;
  font-size: 16px;
}
.input button{
  margin: -6px !important;
}
.forgot-password-form button{
  margin-top: 50px;
}
input:focus, textarea:focus, select:focus{
    outline: none;
}
</style>
