import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

export default function HomeScreen({ navigation }){

    return (
    <View style={{ flex: 1 }}>
        <View style={{ width: '100%', alignItems: 'flex-start', backgroundColor: theme.background }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Text style={{ fontSize: 28, padding: 15, color: theme.text }}>☰</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Nmap')}>
                <Text style={styles.buttonText}>Nmap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>En cours de dev</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', color: theme.text, marginBottom: 8 },
  button: { backgroundColor: theme.primary, padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: theme.secondary, marginBottom: 8 },
  buttonText: { color: theme.text, fontWeight: 'bold', fontSize: 16 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.background },
});