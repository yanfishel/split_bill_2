import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { billRepository } from '../../services/database/billRepository';
import { Bill } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Colors } from '../../constants/Theme';

export default function HistoryScreen() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBills = async () => {
    setRefreshing(true);
    const data = await billRepository.getAll();
    setBills(data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadBills();
  }, []);

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
      <Stack.Screen options={{ title: "История", headerLargeTitle: true }} />
      <View style={styles.container}>
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>История пуста</Text>
            </View>
          }
          onRefresh={loadBills}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  listContent: { padding: 16 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: { fontSize: 18, fontWeight: '700', color: Colors.text },
  date: { fontSize: 14, color: Colors.secondaryText },
  cardFooter: {
    alignItems: 'flex-end',
  },
  total: { fontSize: 16, fontWeight: '600', color: Colors.primary },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: Colors.secondaryText, fontSize: 16 },
});
