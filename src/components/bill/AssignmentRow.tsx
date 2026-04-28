import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BillItem, Participant } from '../../types';
import { Avatar } from '../ui/Avatar';

interface AssignmentRowProps {
  item: BillItem;
  participants: Participant[];
  onAssign: (participantId: string) => void;
  onUnassign: (participantId: string) => void;
}

export const AssignmentRow = ({ item, participants, onAssign, onUnassign }: AssignmentRowProps) => {
  const isAssigned = (pId: string) => item.assignedTo.some((a) => a.participantId === pId);

  return (
    <View style={[styles.container, item.assignedTo.length === 0 && styles.unassignedContainer]}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.totalPrice.toFixed(2)} ₽</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarsContainer}>
        {participants.map((p) => {
          const active = isAssigned(p.id);
          return (
            <TouchableOpacity
              key={p.id}
              onPress={() => (active ? onUnassign(p.id) : onAssign(p.id))}
              style={[styles.avatarWrapper, active && styles.avatarActive]}
            >
              <Avatar name={p.name} color={p.avatarColor} size={36} />
              {active && <View style={[styles.activeDot, { backgroundColor: p.avatarColor }]} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  unassignedContainer: {
    borderColor: '#FF3B30',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: { fontSize: 16, fontWeight: '500', flex: 1 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    marginRight: 12,
    padding: 2,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarActive: {
    borderColor: '#007AFF',
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
