<template>
  <BaseSettingFrame :title="$t('rabind_phone_screen.rebind_phone')">
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
      type="with-button"
    >
      <template #button>
        <BaseRoundButton
          size="s"
          :text="$t('register_screen.send_code')"
          type="outline"
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
      :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
      :text="$t('rabind_phone_screen.email_verfication_label')"
      type="with-button"
    >
      <template #button>
        <BaseRoundButton
          size="s"
          :text="$t('register_screen.send_code')"
          type="outline"
        />
      </template>
    </BaseUnderlinedInput>

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
      type="with-button"
    >
      <template #button>
        <BaseRoundButton
          size="s"
          :text="$t('register_screen.send_code')"
          type="outline"
        />
      </template>
    </BaseUnderlinedInput>

    <div class="actions-div">
      <BaseRoundButton
        :bold="true"
        class="reset-button"
        icon="arrow-right"
        size="m"
        :text="$t('rabind_phone_screen.confirm')"
        type="primary"
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
  name: 'UserRebindPhone',
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
