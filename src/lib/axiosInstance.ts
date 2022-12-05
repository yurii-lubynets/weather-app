import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
import { baseURL } from 'src/constants';
import axiosNormal from 'src/lib/axiosNormal';
import { isValidToken } from 'src/utils/jwt';
import { encryptStorage } from 'src/utils/secureStorage';

const API_REFRESH_TOKEN = '/api/v1/auth/refresh_token';

interface IGetNewAccessTokenResponse {
  accessToken: string;
  tokenType: string;
}

export const getNewAccessToken = (refreshToken): Promise<IGetNewAccessTokenResponse> => {
  return new Promise((resolve, reject) => {
    axiosNormal.post(API_REFRESH_TOKEN, { refreshToken }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

const responseCamelizerAxios = axios.create();
responseCamelizerAxios.defaults.timeout = 1000 * 10;

responseCamelizerAxios.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };
    newConfig.baseURL = baseURL;
    const accessToken = encryptStorage.getItem('accessToken');
    if (isValidToken(accessToken)) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      const refreshToken = encryptStorage.getItem('refreshToken');
      if (isValidToken(refreshToken)) {
        const response = await getNewAccessToken(refreshToken);
        encryptStorage.setItem('accessToken', response?.accessToken ?? '');
        config.headers.Authorization = `Bearer ${response?.accessToken}`;
      }
    }
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig;
    }
    if (newConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      return newConfig;
    }
    if (config.params) {
      newConfig.params = snakeCaseKeys(config.params);
    }
    if (config.data) {
      newConfig.data = snakeCaseKeys(config.data);
    }
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

responseCamelizerAxios.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: camelCaseKeys(response.data, { deep: true }),
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default responseCamelizerAxios;
