import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';

import { getShowtimesByShowId } from '../services/showtimeService';
import styles from '../styles/ShowDetailsScreen.styles';
import ShowDetailsCard from '../components/ShowDetailsCard';
import ShowtimeCard from '../components/ShowtimeCard';

export default function ShowDetailsScreen({ route, navigation }) {
  const { show } = route.params;

  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShowtimes = async () => {
    try {
      setLoading(true);

      const result = await getShowtimesByShowId(show.show_id);

      if (result.success) {
        setShowtimes(result.data || []);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Failed to fetch showtimes'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtimes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#BB86FC" />
        <Text style={styles.loadingText}>Loading showtimes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ShowDetailsCard show={show} />

      <Text style={styles.sectionTitle}>Available Showtimes</Text>

      <FlatList
        data={showtimes}
        keyExtractor={(item) => item.showtime_id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No showtimes available.
          </Text>
        }
        renderItem={({ item }) => (
          <ShowtimeCard
            showtime={item}
            onPress={(selectedShowtime) =>
              navigation.navigate('SeatSelection', {
                showtime: selectedShowtime,
                show
              })
            }
          />
        )}
      />
    </View>
  );
}