import { MAX_MESSAGE_LENGTH } from 'shared/const';

export const SCHEMA_POST_CHAT_MESSAGE = {
  body: {
    type: 'object',
    required: ['message', 'author'],
    properties: {
      message: { type: 'string', maxLength: MAX_MESSAGE_LENGTH },
      author: {
        type: 'object',
        required: ['id', 'name', 'avatarSrc'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          avatarSrc: { type: 'string' },
        },
      },
    },
  },
} as const;
