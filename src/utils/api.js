import axios from './axios';

const API_SERVICES = {
  LOGIN: async (params) => {
    let response = null;
    try {
      const { data } = await axios.post('auth/sign-in', params, false);
      response = data;
    } catch (error) {
      response = error?.response?.data;
    }
    return response;
  },
  IS_2FA_ENABLED: async (params) => {
    let response = false;
    try {
      const { data } = await axios.get('auth/is2faEnabled', params, false);
      response = (data?.data === 'true');
    } catch (error) {
      response = false;
    }
    return response;
  },
  REGISTER: (params) => axios.post('auth/sign-up', params, false),
  REQUEST_OTP: (params) => axios.post('auth/request-otp', params, false),
  VERIFY_FORGOT_PASSWORD_TOKEN: (params) => axios.post('auth/verify-forgot-password-code', params, false),
  UPDATE_PASSWORD: (params, token) => axios.post('auth/update-password-forgot-password', params, { headers: { Authorization: `Bearer ${token}` } }),
  RESET_PASSWORD: (params) => axios.post('auth/reset-password', params, false),
  REBIND_EMAIL: (params, token) => axios.post('auth/rebind-mail', params, false),
  REBIND_PHONE: (params, token) => axios.post('auth/rebind-phone', params, false),
  GET_COUNTRIES: (params) => axios.get('countries', params, false),
  KYC: (params) => axios.post('auth/kyc/submissions', params, false),
  GET_PROFILE: (params) => axios.get('users/profile', params, false),
  UPLOAD_AVATAR: (params) => axios.put('users/update-profile-avatar', params, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$api = API_SERVICES;
  },
};
