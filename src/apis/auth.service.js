import callApi, { setAuthrization } from 'helpers/api/callApi';
import Cookie from 'js-cookie';
import moment from 'moment';
import { setItemToStore } from 'helpers/utils';

/**
 * 회원가입
 * @method POST
 * @link https://api.stoq.kr/docs#/Auth/signup_api_v1_auth_signup_post
 */
const signUp = args => {
  return callApi.post(`/api/v1/auth/signup`, args);
};

/**
 * 로그인
 * @method POST
 * @link https://api.stoq.kr/docs#/Auth/signin_api_v1_auth_signin_post
 */
const signIn = args => {
  const { remember, ...params } = args;
  console.log('auth.service', args, remember, params);
  return callApi
    .post(`/api/v1/auth/signin?remember_auth=${remember}`, params)
    .then(res => {
      const resData = res.data;
      if (resData.success) {
        const accessToken = resData.data.accessToken;
        setAuthrization(accessToken); //Api Header 등록
        setAccessToken(accessToken);

        const refreshToken = resData.data.refreshToken;
        Cookie.set('refreshToken', refreshToken, { expires: 1, path: '/' });
      }
      return resData;
    });
};

/**
 * 로그아웃
 * @method DELETE
 * @link https://api.stoq.kr/docs#/Auth/signout_api_v1_auth_signout_delete
 */
const signOut = () => {
  const data = callApi.delete(`/api/v1/auth/signout`);
  return data;
};

/**
 * AccessToken 저장 및 expire Data 생성
 * @param {string} token 토큰정보
 */
export const setAccessToken = token => {
  if (token) {
    setItemToStore('accessToken', token);
    setItemToStore(
      'expiredToken',
      moment().add(1, 'minute').format('yyyy-MM-DD HH:mm:ss')
    );
  }
};

const AuthService = {
  signUp,
  signIn,
  signOut
};

export default AuthService;
