<template>
  <div class="wallet-table">
    <h3>Wallet</h3>
    <div class="overflow">
      <table style="width: 100%;">
        <tr>
          <th>Token/Coin</th>
          <th>Available</th>
          <th>Frozen</th>
          <th>Estimated Value (USDT)</th>
          <th>Action</th>
        </tr>
        <tr
          v-for="(item, index) in tableData"
          :key="index"
        >
          <td class="flex">
            <div class="coin-icon">
              <img src="@svg/ethereum.svg">
            </div>
            <div class="coin-name">
              <b class="color-light">{{ item.shortForm }}</b>
              <br>
              <span>{{ item.name }}</span>
            </div>
          </td>
          <td class="color-light">
            {{ item.availabel.toFixed(2) }}
          </td>
          <td class="color-light">
            ${{ item.frozen.toFixed(2) }}
          </td>
          <td class="color-light">
            ≈ {{ item.estimatedValue.toFixed(2) }}
          </td>
          <td>
            <span class="action-button">Trade</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      tableData: [
        {
          name: 'Ethereum',
          shortForm: 'ETH',
          availabel: 0,
          frozen: 0,
          estimatedValue: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.overflow {
  overflow: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.overflow::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

.coin-name {
  margin-left: 0.6875rem;
  text-align: left;
  width: 50%;
}

.coin-icon {
  text-align: left;
  width: 12%;
}

.color-light {
  color: rgba(0, 0, 0, 0.75) !important;
  font-weight: 700;
}

.action-button {
  color: #91a2fa;
  cursor: pointer;
}

.coin-name span {
  color: #808080;
  font-size: 0.6875rem;
  margin-left: 1.0625rem;
}

.coin-name b {
  color: #808080;
  margin-left: 1.0625rem;
}

.wallet-table {
  margin: 1.875rem auto;
  width: 100%;
}

th,
td {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.25);
  color: #808080;
  font-size: 0.875rem;
  padding: 0.9375rem;
  padding-bottom: 1.25rem;
  text-align: left;
}

td a {
  font-size: 0.75rem;
  padding: 0.625rem;
}
</style>
