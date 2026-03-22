import type { USER_COLOR_NAMES } from './constants';

export type UserColorNameT = (typeof USER_COLOR_NAMES)[number];

export type UserT = {
  name: string;
  id: string;
  colorName: UserColorNameT;
};

export type ChatMessageT = {
  id: string;
  message: string;
  timestamp: string;
  author: UserT;
};

export type ClientChatMessageT = Omit<ChatMessageT, 'id'>;

export type WsEventT =
  | { type: 'system'; message: string }
  | { type: 'chat'; data: ChatMessageT };
