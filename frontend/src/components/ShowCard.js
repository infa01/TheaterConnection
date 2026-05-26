import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

export default function ShowCard({
    show,
    onPress
}) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(show)}
        >
            <Text style={styles.cardTitle}>{show.title}</Text>

            <Text style={styles.cardText}>
                Theatre: {show.theatre_name}
            </Text>

            <Text style={styles.cardText}>
                Location: {show.location}
            </Text>

            <Text style={styles.cardText}>
                Duration: {show.duration} minutes
            </Text>

            <Text style={styles.cardText}>
                Age Rating: {show.age_rating}
            </Text>
        </TouchableOpacity>
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
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 8
    },
    cardText: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 4
    }
});