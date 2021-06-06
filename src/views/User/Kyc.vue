<template>
  <BaseSettingFrame
    :title="$t('kyc_screen.id_verification')"
  >
    <Form class="kyc-form">
      <BaseScrollableSelectBox
        active-color="#DDE1FB"
        :bg-color="backgroundColor"
        :border-color="borderColor"
        class="input-div"
        hover-color="#DDE1FB"
        :options="countryList"
        :text="$t('kyc_screen.nationality_label')"
        :width="17.5"
      />
      <BaseUnderlinedInput
        class="input-div"
        name="userName"
        :placeholder="$t('kyc_screen.name_placeholder')"
        :text="$t('kyc_screen.name_label')"
        :width="23.75"
      />
      <div class="user-id-div input-div">
        <BaseScrollableSelectBox
          active-color="#DDE1FB"
          :bg-color="backgroundColor"
          :border-color="borderColor"
          hover-color="#DDE1FB"
          :options="idTypeList"
          :text="$t('kyc_screen.id_type_label')"
        />
        <BaseUnderlinedInput
          class="input-user-id"
          name="userName"
          :placeholder="$t('kyc_screen.id_number_placeholder')"
          :text="$t('kyc_screen.id_number_label')"
        />
      </div>
      <div class="actions-div">
        <BaseRoundButton
          class="confirm-button btn-primary btn-md btn-bold"
          icon="arrow-right"
          :text="$t('kyc_screen.confirm')"
        />
      </div>
    </Form>
  </BaseSettingFrame>
</template>

<script>
import BaseSettingFrame from './BaseSettingFrame.vue';
import BaseScrollableSelectBox from '../../components/UI/BaseScrollableSelectBox.vue';

export default {
  components: {
    BaseSettingFrame,
    BaseScrollableSelectBox,
  },
  data() {
    return {
      backgroundColor: '#E5E5E5',
      borderColor: 'none',
      idTypeList: ['Id Card'],
      countryList: [
        { name: 'Singapore', image: 'https://www.countryflags.io/SG/flat/16.png' },
        { name: 'Japan', image: 'https://www.countryflags.io/JP/flat/16.png' },
        { name: 'Taiwan', image: 'https://www.countryflags.io/TW/flat/16.png' },
        { name: 'Thailand', image: 'https://www.countryflags.io/TH/flat/16.png' },
        { name: 'United States', image: 'https://www.countryflags.io/US/flat/16.png' },
        { name: 'Germany', image: 'https://www.countryflags.io/DE/flat/16.png' },
      ],
    };
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
    min-width: 100% !important;
  }
}

</style>
