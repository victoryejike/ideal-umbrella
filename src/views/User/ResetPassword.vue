<template>
  <BaseSettingFrame :title="$t('reset_password_screen.reset_password')">
    <BaseUnderlinedInput
      class="input-field"
      name="resetPassword"
      :placeholder="$t('reset_password_screen.original_password_placehoder')"
      :text="$t('reset_password_screen.original_password_label')"
      type="password"
    >
      <template #icon>
        <img src="@svg/password-lock.svg">
      </template>
    </BaseUnderlinedInput>

    <BaseUnderlinedInput
      class="input-field"
      name="newPassword"
      :placeholder="$t('reset_password_screen.new_password_placehoder')"
      :text="$t('reset_password_screen.new_password_label')"
      type="password"
    >
      <template #icon>
        <img src="@svg/password-lock.svg">
      </template>
    </BaseUnderlinedInput>

    <BaseUnderlinedInput
      class="input-field"
      name="resetPassword"
      :placeholder="$t('reset_password_screen.confirm_password_placehoder')"
      :text="$t('reset_password_screen.confirm_password_label')"
      type="password"
    >
      <template #icon>
        <img src="@svg/password-lock.svg">
      </template>
    </BaseUnderlinedInput>
    <div class="actions-div">
      <BaseRoundButton
        class="reset-button btn-primary btn-md btn-bold"
        icon="arrow-right"
        :text="$t('reset_password_screen.reset')"
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
  name: 'UserResetPassword',
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
