import API from './api';

export const getSeatsByShowtimeId = async (showtimeId) => {
  const response = await API.get(`/seats?showtimeId=${showtimeId}`);

  return response.data;
};