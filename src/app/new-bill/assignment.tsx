import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useBillStore } from '../../store/useBillStore';
import { useParticipantStore } from '../../store/useParticipantStore';
import { AssignmentRow } from '../../components/bill/AssignmentRow';
import { Button } from '../../components/ui/Button';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../../constants/Theme';

export default function AssignmentScreen() {
  const { currentBill, assignItem, unassignItem } = useBillStore();
  const { sessionParticipants } = useParticipantStore();
  const router = useRouter();

  const allAssigned = currentBill?.items.every((item) => item.assignedTo.length > 0) || false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Кто что ел?', headerLargeTitle: true }} />
      <View style={styles.container}>
        <Text style={styles.subtitle}>Нажмите на аватарку друга под блюдом</Text>

        <ScrollView style={styles.list} contentInsetAdjustmentBehavior="automatic">
          {currentBill?.items.map((item) => (
            <AssignmentRow
              key={item.id}
              item={item}
              participants={sessionParticipants}
              onAssign={(pId) => assignItem(item.id, pId)}
              onUnassign={(pId) => unassignItem(item.id, pId)}
            />
          ))}
        </ScrollView>

        <View style={styles.footer}>
          {!allAssigned && (
            <Text style={styles.warning}>Есть нераспределенные позиции</Text>
          )}
          <Button
            title="Перейти к чаевым"
            onPress={() => router.push('/new-bill/tip')}
            disabled={!allAssigned}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingHorizontal: 16 },
  subtitle: { fontSize: 15, color: Colors.secondaryText, marginBottom: 20 },
  list: { flex: 1 },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  warning: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 13,
    fontWeight: '500',
  },
});
