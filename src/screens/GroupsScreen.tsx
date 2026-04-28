import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { groupRepository } from '../services/database/groupRepository';
import { Group } from '../types';

export const GroupsScreen = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const data = await groupRepository.getAll();
    setGroups(data);
  };

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
      <View style={styles.container}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>У вас пока нет групп</Text>
          }
          onRefresh={loadGroups}
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
  groupName: { fontSize: 18, fontWeight: 'bold' },
  participantCount: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#8E8E93' },
});
