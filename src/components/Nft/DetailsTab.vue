<template>
  <div class="details-main-div">
    <div class="details-inner-div">
      <div class="label">
        {{ text }}
      </div>
      <div class="nft-details">
        {{ value }}
      </div>
    </div>
    <div class="input-line" />
  </div>
</template>
<script>
export default {
  name: 'DetailsTab',
  props: {
    text: { type: String, required: false, default: null },
    value: { type: String, required: false, default: null },
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.details-main-div {
  margin-bottom: 1.4688rem;
}

.details-inner-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.9375rem;
}

.label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.nft-details {
  color: #6374c3;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: bold;
  line-height: 100%;
}

.input-line {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.25);
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}
</style>
