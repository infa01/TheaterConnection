import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import PrimaryButton from './PrimaryButton';

export default function ReservationCard({
    reservation,
    onModify,
    onCancel
}) {
    return (
        <View style={styles.card}>
        <Text style={styles.cardTitle}>
            {reservation.title}
        </Text>

        <Text style={styles.cardText}>
            Theatre: {reservation.theatre_name}
        </Text>

        <Text style={styles.cardText}>
            Date: {new Date(reservation.show_date).toDateString()}
        </Text>

        <Text style={styles.cardText}>
            Time: {reservation.show_time}
        </Text>

        <Text style={styles.cardText}>
            Hall: {reservation.hall}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.cardText}>
            Seats Reserved: {reservation.seat_count}
        </Text>

        <Text style={styles.cardText}>
            Booked Seats: {reservation.booked_seats}
        </Text>

        <Text style={styles.totalCost}>
            Total Cost: €{reservation.total_cost}
        </Text>

        <Text style={styles.status}>
            Status: {reservation.status}
        </Text>

        <PrimaryButton
            title="Modify Reservation"
            onPress={() => onModify(reservation)}
            style={styles.modifyButton}
        />

        <PrimaryButton
            title="Cancel Reservation"
            onPress={() => onCancel(reservation.reservation_id)}
            variant="danger"
            style={styles.cancelButton}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        padding: 18,
        borderRadius: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#333'
    },
    cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8
    },
    cardText: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 4
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 12
    },
    totalCost: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8
    },
    status: {
        color: '#BB86FC',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8
    },
    modifyButton: {
        marginTop: 16
    },
    cancelButton: {
        marginTop: 10
    }
});