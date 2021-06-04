<template>
  <div class="input-group">
    <div
      v-if="text"
      class="input-group-text"
    >
      {{ text }}
    </div>
    <div class="inline-block">
      <template v-if="type === 'amount'">
        <input
          v-model="inputValue"
          :type="type"
          class="input-box"
          :placeholder="placeholder"
          @focus="isFocus = true"
          @focusout="isFocus = false"
        >

        <BaseScrollableSelectBox
          class="input-div"
          :options="coinList"
          :width="8"
          bg-color="#E5E5E5"
          border-color="none"
          hover-color="#DDE1FB"
          active-color="#DDE1FB"
        />
      </template>
      <template v-else>
        <input
          v-model="inputValue"
          :type="type"
          class="input-box"
          :placeholder="placeholder"
          @focus="isFocus = true"
          @focusout="isFocus = false"
        >
      </template>
    </div>
    <div
      class="input-line"
    />
  </div>
</template>
<script>
export default {
  name: 'BaseUnderlinedInput',
  props: {
    text: { type: String, required: false, default: null },
    placeholder: { type: String, required: false, default: null },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
  },
  data() {
    return {
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
    };
  },
};
</script>
<style scoped>
.input-group {
  display: flex;
  flex-wrap: wrap;
}

.input-group-text {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 1.37rem;
}

.inline-block {
  align-items: baseline;
  display: inline-flex;
  width: 100%;
}

.input-box {
  background-color: transparent;
  border: 0;
  color: #000;
  flex-grow: 1;
  font-size: 1rem;
  height: 2.5rem;
  margin-right: 0.6rem;
  min-width: 2.5rem;
  outline: 0;
}

.input-box::placeholder {
  color: rgba(0, 0, 0, 0.25);
  font-family: "Inter", sans-serif;
}

.input-line {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}

@media (max-width: 30em) {
  .input-box::placeholder {
    font-size: 0.6875rem;
  }
}

</style>
