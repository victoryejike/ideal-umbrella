<template>
  <BaseFrame
    :description="$t('nft_index.description')"
    :title="$t('nft_index.title')"
  >
    <div class="flex">
      <NftCard
        :btn="true"
        type="single"
        url="/nft/single"
      />
      <NftCard
        type="multiple"
        url="/nft/multiple"
      />
    </div>
  </BaseFrame>
</template>
<script>
import NftCard from '@/components/Nft/NftCard.vue';
import BaseFrame from './BaseFrame.vue';

export default {
  name: 'NFT',
  components: { BaseFrame, NftCard },
};

</script>

<style scoped>
.flex {
  display: flex;
}

@media (max-width: 42.875em) {
  .flex {
    display: block;
  }

  .nft-card {
    height: 18.75rem;
    margin: 1.875rem auto;
    width: 13.75rem;
  }
}
</style>
