import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/Theme';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Настройки", headerLargeTitle: true }} />
      <Text style={styles.text}>Настройки приложения</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  text: { fontSize: 16, color: Colors.secondaryText },
});
