import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useParticipantStore } from '../store/useParticipantStore';
import { ParticipantChip } from '../components/participant/ParticipantChip';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { generateId } from '../utils/idGenerator';
import { getNextAvatarColor } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

export const ParticipantsScreen = () => {
  const { sessionParticipants, addParticipant, removeParticipant } = useParticipantStore();
  const [name, setName] = useState('');
  const navigation = useNavigation<any>();

  const handleAdd = () => {
    if (!name.trim()) return;
    addParticipant({
      id: generateId(),
      name: name.trim(),
      avatarColor: getNextAvatarColor(sessionParticipants.length),
    });
    setName('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Кто участвует?</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Имя участника"
            />
          </View>
          <Button title="Добавить" onPress={handleAdd} disabled={!name.trim()} />
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.label}>Список ({sessionParticipants.length}):</Text>
          <View style={styles.chipsContainer}>
            {sessionParticipants.map((p) => (
              <ParticipantChip
                key={p.id}
                participant={p}
                onRemove={() => removeParticipant(p.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Далее"
            onPress={() => navigation.navigate('Assignment')}
            disabled={sessionParticipants.length < 2}
          />
          {sessionParticipants.length < 2 && (
            <Text style={styles.hint}>Нужно минимум 2 участника</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  inputContainer: { flex: 1, marginRight: 10 },
  listContainer: { flex: 1 },
  label: { fontSize: 16, color: '#8E8E93', marginBottom: 10 },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    paddingTop: 16,
  },
  hint: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 8,
  },
});
