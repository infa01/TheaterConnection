import { StyleSheet } from 'react-native';

const seatSelectionScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 18
    },
    center: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#aaa',
        marginTop: 12
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
        marginBottom: 20
    },
    costBox: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    costLabel: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 4
    },
    costValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    summary: {
        marginTop: 20,
        marginBottom: 40,
        padding: 16,
        backgroundColor: '#1e1e1e',
        borderRadius: 12
    },
    summaryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    reserveButton: {
        marginBottom: 24
    },
});

export default seatSelectionScreenStyles;