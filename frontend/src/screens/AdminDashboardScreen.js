import React from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from '../styles/AdminDashboardScreen.styles';
import AdminDashboardCard from '../components/AdminDashboardCard';

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Manage shows and showtimes</Text>

      <AdminDashboardCard
        title="Manage Shows"
        description="View and deactivate existing shows"
        onPress={() => navigation.navigate('AdminManageShows')}
      />

      <AdminDashboardCard
        title="Manage Showtimes"
        description="Activate or deactivate show sessions"
        onPress={() => navigation.navigate('AdminManageShowtimes')}
      />

      <AdminDashboardCard
        title="Add Show"
        description="Create a new theatre performance"
        onPress={() => navigation.navigate('AdminAddShow')}
      />

      <AdminDashboardCard
        title="Add Showtime"
        description="Create a new date, hall and time session"
        onPress={() => navigation.navigate('AdminAddShowtime')}
      />
    </View>
  );
}