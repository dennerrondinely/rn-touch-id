import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginScreen = () => {
  const [error, setError] = useState(false);

  const onFaceId = async () => {
    try {
      setError(false);

      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error('No Faces / Fingers found.');
      }

      // Authenticate user
      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        console.log('entrou!!');
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onFaceId}>
        <Text style={styles.text}>Entrar</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>Falha de autenticação</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F6BE00',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 32,
  },
  text: {
    color: '#383014',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default LoginScreen;
