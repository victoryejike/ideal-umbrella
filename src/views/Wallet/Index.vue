<template>
  <div class="container">
    <div
      class="mt-2"
    >
      <img
        src="@svg/huobi.svg"
        width="15"
      >
      <span>
        {{ address.replace(address.substr(6, 32),'...') }}
      </span>
      <div class="flex">
        <BaseRoundButton
          class="btn-outline-primary btn-sm copy"
          :text="$t('wallet.copy')"
          @click="copyAddress"
        />
        <router-link
          to="/wallet/connect"
        >
          <BaseRoundButton
            class="btn-outline-primary btn-sm other-wallet"
            :text="$t('wallet.other_waalet')"
          />
        </router-link>
      </div>
    </div>
    <Table />
  </div>
</template>
<script>
import Table from '@/components/Wallet/Table.vue';

export default {
  name: 'WalletIndex',
  components: { Table },
  data() {
    return {
      address: '0x27706FD0b52D7daDE02f0a9D5f77800695e6067D',
    };
  },
  methods: {
    async copyAddress() {
      await navigator.clipboard.writeText(this.address);
    },
  },
};

</script>
<style scoped>
.mt-2 {
  align-items: center;
  display: flex;
  margin-top: 2rem;
}

.mt-2 span {
  font-size: 1.5rem;
  margin: 0.7rem;
}

.copy {
  height: 2rem;
  width: 6rem;
}

.other-wallet {
  height: 2rem;
  margin-left: 0.5rem;
}

.flex {
  align-items: center;
  display: flex;
}

@media (max-width: 35em) {
  .mt-2 {
    display: block;
  }

  .flex {
    margin-top: 1rem;
  }
}
</style>
