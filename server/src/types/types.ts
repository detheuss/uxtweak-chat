import type { BaseChatMessageT } from 'shared/types';

export type ChatMessageRowT = BaseChatMessageT & {
  author_id: string;
  author_name: string;
  author_avatar_src: string;
};
