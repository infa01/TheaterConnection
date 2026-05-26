import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function SeatStats({
    totalSeats,
    availableSeats,
    reservedSeats,
    selectedSeats
}) {
    return (
        <View style={styles.statsRow}>
        <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalSeats}</Text>
            <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statBox}>
            <Text style={styles.statNumber}>{availableSeats}</Text>
            <Text style={styles.statLabel}>Available</Text>
        </View>

        <View style={styles.statBox}>
            <Text style={styles.statNumber}>{reservedSeats}</Text>
            <Text style={styles.statLabel}>Reserved</Text>
        </View>

        <View style={styles.statBox}>
            <Text style={styles.statNumber}>{selectedSeats}</Text>
            <Text style={styles.statLabel}>Selected</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 22,
        width: '100%'
    },
    statBox: {
        backgroundColor: '#1e1e1e',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#333'
    },
    statNumber: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    statLabel: {
        color: '#aaa',
        fontSize: 11,
        marginTop: 4
    }
});