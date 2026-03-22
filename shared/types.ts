export type BaseUserT = {
  name: string;
  id: string;
  avatarSrc: string;
};

export type BaseChatMessageT = {
  id: string;
  message: string;
  timestamp: string;
};

export interface SessionChatMessageT extends BaseChatMessageT {
  author: BaseUserT;
}

export type WsEventT =
  | { type: 'system'; message: string }
  | { type: 'chat'; data: SessionChatMessageT };
