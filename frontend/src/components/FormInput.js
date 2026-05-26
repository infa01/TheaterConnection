import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  multiline = false,
  style
}) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          error && styles.inputError,
          style
        ]}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#333'
  },
  inputError: {
    borderColor: '#FF6B6B'
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top'
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginTop: 6
  }
});