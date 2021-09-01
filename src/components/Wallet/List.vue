<template>
  <div>
    <div class="mt-2 active-options">
      <img
        class="logo"
        src="@svg/huobi.svg"
        width="13"
      >
      <span
        id="address"
      >
        {{ account.replace(account.substring(5,34), "*******") }}
      </span>
      <b
        v-if="account"
        class="copy-text"
        @click="copyAddress"
      > Copy
      </b>
      <BaseRoundButton
        class="btn-outline-primary btn-sm other-wallet l-2"
        text="Connect"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'List',
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
