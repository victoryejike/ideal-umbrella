<template>
  <BaseSettingFrame :title="$t('rabind_phone_screen.rebind_phone')">
    <BaseForm class="rebind-form">
      <BaseUnderlinedInput
        class="input-field"
        name="resetPassword"
        :placeholder="$t('rabind_phone_screen.original_phone_placehoder')"
        :text="$t('rabind_phone_screen.original_phone_label')"
        type="password"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="verification-code"
        :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
        :text="$t('rabind_phone_screen.phone_verfication')"
        type="otp"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="resetPassword"
        :placeholder="$t('rabind_phone_screen.phone_label_label')"
        :text="$t('rabind_phone_screen.phone_label')"
        type="text"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="verification-code"
        :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
        :text="$t('rabind_phone_screen.email_verfication_label')"
        type="otp"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="newPassword"
        :placeholder="$t('rabind_phone_screen.new_phone_placeholder')"
        :text="$t('rabind_phone_screen.new_phone_label')"
        type="text"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="verification-code"
        :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
        :text="$t('rabind_phone_screen.phone_verfication')"
        type="otp"
      />

      <div class="actions-div">
        <BaseRoundButton
          class="reset-button btn-primary btn-md btn-bold"
          icon="arrow-right"
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
