import API from './api';

export const getShowtimesByShowId = async (showId) => {
  const response = await API.get(`/showtimes?showId=${showId}`);

  return response.data;
};