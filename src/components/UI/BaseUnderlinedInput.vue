<template>
  <div
    class="input-group"
  >
    <div
      v-if="text"
      class="input-group-text"
    >
      <span
        v-if="type == 'phone'"
        style="margin-right: 1rem;"
      >
        {{ $t('components.country_code') }}
      </span>
      {{ text }}
    </div>
    <div
      class="inline-block"
    >
      <div
        v-if="$slots.icon && type !== 'phone'"
        class="input-group-icon"
      >
        <slot name="icon" />
      </div>
      <template v-if="type == 'password'">
        <input
          v-model="inputValue"
          :type="(isDisplay) ? 'text' : 'password'"
          class="input-box"
          :placeholder="placeholder"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @change="$emit('input', $event.target.value)"
        >

        <img
          class="password-eye"
          src="@svg/password-eye.svg"
          @click="isDisplay = !isDisplay"
        >
      </template>
      <template v-else-if="type == 'with-button'">
        <input
          v-model="inputValue"
          type="text"
          class="input-box"
          :placeholder="placeholder"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @change="$emit('input', $event.target.value)"
        >
        <div
          v-if="$slots.button"
          class="input-group-button"
        >
          <slot name="button" />
        </div>
      </template>
      <template v-else-if="type == 'phone'">
        <img
          src="@svg/phone.svg"
          class="input-group-icon"
        >
        <!-- TODO: Better UI -->
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
        <input
          v-model="inputValue"
          type="text"
          class="input-box input-phone"
          :placeholder="placeholder"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @change="$emit('input', phoneCode + $event.target.value)"
        >
      </template>
      <template v-else>
        <input
          v-model="inputValue"
          type="text"
          class="input-box"
          :placeholder="placeholder"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @change="$emit('input', $event.target.value)"
        >
      </template>
    </div>
    <div
      class="input-line"
      :class="{focus:isFocus}"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseUnderlinedInput',
  props: {
    text: { type: String, required: false, default: null },
    placeholder: { type: String, required: true },
    value: { type: String, required: false, default: null },
    type: {
      type: String,
      required: false,
      default: 'text',
      validator(value) {
        return ['text', 'phone', 'password', 'with-button'].indexOf(value) !== -1;
      },
    },
  },
  emits: ['input'],
  data() {
    return {
      inputValue: this.value,
      isDisplay: false,
      isFocus: false,
      inputWidth: this.width,
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
  margin-bottom: 1.2rem;
}

.input-group-icon {
  height: 1rem;
  padding: 0 0.6rem 0 0.6rem;
  width: 1rem;
}

.input-group-button {
  align-self: center;
  white-space: nowrap;
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
  font-size: 1rem;
  letter-spacing: 0.01em;
}

.input-line {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}

.focus {
  border-bottom: 1px solid rgba(1, 1, 1, 1);
  transition: border-bottom 0.3s ease-in-out;
}

.input-phone {
  margin-left: 2rem;
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  background: inherit;
  border: none;
  font-size: 1rem;
}

select::-ms-expand {
  display: none;
}

</style>
