import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CounterScreen from './src/components/CounterScreen';
import TimerScreen from './src/components/TimerScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CounterScreen />
      <TimerScreen />
    </View>
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
