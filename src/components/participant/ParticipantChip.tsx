import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Participant } from '../../types';
import { Avatar } from '../ui/Avatar';
import Icon from 'react-native-vector-icons/Ionicons';

interface ParticipantChipProps {
  participant: Participant;
  onRemove?: () => void;
}

export const ParticipantChip = ({ participant, onRemove }: ParticipantChipProps) => (
  <View style={styles.container}>
    <Avatar name={participant.name} color={participant.avatarColor} size={32} />
    <Text style={styles.name} numberOfLines={1}>{participant.name}</Text>
    {onRemove && (
      <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
        <Icon name="close-circle" size={20} color="#8E8E93" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingRight: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  name: {
    marginLeft: 8,
    fontSize: 14,
    maxWidth: 100,
  },
  removeBtn: {
    marginLeft: 4,
  },
});
