import axios from './axios';

const API_SERVICES = {
  LOGIN: (params) => axios.post('auth/sign-in', params, false),
  REGISTER: (params) => axios.post('auth/sign-up', params, false),
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$api = API_SERVICES;
  },
};
