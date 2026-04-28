import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useBillStore } from '../store/useBillStore';
import { BillItemEditable } from '../components/bill/BillItemEditable';
import { Button } from '../components/ui/Button';
import { generateId } from '../utils/idGenerator';
import { useNavigation } from '@react-navigation/native';

export const OCRReviewScreen = () => {
  const { currentBill, updateItem, addItem, removeItem } = useBillStore();
  const navigation = useNavigation<any>();

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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Проверьте позиции</Text>
          {currentBill?.restaurantName && (
            <Text style={styles.subtitle}>{currentBill.restaurantName}</Text>
          )}
        </View>

        <ScrollView style={styles.itemList}>
          {currentBill?.items.map((item) => (
            <BillItemEditable
              key={item.id}
              item={item}
              onUpdate={(updates) => updateItem(item.id, updates)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
          <Button title="+ Добавить вручную" onPress={handleAddNew} variant="ghost" />
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Итого:</Text>
            <Text style={[styles.totalValue, isDiscrepancy && styles.discrepancyText]}>
              {totalPrice.toFixed(2)} ₽
            </Text>
          </View>
          {isDiscrepancy && (
            <Text style={styles.warningText}>
              Внимание: сумма позиций отличается от итога в чеке ({currentBill?.totalRaw?.toFixed(2)} ₽)
            </Text>
          )}
          <Button
            title="Далее"
            onPress={() => navigation.navigate('Participants')}
            disabled={(currentBill?.items.length || 0) === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#8E8E93', marginTop: 4 },
  itemList: { flex: 1 },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#C7C7CC',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: { fontSize: 18, fontWeight: '600' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  discrepancyText: { color: '#FF9500' },
  warningText: {
    color: '#FF9500',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});
