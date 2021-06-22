import axios from 'axios';
import router from '@/router';
import store from '@/store';

// const DOMAIN_NAME = 'api.fanschain.net';
// const VERSION = 'v1';
// const API_BASE_URL = `https://${DOMAIN_NAME}/${VERSION}/`;
const API_BASE_URL = '/api/'; // devServer proxy [for development]

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  if (localStorage && localStorage.getItem('userData')?.token) {
    const { token } = localStorage.getItem('userData');
    const { headers } = config;
    headers.Authorization = token;
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
