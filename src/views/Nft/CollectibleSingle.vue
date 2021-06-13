<template>
  <div class="single-collectible-main">
    <BaseFrame
      :title="$t('collectible.title')"
    >
      <UploadCard
        :text="$t('collectible.upload_file_label')"
      />
      <div class="input-div">
        <div class="toggle-div label">
          <span>{{ $t('collectible.put_on_marketplace') }}</span>

          <label class="switch">
            <input
              checked
              type="checkbox"
              @click="toggleSwitch"
            >
            <span class="slider round" />
          </label>
        </div>
        <BaseNavigationTab
          v-if="selectedSwitch"
          class="tabs"
          :list="tabTitle"
          :width="10.6"
        />
      </div>
      <BaseUnderlinedInput
        v-if="selectedSwitch"
        class="input-field"
        name="amount"
        :placeholder="$t('collectible.amount_placeholder')"
        :text="$t('collectible.amount_label')"
      >
        <template #element>
          <BaseScrollableSelectBox
            v-if="selectedSwitch"
            active-color="#DDE1FB"
            bg-color="#E5E5E5"
            border-color="none"
            hover-color="#DDE1FB"
            :options="coinList"
          />
        </template>
      </BaseUnderlinedInput>

      <BaseUnderlinedInput
        v-if="selectedSwitch"
        class="input-field"
        name="receivedAmount"
        :placeholder="$t('collectible.received_amount_placeholder')"
        :text="$t('collectible.received_amount_label')"
      >
        <template #element>
          <BaseScrollableSelectBox
            v-if="selectedSwitch"
            active-color="#DDE1FB"
            bg-color="#E5E5E5"
            border-color="none"
            hover-color="#DDE1FB"
            :options="coinList"
          />
        </template>
      </BaseUnderlinedInput>
      <BaseScrollableSelectBox
        active-color="#DDE1FB"
        bg-color="#E5E5E5"
        border-color="none"
        class="input-div label"
        hover-color="#DDE1FB"
        :options="collectibleList"
        :text="$t('collectible.choose_collection_label')"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="title"
        :placeholder="$t('collectible.title_placeholder')"
        :text="$t('collectible.title_label')"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="description"
        :placeholder="$t('collectible.discription_placeholder')"
        :text="$t('collectible.discription_label')"
      />
      <BaseScrollableSelectBox
        active-color="#DDE1FB"
        bg-color="#E5E5E5"
        border-color="none"
        class="input-div label"
        hover-color="#DDE1FB"
        :options="royaltiesList"
        :text="$t('collectible.royalties_label')"
      />
      <div>
        <BaseRoundButton
          class="btn-primary btn-md btn-bold"
          icon="arrow-right"
          :text="$t('collectible.create_button_text')"
        />
      </div>
    </BaseFrame>
  </div>
</template>
<script>

import UploadCard from '@/components/Nft/UploadCard.vue';
import BaseFrame from './BaseFrame.vue';

export default {
  name: 'CollectibleSingle',
  components: {
    BaseFrame,
    UploadCard,
  },
  data() {
    return {
      selectedSwitch: true,
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
      collectibleList: [
        { name: 'ERC-721' },
      ],
      tabTitle: [
        this.$t('collectible.tab.fixed_price'),
        this.$t('collectible.tab.timed_auction'),
        this.$t('collectible.tab.unlimited_auction'),
      ],
      royaltiesList: ['10 %', '20 %', '30 %'],
    };
  },
  methods: {
    toggleSwitch() {
      this.selectedSwitch = !this.selectedSwitch;
    },
  },
};

</script>

<style scoped>
.single-collectible-main {
  max-width: 32.5rem;
}

.input-div {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.875rem;
}

.toggle-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.switch {
  display: inline-block;
  height: 1.875rem;
  position: relative;
  width: 3.75rem;
}

.switch input {
  height: 0;
  opacity: 0;
  width: 0;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider::before {
  background-color: white;
  bottom: 0.375rem;
  content: "";
  height: 1.625rem;
  left: 0.25rem;
  position: absolute;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  width: 1.625rem;
}

input:checked + .slider {
  background: #5d6ec2;
}

input:focus + .slider {
  box-shadow: 0 0 0.0625rem #2196f3;
}

input:checked + .slider::before {
  -webkit-transform: translateX(1.75rem);
  -ms-transform: translateX(1.75rem);
  transform: translateX(1.75rem);
}

.slider.round {
  border-radius: 2rem;
}

.slider.round::before {
  border-radius: 50%;
  height: 1.25rem;
  width: 1.25rem;
}

.input-field {
  margin-bottom: 2.5rem;
}

.collection-text {
  margin-bottom: 1.25rem;
}

.label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.125rem;
}

</style>
