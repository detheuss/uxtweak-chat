import { randomUUID } from 'node:crypto';
import type { SessionChatMessageT } from 'shared/types';
import type { ChatMessageDb } from '../storage/chatMessage.db';
import type { ChatMessageRowT } from '../types/types';

export type ClientChatMessageT = Omit<SessionChatMessageT, 'id'>;

export class ChatMessageService {
  constructor(private chatMessageDb: ChatMessageDb) {}

  saveMessage(clientMsg: ClientChatMessageT): SessionChatMessageT {
    const id = randomUUID();

    const row: ChatMessageRowT = {
      id,
      message: clientMsg.message,
      timestamp: clientMsg.timestamp,
      author_id: clientMsg.author.id,
      author_name: clientMsg.author.name,
      author_avatar_src: clientMsg.author.avatarSrc,
    };

    this.chatMessageDb.save(row);

    return { id, ...clientMsg };
  }

  getAllMessages(): SessionChatMessageT[] {
    return this.chatMessageDb.getAll().map((row) => ({
      id: row.id,
      message: row.message,
      timestamp: row.timestamp,
      author: {
        id: row.author_id,
        name: row.author_name,
        avatarSrc: row.author_avatar_src,
      },
    }));
  }
}
