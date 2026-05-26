import { StyleSheet } from 'react-native';

const showDetailsScreenStyles = StyleSheet.create({
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
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 30
  }
});

export default showDetailsScreenStyles;