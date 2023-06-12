import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';
import Log from 'helpers/logger';

import { serverURL } from 'config';
import { getItemFromStore } from 'helpers/utils';
import { setAccessToken } from 'apis/auth.service';

const callRefreshToken = params => {
  // 토큰 갱신 서버통신
  const response = axios.post(`${serverURL}/api/v1/auth/token/refresh`, params);
  Log.debug('callRefreshToken', response);
  return response;
};

//요청 설정
const requestRefreshConfig = async request => {
  const refreshToken = Cookie.get('refreshToken');
  const expiredToken = getItemFromStore('expiredToken');
  let accessToken = getItemFromStore('accessToken');
  Log.debug(`requestRefreshConfig`, { expiredToken }, request);

  try {
    // 토큰이 만료되었다면
    if (moment(expiredToken).diff(moment()) < 0 && refreshToken) {
      Log.debug('AccessTocken Expired!!!', { refreshToken });

      // 토큰 갱신 서버통신
      const { data } = await callRefreshToken({ refreshToken });
      accessToken = data.accessToken;
      setAccessToken(accessToken);
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
  return Promise.reject({
    success: false,
    message: `[Internal Server Error] ${error.message}`
  });
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
  const refreshToken = getItemFromStore('refreshToken');
  Log.debug('responseRefreshErrorHandle', { status }, { refreshToken }, error);
  if (status === 403 && refreshToken) {
    try {
      // 토큰 갱신 서버통신
      const { data } = await callRefreshToken({ refreshToken });
      const accessToken = data.accessToken;
      setAccessToken(accessToken); //Token 정보 저장

      if (accessToken)
        reqConfig.headers['Authorization'] = `Bearer ${accessToken}`;
      else delete reqConfig.headers['Authorization'];

      return await axios(reqConfig);
    } catch (err) {
      new Error(err);
    }
  }
  if (error?.success === false) return Promise.reject(error);
  return Promise.reject({
    success: false,
    message: `[Internal Server Error] ${error.message}`
  });
};

export {
  requestRefreshConfig,
  requestRefreshErrorHandle,
  responseRefreshConfig,
  responseRefreshErrorHandle
};
