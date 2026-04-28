import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Share } from 'react-native';
import { useBillStore } from '../store/useBillStore';
import { useParticipantStore } from '../store/useParticipantStore';
import { calculateParticipantTotal } from '../utils/calculations';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { billRepository } from '../services/database/billRepository';

export const SummaryScreen = () => {
  const { currentBill, resetCurrentBill } = useBillStore();
  const { sessionParticipants, clearSession } = useParticipantStore();
  const navigation = useNavigation<any>();

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
    // Save to History before resetting
    if (currentBill) {
      await billRepository.save({
        ...currentBill,
        totalCalculated: results.reduce((s, r) => s + r.total, 0),
      });
    }

    resetCurrentBill();
    clearSession();
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Итоги</Text>

        <ScrollView style={styles.list}>
          {results.map((r) => (
            <View key={r.participant.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Avatar name={r.participant.name} color={r.participant.avatarColor} />
                <Text style={styles.participantName}>{r.participant.name}</Text>
                <Text style={styles.participantTotal}>{r.total.toFixed(2)} ₽</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailText}>Позиции: {r.subtotal.toFixed(2)} ₽</Text>
                {r.tip > 0 && <Text style={styles.detailText}>Чаевые: {r.tip.toFixed(2)} ₽</Text>}
                {r.discount > 0 && <Text style={styles.detailText}>Скидка: -{r.discount.toFixed(2)} ₽</Text>}
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
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  list: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantName: { flex: 1, marginLeft: 12, fontSize: 18, fontWeight: '600' },
  participantTotal: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  details: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  detailText: { fontSize: 14, color: '#8E8E93', marginBottom: 2 },
  footer: {
    paddingTop: 16,
  },
});
