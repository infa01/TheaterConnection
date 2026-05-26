import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function SearchBar({
    value,
    onChangeText,
    onClear,
    placeholder = 'Search...'
}) {
    return (
        <View style={styles.searchContainer}>
        <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor="#777"
            value={value}
            onChangeText={onChangeText}
        />

        {value.length > 0 && (
            <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
            >
            <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15
    },
    clearButton: {
        marginLeft: 10,
        backgroundColor: '#BB86FC',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 10
    },
    clearButtonText: {
        color: '#121212',
        fontWeight: 'bold'
    }
});