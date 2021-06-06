<template>
  <BaseSettingFrame :title="$t('rabind_email_screen.rebind_email')">
    <Form class="rebind-form">
      <BaseUnderlinedInput
        class="input-field"
        name="resetPassword"
        placeholder="c*********@gmail.com"
        :text="$t('rabind_email_screen.original_email_label')"
        type="email"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="emailVerificationCode"
        :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
        :text="$t('rabind_phone_screen.email_verfication_label')"
      >
        <template #element>
          <BaseRoundButton
            class="btn-outline-primary btn-sm"
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
        name="phoneVerificationCode"
        :placeholder="$t('rabind_phone_screen.phone_verfication_placehoder')"
        :text="$t('rabind_phone_screen.phone_verfication')"
      >
        <template #element>
          <BaseRoundButton
            class="btn-outline-primary btn-sm"
            :text="$t('register_screen.send_code')"
          />
        </template>
      </BaseUnderlinedInput>

      <BaseUnderlinedInput
        class="input-field"
        name="phone"
        :placeholder="$t('register_screen.phone_placeholder')"
        :text="$t('forgot_password.phone')"
        type="phone"
      />

      <BaseUnderlinedInput
        class="input-field"
        name="newEmailVerificationCode"
        :placeholder="$t('rabind_phone_screen.email_verfication_placehoder')"
        :text="$t('rabind_phone_screen.email_verfication_label')"
      >
        <template #element>
          <BaseRoundButton
            class="btn-outline-primary btn-sm"
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
          to="/account-setting"
        >
          {{ $t("reset_password_screen.cancel") }}
        </router-link>
      </div>
    </Form>
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
