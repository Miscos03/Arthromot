import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valueText: {
    fontSize: 14,
    marginTop: 5,
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
