<template>
  <BaseSettingFrame :title="$t('rabind_email_screen.rebind_email')">
    <BaseForm
      ref="rebind-email-form"
      class="rebind-form"
      @submit="onSubmit"
    >
      <BaseUnderlinedInput
        class="input-field"
        name="current_mail"
        :placeholder="$t('rabind_email_screen.original_email_placehoder')"
        rules="required|email"
        :text="$t('rabind_email_screen.original_email_label')"
        type="email"
      />

      <BaseUnderlinedInput
        class="input-field"
        fieldName="current_mail"
        :is-mail="isEmail"
        name="current_mail_code"
        :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
        :text="$t('rabind_phone_screen.email_verfication_label')"
        type="otp"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="new_mail"
        :placeholder="$t('rabind_phone_screen.new_email_placeholder')"
        rules="required|email"
        :text="$t('rabind_phone_screen.new_email_label')"
        type="text"
      />

      <BaseUnderlinedInput
        class="input-field"
        fieldName="new_mail"
        :is-mail="isEmail"
        name="new_mail_code"
        :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
        :text="$t('rabind_phone_screen.email_verfication_label')"
        type="otp"
      />

      <div class="actions-div">
        <BaseRoundButton
          class="reset-button btn-primary btn-md btn-bold"
          icon="arrow-right"
          submit="true"
          :text="$t('rabind_phone_screen.confirm')"
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

export default {
  name: 'UserRebindEmail',
  components: { BaseSettingFrame },
  data() {
    return {
      isEmail: true,
      token: JSON.parse(localStorage.getItem('userData')).token,
    };
  },
  methods: {
    async onSubmit(rebindemailData) {
      // call API...
      let response = null;
      try {
        const { data } = await this.$api.REBINDEMAIL(rebindemailData, this.token);
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        const { form } = this.$refs['rebind-email-form'];
        form.setFieldError('new_mail_code', response.message);
      } else {
        const { form } = this.$refs['rebind-email-form'];
        form.setFieldError('new_mail_code', response.error);
      }
    },
  },
};

</script>

<style scoped>
.rebind-form {
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
