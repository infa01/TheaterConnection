import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

export default function AdminDashboardCard({
    title,
    description,
    onPress
}) {
    return (
        <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        >
        <Text style={styles.cardTitle}>
            {title}
        </Text>

        <Text style={styles.cardText}>
            {description}
        </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#8E44AD'
    },
    cardTitle: {
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 6
    },
    cardText: {
        color: '#aaa',
        fontSize: 14
    }
});