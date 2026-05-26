import API from './api';

export const getMyReservations = async () => {
  const response = await API.get('/reservations/user');

  return response.data;
};

export const createReservation = async (showtimeId, seatIds) => {
  const response = await API.post('/reservations', {
    showtime_id: showtimeId,
    seat_ids: seatIds
  });

  return response.data;
};

export const updateReservation = async (reservationId, showtimeId, seatIds) => {
  const response = await API.put(`/reservations/${reservationId}`, {
    showtime_id: showtimeId,
    seat_ids: seatIds
  });

  return response.data;
};

export const cancelReservation = async (reservationId) => {
  const response = await API.delete(`/reservations/${reservationId}`);

  return response.data;
};