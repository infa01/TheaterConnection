import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  Alert
} from 'react-native';

import {
  getAdminShowtimes,
  activateShowtime,
  deactivateShowtime
} from '../services/adminService';

import AdminShowtimeCard from '../components/AdminShowtimeCard';
import styles from '../styles/AdminManageShowtimesScreen.styles';

export default function AdminManageShowtimesScreen() {
    const [showtimes, setShowtimes] = useState([]);

    const fetchShowtimes = async () => {
        try {
        const result = await getAdminShowtimes();

        if (result.success) {
            setShowtimes(result.data || []);
        }
        } catch (error) {
        console.log('Fetch showtimes error:', error.response?.data || error.message);

        Alert.alert(
            'Error',
            error.response?.data?.message || error.message || 'Failed to fetch showtimes'
        );
        }
    };

    useEffect(() => {
        fetchShowtimes();
    }, []);

    const handleDeactivateShowtime = async (showtimeId) => {
        Alert.alert(
        'Deactivate Showtime',
        'Are you sure you want to deactivate this showtime?',
        [
            {
            text: 'Cancel',
            style: 'cancel'
            },
            {
            text: 'Deactivate',
            style: 'destructive',
            onPress: async () => {
                try {
                const result = await deactivateShowtime(showtimeId);

                if (result.success) {
                    fetchShowtimes();
                }
                } catch (error) {
                Alert.alert(
                    'Error',
                    error.response?.data?.message || error.message || 'Failed to deactivate showtime'
                );
                }
            }
            }
        ]
        );
    };

    const handleActivateShowtime = async (showtimeId) => {
        try {
        const result = await activateShowtime(showtimeId);

        if (result.success) {
            fetchShowtimes();
        }
        } catch (error) {
        Alert.alert(
            'Error',
            error.response?.data?.message || error.message || 'Failed to activate showtime'
        );
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            Manage Showtimes
        </Text>

        <FlatList
            data={showtimes}
            keyExtractor={(item) => item.showtime_id.toString()}
            ListEmptyComponent={
            <Text style={styles.emptyText}>
                No showtimes found.
            </Text>
            }
            renderItem={({ item }) => (
            <AdminShowtimeCard
                showtime={item}
                onActivate={handleActivateShowtime}
                onDeactivate={handleDeactivateShowtime}
            />
            )}
        />
        </View>
    );
}