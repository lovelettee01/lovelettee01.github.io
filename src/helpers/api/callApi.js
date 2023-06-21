import axios from 'axios';
import { serverURL } from 'config';
import Log from 'helpers/logger';
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

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: serverURL,
  timeout: 10000,
  params: {},
  withCredentials: true
});

export const callApi = (isAuth = true) => {
  return callApiWrapper({ isAuth });
};

let reqInterceptor = null;
let resInterceptor = null;
export const callApiWrapper = (props = { isAuth: true, isRes: false }) => {
  Log.debug('axiosInstance Call', props);
  axiosInstance.interceptors.request.eject(reqInterceptor);
  axiosInstance.interceptors.response.eject(resInterceptor);
  if (!props.isAuth) {
    reqInterceptor = axiosInstance.interceptors.request.use(
      reqConfig,
      reqError
    );
    resInterceptor = axiosInstance.interceptors.response.use(
      resConfig,
      resError
    );
  } else {
    reqInterceptor = axiosInstance.interceptors.request.use(
      reqRefreshConfig,
      reqRefreshError
    );
    resInterceptor = axiosInstance.interceptors.response.use(
      resRefreshConfig,
      resRefreshError
    );
  }
  return axiosInstance;
};

export const setAuthrization = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else delete axiosInstance.defaults.headers.common['Authorization'];
};
