import { callApi } from 'helpers/api/reqApi';
import Log from 'helpers/logger';
import { serialiseObject } from '../helpers/utils';

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
  postListSelf
};

export default PostService;
