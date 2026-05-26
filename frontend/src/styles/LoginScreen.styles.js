import { StyleSheet } from 'react-native';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 32
  },
  primaryButton: {
    marginTop: 8,
    marginBottom: 20
  },

  linkText: {
    color: '#BB86FC',
    textAlign: 'center'
  }
});

export default loginScreenStyles;