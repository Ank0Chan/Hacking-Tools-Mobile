import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{
      const response = await fetch('http://192.168.1.157:42598/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
      });
      console.log('Mot de passe saisi :', password);
      const apiKey = response.headers.get('x-api-key');
      console.log('APIKey: ', apiKey);
      await AsyncStorage.setItem('apiKey', apiKey);
      navigation.navigate('Home');
    }
    catch (error) {
      console.log('Erreur:', error.message)
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hacking Tools Mobile</Text>

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#2E75B6', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});