import type Database from 'better-sqlite3';
import type { ChatMessageRowT } from '../types/types';

export class ChatMessageDb {
  private insertStmt: Database.Statement;
  private selectAllStmt: Database.Statement;

  constructor(db: Database.Database) {
    this.insertStmt = db.prepare(`
      INSERT INTO chat_messages (id, message, timestamp, author_id, author_name, author_avatar_src)
      VALUES (@id, @message, @timestamp, @author_id, @author_name, @author_avatar_src)
    `);

    this.selectAllStmt = db.prepare('SELECT * FROM chat_messages ORDER BY timestamp ASC');
  }

  save(row: ChatMessageRowT): void {
    this.insertStmt.run(row);
  }

  getAll(): ChatMessageRowT[] {
    return this.selectAllStmt.all() as ChatMessageRowT[];
  }
}
