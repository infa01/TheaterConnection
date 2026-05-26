import React from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function SeatGrid({
    groupedSeats,
    selectedSeats,
    onSeatPress,
    isEditing = false,
    reservationSeatIds = []
}) {
    const getSortedRows = () => {
        return Object.keys(groupedSeats).sort((a, b) => {
            const numberA = parseInt(a.replace(/\D/g, ''), 10);
            const numberB = parseInt(b.replace(/\D/g, ''), 10);

            const aHasNumber = !Number.isNaN(numberA);
            const bHasNumber = !Number.isNaN(numberB);

            if (aHasNumber && bHasNumber) {
                return numberA - numberB;
            }

            return a.localeCompare(b);
        });
    };

    const isOwnReservedSeat = (seat) => {
        return (
            isEditing &&
            reservationSeatIds.includes(seat.seat_id)
        );
    };

    const isSeatDisabled = (seat) => {
        return !!seat.is_reserved && !isOwnReservedSeat(seat);
    };

    const getSeatStyle = (seat) => {
    const baseStyle = [styles.seat];

    if (seat.category === 'premium') {
      baseStyle.push(styles.premiumSeat);
    }

    if (selectedSeats.includes(seat.seat_id)) {
      baseStyle.push(styles.selectedSeat);
      return baseStyle;
    }

    if (seat.is_reserved) {
      baseStyle.push(styles.reservedSeat);
      return baseStyle;
    }

    baseStyle.push(styles.availableSeat);
    return baseStyle;
  };

    return (
        <>
        {getSortedRows().map((row) => (
            <View key={row} style={styles.rowContainer}>
            <Text style={styles.rowLabel}>{row}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {groupedSeats[row].map((seat) => (
                <TouchableOpacity
                    key={seat.seat_id}
                    style={getSeatStyle(seat)}
                    onPress={() => onSeatPress(seat)}
                    disabled={isSeatDisabled(seat)}
                >
                    <Text style={styles.seatText}>
                    {seat.seat_number}
                    </Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
            </View>
        ))}
        </>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        marginBottom: 12
    },
    rowLabel: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 6
    },
    seat: {
        width: 32,
        height: 32,
        borderRadius: 8,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    availableSeat: {
        backgroundColor: '#3a3a3a'
    },
    selectedSeat: {
        backgroundColor: '#8E44AD'
    },
    reservedSeat: {
        backgroundColor: '#8B0000'
    },
    premiumSeat: {
        borderWidth: 2,
        borderColor: '#D4AF37'
    },
    seatText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    }
});