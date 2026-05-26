import { StyleSheet } from 'react-native';

const adminAddShowtimeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 24
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 8
    },
    subtitle: {
        color: '#aaa',
        fontSize: 16,
        marginBottom: 26
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8
    },
    pickerWrapper: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 14,
        overflow: 'hidden'
    },
    picker: {
        color: '#fff',
        backgroundColor: '#1e1e1e'
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#333'
    },
    button: {
        backgroundColor: '#8E44AD',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 50
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonDisabled: {
        opacity: 0.65
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 13,
        marginTop: -8,
        marginBottom: 10
    },
});

export default adminAddShowtimeScreenStyles;