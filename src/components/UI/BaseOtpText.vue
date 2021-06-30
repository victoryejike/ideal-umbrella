<template>
  <span class="on-hover">
    <p>
      {{ $t('otp_disclaimer.msg') }}

    </p>
  </span>
</template>
<style scoped>
.on-hover {
  align-items: center;
  background: #2c43ad;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  height: 44px;
  line-height: 15px;
  margin-left: 10px;
  mix-blend-mode: normal;
  white-space: normal;
  width: 305px;
}

.on-hover p {
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  margin-top: 7px;
  padding-left: 8px;
  padding-right: 8px;
}

</style>
