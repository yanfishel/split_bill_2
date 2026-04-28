import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useBillStore } from '../../store/useBillStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../../constants/Theme';

export default function TipScreen() {
  const { currentBill, setTip, setDiscount } = useBillStore();
  const router = useRouter();

  if (!currentBill) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Дополнительно', headerLargeTitle: true }} />
      <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Чаевые (%)</Text>
          <View style={styles.chipRow}>
            {[0, 5, 10, 15, 20].map((val) => (
              <TouchableOpacity
                key={val}
                style={[styles.chip, currentBill.tipValue === val && styles.chipActive]}
                onPress={() => setTip('percent', val, currentBill.tipDistribution)}
              >
                <Text style={[styles.chipText, currentBill.tipValue === val && styles.chipTextActive]}>
                  {val}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Распределение чаевых</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, currentBill.tipDistribution === 'proportional' && styles.chipActive]}
              onPress={() => setTip(currentBill.tipType, currentBill.tipValue, 'proportional')}
            >
              <Text style={[styles.chipText, currentBill.tipDistribution === 'proportional' && styles.chipTextActive]}>
                Пропорционально
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, currentBill.tipDistribution === 'equal' && styles.chipActive]}
              onPress={() => setTip(currentBill.tipType, currentBill.tipValue, 'equal')}
            >
              <Text style={[styles.chipText, currentBill.tipDistribution === 'equal' && styles.chipTextActive]}>
                Поровну
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Скидка (фиксированная сумма)</Text>
          <Input
            value={currentBill.discountValue.toString()}
            onChangeText={(text) => setDiscount('fixed', parseFloat(text) || 0)}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Посчитать итоги" onPress={() => router.push('/new-bill/summary')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 32, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.secondaryText, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.separator,
    marginRight: 10,
    marginBottom: 12,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: { fontSize: 15, color: Colors.text },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
});
