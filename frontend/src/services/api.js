import axios from 'axios';

import {
  getAccessToken,
  saveAccessToken,
  getRefreshToken,
  clearAuthStorage
} from './authStorage';

const API = axios.create({
  baseURL: 'http://192.168.2.14:5000'
});

API.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/register') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          await clearAuthStorage();
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(
          `${API.defaults.baseURL}/auth/refresh`,
          {
            refreshToken
          }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        await saveAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (refreshError) {
        await clearAuthStorage();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;