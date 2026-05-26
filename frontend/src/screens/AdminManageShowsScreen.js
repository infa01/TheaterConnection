import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    Alert
} from 'react-native';

import {
    getAdminShows,
    activateShow,
    deactivateShow
} from '../services/adminService';

import styles from '../styles/AdminManageShowsScreen.styles';
import AdminShowCard from '../components/AdminShowCard';

export default function AdminManageShowsScreen() {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    try {
      const result = await getAdminShows();

      if (result.success) {
        setShows(result.data || []);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Failed to fetch shows'
      );
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleDeactivateShow = async (showId) => {
    Alert.alert(
      'Deactivate Show',
      'Are you sure you want to deactivate this show?',
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
              const result = await deactivateShow(showId);

              if (result.success) {
                fetchShows();
              }
            } catch (error) {
              Alert.alert(
                'Error',
                error.response?.data?.message || error.message || 'Failed to deactivate show'
              );
            }
          }
        }
      ]
    );
  };

  const handleActivateShow = async (showId) => {
    try {
      const result = await activateShow(showId);

      if (result.success) {
        fetchShows();
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Failed to activate show'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Shows</Text>

      <FlatList
        data={shows}
        keyExtractor={(item) => item.show_id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No shows found.
          </Text>
        }
        renderItem={({ item }) => (
          <AdminShowCard
            show={item}
            onActivate={handleActivateShow}
            onDeactivate={handleDeactivateShow}
          />
        )}
      />
    </View>
  );
}