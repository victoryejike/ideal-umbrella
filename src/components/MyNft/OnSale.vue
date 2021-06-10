<template>
  <div
    class="gridbox card-gridbox m-3"
    style="grid-template-columns: repeat(auto-fit, 11.875rem);"
  >
    <BaseProductCard
      v-for="(item, index) in discoverList"
      :key="index"
      :author="item.author"
      :avatar="item.avatar"
      :bg-color="null"
      class="discover-product-card"
      :image="item.image"
      :name="item.name"
      :price="item.price"
      :size="190"
      :verified="item.verified"
    />
  </div>
</template>
<script>

export default {
  name: 'OnSale',
  data() {
    return {
      discoverList: Array(5).fill({
        avatar: 'avatar.png',
        author: 'Otha Davis III',
        image: 'image.png',
        name: 'Crypto Mask',
        price: 67.456,
        verified: true,
      }),
    };
  },
};

</script>

<style scoped>
  .gridbox {
    display: grid;
    justify-content: space-between;
  }

  .card-gridbox {
    grid-gap: 1.25rem;
    grid-row-gap: 5rem;
  }

  .m-3 {
    margin-top: 4rem;
  }
</style>
