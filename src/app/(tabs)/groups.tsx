import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { groupRepository } from '../../services/database/groupRepository';
import { Group } from '../../types';
import { Colors } from '../../constants/Theme';

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadGroups = async () => {
    setRefreshing(true);
    const data = await groupRepository.getAll();
    setGroups(data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const renderItem = ({ item }: { item: Group }) => (
    <View style={styles.card}>
      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.participantCount}>
        {item.participantIds.length} участников
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Группы", headerLargeTitle: true }} />
      <View style={styles.container}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>У вас пока нет групп</Text>
            </View>
          }
          onRefresh={loadGroups}
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
  groupName: { fontSize: 18, fontWeight: '700', color: Colors.text },
  participantCount: { fontSize: 14, color: Colors.secondaryText, marginTop: 4 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: Colors.secondaryText, fontSize: 16 },
});
