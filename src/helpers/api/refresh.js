import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';

import { serverURL } from 'config';
import { getItemFromStore } from 'helpers/utils';
import { setAccessToken } from 'apis/auth.service';

const callRefreshToken = params => {
  // 토큰 갱신 서버통신
  const respoonse = axios.post(
    `${serverURL}/api/v1/auth/token/refresh`,
    params
  );
  console.log('callRefreshToken', respoonse);
  return respoonse;
};

const refresh = async reqConfig => {
  const refreshToken = Cookie.get('refreshToken');
  const expiredToken = getItemFromStore('expiredToken');
  let accessToken = getItemFromStore('accessToken');
  console.log(`refreshResponse ${expiredToken} || ${refreshToken}`, reqConfig);

  // 토큰이 만료되었다면
  if (moment(expiredToken).diff(moment()) < 0 && refreshToken) {
    console.log('AccessTocken Expired!!!', refreshToken);
    const body = {
      refreshToken
    };

    // 토큰 갱신 서버통신
    const { data } = await callRefreshToken(body);
    accessToken = data.accessToken;
    setAccessToken(accessToken);
  }
  if (accessToken) reqConfig.headers['Authorization'] = `Bearer ${accessToken}`;
  else delete reqConfig.headers['Authorization'];

  return reqConfig;
};

const refreshErrorHandle = () => {
  Cookie.remove('refreshToken');
};

export { refresh, refreshErrorHandle };
