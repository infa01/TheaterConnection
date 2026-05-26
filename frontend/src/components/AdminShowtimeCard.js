import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import PrimaryButton from './PrimaryButton';

export default function AdminShowtimeCard({
    showtime,
    onActivate,
    onDeactivate
}) {
    const isActive = showtime.status === 'active';

    return (
        <View style={styles.card}>
        <Text style={styles.showTitle}>
            {showtime.title}
        </Text>

        <Text style={styles.text}>
            Theatre: {showtime.theatre_name}
        </Text>

        <Text style={styles.text}>
            Hall: {showtime.hall}
        </Text>

        <Text style={styles.text}>
            Date: {new Date(showtime.show_date).toDateString()}
        </Text>

        <Text style={styles.text}>
            Time: {showtime.show_time}
        </Text>

        <Text style={styles.text}>
            Price: €{showtime.price}
        </Text>

        <Text
            style={[
            styles.status,
            isActive ? styles.activeStatus : styles.inactiveStatus
            ]}
        >
            Status: {showtime.status}
        </Text>

        <PrimaryButton
            title={isActive ? 'Deactivate Showtime' : 'Activate Showtime'}
            variant={isActive ? 'danger' : 'success'}
            onPress={() =>
                isActive
                    ? onDeactivate(showtime.showtime_id)
                    : onActivate(showtime.showtime_id)
            }
            style={styles.actionButton}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 14,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333'
    },
    showTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12
    },
    text: {
        color: '#ccc',
        marginBottom: 6,
        fontSize: 15
    },
    status: {
        marginTop: 8,
        fontWeight: 'bold'
    },
    activeStatus: {
        color: '#2ECC71'
    },
    inactiveStatus: {
        color: '#E67E22'
    },
    actionButton: {
        marginTop: 18
    }
});