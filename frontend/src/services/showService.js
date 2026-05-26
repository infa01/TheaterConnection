import API from './api';

export const getShows = async (searchText = '') => {
  const endpoint = searchText.trim()
    ? `/shows?search=${encodeURIComponent(searchText.trim())}`
    : '/shows';

  const response = await API.get(endpoint);

  return response.data;
};

export const getShowById = async (showId) => {
  const response = await API.get(`/shows/${showId}`);

  return response.data;
};