import { callApi } from 'helpers/api/reqApi';

/**
 * 인증 프로필정보
 * @link https://api.stoq.kr/docs#/Users/get_self_profile_api_v1_user_profile_self_get
 */
const getUserProfile = () => {
  return callApi()
    .get(`/api/v1/user/profile/self`)
    .then(res => {
      return res.data;
    });
};

const UserService = {
  getUserProfile
};

export default UserService;
