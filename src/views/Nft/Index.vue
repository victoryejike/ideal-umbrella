<template>
  <Base
    :description="$t('nft_index.description')"
    :title="$t('nft_index.title')"
  >
    <div class="flex">
      <NftCard
        :btn="true"
        type="single"
        url="/nft/create/erc721"
      />
      <NftCard
        type="multiple"
        url="/nft/create/erc1155"
      />
    </div>
  </Base>
</template>
<script>
import NftCard from '@/components/Nft/NftCard.vue';
import Base from './BaseFrame.vue';

export default {
  name: 'NFT',
  components: { Base, NftCard },
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
