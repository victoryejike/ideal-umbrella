import axios from 'axios';
import router from '@/router';
import store from '@/store';

const DOMAIN_NAME = process.env.API_DOMAIN_NAME || 'api.fanschain.net';
const VERSION = process.env.API_VERSION || 'v1';
const API_BASE_URL = `https://${DOMAIN_NAME}/${VERSION}/`;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = 5000;

axios.interceptors.request.use((config) => {
  const token = store.getters['auth/apiToken'];
  if (token) {
    const { headers } = config;
    headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.error(error));

axios.interceptors.response.use((response) => Promise.resolve(response), (error) => {
  // TODO: Temporarily implementation, should check error.status === 401
  if (error?.response?.data?.error === 'Jwt expired') {
    store.dispatch('auth/logout');
    router.push({ name: 'Login', params: { errorMsg: 'Login Expried, please login again.' } });
  }
  return Promise.reject(error);
});

export default axios;
