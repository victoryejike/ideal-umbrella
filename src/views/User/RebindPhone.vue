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
        :extra-data="{validateField: 'current_phone', countryField: 'current_phone_country_code'}"
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
        :extra-data="{validateField: 'new_phone', countryField: 'new_phone_country_code'}"
        name="new_phone_code"
        :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
        :text="$t('rabind_phone_screen.new_phone_verfication')"
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
  name: 'UserRebindPhone',
  components: { BaseSettingFrame },
  data() {
    return {
      message: ' ',
      messageType: ' ',
      isLoading: false,
      isEmail: false,
      token: JSON.parse(localStorage.getItem('userData')).token,
    };
  },
  methods: {
    async onSubmit(rebindPhoneData) {
      this.isLoading = true;
      let response = null;
      try {
        const { data } = await this.$api.REBIND_PHONE(rebindPhoneData, this.token);
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        this.messageType = 'success';
        this.message = response.message;
        this.isLoading = false;
      } else {
        const { form } = this.$refs['rebind-phone-form'];
        form.setFieldError('new_phone_code', response.error);
        this.isLoading = false;
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
