import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useParticipantStore } from '../../store/useParticipantStore';
import { ParticipantChip } from '../../components/participant/ParticipantChip';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { generateId } from '../../utils/idGenerator';
import { getNextAvatarColor } from '../../utils/colors';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../../constants/Theme';

export default function ParticipantsScreen() {
  const { sessionParticipants, addParticipant, removeParticipant } = useParticipantStore();
  const [name, setName] = useState('');
  const router = useRouter();

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
      <Stack.Screen options={{ title: 'Кто участвует?', headerLargeTitle: true }} />
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Имя друга"
            />
          </View>
          <View style={styles.addBtn}>
            <Button title="Добавить" onPress={handleAdd} disabled={!name.trim()} />
          </View>
        </View>

        <ScrollView style={styles.listContainer}>
          <Text style={styles.label}>Добавлено ({sessionParticipants.length})</Text>
          <View style={styles.chipsContainer}>
            {sessionParticipants.map((p) => (
              <ParticipantChip
                key={p.id}
                participant={p}
                onRemove={() => removeParticipant(p.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Перейти к распределению"
            onPress={() => router.push('/new-bill/assignment')}
            disabled={sessionParticipants.length < 2}
          />
          {sessionParticipants.length < 2 && (
            <Text style={styles.hint}>Нужно минимум 2 человека</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingHorizontal: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: { flex: 1, marginRight: 10 },
  addBtn: { marginBottom: 8 },
  listContainer: { flex: 1 },
  label: { fontSize: 15, fontWeight: '600', color: Colors.secondaryText, marginBottom: 16 },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  hint: {
    textAlign: 'center',
    color: Colors.secondaryText,
    fontSize: 13,
    marginTop: 10,
  },
});
