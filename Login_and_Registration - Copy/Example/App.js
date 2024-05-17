import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import TestingAPI from './app/components/TestingAPI';
import RegisterScreen from './app/screens/RegisterScreen';

export default function App() {
  return (
    <LoginScreen/>
    // <RegisterScreen/>
    // <TestingAPI/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
