<template>
  <BaseSettingFrame :title="$t('reset_password_screen.reset_password')">
    <BaseForm
      ref="reset-form"
      class="reset-form"
      @submit="onSubmit"
    >
      <BaseNavigationTab
        class="tabs input-field"
        :list="resetTab"
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
        name="current_password"
        :placeholder="$t('reset_password_screen.original_password_placehoder')"
        rules="required|password"
        :text="$t('reset_password_screen.original_password_label')"
        type="password"
      >
        <template #leftIcon>
          <img src="@svg/password-lock.svg">
        </template>
      </BaseUnderlinedInput>

      <BaseUnderlinedInput
        class="input-field"
        name="new_password"
        :placeholder="$t('reset_password_screen.new_password_placehoder')"
        rules="required|password"
        :text="$t('reset_password_screen.new_password_label')"
        type="password"
      >
        <template #leftIcon>
          <img src="@svg/password-lock.svg">
        </template>
      </BaseUnderlinedInput>

      <BaseUnderlinedInput
        class="input-field"
        name="confirm_password"
        :placeholder="$t('reset_password_screen.confirm_password_placehoder')"
        rules="required|confirmed:new_password"
        :text="$t('reset_password_screen.confirm_password_label')"
        type="password"
      >
        <template #leftIcon>
          <img src="@svg/password-lock.svg">
        </template>
      </BaseUnderlinedInput>
      <BaseUnderlinedInput
        v-if="!isEmail"
        class="input-field"
        country="country_code"
        field-name="phone"
        :is-mail="isEmail"
        name="code"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="otp"
      />
      <BaseUnderlinedInput
        v-if="isEmail"
        class="input-field"
        country="country_code"
        field-name="email"
        :is-mail="isEmail"
        name="code"
        :placeholder="$t('register_screen.verification_code__placehoder')"
        :text="$t('register_screen.verification_code_label')"
        type="otp"
      />
      <div v-if="message !== ' '">
        <Message
          :message="message"
          :type="messageType"
        />
      </div>
      <div class="actions-div">
        <BaseRoundButton
          class="reset-button btn-primary btn-md btn-bold"
          :icon="isLoading ? 'loading' : 'arrow-right'"
          :submit="true"
          :text="$t('reset_password_screen.reset')"
        />

        <router-link
          class="cancel-link"
          to="/account-setting"
        >
          {{ $t("reset_password_screen.cancel") }}
        </router-link>
      </div>
    </BaseForm>
  </BaseSettingFrame>
</template>
<script>
import BaseSettingFrame from './BaseSettingFrame.vue';
import Message from '../../components/UI/Message.vue';

export default {
  name: 'UserResetPassword',
  components: {
    BaseSettingFrame,
    Message,

  },
  data() {
    return {
      message: ' ',
      messageType: ' ',
      isEmail: true,
      isLoading: false,
      resetTab: [
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
    async onSubmit(resetFormData) {
      this.message = ' ';
      this.isLoading = true;
      let response = null;
      try {
        const { data } = await this.$api.RESETPASSWORD(resetFormData);
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        this.isLoading = false;
        this.messageType = 'success';
        this.message = response.message;
        // this.$store.dispatch('reset', response.data);
        // this.$router.push('/login');
      } else {
        this.isLoading = false;
        this.messageType = 'error';
        this.message = response.error;
        console.log('error message', this.message);
        // const { form } = this.$refs['reset-form'];
        // form.setFieldError('confirm_password', response.error);
      }
    },
  },
};

</script>

<style scoped>
.reset-form {
  max-width: 24rem;
}

.input-field {
  margin-top: 2.5rem;
}

.reset-button {
  margin-right: 1.8rem;
}

.actions-div {
  align-items: center;
  display: flex;
  margin-top: 3.75rem;
}

.cancel-link {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}
</style>
