<template>
  <BaseSettingFrame
    :title="$t('kyc_screen.id_verification')"
  >
    <BaseForm
      ref="kyc-form"
      v-slot="{ isLoading }"
      class="kyc-form"
      @submit="onSubmit"
    >
      <BaseScrollableSelectBox
        class="input-div"
        :css="selectBoxCSS"
        :default-selected="false"
        key-name="code"
        name="nationality"
        :options="$store.getters['data/countryList']"
        rules="required"
        :text="$t('kyc_screen.nationality_label')"
      />
      <BaseUnderlinedInput
        class="input-div"
        name="full_name"
        :placeholder="$t('kyc_screen.name_placeholder')"
        rules="required"
        :text="$t('kyc_screen.name_label')"
        :width="23.75"
      />
      <div class="user-id-div input-div">
        <BaseScrollableSelectBox
          :default-selected="false"
          key-name="id"
          name="id_type"
          :options="idTypeList"
          rules="required"
          :text="$t('kyc_screen.id_type_label')"
        />
        <BaseUnderlinedInput
          class="input-user-id"
          name="id_number"
          :placeholder="$t('kyc_screen.id_number_placeholder')"
          rules="required"
          :text="$t('kyc_screen.id_number_label')"
        />
      </div>
      <div class="actions-div">
        <BaseRoundButton
          class="confirm-button btn-primary btn-md btn-bold"
          :icon="isLoading ? 'loading' : 'arrow-right'"
          :submit="true"
          :text="$t('kyc_screen.confirm')"
        />
      </div>
    </BaseForm>
  </BaseSettingFrame>
</template>

<script>
import BaseSettingFrame from '@/components/Setting/BaseSettingFrame.vue';

export default {
  name: 'UserIDVerification',
  components: { BaseSettingFrame },
  data() {
    return {
      countriesList: [],
      idTypeList: [
        { name: 'Passport', id: 'PASSPORT' },
        { name: 'National ID', id: 'NATIONAL_ID' }],

      selectBoxCSS: { width: null },
    };
  },
  mounted() {
    this.$global.handleResponsive(22.5,
      () => { this.selectBoxCSS.width = 17.5; },
      () => { this.selectBoxCSS.width = 14; });
  },
  methods: {
    async onSubmit(kycFormData) {
      let response = null;
      try {
        const { data } = await this.$api.KYC(kycFormData);
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
.kyc-form {
  max-width: 32.5rem;
}

.user-id-div {
  display: flex;
}

.input-div {
  margin-top: 2.5rem;
}

.input-user-id {
  margin-left: 1.25rem;
}

.actions-div {
  margin-top: 3.75rem;
}

.confirm-button {
  min-width: 0;
}

@media (max-width: 38em) {
  .user-id-div {
    display: inline-block;
  }

  .input-user-id {
    margin-left: 0;
    margin-top: 2.5rem;
  }
}

@media (max-width: 30em) {
  .confirm-button {
    min-width: 100%;
  }
}

</style>
