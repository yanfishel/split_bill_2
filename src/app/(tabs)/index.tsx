import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { QuickActionCard } from '../../components/ui/QuickActionCard';
import { Avatar } from '../../components/ui/Avatar';
import { useBillStore } from '../../store/useBillStore';
import { Colors } from '../../constants/Theme';

export default function HomeScreen() {
  const router = useRouter();
  const { startNewBill } = useBillStore();

  const handleNewBill = () => {
    startNewBill('placeholder-uri');
    router.push('/new-bill');
  };

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <Stack.Screen
        options={{
          title: "SplitBill",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'systemMaterial',
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <Avatar name="User" color={Colors.primary} size={32} />
            </View>
          ),
        }}
      />

      <View style={styles.section}>
        <QuickActionCard
          title="Новый счёт"
          subtitle="Сканировать чек за секунду"
          icon="camera"
          onPress={handleNewBill}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Последние чеки</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>У вас пока нет активных счетов</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Группы</Text>
        <View style={styles.groupCard}>
          <Text style={styles.groupText}>Создайте свою первую группу</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: Colors.text,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  emptyText: {
    color: Colors.secondaryText,
    fontSize: 16,
  },
  groupCard: {
    padding: 20,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  groupText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
