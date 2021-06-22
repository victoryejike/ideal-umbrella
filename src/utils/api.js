import axios from './axios';

const API_SERVICES = {
  LOGIN: (params) => axios.post('auth/sign-in', params, false),
  REGISTER: (params) => axios.post('auth/sign-up', params, false),
  REQUESTOTP: (params) => axios.post('auth/request-otp', params, false),
  VERIFYFORGOTPASSWORDTOKEN: (params) => axios.post('auth/verify-forgot-password-code', params, false),
  UPDATEPASSWORD: (params) => axios.post('auth/verify-forgot-password-code', params, false),
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$api = API_SERVICES;
  },
};
