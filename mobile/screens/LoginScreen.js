import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{
      const response = await fetch('http://100.89.164.11:42598/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
      });
      console.log('Mot de passe saisi :', password);
      const apiKey = response.headers.get('x-api-key');
      console.log('APIKey: ', apiKey);
      await AsyncStorage.setItem('apiKey', apiKey);
      navigation.navigate('MainApp');
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
        placeholderTextColor={theme.textSecondary}
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.background },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.text, marginBottom: 8 },
  input: { width: '100%', borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, color: theme.text, padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: theme.primary, padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: theme.secondary },
  buttonText: { color: theme.text, fontWeight: 'bold', fontSize: 16 }
});