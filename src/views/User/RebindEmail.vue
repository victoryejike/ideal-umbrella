<template>
  <BaseSettingFrame :title="$t('rabind_email_screen.rebind_email')">
    <BaseUnderlinedInput
      class="input-field"
      name="resetPassword"
      :placeholder="$t('rabind_email_screen.original_email_placehoder')"
      :text="$t('rabind_email_screen.original_email_label')"
      type="email"
    />

    <BaseUnderlinedInput
      class="input-field"
      name="verification-code"
      :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
      :text="$t('rabind_phone_screen.email_verfication_label')"
      type="with-button"
    >
      <template #button>
        <BaseRoundButton
          class="btn-outline btn-sm"
          :text="$t('register_screen.send_code')"
        />
      </template>
    </BaseUnderlinedInput>

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
      :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
      :text="$t('rabind_phone_screen.phone_verfication')"
      type="with-button"
    >
      <template #button>
        <BaseRoundButton
          class="btn-outline btn-sm"
          :text="$t('register_screen.send_code')"
        />
      </template>
    </BaseUnderlinedInput>

    <BaseUnderlinedInput
      class="input-field"
      :placeholder="$t('register_screen.phone_placeholder')"
      :text="$t('forgot_password.phone')"
      type="phone"
    />

    <BaseUnderlinedInput
      class="input-field"
      name="verification-code"
      :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
      :text="$t('rabind_phone_screen.email_verfication_label')"
      type="with-button"
    >
      <template #button>
        <BaseRoundButton
          class="btn-outline btn-sm"
          :text="$t('register_screen.send_code')"
        />
      </template>
    </BaseUnderlinedInput>

    <div class="actions-div">
      <BaseRoundButton
        class="reset-button btn-primary btn-md btn-bold"
        icon="arrow-right"
        :text="$t('rabind_phone_screen.confirm')"
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
  name: 'UserRebindEmail',
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
