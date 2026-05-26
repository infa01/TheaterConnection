import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';

import { getShows } from '../services/showService';
import styles from '../styles/ShowsScreen.styles';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';

export default function ShowsScreen({ navigation }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchShows = async (searchValue = '') => {
    try {
      setLoading(true);

      const result = await getShows(searchValue);

      if (result.success) {
        setShows(result.data || []);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Failed to fetch shows'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleSearchChange = (text) => {
    setSearchText(text);
    fetchShows(text);
  };

  const clearSearch = () => {
    setSearchText('');
    fetchShows('');
  };

  if (loading && shows.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#BB86FC" />
        <Text style={styles.loadingText}>Loading shows...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Shows</Text>

      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        onClear={clearSearch}
        placeholder="Search by show, theatre or location..."
      />

      <FlatList
        data={shows}
        keyExtractor={(item) => item.show_id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No shows found.
          </Text>
        }
        renderItem={({ item }) => (
          <ShowCard
            show={item}
            onPress={(selectedShow) =>
              navigation.navigate('ShowDetails', { show: selectedShow })
            }
          />
        )}
      />
    </View>
  );
}