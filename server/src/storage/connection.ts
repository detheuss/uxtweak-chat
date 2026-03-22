import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export const createDatabase = (dbPath: string): Database.Database => {
  mkdirSync(dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id             TEXT PRIMARY KEY,
      message        TEXT NOT NULL,
      timestamp      TEXT NOT NULL,
      author_id      TEXT NOT NULL,
      author_name    TEXT NOT NULL,
      author_color_name TEXT NOT NULL
    )
  `);

  return db;
};
