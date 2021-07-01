<template>
  <div class="container">
    <BaseForm
      ref="register-form"
      v-slot="{ isLoading }"
      class="register-form"
      @submit="onSubmit"
    >
      <h1 class="register-text">
        {{ $t("register_screen.register") }}
      </h1>
      <BaseNavigationTab
        class="tabs"
        :list="registerTab"
        :width="10.6"
      />
      <BaseUnderlinedInput
        v-if="isEmail"
        class="input-field"
        name="email"
        :placeholder="$t('register_screen.email_placeholder')"
        rules="required|email"
        :text="$t('register_screen.email_label')"
      />
      <BaseUnderlinedInput
        v-if="!isEmail"
        class="input-field"
        country="country_code"
        name="phone"
        :placeholder="$t('register_screen.phone_placeholder')"
        :text="$t('register_screen.phone_label')"
        type="tel"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="loginPassword"
        :placeholder="$t('register_screen.login_password_placehoder')"
        rules="required|password"
        :text="$t('register_screen.login_password_label')"
        type="password"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="password"
        :placeholder="$t('register_screen.confirm_password_placehoder')"
        rules="required|confirmed:loginPassword"
        :text="$t('register_screen.confirm_password_label')"
        type="password"
      />
      <BaseUnderlinedInput
        v-if="isEmail"
        class="input-field"
        field-name="email"
        :is-mail="isEmail"
        name="otp_code"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="otp"
      />
      <BaseUnderlinedInput
        v-if="!isEmail"
        class="input-field"
        country="country_code"
        field-name="phone"
        :is-mail="isEmail"
        name="otp_code"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="otp"
      />
      <div class="input-agree-div">
        <Field
          id="checkbox"
          v-model="checkedTerms"
          name="agree-terms"
          rules="agree"
          type="checkbox"
          :value="true"
          @click="selectCheckbox"
        />
        <div class="agree-text">
          {{ $t("register_screen.agree_text") }}
          <a @click="showModal">
            {{ $t("register_screen.privacy_agreement") }}
          </a>
          <BaseModal
            v-show="isModalVisible"
            @close="closeModal"
          >
            <template #body>
              <Agreement />
            </template>
          </BaseModal>
        </div>
      </div>
      <ErrorMessage
        as="div"
        class="input-error-msg-effect"
        name="agree-terms"
      />
      <div v-if="message !== ' '">
        <Message
          :message="message"
          :type="messageType"
        />
      </div>
      <BaseRoundButton
        class="register-button btn-primary btn-md btn-bold"
        :icon="isLoading ? 'loading' : 'arrow-right'"
        :submit="true"
        :text="$t('register_screen.register')"
      />
    </BaseForm>
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
import { Field, ErrorMessage } from 'vee-validate';
import Agreement from '../components/Agreement.vue';
import Message from '../components/UI/Message.vue';

export default {

  name: 'Register',
  components: {
    Agreement,
    Field,
    ErrorMessage,
    Message,
  },
  data() {
    return {
      isModalVisible: false,
      isEmail: true,
      checkedTerms: false,
      message: ' ',
      messageType: ' ',
      registerTab: [
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
    async onSubmit(registerFormData) {
      let response = null;
      try {
        const { data } = await this.$api.REGISTER(registerFormData);
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        this.$router.push('/login');
      } else {
        this.messageType = 'error';
        this.message = response.error;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    selectCheckbox() {
      this.checkedTerms = !this.checkedTerms;
    },
  },

};
</script>

<style scoped>
.register-form {
  max-width: 24rem;
}

.register-text {
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.input-field {
  margin-top: 2.5rem;
}

.phone-main-div {
  display: flex;
}

.country-main-div {
  margin-top: 2.5rem;
  max-width: 7.5rem;
}

.input-agree-div {
  align-items: center;
  display: flex;
  margin-top: 3.75rem;
  width: 27.5rem;
}

.agree-text {
  align-items: center;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin-left: 0.625rem;
  margin-top: 0.25rem;
  vertical-align: top;
}

#checkbox {
  height: 1.25rem;
  width: 1.25rem;
}

.register-button {
  margin-top: 2.5rem;
  min-width: 0%;
}

.login-div {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin-top: 2.5rem;
}

.login-link {
  padding-left: 0.3125rem;
}

@media (max-width: 30em) {
  .agree-text {
    font-size: 0.75rem;
    line-height: 0.9375rem;
    margin-top: 0;
  }

  .input-agree-div {
    width: 13.75rem;
  }

  .register-button {
    min-width: 100%;
  }
}
</style>
