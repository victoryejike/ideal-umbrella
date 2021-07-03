<template>
  <div class="create-nft-main">
    <router-link
      to="/nft"
    >
      <img
        class="back-btn"
        src="@svg/arrow-back.svg"
      >
    </router-link>
    <Base
      :title="title"
    >
      <div id="error" />
      <BaseForm
        ref="collectible-nft"
        v-slot="{ isLoading}"
        class="nft-form"
        @submit="onSubmit"
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
        <template v-if="selectedSwitch">
          <BaseUnderlinedInput
            ref="fee"
            class="input-field"
            name="amount"
            :placeholder="$t('collectible.amount_placeholder')"
            :text="$t('collectible.amount_label')"
            @change="getServiceFee"
          >
            <template #element>
              <BaseScrollableSelectBox
                :css="selectBoxCSS"
                name="amountCoinType"
                :options="coinList"
              />
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            ref="receivedAmount"
            class="input-field receivedAmount"
            name="receivedAmount"
            :placeholder="$t('collectible.received_amount_placeholder')"
            :text="$t('collectible.received_amount_label')"
          >
            <template #element>
              <BaseScrollableSelectBox
                :css="selectBoxCSS"
                name="receivedAmountCoinType"
                :options="coinList"
              />
            </template>
          </BaseUnderlinedInput>
        </template>

        <BaseScrollableSelectBox
          class="input-div label"
          name="collectible"
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
        <BaseUnderlinedInput
          v-model="tokenid_value"
          class="input-field show"
          name="tokenid"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <div class="inline">
          <BaseScrollableSelectBox
            class="input-div label"
            name="royalties[0].value"
            :options="royaltiesList"
            :text="$t('collectible.royalties_label')"
          />
          <BaseUnderlinedInput
            v-model="value"
            class="input-field show"
            name="royalties[0].recipient"
            :placeholder="$t('collectible.discription_placeholder')"
            :text="$t('collectible.discription_label')"
          />
          <BaseUnderlinedInput
            v-if="standard === 'erc1155'"
            class="input-field copies-input"
            name="copies"
            :placeholder="$t('collectible.number_of_copies_placeholder')"
            :text="$t('collectible.number_of_copies_label')"
          />
        </div>
        <BaseUnderlinedInput
          v-model="uri_value"
          class="input-field show"
          name="uri"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <div>
          <BaseRoundButton
            class="btn-primary btn-md btn-bold"
            :icon="isLoading ? 'loading' : 'arrow-right'"
            :submit="true"
            :text="$t('collectible.create_button_text')"
          />
        </div>
      </BaseForm>
    </Base>
  </div>
</template>
<script>

import UploadCard from '@/components/Nft/UploadCard.vue';
import Base from '@/components/Nft/BaseFrame.vue';

export default {
  name: 'CreateNFT',
  components: {
    Base,
    UploadCard,
  },
  data() {
    return {
      selectedSwitch: true,
      coinList: [
        { name: 'ETH', image: require('@svg/ethereum.svg') },
        { name: 'HT', image: require('@svg/huobi-token.svg') },
        { name: 'BTC', image: require('@svg/bitcoin.svg') },
      ],
      collectibleList: [
        { name: 'ERC-721' },
      ],
      singleTabTitle: [
        this.$t('collectible.tab.fixed_price'),
        this.$t('collectible.tab.timed_auction'),
        this.$t('collectible.tab.unlimited_auction'),
      ],
      multipleTabTitle: [
        this.$t('collectible.tab.fixed_price'),
        this.$t('collectible.tab.unlimited_auction'),
      ],
      royaltiesList: [
        { name: '10 %' },
        { name: '20 %' },
        { name: '30 %' },
      ],
      selectBoxCSS: { width: 10 },
      uri_value: sessionStorage.getItem('ipfsHash'),
      value: localStorage.getItem('account'),
      tokenid_value: '',
      receivedAmount: '',
    };
  },
  computed: {
    standard() { return this.$route.params?.standard; },
    title() {
      if (this.standard === 'erc721') {
        return this.$t('collectible.title_single');
      } if (this.standard === 'erc1155') {
        return this.$t('collectible.title_multiple');
      }
      return null;
    },
    tabTitle() {
      if (this.standard === 'erc721') {
        return this.singleTabTitle;
      } if (this.standard === 'erc1155') {
        return this.multipleTabTitle;
      }
      return null;
    },
  },
  methods: {
    toggleSwitch() {
      this.selectedSwitch = !this.selectedSwitch;
    },
    getServiceFee() {
      console.log('works');
      console.log(this.$refs.fee);
      // const amount = document.querySelector('.fee');
      // console.log(amount);
      // const newAmount = (amount - (amount * 0.025));
      // console.log(newAmount);
      // document.querySelector('.receivedAmount').value = newAmount;
    },
    async onSubmit(CollectibleNftData) {
      this.isLoading = true;
      let response = null;
      try {
        const { data } = await this.$api.CREATENFT(CollectibleNftData);
        response = data;
        console.log(CollectibleNftData);
      } catch (error) {
        response = error.response.data;
        console.log(response);
        this.isLoading = false;
      }

      if (response?.success) {
        // this.$store.dispatch('reset', response.data);
        console.log('success', response.data);
      } else {
        // const { form } = this.$refs['collectible-nft'];
        console.log(response.error);
        document.getElementById('error').innerHTML = '*All fields are required';
        document.getElementById('error').style.color = 'red';
        // form.setFieldError('new_phone_code', response.error);
        this.isLoading = false;
      }
    },
  },
};

</script>

<style scoped>
.create-nft-main {
  max-width: 32.5rem;
}

.input-div {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.875rem;
}

.toggle-div {
  align-items: center;
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

.show {
  display: none;
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

.inline {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.royalties-selectbox {
  margin-right: 2rem;
}

#error {
  padding-bottom: 1rem;
}

.copies-input {
  max-width: 16.5rem;
  min-width: 0;
}
</style>
