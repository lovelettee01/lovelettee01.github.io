import axios from 'axios';
import { serverURL } from 'config';
import { getItemFromStore, setItemToStore } from 'helpers/utils';

const TOKEN = getItemFromStore('ACCESS_TOKEN');
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + TOKEN
  },
  baseURL: serverURL,
  timeout: 10000
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: { status }
    } = error;

    const originalRequest = config;
    if (status === 403) {
      try {
        const refreshToken = getItemFromStore('refreshToken');
        const { data } = await axios.post(
          `${serverURL}/api/v1/auth/token/refresh`,
          { refreshToken }
        );
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        originalRequest.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + newAccessToken
        };
        setItemToStore('accessToken', newAccessToken);
        setItemToStore('refreshToken', newRefreshToken);
        return await axios(originalRequest);
      } catch (err) {
        new Error(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
