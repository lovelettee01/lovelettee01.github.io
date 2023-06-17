import { callApi } from 'helpers/api/reqApi';
import { setItemToStore } from 'helpers/utils';
import { removeAccessToken } from 'apis/auth.service';
import Log from 'helpers/logger';

/**
 * 인증 프로필정보
 * @link https://api.stoq.kr/docs#/Users/get_self_profile_api_v1_user_profile_self_get
 */
const getUserProfile = () => {
  Log.info('[user.service] getUserProfile');
  return callApi()
    .get(`/api/v1/user/profile/self`)
    .then(res => {
      const { data } = res;
      Log.debug(`[user.service] getUserProfile response`, data);
      if (data.success) {
        //세션스토리지 저장
        setItemToStore('user', JSON.stringify(data.data), {
          store: sessionStorage,
          isCrypto: true
        });
      }
      return data;
    });
};

/**
 * 인증 프로필 수정
 * @link https://api.stoq.kr/docs#/Users/update_self_profile_api_v1_user_profile_self_put
 */
const updateUserProfile = args => {
  Log.info('[user.service] updateUserProfile', args);
  return callApi()
    .put(`/api/v1/user/profile/self`, args)
    .then(res => {
      const { data } = res;
      Log.debug(`[user.service] updateUserProfile response`, data);
      if (data.success) {
        //기존 세션정보 update
        setItemToStore('user', JSON.stringify(data.data), {
          store: sessionStorage,
          isCrypto: true
        });
      }
      return data;
    });
};

/**
 * 프로필 삭제(탈퇴)
 * @link https://api.stoq.kr/docs#/Users/withdraw_self_api_v1_user_withdrawal_delete
 */
const withdrawalUser = () => {
  Log.info('[user.service] withdrawalUser');
  return callApi()
    .delete(`/api/v1/user/withdrawal`)
    .then(res => {
      const { data } = res;
      Log.debug(`[user.service] withdrawalUser response`, data);

      removeAccessToken(true);
      return data;
    });
};

const UserService = {
  getUserProfile,
  updateUserProfile,
  withdrawalUser
};

export default UserService;
