import { callApi } from 'helpers/api/reqApi';
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
      return data;
    });
};

/**
 * 인증 프로필 수정
 * @link https://api.stoq.kr/docs#/Users/update_self_profile_api_v1_user_profile_self_put
 */
const updateUserProfile = () => {
  Log.info('[user.service] updateUserProfile');
  return callApi()
    .put(`/api/v1/user/profile/self`)
    .then(res => {
      const { data } = res;
      return data;
    });
};

const UserService = {
  getUserProfile,
  updateUserProfile
};

export default UserService;
