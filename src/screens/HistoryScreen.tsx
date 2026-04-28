import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { billRepository } from '../services/database/billRepository';
import { Bill } from '../types';
import { formatCurrency } from '../utils/currency';

export const HistoryScreen = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    const data = await billRepository.getAll();
    setBills(data);
  };

  const renderItem = ({ item }: { item: Bill }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.restaurantName}>{item.restaurantName || 'Чек'}</Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.total}>{formatCurrency(item.totalCalculated, item.currency)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>История пуста</Text>
          }
          onRefresh={loadBills}
          refreshing={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 16 },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: { fontSize: 18, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#8E8E93' },
  cardFooter: {
    alignItems: 'flex-end',
  },
  total: { fontSize: 16, fontWeight: '600', color: '#007AFF' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#8E8E93' },
});
