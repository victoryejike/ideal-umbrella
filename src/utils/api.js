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
      response = null;
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
  GET_NFT_LIST: async (params) => {
    let response = null;
    try {
      response = (await axios.get('nft/search', { params })).data;
    } catch (error) {
      response = error?.response?.data;
    }

    if (response?.success) {
      return response?.data;
    }
    return response;
  },
  GET_POPULAR_NFT: async () => {
    let response = null;
    try {
      response = (await axios.get('nft/top_nfts', { params: { skip: 0, limit: 4 } })).data;
    } catch (error) {
      response = [];
    }

    if (response?.success) {
      return response?.data;
    }
    return response;
  },
  GET_OWNED_NFT: async () => {
    let response = null;
    try {
      response = (await axios.get(`nft/owned/${localStorage.getItem('account')}`)).data;
    } catch (error) {
      response = error?.response?.data;
    }

    if (response?.success) {
      return response?.data;
    }
    return response;
  },
  GET_ONSALES_NFT: async () => {
    let response = null;
    try {
      response = (await axios.get('nft/on-sale')).data;
    } catch (error) {
      response = error?.response?.data;
    }

    if (response?.success) {
      return response?.data;
    }
    return response;
  },
  GET_CREATED_NFT: async () => {
    let response = null;
    try {
      response = (await axios.get('nft/created')).data;
    } catch (error) {
      response = error?.response?.data;
    }

    if (response?.success) {
      return response?.data;
    }
    return response;
  },
  GET_NFT_DETAILS: async (params) => {
    let response = null;
    if (params) {
      try {
        response = (await axios.get(`nft/${params}`)).data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        return response?.data;
      }
    }
    return response;
  },
  GET_BIDS: async (params) => {
    let response = null;
    if (params) {
      try {
        response = (await axios.get(`bids/${params}`)).data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        return response?.data;
      }
    }
    return response;
  },
  GET_TOP_SELLERS: async (method) => {
    let response = null;
    try {
      response = (await axios.get('nft/top_sellers', { params: { skip: 0, limit: 8, time: method } })).data;
    } catch (error) {
      response = error?.response?.data;
    }

    if (response?.success) {
      return response?.data;
    }
    return response;
  },
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
        store.commit('data/setCountryList', response.data);
        return response.data;
      }
    }
    return store.getters['data/countryList'];
  },
  GET_FILTER_CATEGORIES: async () => {
    if (store.getters['data/filterCategory'].length === 0) {
      let response = null;
      try {
        response = (await axios.get('category')).data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        const data = response.data.map((item) => ({ ...item, image: item.image?.replace('http://', 'https://') }));
        store.commit('data/setFilterCategory', data);
        return data;
      }
    }
    return store.getters['data/filterCategory'];
  },
  KYC: (params) => axios.post('auth/kyc/submissions', params, false),
  GET_PROFILE: (params) => axios.get('users/profile', params, false),
  UPLOADAVATAR: (params) => axios.post('users/update-profile-avatar', params, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UPDATEPROFILE: (params) => axios.post('users/update-profile', params, false),
  GETCOLLECTIBLE: (params, type) => axios.get(`collectible/user/${params}?single=${type}`),
  CREATEBIDS: (params) => axios.post('bids', params, false),
  CLOSEBID: (params) => axios.post('bids/close-bidding', params),
  BUYNFT: (params) => axios.post('nft/buy-now', params, false),
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$api = API_SERVICES;
    globalProperties.$store.$api = API_SERVICES;
  },
};
