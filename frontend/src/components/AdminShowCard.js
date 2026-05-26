import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import PrimaryButton from './PrimaryButton';

export default function AdminShowCard({
  show,
  onActivate,
  onDeactivate
}) {
    const isActive = show.status === 'active';

    return (
        <View style={styles.card}>
        <Text
            style={[
            styles.status,
            isActive ? styles.activeStatus : styles.inactiveStatus
            ]}
        >
            Status: {show.status}
        </Text>

        <Text style={styles.showTitle}>{show.title}</Text>

        <Text style={styles.text}>Theatre: {show.theatre_name}</Text>
        <Text style={styles.text}>Duration: {show.duration} min</Text>
        <Text style={styles.text}>Age Rating: {show.age_rating}</Text>

        <PrimaryButton
            title={isActive ? 'Deactivate Show' : 'Activate Show'}
            variant={isActive ? 'danger' : 'success'}
            onPress={() =>
            isActive
                ? onDeactivate(show.show_id)
                : onActivate(show.show_id)
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
        fontSize: 24,
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
        marginBottom: 8,
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