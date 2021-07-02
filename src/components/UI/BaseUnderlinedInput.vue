<template>
  <div
    ref="field-form"
    class="input-group"
    :style="{maxWidth: `${width}rem`}"
  >
    <div
      v-if="text"
      class="input-group-text"
      :class="{'label-error-effect': isError}"
    >
      <span
        v-if="type === 'tel'"
        class="country-code-text"
      >
        {{ $t('components.country_code') }}
      </span>
      {{ text }}
      <span
        v-if="type === 'otp'"
      >
        <img
          class="otp-icon"
          height="16"
          src="@svg/otp-icon.svg"
          width="16"
        >
        <span class="otp-msg">
          {{ $t('otp_disclaimer.msg') }}
        </span>
      </span>
    </div>
    <div
      class="input-inline-block"
    >
      <div
        v-if="$slots.icon"
        class="input-group-icon"
      >
        <slot name="icon" />
      </div>
      <template v-if="type === 'password'">
        <img
          class="input-group-icon"
          src="@svg/password-lock.svg"
          style="filter: saturate(100%) brightness(0); opacity: 0.5;"
        >
        <Field
          v-model="value"
          v-bind="$attrs"
          class="input-box"
          :name="name"
          :placeholder="placeholder"
          :rules="rules"
          :type="(isDisplay) ? 'text' : 'password'"
          :validate-on-change="false"
          @change="$emit('input', $event.target.value)"
          @focus="isFocus = true"
          @focusout="isFocus = false"
        />
        <img
          ref="password-eye"
          class="password-eye"
          height="16"
          src="@svg/password-eye.svg"
          width="16"
          @click="toggleEye"
        >
      </template>
      <template v-else-if="type === 'tel'">
        <img
          class="input-group-icon"
          src="@svg/phone.svg"
          style="filter: saturate(100%) brightness(0); opacity: 0.5;"
        >
        <!-- TODO: Better UI -->
        <span>+</span>
        <Field
          as="select"
          :name="countryField"
        >
          <option
            v-for="item in $store.getters['data/countryList']"
            :key="item.name"
            :value="item.dial_code"
          >
            {{ item.code }} ({{ item.dial_code }})
          </option>
        </Field>
        <Field
          v-model="value"
          v-bind="$attrs"
          class="input-box input-phone"
          maxlength="15"
          minlength="8"
          :name="name"
          :placeholder="placeholder"
          :rules="`required:${countryField}|required|phone`"
          type="tel"
          :validate-on-change="false"
          @change="$emit('input', $event.target.value)"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @keypress="isInteger($event)"
        />
      </template>
      <template v-else-if="type === 'otp'">
        <Field
          v-model="value"
          v-bind="$attrs"
          class="input-box"
          maxlength="6"
          minlength="6"
          :name="name"
          :placeholder="placeholder"
          rules="required|otp"
          type="tel"
          :validate-on-change="false"
          @change="$emit('input', $event.target.value)"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @keypress="isInteger($event)"
        />
        <BaseRoundButton
          class="input-group-button btn-outline-primary btn-sm send-otp"
          :text="$t('register_screen.send_code')"
          @click="sendCode"
        />
      </template>
      <template v-else>
        <Field
          v-model="value"
          v-bind="$attrs"
          class="input-box"
          :name="name"
          :placeholder="placeholder"
          :rules="rules"
          :type="type"
          :validate-on-change="false"
          @change="$emit('input', $event.target.value)"
          @focus="isFocus = true"
          @focusout="isFocus = false"
          @keypress="type === 'number' ? isNumber($event) : null"
        />
      </template>
      <div
        v-if="$slots.element"
        class="input-group-button"
      >
        <slot name="element" />
      </div>
    </div>
    <div
      class="input-line"
      :class="[{focus: isFocus}, {'error-underline': isError}]"
    />
    <div v-if="message.content">
      <Message
        :message="message.content"
        :type="message.type"
      />
    </div>
    <div
      ref="error-msg"
      class="input-error-msg"
    >
      <ErrorMessage
        class="input-error-msg-effect"
        :name="name"
      />
    </div>
  </div>
</template>

<script>
import PasswordEye from '@svg/password-eye.svg';
import PasswordEyeClosed from '@svg/password-eye-closed.svg';
import { Field, ErrorMessage } from 'vee-validate';
import Message from './Message.vue';

export default {
  name: 'BaseUnderlinedInput',
  components: { ErrorMessage, Field, Message },
  props: {
    name: { type: String, required: true },
    placeholder: { type: String, required: false, default: null },
    rules: { type: String, required: false, default: null },
    text: { type: String, required: false, default: null },
    type: { type: String, required: false, default: 'text' },
    defaultValue: { type: String, required: false, default: '' },
    extraData: { type: Object, required: false, default: null },
    width: { type: Number, required: false, default: null },
  },
  emits: ['input'],
  data() {
    return {
      message: { type: null, content: null },
      value: this.defaultValue,
      isDisplay: false,
      isFocus: false,
      isError: false,
      isHover: false,
      countryField: this.extraData?.countryField || 'country_code',
    };
  },
  mounted() {
    this.observer = new MutationObserver(((mutations) => {
      this.isError = (mutations[1]?.addedNodes[0]?.className === 'input-error-msg-effect');
    }));
    this.observer.observe(this.$refs['error-msg'], { childList: true });
  },
  methods: {
    isInteger(e) {
      if (this.isNumber(e) && e.key !== '.') {
        return true;
      }
      e.preventDefault();
      return false;
    },
    isNumber(e) {
      if ((Number.isNaN(Number(e.key)) || e.key == null || e.key === ' ') && e.key !== '.') {
        e.preventDefault();
        return false;
      }
      return true;
    },
    toggleEye() {
      this.$refs['password-eye'].src = (this.isDisplay) ? PasswordEye : PasswordEyeClosed;
      this.isDisplay = !this.isDisplay;
    },
    sendCode() {
      let fieldName = this.extraData?.validateField;
      let DOM = null;
      if (typeof fieldName === 'object') {
        for (let i = 0; i < fieldName.length; i += 1) {
          DOM = document.querySelector(`input[name=${fieldName[i]}]`);
          if (DOM) { fieldName = fieldName[i]; break; }
        }
      } else {
        DOM = document.querySelector(`input[name=${fieldName}]`);
      }
      this.$parent.validateField(fieldName).then(async ({ valid }) => {
        if (valid && DOM) {
          let params = null;
          if (DOM.type === 'email') {
            params = { email: DOM.value };
          } else if (DOM.type === 'tel') {
            const countryCode = document.querySelector(`select[name=${this.countryField}]`).value;
            params = { country_code: countryCode, phone: DOM.value };
          }
          if (params) {
            // TODO: No CSRF Token Implementaion
            const response = await this.$api.REQUEST_OTP(params);
            this.message = {
              type: (response?.success) ? 'success' : 'error',
              content: response?.message || response?.error,
            };
            setTimeout(() => { this.message.content = null; }, 2000);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.input-group {
  display: flex;
  flex-wrap: wrap;
}

.input-group-text {
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  overflow: hidden;
  transition: color 0s;
  white-space: nowrap;
}

.country-code-text {
  margin-right: 1rem;
  transition: color 0s;
}

.input-group-icon {
  height: 1rem;
  padding: 0 0.6rem;
  width: 1rem;
}

.input-group-button {
  align-self: center;
}

.input-inline-block {
  align-items: baseline;
  display: inline-flex;
  margin-bottom: 0.2rem;
  width: 100%;
}

.input-box {
  background-color: transparent;
  border: 0;
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
  overflow: hidden;
}

.input-line {
  background-color: #000;
  filter: opacity(0.25);
  height: 0.08rem;
  width: 100%;
}

.focus {
  filter: opacity(1);
}

.error-underline {
  background-color: #ff3a31;
}

.input-phone {
  margin-left: 1rem;
}

.password-eye {
  align-self: center;
  margin-right: 0.6rem;
}

select {
  appearance: none;
  background: inherit;
  border: none;
  font-size: 1rem;
}

select::-ms-expand {
  display: none;
}

.otp-msg {
  align-items: center;
  background: #757580;
  border-radius: 0.625rem;
  color: #fff;
  display: flex;
  font-size: 0.75rem;
  font-weight: 600;
  height: 2.75rem;
  line-height: 0.9375rem;
  margin-top: 0.3125rem;
  mix-blend-mode: normal;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  white-space: normal;
  width: 18.4375rem;
}
</style>
