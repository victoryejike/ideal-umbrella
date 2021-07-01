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
        name="nationality"
        :options="countriesList"
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
import BaseSettingFrame from './BaseSettingFrame.vue';

export default {
  name: 'UserIDVerification',
  components: { BaseSettingFrame },
  data() {
    return {
      countriesList: [],
      idTypeList: [
        { name: 'Passport' },
        { name: 'National ID' }],

      selectBoxCSS: { width: null },
    };
  },
  mounted() {
    this.getCountries();
    this.$global.handleResponsive(22.5,
      () => { this.selectBoxCSS.width = 17.5; },
      () => { this.selectBoxCSS.width = 14; });
  },
  methods: {
    async getCountries() {
      let response = null;

      try {
        const { data } = await this.$api.GET_COUNTRIES();
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        this.countriesList = response.data;
      } else {
        this.messageType = 'error';
        this.message = response.error;
      }
    },
    async onSubmit(kycFormData) {
      let response = null;

      try {
        const { data } = await this.$api.KYC(kycFormData);
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        this.$store.dispatch('kyc', response.data);
      } else {
        this.messageType = 'error';
        this.message = response.error;
      }
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
