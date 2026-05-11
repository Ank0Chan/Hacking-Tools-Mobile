import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import NmapScreen from './screens/NmapScreen';
import { theme } from './theme';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
  const logout = async () => {
    await AsyncStorage.removeItem('apiKey');
    props.navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <Text style={styles.buttonText}>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Nmap')}>
        <Text style={styles.buttonText}>🔍 Nmap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout} style={{ marginTop: '0' }}>
        <Text style={{ fontSize: 16, color: 'red' }}>🚪 Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Nmap" component={NmapScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: theme.background },
  buttonText: { color: theme.text, fontWeight: 'bold', fontSize: 16, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 30 },
});