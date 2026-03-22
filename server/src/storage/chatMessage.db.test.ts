import Database from 'better-sqlite3';
import { describe, it, expect, beforeEach } from 'vitest';
import { ChatMessageDb } from './chatMessage.db';
import type { ChatMessageRowT } from '../types/types';

const SCHEMA = `
  CREATE TABLE chat_messages (
    id              TEXT PRIMARY KEY,
    message         TEXT NOT NULL,
    timestamp       TEXT NOT NULL,
    author_id       TEXT NOT NULL,
    author_name     TEXT NOT NULL,
    author_avatar_src TEXT NOT NULL
  )
`;

function makeRow(overrides: Partial<ChatMessageRowT> = {}): ChatMessageRowT {
  return {
    id: 'msg-1',
    message: 'Hello world',
    timestamp: '2026-03-22T12:00:00.000Z',
    author_id: 'user-1',
    author_name: 'Alice',
    author_avatar_src: 'https://example.com/alice.png',
    ...overrides,
  };
}

describe('ChatMessageDb', () => {
  let chatMessageDb: ChatMessageDb;

  beforeEach(() => {
    const db = new Database(':memory:');
    db.exec(SCHEMA);
    chatMessageDb = new ChatMessageDb(db);
  });

  it('getAll returns an empty array when no messages exist', () => {
    expect(chatMessageDb.getAll()).toEqual([]);
  });

  it('save persists a row and getAll retrieves it', () => {
    const row = makeRow();
    chatMessageDb.save(row);

    const rows = chatMessageDb.getAll();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual(row);
  });

  it('getAll returns rows ordered by timestamp ascending', () => {
    const early = makeRow({ id: 'msg-early', timestamp: '2026-03-22T08:00:00.000Z' });
    const late = makeRow({ id: 'msg-late', timestamp: '2026-03-22T20:00:00.000Z' });

    chatMessageDb.save(late);
    chatMessageDb.save(early);

    const rows = chatMessageDb.getAll();
    expect(rows).toHaveLength(2);
    expect(rows[0]!.id).toBe('msg-early');
    expect(rows[1]!.id).toBe('msg-late');
  });

  it('save rejects a duplicate primary key', () => {
    const row = makeRow();
    chatMessageDb.save(row);

    expect(() => chatMessageDb.save(row)).toThrow();
  });

  it('round-trips all fields exactly', () => {
    const row = makeRow({
      id: 'uuid-abc',
      message: 'Special chars: <>&"\'',
      timestamp: '2026-01-01T00:00:00.000Z',
      author_id: 'u-42',
      author_name: 'Bob',
      author_avatar_src: '/img/bob.webp',
    });

    chatMessageDb.save(row);
    expect(chatMessageDb.getAll()[0]).toEqual(row);
  });
});
