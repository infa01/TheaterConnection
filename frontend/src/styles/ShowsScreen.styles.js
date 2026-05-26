import { StyleSheet } from 'react-native';

const showsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212'
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16
  }
});

export default showsScreenStyles;