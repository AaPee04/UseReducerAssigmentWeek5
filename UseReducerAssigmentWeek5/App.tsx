import { Text, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TodoScreen from './src/screens/TodoScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>TODO LIST</Text>
        <TodoScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0400ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
});
