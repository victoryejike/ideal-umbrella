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
        @mouseenter="trigger"
      >
        <img
          class="otp-icon"
          height="16"
          src="@svg/otp-icon.svg"
        >
        <BaseOtpText
          v-if="hovered"
        />
      </span>
    </div>
    <div
      class="input-inline-block"
    >
      <div
        v-if="$slots.icon && type !== 'tel'"
        class="input-group-icon"
      >
        <slot name="icon" />
      </div>
      <template v-if="type === 'password'">
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
          height="20"
          src="@svg/phone.svg"
          style="filter: saturate(100%) brightness(0); opacity: 0.5;"
          width="12"
        >
        <!-- TODO: Better UI -->
        <Field
          :id="country"
          as="select"
          :class="country"
          :name="country"
        >
          <option
            v-for="item in countryCode"
            :key="item.name"
            :data-countryCode="item.code"
            :value="item.dial_code"
          >
            ({{ item.code }}) +{{ item.dial_code }}
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
          rules="required|phone"
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
        v-if="$slots.element || type === 'otp'"
        class="input-group-button"
      >
        <template v-if="type === 'otp'">
          <BaseRoundButton
            class="btn-outline-primary btn-sm send-otp"
            :text="$t('register_screen.send_code')"
            @click="sendCode(fieldName)"
          />
        </template>
        <template v-else>
          <slot name="element" />
        </template>
      </div>
    </div>
    <div
      class="input-line"
      :class="[{focus: isFocus}, {'error-underline': isError}]"
    />
    <div v-if="errorMessgae">
      <Message
        :message="errorMessgae"
        :type="messageType"
      />
    </div>
    <div
      :id="`${name}-error-msg`"
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
import CountryCode from '../../utils/country-code.json';
import Message from './Message.vue';

export default {
  name: 'BaseUnderlinedInput',
  components: { ErrorMessage, Field, Message },
  props: {
    name: { type: String, required: true },
    fieldName: { type: String, required: false, default: null },
    country: { type: String, required: false, default: null },
    placeholder: { type: String, required: false, default: null },
    rules: { type: String, required: false, default: null },
    text: { type: String, required: false, default: null },
    type: { type: String, required: false, default: 'text' },
    defaultValue: { type: String, required: false, default: '' },
    width: { type: Number, required: false, default: null },
    isMail: { type: Boolean, required: false, default: null },
  },
  emits: ['input'],
  data() {
    return {
      errorMessgae: '',
      value: this.defaultValue,
      isDisplay: false,
      isFocus: false,
      isError: false,
      countryCode: CountryCode,
      messageType: '',
      hovered: false,
    };
  },
  mounted() {
    this.observer = new MutationObserver(((mutations) => {
      this.isError = (mutations[1]?.addedNodes[0]?.className === 'input-error-msg-effect');
    }));
    this.observer.observe(document.getElementById(`${this.name}-error-msg`), { childList: true });
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
      if ((Number.isNaN(Number(e.key)) || e.key === null || e.key === ' ') && e.key !== '.') {
        e.preventDefault();
        return false;
      }
      return true;
    },
    toggleEye() {
      this.$refs['password-eye'].src = (this.isDisplay) ? PasswordEye : PasswordEyeClosed;
      this.isDisplay = !this.isDisplay;
    },
    sendCode(name) {
      if (this.isMail === true) {
        const email = document.querySelector(`input[name=${name}]`).value;
        if (email === '' || email === null) {
          this.messageType = 'error';
          this.errorMessgae = 'Enter an Email Address';
          setTimeout(() => { this.errorMessgae = ''; }, 2000);
        } else {
          const params = { email };
          this.callApi(params);
        }
      } else {
        const phone = document.querySelector(`input[name=${name}]`).value;
        const countryCode = document.getElementById(this.country).value;
        if (phone === '' || phone === null) {
          this.messageType = 'error';
          this.errorMessgae = 'Enter a Phone Number';
          setTimeout(() => { this.errorMessgae = ''; }, 2000);
        } else {
          const params = {
            // eslint-disable-next-line camelcase
            country_code: countryCode,
            phone,
          };
          this.callApi(params);
        }
      }
    },
    async callApi(params) {
      let response;
      try {
        const { data } = await this.$api.REQUESTOTP(params);
        response = data;
      } catch (error) {
        response = error.response.data;
      }
      if (response?.success) {
        this.messageType = 'success';
        this.errorMessgae = response.message;
        setTimeout(() => { this.errorMessgae = ''; }, 2000);
      } else {
        this.messageType = 'error';
        this.errorMessgae = response.error;
        setTimeout(() => { this.errorMessgae = ''; }, 2000);
      }
    },
    trigger() {
      this.hovered = true;
      setTimeout(() => { this.hovered = false; }, 2000);
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
  margin-left: 2rem;
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
</style>
