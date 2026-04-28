import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useBillStore } from '../store/useBillStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigation } from '@react-navigation/native';

export const TipScreen = () => {
  const { currentBill, setTip, setDiscount } = useBillStore();
  const navigation = useNavigation<any>();

  if (!currentBill) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Дополнительно</Text>

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

        <View style={styles.footer}>
          <Button title="Посчитать итоги" onPress={() => navigation.navigate('Summary')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#8E8E93', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C7C7CC',
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: { fontSize: 14, color: '#000' },
  chipTextActive: { color: '#fff' },
  footer: { flex: 1, justifyContent: 'flex-end' },
});
