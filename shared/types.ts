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

export type ChatMessageDtoInT = BaseChatMessageT & {
  id: string;
  author: BaseUserT;
};

/** ID omitted, server assigns it. */
export type ChatMessageDtoOutT = Omit<BaseChatMessageT, 'id'> & { author: BaseUserT };

export type ChatMessageDisplayT = {
  display: {
    text: string[];
    name: string;
    stamp: string;
    avatar: string;
  };
  meta: {
    author: ChatMessageDtoInT['author'];
    lastTimestamp: ChatMessageDtoInT['timestamp'];
    id: string;
  };
};

export type WsEventT = {
  type: 'chat' | 'system';
  data?: ChatMessageDtoInT;
  message?: string;
};
