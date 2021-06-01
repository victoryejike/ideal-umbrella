<template>
  <BaseSettingFrame :title="$t('rabind_email_screen.rebind_email')">
    <BaseUnderlinedInput
      class="input-field"
      :text="$t('rabind_email_screen.original_email_label')"
      :placeholder="$t('rabind_email_screen.original_email_placehoder')"
      name="resetPassword"
      type="email"
    />

    <BaseUnderlinedInput
      class="input-field"
      name="verification-code"
      :text="$t('rabind_phone_screen.email_verfication_label')"
      :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
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

    <BaseUnderlinedInput
      class="input-field"
      :text="$t('rabind_phone_screen.phone_label')"
      :placeholder="$t('rabind_phone_screen.phone_label_label')"
      name="resetPassword"
      type="text"
    />

    <BaseUnderlinedInput
      class="input-field"
      name="verification-code"
      :text="$t('rabind_phone_screen.phone_verfication')"
      :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
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

    <BaseUnderlinedInput
      class="input-field"
      :text="$t('forgot_password.phone')"
      type="phone"
      :placeholder="$t('register_screen.phone_placeholder')"
    />

    <BaseUnderlinedInput
      class="input-field"
      name="verification-code"
      :text="$t('rabind_phone_screen.email_verfication_label')"
      :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
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

    <div class="actions-div">
      <BaseRoundButton
        class="reset-button"
        :text="$t('rabind_phone_screen.confirm')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="true"
      />

      <router-link
        class="cancel-link"
        to="/"
      >
        {{ $t("reset_password_screen.cancel") }}
      </router-link>
    </div>
  </BaseSettingFrame>
</template>
<script>
import BaseSettingFrame from './BaseSettingFrame.vue';

export default {
  name: 'ResetPassword',
  components: { BaseSettingFrame },
};

</script>

<style scoped>

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
