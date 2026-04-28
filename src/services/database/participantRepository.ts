import { getDb } from './db';
import { Participant } from '../../types';

export const participantRepository = {
  async create(participant: Participant) {
    const db = await getDb();
    await db.runAsync(
      'INSERT INTO participants (id, name, avatar_color, created_at) VALUES (?, ?, ?, ?)',
      [participant.id, participant.name, participant.avatarColor, new Date().toISOString()]
    );
  },

  async getAll(): Promise<Participant[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<any>('SELECT * FROM participants ORDER BY name ASC');
    return rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      avatarColor: row.avatar_color,
    }));
  },

  async delete(id: string) {
    const db = await getDb();
    await db.runAsync('DELETE FROM participants WHERE id = ?', [id]);
  },
};
