import API from './api';

import {
  saveAccessToken,
  saveRefreshToken,
  saveUser,
  getRefreshToken,
  clearAuthStorage
} from './authStorage';

export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', {
    email,
    password
  });

  if (response.data.success) {
    await saveAccessToken(response.data.accessToken);
    await saveRefreshToken(response.data.refreshToken);

    if (response.data.user) {
      await saveUser(response.data.user);
    }
  }

  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await API.post('/auth/register', {
    name,
    email,
    password
  });

  return response.data;
};

export const logoutUser = async () => {
  const refreshToken = await getRefreshToken();

  try {
    if (refreshToken) {
      await API.post('/auth/logout', {
        refreshToken
      });
    }
  } catch (error) {
    console.log('Logout API error:', error.response?.data || error.message);
  }

  await clearAuthStorage();

  return {
    success: true
  };
};