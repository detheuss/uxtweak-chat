import { randomUUID } from 'node:crypto';
import type { ChatMessageDtoOutT, ChatMessageDtoInT } from 'shared/types';
import { sanitizeChatMessageText } from 'shared/utils';
import type { ChatMessageDb } from '../storage/chatMessage.db';
import type { ChatMessageRowT } from '../types/types';

export type { ChatMessageDtoOutT as ClientChatMessageT };

export class ChatMessageService {
  constructor(private chatMessageDb: ChatMessageDb) {}

  saveMessage(clientMsg: ChatMessageDtoOutT): ChatMessageDtoInT {
    const id = randomUUID();
    const message = sanitizeChatMessageText(clientMsg.message);

    const row: ChatMessageRowT = {
      id,
      message,
      timestamp: clientMsg.timestamp,
      author_id: clientMsg.author.id,
      author_name: clientMsg.author.name,
      author_avatar_src: clientMsg.author.avatarSrc,
    };

    this.chatMessageDb.save(row);

    return { id, ...clientMsg, message };
  }

  getAllMessages(): ChatMessageDtoInT[] {
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

  deleteMessage(id: string): void {
    this.chatMessageDb.deleteById(id);
  }

  deleteAllMessages(): void {
    this.chatMessageDb.deleteAll();
  }
}
