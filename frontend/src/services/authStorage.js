import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export const saveAccessToken = async (accessToken) => {
  return SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = async () => {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = async () => {
  return SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
};

export const saveRefreshToken = async (refreshToken) => {
  return SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
};

export const getRefreshToken = async () => {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = async () => {
  return SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
};

// Backward-compatible aliases
export const saveToken = saveAccessToken;
export const getToken = getAccessToken;
export const removeToken = removeAccessToken;

export const saveUser = async (user) => {
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const storedUser = await AsyncStorage.getItem(USER_KEY);

  return storedUser ? JSON.parse(storedUser) : null;
};

export const removeUser = async () => {
  return AsyncStorage.removeItem(USER_KEY);
};

export const clearAuthStorage = async () => {
  await removeAccessToken();
  await removeRefreshToken();
  await removeUser();
};