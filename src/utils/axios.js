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
  if (error.status === 401) {
    store.dispatch('auth/logout');
    router.push('/login');
  }
  return Promise.reject(error);
});

export default axios;
