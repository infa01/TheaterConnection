import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { loginUser } from '../services/authService';
import styles from '../styles/LoginScreen.styles';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (submitting) {
      return;
    }

    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      setSubmitting(true);

      const result = await loginUser(email, password);

      if (result.success) {
        navigation.replace('Home');
      }

    } catch (error) {
      console.log('LOGIN ERROR:', error.response?.data || error.message);

      Alert.alert(
        'Login failed',
        error.response?.data?.message || error.message || 'Something went wrong'
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grand Colosseum</Text>
      <Text style={styles.subtitle}>Login to get back on your seats</Text>

      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={!submitting}
      />

      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!submitting}
      />

      <PrimaryButton
        title="Login"
        loadingTitle="Logging in..."
        loading={submitting}
        disabled={submitting}
        onPress={handleLogin}
        style={styles.primaryButton}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        disabled={submitting}
      >
        <Text style={styles.linkText}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}