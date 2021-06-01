<template>
  <div class="container">
    <h1 class="reset-password-text">
      {{ $t("reset_password_screen.reset_password") }}
    </h1>
    <BaseUnderlinedInput
      class="input-field"
      :text="$t('reset_password_screen.original_password_label')"
      :placeholder="$t('reset_password_screen.original_password_placehoder')"
      name="resetPassword"
      type="password"
    >
      <template #icon>
        <img src="@svg/password-lock.svg">
      </template>
    </BaseUnderlinedInput>

    <BaseUnderlinedInput
      class="input-field"
      :text="$t('reset_password_screen.new_password_label')"
      :placeholder="$t('reset_password_screen.new_password_placehoder')"
      name="newPassword"
      type="password"
    >
      <template #icon>
        <img src="@svg/password-lock.svg">
      </template>
    </BaseUnderlinedInput>

    <BaseUnderlinedInput
      class="input-field"
      :text="$t('reset_password_screen.confirm_password_label')"
      :placeholder="$t('reset_password_screen.confirm_password_placehoder')"
      name="resetPassword"
      type="password"
    >
      <template #icon>
        <img src="@svg/password-lock.svg">
      </template>
    </BaseUnderlinedInput>
    <div class="actions-div">
      <BaseRoundButton
        class="reset-button"
        :text="$t('reset_password_screen.reset')"
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
  </div>
</template>
<style scoped>
.container {
  max-width: 24rem;
}

.reset-password-text-text {
  font-size: 2rem;
  margin-bottom: 2.5rem;
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
  font-size: 0.875em;
  font-weight: 600;
  line-height: 1.125em;
}
</style>
