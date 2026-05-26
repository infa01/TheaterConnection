import React from 'react';

import {
    Text,
    StyleSheet
} from 'react-native';

export default function ShowDetailsCard({
    show
}) {
    return (
        <>
        <Text style={styles.title}>{show.title}</Text>

        <Text style={styles.meta}>Theatre: {show.theatre_name}</Text>
        <Text style={styles.meta}>Location: {show.location}</Text>
        <Text style={styles.meta}>Duration: {show.duration} minutes</Text>
        <Text style={styles.meta}>Age Rating: {show.age_rating}</Text>

        <Text style={styles.description}>{show.description}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 12
    },
    meta: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 4
    },
    description: {
        color: '#ddd',
        fontSize: 15,
        marginTop: 16,
        marginBottom: 24,
        lineHeight: 22
    }
});