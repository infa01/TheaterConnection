import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export default function PrimaryButton({
    title,
    onPress,
    disabled = false,
    loading = false,
    loadingTitle = 'Loading...',
    variant = 'primary',
    style
}) {
    const buttonStyles = [
        styles.button,
        variant === 'danger' && styles.dangerButton,
        variant === 'success' && styles.successButton,
        disabled && styles.disabledButton,
        style
    ];

    return (
        <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled || loading}
        >
        <Text style={styles.buttonText}>
            {loading ? loadingTitle : title}
        </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8E44AD',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center'
    },
    dangerButton: {
        backgroundColor: '#8B0000'
    },
    successButton: {
        backgroundColor: '#27AE60'
    },
    disabledButton: {
        opacity: 0.65
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});