<template>
  <div
    ref="otp"
    class="input-group"
    :style="{maxWidth: `${width}rem`}"
  >
    <div
      v-if="text"
      class="input-group-text"
      :class="{'error-text': isError}"
    >
      <span
        v-if="type === 'tel'"
        style="margin-right: 1rem;"
      >
        {{ $t('components.country_code') }}
      </span>
      {{ text }}
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
          v-model="inputValue"
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
        <select
          id="country-code"
        >
          <option
            v-for="item in countryCode"
            :key="item.name"
            :data-countryCode="item.code"
            selected
            :value="item.dial_code"
          >
            +{{ item.dial_code }}
          </option>
        </select>
        <Field
          v-model="inputValue"
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
          v-model="inputValue"
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
          v-model="inputValue"
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
            @click="sendCode"
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
    <div
      :id="`${name}-error-msg`"
      class="input-error-msg"
    >
      <ErrorMessage
        class="input-error-msg-text"
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

export default {
  name: 'BaseUnderlinedInput',
  components: { ErrorMessage, Field },
  props: {
    name: { type: String, required: true },
    placeholder: { type: String, required: false, default: null },
    rules: { type: String, required: false, default: null },
    text: { type: String, required: false, default: null },
    type: { type: String, required: false, default: 'text' },
    value: { type: String, required: false, default: '' },
    width: { type: Number, required: false, default: null },
    ismail: { type: Boolean, required: false, default: null },
  },
  emits: ['input'],
  data() {
    return {
      inputValue: this.value,
      isDisplay: false,
      isFocus: false,
      isError: false,
      countryCode: CountryCode,
    };
  },
  mounted() {
    this.observer = new MutationObserver(((mutations) => {
      this.isError = (mutations[1]?.addedNodes[0]?.className === 'input-error-msg-text');
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
    sendCode() {
      if (this.ismail === true) {
        const email = document.querySelector('input[name=email]').value;
        const params = {
          // eslint-disable-next-line object-shorthand
          email: email,
        };
        this.callApi(params);
      } else {
        const phone = document.querySelector('input[name=phone]').value;
        const countryCode = document.getElementById('country-code').value;
        const params = {
          // eslint-disable-next-line camelcase
          country_code: countryCode,
          // eslint-disable-next-line object-shorthand
          phone: phone,
        };
        this.callApi(params);
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
        console.log(response.message);
      } else {
        console.log(response.error);
      }
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

.error-text {
  color: #ff3a31;
  transition: color 0s;
}

.error-underline {
  background-color: #ff3a31;
}

.input-error-msg {
  display: flex;
  margin-top: 0.5rem;
}

.input-error-msg-text {
  color: #ff3a31;
  font-size: 0.85rem;
  text-align: justify;
  white-space: normal;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
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

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-0.0625rem, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(0.125rem, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-0.1875rem, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(0.25rem, 0, 0);
  }
}
</style>
