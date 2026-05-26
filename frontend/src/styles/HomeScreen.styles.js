import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#121212'
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 30
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333'
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },
  cardText: {
    color: '#aaa',
    fontSize: 14
  },
  adminCard: {
    backgroundColor: '#2A1B3D',
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#8E44AD'
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 40,
    backgroundColor: '#8B0000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default homeScreenStyles;