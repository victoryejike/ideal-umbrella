<template>
  <BaseSettingFrame
    :title="$t('kyc_screen.id_verification')"
  >
    <BaseScrollableSelectBox
      class="input-div"
      :text="$t('kyc_screen.nationality_label')"
      :width="13.5"
      :options="countryList"
      :bg-color="backgroundColor"
      :border-color="borderColor"
    />
    <BaseUnderlinedInput
      class="input-div"
      :text="$t('kyc_screen.name_label')"
      :placeholder="$t('kyc_screen.name_placeholder')"
      name="userName"
    />
    <div class="user-id-div input-div">
      <BaseScrollableSelectBox
        :text="$t('kyc_screen.id_type_label')"
        :width="9.75"
        :options="idTypeList"
        :bg-color="backgroundColor"
        :border-color="borderColor"
      />
      <BaseUnderlinedInput
        class="input-user-id"
        :text="$t('kyc_screen.id_number_label')"
        :placeholder="$t('kyc_screen.id_number_placeholder')"
        :width="17.5"
        name="userName"
      />
    </div>
    <div class="actions-div">
      <BaseRoundButton
        class="confirm-button"
        :text="$t('kyc_screen.confirm')"
        type="primary"
        icon="arrow-right"
        size="m"
        :bold="true"
      />
    </div>
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

      backgroundColor: 'rgba(44, 67, 173, 0.05)',
      borderColor: 'transparent',
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

@media (max-width: 30em) {
  .user-id-div {
    display: inline-block;
  }

  .input-user-id {
    margin-left: 0;
    margin-top: 2.5rem;
  }

  .confirm-button {
    width: 100%;
  }
}
</style>
