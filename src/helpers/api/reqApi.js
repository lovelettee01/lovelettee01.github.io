import axios from 'axios';
import { serverURL } from 'config';
import {
  requestConfig as reqConfig,
  requestErrorHandle as reqError,
  responseConfig as resConfig,
  responseErrorHandle as resError
} from './defaultConfig';

import {
  requestRefreshConfig as reqRefreshConfig,
  requestRefreshErrorHandle as reqRefreshError,
  responseRefreshConfig as resRefreshConfig,
  responseRefreshErrorHandle as resRefreshError
} from './refreshConfig';

const axiosOptions = {
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: serverURL,
  timeout: 10000,
  params: {}
};

const basic = axios.create(axiosOptions);
basic.interceptors.request.use(reqConfig, reqError);
basic.interceptors.response.use(resConfig, resError);

const auth = axios.create(axiosOptions);
auth.interceptors.request.use(reqRefreshConfig, reqRefreshError);
auth.interceptors.response.use(resRefreshConfig, resRefreshError);

export const callApi = (isAuth = true) => {
  if (!isAuth) return basic;
  return auth;
};

export const setAuthrization = token => {
  if (token) {
    auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else delete auth.defaults.headers.common['Authorization'];
};

export default { basic, auth };
