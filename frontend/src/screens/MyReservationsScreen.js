import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';

import {
    getMyReservations,
    cancelReservation
} from '../services/reservationService';

import ReservationCard from '../components/ReservationCard';
import styles from '../styles/MyReservationsScreen.styles';

export default function MyReservationsScreen({ navigation }) {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReservations = async () => {
        try {
        setLoading(true);

        const result = await getMyReservations();

        if (result.success) {
            setReservations(result.data || []);
        }
        } catch (error) {
        Alert.alert(
            'Error',
            error.response?.data?.message || error.message || 'Failed to fetch reservations'
        );
        } finally {
        setLoading(false);
        }
    };

    const handleCancelReservation = async (reservationId) => {
        Alert.alert(
        'Cancel Reservation',
        'Are you sure you want to cancel this reservation?',
        [
            {
            text: 'No',
            style: 'cancel'
            },
            {
            text: 'Yes, cancel',
            style: 'destructive',
            onPress: async () => {
                try {
                const result = await cancelReservation(reservationId);

                if (result.success) {
                    Alert.alert('Success', 'Reservation cancelled successfully');
                    fetchReservations();
                }
                } catch (error) {
                Alert.alert(
                    'Cancel failed',
                    error.response?.data?.message || error.message || 'Something went wrong'
                );
                }
            }
            }
        ]
        );
    };

    const handleModifyReservation = (reservation) => {
        navigation.navigate('SeatSelection', {
        showtime: {
            showtime_id: reservation.showtime_id,
            show_date: reservation.show_date,
            show_time: reservation.show_time,
            hall: reservation.hall,
            price: reservation.price
        },
        show: {
            show_id: reservation.show_id,
            title: reservation.title,
            description: reservation.description,
            duration: reservation.duration,
            age_rating: reservation.age_rating,
            theatre_id: reservation.theatre_id,
            theatre_name: reservation.theatre_name,
            location: reservation.location
        },
        reservation,
        isEditing: true
        });
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    if (loading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#BB86FC" />
            <Text style={styles.loadingText}>Loading reservations...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>My Reservations</Text>

        <FlatList
            data={reservations}
            keyExtractor={(item) => item.reservation_id.toString()}
            ListEmptyComponent={
            <Text style={styles.emptyText}>
                You have no reservations yet.
            </Text>
            }
            renderItem={({ item }) => (
            <ReservationCard
                reservation={item}
                onModify={handleModifyReservation}
                onCancel={handleCancelReservation}
            />
            )}
        />
        </View>
    );
}