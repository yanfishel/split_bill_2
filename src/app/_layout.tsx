import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-bill"
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack>
  );
}
