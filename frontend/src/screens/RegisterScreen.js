import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { registerUser } from '../services/authService';
import styles from '../styles/RegisterScreen.styles';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (submitting) {
      return;
    }

    try {
      if (!name || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      setSubmitting(true);

      const result = await registerUser(name, email, password);

      if (result.success) {
        Alert.alert(
          'Success',
          'Account created successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      }

    } catch (error) {
      console.log('REGISTER ERROR:', error.response?.data || error.message);

      Alert.alert(
        'Registration failed',
        error.response?.data?.message || error.message || 'Something went wrong'
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Register to start booking</Text>

      <FormInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={!submitting}
      />

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
        title="Register"
        loadingTitle="Creating account..."
        loading={submitting}
        disabled={submitting}
        onPress={handleRegister}
        style={styles.primaryButton}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        disabled={submitting}
      >
        <Text style={styles.linkText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}