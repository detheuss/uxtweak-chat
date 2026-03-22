import Database from 'better-sqlite3';
import { describe, it, expect, beforeEach } from 'vitest';
import { ChatMessageDb } from '../storage/chatMessage.db';
import { ChatMessageService, type ClientChatMessageT } from './chatMessage.service';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

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

function makeClientMessage(overrides: Partial<ClientChatMessageT> = {}): ClientChatMessageT {
  return {
    message: 'Hi there',
    timestamp: '2026-03-22T14:00:00.000Z',
    author: {
      id: 'user-1',
      name: 'Alice',
      avatarSrc: 'https://example.com/alice.png',
    },
    ...overrides,
  };
}

describe('ChatMessageService', () => {
  let service: ChatMessageService;

  beforeEach(() => {
    const db = new Database(':memory:');
    db.exec(SCHEMA);
    service = new ChatMessageService(new ChatMessageDb(db));
  });

  describe('saveMessage', () => {
    it('returns a SessionChatMessageT with a valid UUID', () => {
      const saved = service.saveMessage(makeClientMessage());

      expect(saved.id).toMatch(UUID_RE);
      expect(saved.message).toBe('Hi there');
      expect(saved.timestamp).toBe('2026-03-22T14:00:00.000Z');
      expect(saved.author).toEqual({
        id: 'user-1',
        name: 'Alice',
        avatarSrc: 'https://example.com/alice.png',
      });
    });

    it('generates a unique id for each message', () => {
      const a = service.saveMessage(makeClientMessage({ message: 'first' }));
      const b = service.saveMessage(makeClientMessage({ message: 'second' }));

      expect(a.id).not.toBe(b.id);
      expect(a.id).toMatch(UUID_RE);
      expect(b.id).toMatch(UUID_RE);
    });
  });

  describe('getAllMessages', () => {
    it('returns an empty array when nothing has been saved', () => {
      expect(service.getAllMessages()).toEqual([]);
    });

    it('round-trips a saved message through the DB', () => {
      const clientMsg = makeClientMessage();
      const saved = service.saveMessage(clientMsg);

      const all = service.getAllMessages();
      expect(all).toHaveLength(1);
      expect(all[0]).toEqual(saved);
    });

    it('returns messages ordered by timestamp ascending', () => {
      const early = makeClientMessage({
        message: 'early',
        timestamp: '2026-03-22T08:00:00.000Z',
      });
      const late = makeClientMessage({
        message: 'late',
        timestamp: '2026-03-22T20:00:00.000Z',
      });

      service.saveMessage(late);
      service.saveMessage(early);

      const all = service.getAllMessages();
      expect(all).toHaveLength(2);
      expect(all[0]!.message).toBe('early');
      expect(all[1]!.message).toBe('late');
    });

    it('correctly maps flat DB rows back to nested SessionChatMessageT', () => {
      const clientMsg = makeClientMessage({
        message: 'nested check',
        author: { id: 'u-99', name: 'Zara', avatarSrc: '/zara.png' },
      });

      service.saveMessage(clientMsg);
      const [msg] = service.getAllMessages();

      expect(msg!.author).toEqual({ id: 'u-99', name: 'Zara', avatarSrc: '/zara.png' });
      expect(msg!.message).toBe('nested check');
    });
  });
});
