import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function HelperBox({
    title = 'Input guide',
    children
}) {
    return (
        <View style={styles.helperBox}>
            <Text style={styles.helperTitle}>{title}</Text>
            {children}
        </View>
    );
}

export function HelperText({ children }) {
    return (
        <Text style={styles.helperText}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    helperBox: {
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#8E44AD',
        borderRadius: 12,
        padding: 14,
        marginBottom: 18
    },
    helperTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 8
    },
    helperText: {
        color: '#aaa',
        fontSize: 13,
        marginBottom: 4,
        lineHeight: 18
    }
});