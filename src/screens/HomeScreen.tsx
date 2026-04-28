import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Раздели Счёт</Text>
      <Button
        title="Новый счёт"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40 },
});
