import { getDb } from './db';
import { Group, Participant } from '../../types';

export const groupRepository = {
  async create(name: string, participantIds: string[]) {
    const db = await getDb();
    const groupId = Date.now().toString();

    await db.withTransactionAsync(async () => {
      await db.runAsync(
        'INSERT INTO groups (id, name, created_at) VALUES (?, ?, ?)',
        [groupId, name, new Date().toISOString()]
      );

      for (const pId of participantIds) {
        await db.runAsync(
          'INSERT INTO group_participants (group_id, participant_id) VALUES (?, ?)',
          [groupId, pId]
        );
      }
    });

    return groupId;
  },

  async getAll(): Promise<Group[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<any>('SELECT * FROM groups ORDER BY created_at DESC');

    const groups: Group[] = [];
    for (const row of rows) {
      const pRows = await db.getAllAsync<any>(
        'SELECT participant_id FROM group_participants WHERE group_id = ?',
        [row.id]
      );
      groups.push({
        id: row.id,
        name: row.name,
        createdAt: row.created_at,
        participantIds: pRows.map(p => p.participant_id),
      });
    }
    return groups;
  },
};
