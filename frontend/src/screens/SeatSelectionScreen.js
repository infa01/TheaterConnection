import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';

import { getSeatsByShowtimeId } from '../services/seatService';

import {
    createReservation,
    updateReservation
} from '../services/reservationService';

import styles from '../styles/SeatSelectionScreen.styles';
import ShowtimeInfoCard from '../components/ShowtimeInfoCard';
import SeatStats from '../components/SeatStats';
import SeatLegend from '../components/SeatLegend';
import PrimaryButton from '../components/PrimaryButton';
import SeatGrid from '../components/SeatGrid';

export default function SeatSelectionScreen({ route, navigation }) {
    const {
        showtime,
        show,
        reservation,
        isEditing = false
    } = route.params;

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(
        isEditing && reservation?.seat_ids ? reservation.seat_ids : []
    );
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchSeats = async () => {
        try {
            setLoading(true);

            const result = await getSeatsByShowtimeId(showtime.showtime_id);

            if (result.success) {
                setSeats(result.data || []);
            }
        } catch (error) {
            Alert.alert(
                'Error',
                error.response?.data?.message || error.message || 'Failed to fetch seats'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeats();
    }, []);

    const toggleSeat = (seat) => {
        const isOwnReservedSeat =
            isEditing &&
            reservation?.seat_ids?.includes(seat.seat_id);

        if (seat.is_reserved && !isOwnReservedSeat) {
            return;
        }

        setSelectedSeats((prevSelectedSeats) => {
            const alreadySelected = prevSelectedSeats.includes(seat.seat_id);

            if (alreadySelected) {
                return prevSelectedSeats.filter(id => id !== seat.seat_id);
            }

            return [...prevSelectedSeats, seat.seat_id];
        });
    };

    const handleReservation = async () => {
        if (submitting) {
            return;
        }

        try {
            if (selectedSeats.length === 0) {
                Alert.alert('No seats selected', 'Please select at least one seat.');
                return;
            }

            setSubmitting(true);

            let result;

            if (isEditing) {
                result = await updateReservation(
                    reservation.reservation_id,
                    showtime.showtime_id,
                    selectedSeats
                );
            } else {
                result = await createReservation(
                    showtime.showtime_id,
                    selectedSeats
                );
            }

            if (result.success) {
                Alert.alert(
                    isEditing ? 'Reservation Updated' : 'Reservation Successful',
                    isEditing
                        ? 'Your reservation has been updated successfully.'
                        : 'Your reservation has been created successfully.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                if (isEditing) {
                                    navigation.navigate('MyReservations');
                                } else {
                                    setSelectedSeats([]);
                                    fetchSeats();
                                }
                            }
                        }
                    ]
                );
            }

        } catch (error) {
            Alert.alert(
                isEditing ? 'Update failed' : 'Reservation failed',
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const groupedSeats = seats.reduce((groups, seat) => {
        if (!groups[seat.seat_row]) {
            groups[seat.seat_row] = [];
        }

        groups[seat.seat_row].push(seat);
        return groups;
    }, {});

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#BB86FC" />
                <Text style={styles.loadingText}>Loading seats...</Text>
            </View>
        );
    }

    const totalSeats = seats.length;
    const reservedSeats = seats.filter(seat => seat.is_reserved).length;
    const availableSeats = totalSeats - reservedSeats;
    const totalCost = selectedSeats.length * Number(showtime.price);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {isEditing ? 'Modify Reservation' : 'Seat Selection'}
            </Text>

            <ShowtimeInfoCard
                show={show}
                showtime={showtime}
            />

            <SeatStats
                totalSeats={totalSeats}
                availableSeats={availableSeats}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats.length}
            />

            <SeatLegend />

            <PrimaryButton
                title={isEditing ? 'Update Reservation' : 'Reserve Seats'}
                loadingTitle={isEditing ? 'Updating...' : 'Reserving...'}
                loading={submitting}
                disabled={selectedSeats.length === 0 || submitting}
                onPress={handleReservation}
                style={styles.reserveButton}
            />

            <SeatGrid
                groupedSeats={groupedSeats}
                selectedSeats={selectedSeats}
                onSeatPress={toggleSeat}
                isEditing={isEditing}
                reservationSeatIds={reservation?.seat_ids || []}
            />

            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    {isEditing ? 'Updated selected seats' : 'Selected seats'}: {selectedSeats.length}
                </Text>
            </View>
        </ScrollView>
    );
}