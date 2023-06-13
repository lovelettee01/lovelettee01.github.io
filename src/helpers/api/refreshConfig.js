import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';
import Log from 'helpers/logger';

import { callApi } from 'helpers/api/reqApi';

import { getItemFromStore } from 'helpers/utils';
import { setAccessToken, removeAccessToken } from 'apis/auth.service';

const callRefreshToken = params => {
  // 토큰 갱신 서버통신
  return callApi(false)
    .post(`/api/v1/auth/token/refresh`, params)
    .then(response => {
      Log.debug('callRefreshToken', response);
      const { data } = response;

      let success = false;
      let accessToken = '';
      if (data?.success) {
        accessToken = data.data.accessToken;
        setAccessToken(accessToken);
        success = true;
      } else {
        removeAccessToken();
        success = false;
      }
      return { success, accessToken };
    });
};

//요청 설정
const requestRefreshConfig = async request => {
  const refreshToken = Cookie.get('refreshToken');
  const expiredToken = getItemFromStore('expiredToken');
  Log.debug(`requestRefreshConfig`, { expiredToken }, request);

  let accessToken = '';
  try {
    // 토큰이 만료되었다면
    if (moment(expiredToken).diff(moment()) < 0 && refreshToken) {
      Log.debug('AccessTocken Expired!!!', { refreshToken });

      // 토큰 갱신 서버통신
      const data = await callRefreshToken({ refreshToken });
      console.log('callRefreshToken response', data);
      if (data?.success) {
        accessToken = data.accessToken;
      } else {
        throw new Error(
          errorStatus(`[Internal Server Error] Token Refresh Fail!`)
        );
      }
    }
    if (accessToken) request.headers['Authorization'] = `Bearer ${accessToken}`;
    else delete request.headers['Authorization'];
  } catch (err) {
    new Error(err);
  }
  return request;
};

//요청 에러 처리
const requestRefreshErrorHandle = error => {
  Log.debug(`requestRefreshErrorHandle`, error);
  Cookie.remove('refreshToken');
  return Promise.reject(
    errorStatus(`[Internal Server Error] ${error.message}`)
  );
};

//응답 설정
const responseRefreshConfig = response => {
  Log.debug(`responseRefreshConfig`, response);
  return response;
};

//응답 에러 처리
const responseRefreshErrorHandle = async error => {
  const reqConfig = error.config;
  const status = error.response?.status;
  const refreshToken = Cookie.get('refreshToken');
  Log.debug('responseRefreshErrorHandle', { status }, { refreshToken }, error);
  if (status === 403 && refreshToken) {
    try {
      // 토큰 갱신 서버통신
      let accessToken = '';
      const data = await callRefreshToken({ refreshToken });
      if (data?.success) {
        accessToken = data.accessToken;
      } else {
        throw new Error(
          errorStatus(`[Internal Server Error] Token Refresh Fail!`)
        );
      }

      if (accessToken)
        reqConfig.headers['Authorization'] = `Bearer ${accessToken}`;
      else delete reqConfig.headers['Authorization'];

      return await axios(reqConfig);
    } catch (err) {
      new Error(err);
    }
  }
  if (error?.success === false) return Promise.reject(error);
  return Promise.reject(
    errorStatus(`[Internal Server Error] ${error.message}`)
  );
};

const errorStatus = message => {
  const error = {
    data: {
      success: false,
      message
    }
  };
  return error;
};

export {
  requestRefreshConfig,
  requestRefreshErrorHandle,
  responseRefreshConfig,
  responseRefreshErrorHandle
};
