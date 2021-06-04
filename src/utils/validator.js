import { defineRule } from 'vee-validate';

function isEmail(val) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val)) || 'Invalid email.';
}

function isPhone(val) {
  return /^[0-9]{8,15}$/.test(String(val)) || 'Invalid phone number.';
}

defineRule('required', (val) => (val != null && val.trim() !== '') || 'It is a required field.');

defineRule('email', (val) => isEmail(val));

defineRule('phone', (val) => isPhone(val));

defineRule('confirmed', (val, [target], ctx) => (val === ctx.form[target]) || 'Passwords must match.');

defineRule('username', (val) => (isEmail(val) === true || isPhone(val) === true) || 'Invalid username, it should be email or phone number.');

defineRule('password', (val) => {
  const re = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(String(val)) || 'Invalid password, the password must contain at least 8 characters in length, and at least 1 lowercase, uppercase, special characters and numeric values.';
});

defineRule('sms', async (val) => {
  if (/^[0-9]{6}$/.test(String(val))) {
    // call API to verify...
    return true;
  }
  return 'The code should be a 6 digit number.';
});
