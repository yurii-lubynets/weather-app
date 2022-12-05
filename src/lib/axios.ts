import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';

const responseCamelizerAxios = axios.create();

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
