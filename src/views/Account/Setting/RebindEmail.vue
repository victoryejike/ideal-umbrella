<template>
  <BaseSettingFrame :title="$t('rabind_email_screen.rebind_email')">
    <BaseForm
      ref="rebind-email-form"
      v-slot="{ isLoading }"
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
        :extra-data="{validateField: 'current_mail', otpType: OtpType.REBIND_EMAIL}"
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
        type="email"
      />
      <BaseUnderlinedInput
        class="input-field"
        :extra-data="{validateField: 'new_mail', otpType: OtpType.REBIND_EMAIL}"
        name="new_mail_code"
        :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
        :text="$t('rabind_phone_screen.email_verfication_label')"
        type="otp"
      />
      <div class="actions-div">
        <BaseRoundButton
          class="reset-button btn-primary btn-md btn-bold"
          :icon="isLoading ? 'loading' : 'arrow-right'"
          :submit="true"
          :text="$t('rabind_phone_screen.confirm')"
        />
        <router-link
          class="cancel-link"
          to="/account/setting"
        >
          {{ $t("reset_password_screen.cancel") }}
        </router-link>
      </div>
    </BaseForm>
  </BaseSettingFrame>
</template>
<script>
import BaseSettingFrame from '@/components/Setting/BaseSettingFrame.vue';
import { OtpType } from '@/utils/enums';

export default {
  name: 'UserRebindEmail',
  components: { BaseSettingFrame },
  data() {
    return {
      OtpType,
      isEmail: true,
    };
  },
  methods: {
    async onSubmit(rebindemailData) {
      let response = null;
      try {
        const { data } = await this.$api.REBIND_EMAIL(rebindemailData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      this.$toast.open({
        message: response?.message || response?.error,
        type: (response?.success) ? 'success' : 'error',
      });
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
