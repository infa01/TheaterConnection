import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ShowsScreen from '../screens/ShowsScreen';
import ShowDetailsScreen from '../screens/ShowDetailsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import MyReservationsScreen from '../screens/MyReservationsScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminManageShowsScreen from '../screens/AdminManageShowsScreen';
import AdminManageShowtimesScreen from '../screens/AdminManageShowtimesScreen';
import AdminAddShowScreen from '../screens/AdminAddShowScreen';
import AdminAddShowtimeScreen from '../screens/AdminAddShowtimeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#121212'
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                contentStyle: {
                    backgroundColor: '#121212'
                }
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Register' }}
            />

            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Theater App' }}
            />

            <Stack.Screen
                name="Shows"
                component={ShowsScreen}
                options={{ title: 'Shows' }}
            />

            <Stack.Screen
                name="ShowDetails"
                component={ShowDetailsScreen}
                options={{ title: 'Show Details' }}
            />

            <Stack.Screen
                name="SeatSelection"
                component={SeatSelectionScreen}
                options={{ title: 'Select Seats' }}
            />

            <Stack.Screen
                name="MyReservations"
                component={MyReservationsScreen}
                options={{ title: 'My Reservations' }}
            />

            <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
                options={{ title: 'Admin Panel' }}
            />

            <Stack.Screen
                name="AdminManageShows"
                component={AdminManageShowsScreen}
                options={{ title: 'Manage Shows' }}
            />

            <Stack.Screen
                name="AdminManageShowtimes"
                component={AdminManageShowtimesScreen}
                options={{ title: 'Manage Showtimes' }}
            />

            <Stack.Screen
                name="AdminAddShow"
                component={AdminAddShowScreen}
                options={{ title: 'Add Show' }}
            />

            <Stack.Screen
                name="AdminAddShowtime"
                component={AdminAddShowtimeScreen}
                options={{ title: 'Add Showtime' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}