import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('splitbill.db');
  }
  return db;
};

export const initDb = async () => {
  const database = await getDb();

  await database.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS participants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      avatar_color TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS group_participants (
      group_id TEXT NOT NULL,
      participant_id TEXT NOT NULL,
      PRIMARY KEY (group_id, participant_id),
      FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
      FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bills (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      restaurant_name TEXT,
      image_uri TEXT,
      tip_type TEXT,
      tip_value REAL,
      discount_type TEXT,
      discount_value REAL,
      tip_distribution TEXT,
      currency TEXT,
      total_raw REAL,
      total_calculated REAL,
      group_id TEXT,
      FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS bill_items (
      id TEXT PRIMARY KEY,
      bill_id TEXT NOT NULL,
      name TEXT NOT NULL,
      quantity REAL NOT NULL,
      price REAL NOT NULL,
      total_price REAL NOT NULL,
      FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS assignments (
      bill_item_id TEXT NOT NULL,
      participant_id TEXT NOT NULL,
      share REAL NOT NULL,
      PRIMARY KEY (bill_item_id, participant_id),
      FOREIGN KEY (bill_item_id) REFERENCES bill_items(id) ON DELETE CASCADE,
      FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
    );
  `);
};
