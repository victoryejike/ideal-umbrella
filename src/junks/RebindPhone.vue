<template>
  <BaseSettingFrame :title="$t('rabind_phone_screen.rebind_phone')">
    <BaseForm
      ref="rebind-phone-form"
      v-slot="{ isLoading }"
      class="rebind-form"
      @submit="onSubmit"
    >
      <BaseUnderlinedInput
        class="input-field"
        :extra-data="{countryField: 'current_phone_country_code'}"
        name="current_phone"
        :placeholder="$t('rabind_phone_screen.original_phone_placehoder')"
        :text="$t('rabind_phone_screen.original_phone_label')"
        type="tel"
      />
      <BaseUnderlinedInput
        class="input-field"
        :extra-data="{
          validateField: 'current_phone',
          countryField: 'current_phone_country_code',
          otpType: OtpType.REBIND_PHONE
        }"
        name="current_phone_code"
        :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
        :text="$t('rabind_phone_screen.original_phone_verfication')"
        type="otp"
      />
      <BaseUnderlinedInput
        class="input-field"
        :extra-data="{countryField: 'new_phone_country_code'}"
        name="new_phone"
        :placeholder="$t('rabind_phone_screen.new_phone_placeholder')"
        :text="$t('rabind_phone_screen.new_phone_label')"
        type="tel"
      />
      <BaseUnderlinedInput
        class="input-field"
        :extra-data="{
          validateField: 'new_phone',
          countryField: 'new_phone_country_code',
          otpType: OtpType.REBIND_PHONE
        }"
        name="new_phone_code"
        :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
        :text="$t('rabind_phone_screen.new_phone_verfication')"
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
  name: 'UserRebindPhone',
  components: { BaseSettingFrame },
  data() {
    return {
      OtpType,
      isEmail: false,
    };
  },
  methods: {
    async onSubmit(rebindPhoneData) {
      let response = null;
      try {
        const { data } = await this.$api.REBIND_PHONE(rebindPhoneData);
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
