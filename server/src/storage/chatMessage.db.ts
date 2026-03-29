import type Database from 'better-sqlite3';
import type { ChatMessageRowT } from '../types/types';

export class ChatMessageDb {
  private insertStmt: Database.Statement;
  private selectAllStmt: Database.Statement;
  private deleteByIdStmt: Database.Statement;
  private deleteAllStmt: Database.Statement;

  constructor(db: Database.Database) {
    this.insertStmt = db.prepare(`
      INSERT INTO chat_messages (id, message, timestamp, author_id, author_name, author_avatar_src)
      VALUES (@id, @message, @timestamp, @author_id, @author_name, @author_avatar_src)
    `);

    this.selectAllStmt = db.prepare('SELECT * FROM chat_messages ORDER BY timestamp ASC');
    this.deleteByIdStmt = db.prepare('DELETE FROM chat_messages WHERE id = @id');
    this.deleteAllStmt = db.prepare('DELETE FROM chat_messages');
  }

  save(row: ChatMessageRowT): void {
    this.insertStmt.run(row);
  }

  getAll(): ChatMessageRowT[] {
    return this.selectAllStmt.all() as ChatMessageRowT[];
  }

  deleteById(id: string): void {
    this.deleteByIdStmt.run({ id });
  }

  deleteAll(): void {
    this.deleteAllStmt.run();
  }
}
