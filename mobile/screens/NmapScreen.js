import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { theme } from '../theme';

export default function NmapScreen({ navigation }) {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState('');

  const scan = async () => {
    try {
      const apiKey = await AsyncStorage.getItem('apiKey');
      const response = await fetch('http://100.89.164.11:42598/nmap', {
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
    <View style={{ flex: 1 }}>
        <View style={{ width: '100%', alignItems: 'flex-start', backgroundColor: theme.background }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Text style={{ fontSize: 28, padding: 15, marginTop:15 , color: theme.text }}>☰</Text>
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: theme.background }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.background },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.text, marginBottom: 8 },
  input: { width: '100%', borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, color: theme.text, padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: theme.primary, padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: theme.secondary },
  buttonText: { color: theme.text, fontWeight: 'bold', fontSize: 16 },
  result: { color: theme.text, marginTop: 20, fontFamily: 'monospace', fontSize: 12 }
});
