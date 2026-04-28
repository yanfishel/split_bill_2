import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Share } from 'react-native';
import { useBillStore } from '../../store/useBillStore';
import { useParticipantStore } from '../../store/useParticipantStore';
import { calculateParticipantTotal } from '../../utils/calculations';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Stack, useRouter } from 'expo-router';
import { billRepository } from '../../services/database/billRepository';
import { Colors } from '../../constants/Theme';

export default function SummaryScreen() {
  const { currentBill, resetCurrentBill } = useBillStore();
  const { sessionParticipants, clearSession } = useParticipantStore();
  const router = useRouter();

  if (!currentBill) return null;

  const results = sessionParticipants.map((p) => ({
    participant: p,
    ...calculateParticipantTotal(currentBill, p.id, sessionParticipants.length),
  }));

  const handleShare = async () => {
    let text = `🍽 ${currentBill.restaurantName || 'Чек'}\n\n`;
    results.forEach((r) => {
      text += `${r.participant.name}: ${r.total.toFixed(2)} ₽\n`;
    });
    text += `\n✅ Итого: ${results.reduce((s, r) => s + r.total, 0).toFixed(2)} ₽`;

    await Share.share({ message: text });
  };

  const handleFinish = async () => {
    if (currentBill) {
      await billRepository.save({
        ...currentBill,
        totalCalculated: results.reduce((s, r) => s + r.total, 0),
      });
    }

    resetCurrentBill();
    clearSession();
    router.dismissAll();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Итоги', headerLargeTitle: true }} />
      <View style={styles.container}>
        <ScrollView style={styles.list} contentInsetAdjustmentBehavior="automatic">
          {results.map((r) => (
            <View key={r.participant.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Avatar name={r.participant.name} color={r.participant.avatarColor} size={44} />
                <View style={styles.headerText}>
                  <Text style={styles.participantName}>{r.participant.name}</Text>
                  <Text style={styles.detailText}>
                    Позиции: {r.subtotal.toFixed(2)} ₽
                    {r.tip > 0 && ` • Чаевые: ${r.tip.toFixed(2)} ₽`}
                  </Text>
                </View>
                <Text style={styles.participantTotal}>{r.total.toFixed(2)} ₽</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Поделиться" onPress={handleShare} variant="secondary" />
          <Button title="Готово" onPress={handleFinish} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingHorizontal: 16 },
  list: { flex: 1 },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
  },
  participantName: { fontSize: 18, fontWeight: '700', color: Colors.text },
  detailText: { fontSize: 13, color: Colors.secondaryText, marginTop: 2 },
  participantTotal: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
});
