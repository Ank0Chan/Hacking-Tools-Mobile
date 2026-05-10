import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }){

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Nmap')}>
        <Text style={styles.buttonText}>Nmap</Text>
        </TouchableOpacity>
    </View>
    );
}


const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  button: { backgroundColor: '#2E75B6', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});