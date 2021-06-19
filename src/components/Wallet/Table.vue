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
        <tr>
          <td class="flex">
            <div class="coin-icon">
              <img src="@svg/dogecoin.svg">
            </div>
            <div class="coin-name">
              <b class="color-light">Doge</b>
              <br>
              <span>DogeCoin</span>
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
        <tr>
          <td class="flex">
            <div class="coin-icon">
              <img src="@svg/ethereum.svg">
            </div>
            <div class="coin-name">
              <b class="color-light">ETH</b>
              <br>
              <span>Ethereum</span>
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
        <tr>
          <td class="flex">
            <div class="coin-icon">
              <img src="@svg/litecoin.svg">
            </div>
            <div class="coin-name">
              <b class="color-light">Lite</b>
              <br>
              <span>Litecoin</span>
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

.overflow {
  overflow-x: scroll;
}

.coin-name {
  margin-left: 11px;
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
  color: #91a2fa;
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
