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
      Log.debug(`[auth.service] signIn response`, data);
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
  return callApi()
    .delete(`/api/v1/auth/signout`)
    .then(res => {
      const { data } = res;
      Log.debug(`[auth.service] signOut response`, data);
      if (data?.success) {
        setAuthrization(null); //API Authorization Header 해제
        removeAccessToken(true);
        Cookie.remove('refreshToken'); //refresh Token 삭제

        return data;
      }
    });
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
      const { data } = res;
      Log.debug(`[auth.service] authCheck response`, data);
      return data;
    });
};

/**
 * 비밀번호 변경
 * @method PUT
 * @link https://api.stoq.kr/docs#/Auth/update_password_api_v1_auth_password_change_put
 */
const passwordChange = args => {
  Log.info('[auth.service] passwordChange', args);
  return callApi()
    .put(`/api/v1/auth/password/change`, args)
    .then(res => {
      const { data } = res;
      if (data.success) {
        Log.debug(`[auth.service] passwordChange response`, data);
      }
      return data;
    });
};

/**
 * 비밀번호 변경 E-mail 전송 & 토큰 발급
 * @method PUT
 * @link https://api.stoq.kr/docs#/Auth/set_password_reset_token_api_v1_auth_password_reset_token_put
 */
const passwordResetToken = args => {
  Log.info('[auth.service] passwordResetToken', args);
  return callApi(false)
    .put(`/api/v1/auth/password/reset/token`, args)
    .then(res => {
      const { data } = res;
      if (data.success) {
        Log.debug(`[auth.service] passwordResetToken response`, data);
      }
      return data;
    });
};

/**
 * Token을 통한 새로운 비밀번호 설정
 * @method PUT
 * @link https://api.stoq.kr/docs#/Auth/reset_password_api_v1_auth_password_reset_put
 */
const passwordReset = args => {
  Log.info('[auth.service] passwordReset', args);
  const { token, ...params } = args;
  return callApi(false)
    .put(`/api/v1/auth/password/reset?token=${token}`, params)
    .then(res => {
      const { data } = res;
      if (data.success) {
        Log.debug(`[auth.service] passwordReset response`, data);
      }
      return data;
    });
};

/**
 * AccessToken 저장 및 expire Data 생성
 * @param {string} token 토큰정보
 */
export const setAccessToken = token => {
  if (token) {
    setItemToStore('accessToken', token, { isCrypto: true });
    setItemToStore(
      'expiredToken',
      moment().add(1, 'hours').format('yyyy-MM-DD HH:mm:ss')
    );
  }
};

/**
 * AccessToken 저장 및 expire Data 삭제
 * @param {boolean} isRemoveUser 유저정보삭제여부
 */
export const removeAccessToken = (isRemoveUser = false) => {
  //Local Storage Token 정보삭제
  removeItemToStore('accessToken');
  removeItemToStore('expiredToken');

  //Session Storage user 정보삭제
  if (isRemoveUser) removeItemToStore('user', sessionStorage);
};

const AuthService = {
  signUp,
  signIn,
  signOut,
  passwordChange,
  passwordResetToken,
  passwordReset,
  authCheck
};

export default AuthService;
