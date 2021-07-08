import store from '@/store';
import axios from './axios';

const API_SERVICES = {
  LOGIN: async (params) => {
    let response = null;
    try {
      response = (await axios.post('auth/sign-in', params, false)).data;
    } catch (error) {
      response = error?.response?.data;
    }
    return response;
  },
  IS_2FA_ENABLED: async () => {
    let response = false;
    try {
      const { data } = await axios.get('auth/is2faEnabled');
      response = (data?.data === 'true');
    } catch (error) {
      response = false;
    }
    return response;
  },
  REGISTER: (params) => axios.post('auth/sign-up', params, false),
  REQUEST_OTP: async (params) => {
    let response = null;
    try {
      response = (await axios.post('auth/request-otp', params, false)).data;
    } catch (error) {
      response = error?.response?.data;
    }
    return response;
  },
  VERIFY_FORGOT_PASSWORD_TOKEN: (params) => axios.post('auth/verify-forgot-password-code', params, false),
  UPDATE_PASSWORD: (params, token) => axios.post('auth/update-password-forgot-password', params, { headers: { Authorization: `Bearer ${token}` } }),
  RESET_PASSWORD: (params) => axios.post('auth/reset-password', params, false),
  REBIND_EMAIL: (params) => axios.post('auth/rebind-mail', params, false),
  REBIND_PHONE: (params) => axios.post('auth/rebind-phone', params, false),
  CREATENFT: (params) => axios.post('nft', params, false),
  GET_COUNTRIES: async () => {
    if (store.getters['data/countryList'].length === 0) {
      let response = null;
      try {
        response = (await axios.get('countries')).data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        const list = response.data;
        // Should do it from backend
        list.sort((a, b) => {
          if (a.dial_code != null && b.dial_code != null) {
            return a.dial_code.trim() > b.dial_code.trim() ? 1 : -1;
          }
          return -1;
        });
        store.commit('data/setCountryList', list);
        return list;
      }
    }
    return store.getters['data/countryList'];
  },
  KYC: (params) => axios.post('auth/kyc/submissions', params, false),
  GET_PROFILE: (params) => axios.get('users/profile', params, false),
  UPLOADAVATAR: (params) => axios.post('users/update-profile-avatar', params, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UPDATEPROFILE: (params) => axios.post('users/update-profile', params, false),
  GETCOLLECTIBLE: (params, type) => axios.get(`collectible/user/${params}?single=${type}`),
  GETOWNEDNFT: (params) => axios.get(`nft/owned/${params}`),
  GETONSALESNFT: () => axios.get('nft/on-sale'),
  GETOCREATEDNFT: () => axios.get('nft/created'),
  GETNFTDETAILS: (params) => axios.get(`nft/${params}`),
  GETCATEGORIES: () => axios.get('category'),
  CREATEBIDS: (params) => axios.post('bids', params, false),
  BUYNFT: (params) => axios.post('nft/buy-now', params, false),
  GETBIDS: (params) => axios.get(`bids/${params}`),
  FAKE_DATA: async (type, page) => {
    let response = null;
    if (type === 'avatar') {
      response = (await axios.get('https://tinyfac.es/api/users')).data;
    } else if (type === 'image') {
      response = (await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=25`)).data;
    }
    return response;
  },
  CHECK_TOKEN: () => {
    // Temporarily implementation, should be a OPTIONS request
    try {
      axios.post('bids');
    } catch (error) {
      //
    }
  },
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$api = API_SERVICES;
    globalProperties.$router.$api = API_SERVICES;
  },
};
