<template>
  <BaseFrame
    :title="$t('nft_index.title')"
    :description="$t('nft_index.description')"
  >
    <div class="flex">
      <NftCard
        btn="true"
        type="single"
        url="/nft/single"
      />
      <NftCard
        type="multiple"
      />
    </div>
  </BaseFrame>
</template>
<script>
import BaseFrame from './BaseFrame.vue';
import NftCard from '../../components/Nft/NftCard.vue';

export default {
  name: 'NFT',
  components: { BaseFrame, NftCard },
};

</script>

<style scoped>
.flex {
  display: flex;
}

@media only screen and (max-width: 686px) {
  .flex {
    display: block;
  }

  .nft-card {
    height: 300px;
    margin: 30px auto;
    width: 220px;
  }
}
</style>
