<template>
  <div
    class="input-group"
    :style="{width: width + 'rem'}"
  >
    <span
      v-if="text"
      class="input-group-text"
    >{{ text }}</span>
    <div
      class="inline-block"
    >
      <div
        v-if="$slots.icon && type == 'phone'"
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
        <input
          v-model="phoneCode"
          type="text"
          maxlength="4"
          class="input-box input-phone"
        >
        <input
          v-model="inputValue"
          type="text"
          class="input-box"
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
      :style="{width: width + 'rem'}"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseUnderlinedInput',
  props: {
    text: { type: String, required: false, default: null },
    placeholder: { type: String, required: true },
    width: { type: Number, required: false, default: 24 },
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
    };
  },
};
</script>

<style scoped>
.input-group {
  display: flex;
  flex-wrap: wrap;
  position: relative;
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
  height: 40px;
  margin-right: 0.6rem;
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
}

.focus {
  border-bottom: 1px solid rgba(1, 1, 1, 1);
  transition: border-bottom 0.3s ease-in-out;
}

.input-phone {
  width: 2rem;
}
</style>
