import { defineRule } from 'vee-validate';
import i18n from './i18n';

const $t = i18n.global.t;

function isEmail(val) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val)) || $t('validator.email_msg');
}

function isPhone(val) {
  return /^[0-9]{8,15}$/.test(String(val)) || $t('validator.phone_msg');
}

defineRule('required', (val) => (val != null && val.trim() !== '') || $t('validator.required_msg'));

defineRule('email', (val) => isEmail(val));

defineRule('phone', (val) => isPhone(val));

defineRule('confirmed', (val, [target], ctx) => (val === ctx.form[target]) || $t('validator.match_msg'));

defineRule('username', (val) => (isEmail(val) === true || isPhone(val) === true) || $t('validator.username_msg'));

defineRule('password', (val) => {
  const re = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(String(val)) || $t('validator.password_msg');
});

defineRule('sms', async (val) => {
  if (/^[0-9]{6}$/.test(String(val))) {
    // call API to verify...
    return true;
  }
  return $t('validator.sms_msg');
});
