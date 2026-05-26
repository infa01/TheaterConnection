import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { getUser } from '../services/authStorage';
import { logoutUser } from '../services/authService';
import styles from '../styles/HomeScreen.styles';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();

      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logoutUser();
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theater Reservation</Text>

      <Text style={styles.subtitle}>
        Browse shows and reserve your seats.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Shows')}
      >
        <Text style={styles.cardTitle}>Shows</Text>
        <Text style={styles.cardText}>View available theatre performances</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MyReservations')}
      >
        <Text style={styles.cardTitle}>My Reservations</Text>
        <Text style={styles.cardText}>View, modify and cancel your bookings</Text>
      </TouchableOpacity>

      {user?.role === 'admin' && (
        <TouchableOpacity
          style={styles.adminCard}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Text style={styles.cardTitle}>Admin Panel</Text>
          <Text style={styles.cardText}>Manage shows and showtimes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}