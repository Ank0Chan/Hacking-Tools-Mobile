import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function NmapScreen() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState('');

  const scan = async () => {
    try {
      const apiKey = await AsyncStorage.getItem('apiKey');
      const response = await fetch('http://192.168.1.157:42598/nmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
        body: JSON.stringify({ ip_address: ip })
      });
      const text = await response.text();
      setResult(text);
    } catch (error) {
      console.log('Erreur: ', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nmap</Text>
      <TextInput
        style={styles.input}
        placeholder="IP ou CIDR (ex: 192.168.1.0/24)"
        value={ip}
        onChangeText={setIp}
      />
      <TouchableOpacity style={styles.button} onPress={scan}>
        <Text style={styles.buttonText}>Lancer le scan</Text>
      </TouchableOpacity>
      <Text style={styles.result}>{result}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#2E75B6', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  result: { marginTop: 20, fontFamily: 'monospace', fontSize: 12 }
});