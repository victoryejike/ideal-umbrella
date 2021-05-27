<template>
  <div class="flex mt-15">
    <img
      src="@svg/phone-dark.svg"
    >
    <select>
      <option
        data-countryCode="GB"
        value="44"
        selected
      >
        +44
      </option>
      <option
        data-countryCode="US"
        value="1"
      >
        +1
      </option>
    </select>
  </div>
</template>
<style scoped>
.flex{
  display:flex;
}
.mt-15{
    margin-top: 15px;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: inherit;
  font-size: 16px;
}
select::-ms-expand {
  display: none;
}
.input-phone input{
  border: none;
  width: 200px;
  color: rgba(0, 0, 0, 0.25);
  background: inherit;
  font-size: 16px;
}
input:focus, textarea:focus, select:focus{
    outline: none;
}
</style>
