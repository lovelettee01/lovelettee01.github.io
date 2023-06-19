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

      let accessToken = '';
      if (data?.success) {
        accessToken = data.data.accessToken;
        setAccessToken(accessToken);
      } else {
        removeAccessToken();
      }
      return data;
    });
};

//요청 설정
const requestRefreshConfig = async reqConfig => {
  let accessToken = getItemFromStore('accessToken', null, { isCrypto: true });
  const expiredToken = getItemFromStore('expiredToken');
  const refreshToken = null; //Cookie.get('refreshToken');
  Log.debug(`requestRefreshConfig`, { expiredToken }, reqConfig);
  try {
    // 토큰이 만료되었다면
    if (moment(expiredToken).diff(moment()) < 0 && refreshToken) {
      Log.debug('AccessTocken Expired!!!', { refreshToken });

      // 토큰 갱신 서버통신
      const data = await callRefreshToken({ refreshToken });
      if (data?.success) {
        accessToken = data.data.accessToken;
      }
    }
    if (accessToken)
      reqConfig.headers['Authorization'] = `Bearer ${accessToken}`;
    else {
      throw new Error(`Access Token is not Exist`);
    }
  } catch (err) {
    return Promise.reject(errorStatus(err, 'request'));
  }
  return reqConfig;
};

//요청 에러 처리
const requestRefreshErrorHandle = error => {
  Log.debug(`requestRefreshErrorHandle`, error);
  return Promise.reject(errorStatus(error, 'request'));
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
        accessToken = data.data.accessToken;
        if (accessToken)
          reqConfig.headers['Authorization'] = `Bearer ${accessToken}`;

        return await axios(reqConfig);
      }
    } catch (err) {
      new Error(err);
    }
  }
  if (error?.success === false) return Promise.reject(error);
  return Promise.reject(errorStatus(error, 'response'));
};

//에러 객체 설정
const errorStatus = (error, type) => {
  try {
    const {
      [type]: {
        data: { detail },
        status,
        statusText
      }
    } = error;
    let message = '';
    if (typeof detail === 'object') message = detail[0].msg || error.message;
    else message = detail || error.message;

    return {
      status: {
        code: status,
        text: statusText
      },
      success: false,
      message: `[API Server Error] ${message}`
    };
  } catch (err) {
    return {
      status: {
        code: 500,
        text: 'Network Error'
      },
      success: false,
      message: `[Internal Server Error] ${error.message}`
    };
  }
};

export {
  requestRefreshConfig,
  requestRefreshErrorHandle,
  responseRefreshConfig,
  responseRefreshErrorHandle
};
