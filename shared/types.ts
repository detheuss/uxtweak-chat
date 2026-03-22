import type { USER_COLOR_NAMES } from './constants';

export type UserColorNameT = (typeof USER_COLOR_NAMES)[number];

export type BaseUserT = {
  name: string;
  id: string;
  colorName: UserColorNameT;
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
