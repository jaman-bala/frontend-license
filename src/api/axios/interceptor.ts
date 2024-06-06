import axios from 'axios';
import { RootState } from '../../utils/redux/store';

const setupAxiosInterceptors = (getState: () => RootState) => {
  axios.interceptors.request.use((config) => {
    const state = getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};

export default setupAxiosInterceptors;
