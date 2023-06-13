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

const publicApi = axios.create(axiosOptions);
publicApi.interceptors.request.use(reqConfig, reqError);
publicApi.interceptors.response.use(resConfig, resError);

const privateApi = axios.create(axiosOptions);
privateApi.interceptors.request.use(reqRefreshConfig, reqRefreshError);
privateApi.interceptors.response.use(resRefreshConfig, resRefreshError);

export const callApi = (isAuth = true) => {
  if (!isAuth) return publicApi;
  return privateApi;
};

export const setAuthrization = token => {
  if (token) {
    privateApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else delete privateApi.defaults.headers.common['Authorization'];
};
