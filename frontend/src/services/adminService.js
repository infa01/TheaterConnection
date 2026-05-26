import API from './api';

// Shows
export const getAdminShows = async () => {
  const response = await API.get('/admin/shows');

  return response.data;
};

export const createShow = async (showData) => {
  const response = await API.post('/admin/shows', showData);

  return response.data;
};

export const activateShow = async (showId) => {
  const response = await API.patch(`/admin/shows/${showId}/activate`);

  return response.data;
};

export const deactivateShow = async (showId) => {
  const response = await API.patch(`/admin/shows/${showId}/deactivate`);

  return response.data;
};

// Showtimes
export const getAdminShowtimes = async () => {
  const response = await API.get('/admin/showtimes');

  return response.data;
};

export const createShowtime = async (showtimeData) => {
  const response = await API.post('/admin/showtimes', showtimeData);

  return response.data;
};

export const activateShowtime = async (showtimeId) => {
  const response = await API.patch(`/admin/showtimes/${showtimeId}/activate`);

  return response.data;
};

export const deactivateShowtime = async (showtimeId) => {
  const response = await API.patch(`/admin/showtimes/${showtimeId}/deactivate`);

  return response.data;
};