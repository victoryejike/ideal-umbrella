<template>
  <div class="wallet-table">
    <h3>Wallet</h3>
    <table style="width: 100%;">
      <tr>
        <th>Token/Coin</th>
        <th>Available</th>
        <th>Frozen</th>
        <th>Estimated Value (USDT)</th>
        <th>Action</th>
      </tr>
      <tr>
        <td class="flex">
          <div class="coin-icon">
            <img src="@svg/bitcoin.svg">
          </div>
          <div class="coin-name">
            <b class="color-light">BTC</b>
            <br>
            <span>Bitcoin</span>
          </div>
        </td>
        <td class="color-light">
          0.112300
        </td>
        <td class="color-light">
          $6750
        </td>
        <td class="color-light">
          ≈ 6500.00
        </td>
        <td>
          <a class="color-dark">Trade</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
};
</script>

<style scoped>
.flex {
  display: flex;
}

.coin-name {
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

.color-dark {
  color:#91A2FA;
}

.coin-name span {
  color: #808080;
  font-size: 11px;
  margin-left: 17px;
}

.coin-name b {
  color: #808080;
  margin-left: 17px;
}

.wallet-table {
  margin: 30px auto;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  color: #808080;
  font-size: 14px;
  padding: 15px;
  padding-bottom: 20px;
  text-align: left;
}

td a {
  font-size: 12px;
  padding: 10px;
}
</style>
