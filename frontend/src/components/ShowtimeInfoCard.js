import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function ShowtimeInfoCard({
    show,
    showtime
}) {
    return (
        <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{show.title}</Text>

        <Text style={styles.infoText}>
            Date: {new Date(showtime.show_date).toDateString()}
        </Text>

        <Text style={styles.infoText}>
            Time: {showtime.show_time}
        </Text>

        <Text style={styles.infoText}>
            Hall: {showtime.hall}
        </Text>

        <Text style={styles.infoText}>
            Price: €{showtime.price}
        </Text>

        <Text style={styles.infoText}>
            Category: {show.age_rating}
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoCard: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#333',
        width: '100%',
        alignSelf: 'stretch',
        marginBottom: 16
    },
    infoTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    infoText: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 4
    }
});