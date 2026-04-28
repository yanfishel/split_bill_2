import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useBillStore } from '../../store/useBillStore';
import { BillItemEditable } from '../../components/bill/BillItemEditable';
import { Button } from '../../components/ui/Button';
import { generateId } from '../../utils/idGenerator';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../../constants/Theme';

export default function ReviewScreen() {
  const { currentBill, updateItem, addItem, removeItem } = useBillStore();
  const router = useRouter();

  const handleAddNew = () => {
    addItem({
      id: generateId(),
      name: '',
      quantity: 1,
      price: 0,
      totalPrice: 0,
      assignedTo: [],
    });
  };

  const totalPrice = currentBill?.items.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  const isDiscrepancy = currentBill?.totalRaw !== 0 && Math.abs(totalPrice - (currentBill?.totalRaw || 0)) > 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Проверка позиций', headerLargeTitle: true }} />
      <View style={styles.container}>
        {currentBill?.restaurantName && (
          <Text style={styles.subtitle}>{currentBill.restaurantName}</Text>
        )}

        <ScrollView style={styles.itemList} contentInsetAdjustmentBehavior="automatic">
          {currentBill?.items.map((item) => (
            <BillItemEditable
              key={item.id}
              item={item}
              onUpdate={(updates) => updateItem(item.id, updates)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
          <View style={styles.addBtnContainer}>
            <Button title="+ Добавить позицию" onPress={handleAddNew} variant="ghost" />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Распознано:</Text>
            <Text style={[styles.totalValue, isDiscrepancy && styles.discrepancyText]}>
              {totalPrice.toFixed(2)} ₽
            </Text>
          </View>
          {isDiscrepancy && (
            <Text style={styles.warningText}>
              Сумма отличается от итога в чеке ({currentBill?.totalRaw?.toFixed(2)} ₽)
            </Text>
          )}
          <Button
            title="Продолжить"
            onPress={() => router.push('/new-bill/participants')}
            disabled={(currentBill?.items.length || 0) === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingHorizontal: 16 },
  subtitle: { fontSize: 16, color: Colors.secondaryText, marginBottom: 16 },
  itemList: { flex: 1 },
  addBtnContainer: { marginTop: 10 },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    backgroundColor: Colors.surface,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: { fontSize: 18, fontWeight: '600', color: Colors.text },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  discrepancyText: { color: Colors.warning },
  warningText: {
    color: Colors.warning,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
});
