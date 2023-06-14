import Cookie from 'js-cookie';
import moment from 'moment';
import { setItemToStore, removeItemToStore } from 'helpers/utils';
import { callApi, setAuthrization } from 'helpers/api/reqApi';
import Log from 'helpers/logger';

/**
 * 회원가입
 * @method POST
 * @link https://api.stoq.kr/docs#/Auth/signup_api_v1_auth_signup_post
 */
const signUp = args => {
  Log.info('[auth.service] signUp', args);
  return callApi(false).post(`/api/v1/auth/signup`, args);
};

/**
 * 로그인
 * @method POST
 * @link https://api.stoq.kr/docs#/Auth/signin_api_v1_auth_signin_post
 */
const signIn = args => {
  Log.info('[auth.service] signIn', args);
  const { remember, ...params } = args;
  return callApi(false)
    .post(`/api/v1/auth/signin?remember_auth=${remember}`, params)
    .then(res => {
      const { data } = res;
      if (data.success) {
        const accessToken = data.data.accessToken;
        setAuthrization(accessToken); //API Authorization Header 등록
        setAccessToken(accessToken); //Token 정보 저장

        //Cookie 에 RefreshToken 저장
        const refreshToken = data.data.refreshToken;
        Cookie.set('refreshToken', refreshToken, {
          secure: true,
          expires: 1,
          path: '/'
        });
      }
      return data;
    });
};

/**
 * 로그아웃
 * @method DELETE
 * @link https://api.stoq.kr/docs#/Auth/signout_api_v1_auth_signout_delete
 */
const signOut = () => {
  Log.info('[auth.service] signOut');
  const data = callApi()
    .delete(`/api/v1/auth/signout`)
    .then(res => {
      const { data } = res;
      if (data?.success) {
        setAuthrization(null); //API Authorization Header 해제
        removeAccessToken();
        Cookie.remove('refreshToken'); //refresh Token 삭제

        return data;
      }
    });
  return data;
};

/**
 * 로그인 상태 확인
 * @method GET
 * @link https://api.stoq.kr/docs#/Auth/check_auth_api_v1_auth_get
 */
const authCheck = () => {
  Log.info('[auth.service] authCheck');
  return callApi()
    .get(`/api/v1/auth`)
    .then(res => {
      Log.debug(`[auth.service] authCheck response`, res);
      return res.data;
    });
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
      moment().add(1, 'hours').format('yyyy-MM-DD HH:mm:ss')
    );
  }
};

/**
 * AccessToken 저장 및 expire Data 삭제
 * @param {string} token 토큰정보
 */
export const removeAccessToken = () => {
  removeItemToStore('accessToken');
  removeItemToStore('expiredToken');
};

const AuthService = {
  signUp,
  signIn,
  signOut,
  authCheck
};

export default AuthService;
