<template>
  <BaseFrame
    :title="$t('single_collectible.title')"
  >
    <UploadCard
      :text="$t('single_collectible.upload_file_label')"
    />
    <div class="tab-box">
      <span>{{ $t('single_collectible.put_on_marketplace') }}</span>
      <BaseNavigationTab
        class="tabs"
        :list="tabTitle"

        :width="10.6"
      />
    </div>

    <Collectible
      :text="$t('single_collectible.amount_label')"
      :placeholder="$t('single_collectible.amount_placeholder')"
      name="amount"
      type="amount"
    />
  </BaseFrame>
</template>
<script>

import BaseFrame from './BaseFrame.vue';
import Collectible from '../../components/Nft/Collectible.vue';
import UploadCard from '../../components/Nft/UploadCard.vue';

export default {
  name: 'NFT',
  components: {
    BaseFrame,
    Collectible,
    UploadCard,
  },
  data() {
    return {
      tabTitle: [
        this.$t('single_collectible.tab.fixed_price'),
        this.$t('single_collectible.tab.timed_auction'),
        this.$t('single_collectible.tab.unlimited_auction'),
      ],
    };
  },
};

</script>

<style scoped>
.tab-box {
  display: flex;
  flex-direction: column;
}
</style>
