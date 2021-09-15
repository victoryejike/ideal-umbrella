<template>
  <div class="container">
    <div>
      <b>Wallet</b>
      <BaseRoundButton
        class="btn-outline-primary btn-sm other-wallet"
        text="Create New Wallet"
        @click="$router.push('/wallet/connect')"
      />
    </div>
    <div>
      <div
        class="mt-2 active"
      >
        <img
          class="logo"
          src="@svg/huobi.svg"
          width="13"
        >
        <span
          v-if="account !== null"
          id="address"
        >
          {{ account.replace(account.substring(5,34), "*******") }}
        </span>
        <span
          v-else
        >
          Please Connect Wallet
        </span>
        <b
          v-if="account"
          class="copy-text"
          @click="copyAddress"
        > Copy
        </b>
        <img
          class="connected"
          src="@/assets/svg/dropdown.svg"
          width="20"
        >
        <img
          class="connected"
          src="@/assets/svg/connected.svg"
          width="80"
        >
      </div>
      <Table />
    </div>
    <List />
    <List />
    <List />
    <List />
  </div>
</template>
<script>
import Table from '@/components/Wallet/Table.vue';
import List from '@/components/Wallet/List.vue';

export default {
  name: 'WalletIndex',
  components: { Table, List },
  data() {
    return {
      account: localStorage.getItem('account'),
    };
  },
  methods: {
    copyAddress() {
      const clipboardData = window.clipboardData || navigator.clipboard;
      clipboardData.writeText(this.account);
    },
  },
};

</script>
<style scoped>

.mt-2 {
  align-items: center;
  margin-top: 2rem;
}

.mt-2 span {
  font-size: 1rem;
  margin: 0.7rem;
}

.address {
  font-size: 1rem !important;
}

.logo {
  margin-left: 1.5rem;
}

.l-2 {
  margin-right: 1em !important;
}

.copy {
  height: 2rem;
  width: 6rem;
}

.active-options {
  background: rgba(255, 255, 255, 0.25);
  padding: 1rem;
  border-radius: 1.5rem;
}

.active {
  background: rgba(255, 255, 255, 0.5);
  padding: 1rem;
  border-radius: 1.5rem;
}

.other-wallet {
  height: 2rem;
  float: right;
  margin-left: 0.5rem;
}

.connected {
  float: right;
  margin-right: 1rem;
  margin-top: 0.2rem;
}

.copy-text {
  font-size: 0.7rem !important;
  margin-left: 1rem;
  color: #2C43AD;
}

.flex {
  align-items: center;
  display: flex;
}

.flex b {
  font-size: 1.4rem;
}

@media (max-width: 60em) {
  .mt-2 {
    display: block;
  }

  .mt-2 span {
    display: block;
    margin: 0rem;
    max-width: 100%;
    word-wrap: break-word;
  }

  .flex {
    margin-top: 1rem;
  }
}
</style>
