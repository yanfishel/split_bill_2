import { Stack } from 'expo-router';

export default function NewBillLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Камера' }} />
    </Stack>
  );
}
