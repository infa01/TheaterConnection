import { StyleSheet } from 'react-native';

const adminAddShowScreenStyles = StyleSheet.create({
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
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#333'
    },
    textArea: {
        height: 110,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#8E44AD',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 50
    },
    buttonDisabled: {
        opacity: 0.65
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default adminAddShowScreenStyles;