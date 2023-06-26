import { callApi } from 'helpers/api/reqApi';
import Log from 'helpers/logger';
import { serialiseObject } from '../helpers/utils';

/**
 * 공개 포스트 목록조회(비로그인)
 * @method GET
 * @link https://api.stoq.kr/docs#/Post/read_posts_api_v1_post_get
 */
const postListPublic = args => {
  const params = serialiseObject(args);
  Log.info('[post.service] postListPublic', args, params);
  return callApi(false)
    .get(`/api/v1/post/public?${params}`)
    .then(res => {
      const { data } = res;
      Log.debug(`[post.service] postListPublic response`, data);
      return data;
    });
};

/**
 * 포스트 목록조회
 * @method GET
 * @link https://api.stoq.kr/docs#/Post/read_posts_api_v1_post_get
 */
const postList = args => {
  const params = serialiseObject(args);
  Log.info('[post.service] postList', args, params);
  return callApi()
    .get(`/api/v1/post?${params}`)
    .then(res => {
      const { data } = res;
      Log.debug(`[post.service] postList response`, data);
      return data;
    });
};

/**
 * 자신의 포스트 목록조회
 * @method GET
 * @link https://api.stoq.kr/docs#/Post/read_posts_api_v1_post_get
 */
const postListSelf = args => {
  const params = serialiseObject(args);
  Log.info('[post.service] postListSelf', args, params);
  return callApi()
    .get(`/api/v1/post/creator_self?${params}`)
    .then(res => {
      const { data } = res;
      Log.debug(`[post.service] postList response`, data);
      return data;
    });
};

const PostService = {
  postList,
  postListPublic,
  postListSelf
};

export default PostService;
