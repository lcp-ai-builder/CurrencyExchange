import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  resultContainer: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
});

export default styles;
