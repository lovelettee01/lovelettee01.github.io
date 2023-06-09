import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';

import { serverURL } from 'config';
import { getItemFromStore, setItemToStore } from 'helpers/utils';

const refresh = async reqConfig => {
  const refreshToken = Cookie.get('refreshToken');
  const expireAt = getItemFromStore('expiresAt');
  let token = getItemFromStore('accessToken');

  // 토큰이 만료되었다면
  if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
    const body = {
      refreshToken
    };

    // 토큰 갱신 서버통신
    const { data } = await axios.post(
      `${serverURL}/api/v1/auth/token/refresh`,
      body
    );

    token = data.data.accessToken;
    setItemToStore('accessToken', token);
    setItemToStore(
      'expiresAt',
      moment().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss')
    );
  }

  reqConfig.headers['Authorization'] = `Bearer ${token}`;

  return reqConfig;
};

const refreshErrorHandle = () => {
  Cookie.remove('refreshToken');
};

export { refresh, refreshErrorHandle };
