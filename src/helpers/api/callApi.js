import axios from 'axios';
import { serverURL } from 'config';
import { refresh, refreshErrorHandle } from './refresh';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: serverURL,
  timeout: 10000,
  params: {}
});
axiosInstance.interceptors.request.use(refresh, refreshErrorHandle);

export const setAuthrization = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else delete axiosInstance.defaults.headers.common['Authorization'];
};

export default axiosInstance;
