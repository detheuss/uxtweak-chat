import type { BaseChatMessageT } from 'shared/types';

export interface ChatMessageRowT extends BaseChatMessageT {
  author_id: string;
  author_name: string;
  author_color_name: string;
}
