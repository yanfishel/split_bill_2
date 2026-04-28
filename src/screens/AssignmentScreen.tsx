import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useBillStore } from '../store/useBillStore';
import { useParticipantStore } from '../store/useParticipantStore';
import { AssignmentRow } from '../components/bill/AssignmentRow';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

export const AssignmentScreen = () => {
  const { currentBill, assignItem, unassignItem } = useBillStore();
  const { sessionParticipants } = useParticipantStore();
  const navigation = useNavigation<any>();

  const allAssigned = currentBill?.items.every((item) => item.assignedTo.length > 0) || false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Кто что ел?</Text>
          <Text style={styles.subtitle}>Нажмите на аватар, чтобы закрепить позицию</Text>
        </View>

        <ScrollView style={styles.list}>
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
            title="Далее"
            onPress={() => navigation.navigate('Tip')}
            disabled={!allAssigned}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
  list: { flex: 1 },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#C7C7CC',
  },
  warning: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 12,
  },
});
