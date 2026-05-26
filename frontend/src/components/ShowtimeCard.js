import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

export default function ShowtimeCard({
    showtime,
    onPress
}) {
    return (
        <TouchableOpacity
            style={styles.showtimeCard}
            onPress={() => onPress(showtime)}
        >
            <Text style={styles.showtimeTitle}>
                {new Date(showtime.show_date).toDateString()}
            </Text>

            <Text style={styles.showtimeText}>Time: {showtime.show_time}</Text>
            <Text style={styles.showtimeText}>Hall: {showtime.hall}</Text>
            <Text style={styles.showtimeText}>Price: €{showtime.price}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    showtimeCard: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333'
    },
    showtimeTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 6
    },
    showtimeText: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 3
    }
});