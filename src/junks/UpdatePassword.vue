<template>
  <BaseForm
    ref="update-password-form"
    class="reset-form"
    @submit="onSubmit"
  >
    <BaseUnderlinedInput
      class="input-field"
      name="password"
      :placeholder="$t('reset_password_screen.new_password_placehoder')"
      rules="required|password"
      :text="$t('reset_password_screen.new_password_label')"
      type="password"
    />
    <BaseUnderlinedInput
      class="input-field"
      name="confirm_password"
      :placeholder="$t('reset_password_screen.confirm_password_placehoder')"
      rules="required|password"
      :text="$t('reset_password_screen.confirm_password_label')"
      type="password"
    />
    <Field
      name="token"
      type="hidden"
      :value="token"
    />
    <div class="actions-div">
      <BaseRoundButton
        class="reset-button btn-primary btn-md btn-bold"
        icon="arrow-right"
        :submit="true"
        :text="$t('reset_password_screen.reset')"
      />

      <router-link
        class="cancel-link"
        to="/login"
      >
        {{ $t("reset_password_screen.cancel") }}
      </router-link>
    </div>
  </BaseForm>
</template>
<script>
import { Field } from 'vee-validate';

export default {
  name: 'UpdatePassword',
  components: { Field },
  data() {
    return {
      token: this.$route.params.token,
    };
  },
  methods: {
    async onSubmit(updatepasswordData) {
      let response = null;
      try {
        const { data } = await this.$api.UPDATE_PASSWORD(updatepasswordData, this.token);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        this.$router.push('/login');
        this.$toast.success(response?.message);
      } else {
        this.$toast.error(response?.error);
      }
    },
  },
};

</script>

<style scoped>
.reset-form {
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
