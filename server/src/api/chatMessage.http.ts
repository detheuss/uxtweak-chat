import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import type { ChatMessageService, ClientChatMessageT } from '../abl/chatMessage.service';
import { ROUTE_MESSAGES, WS_EVENT_TYPES } from 'shared/const';
import { SCHEMA_POST_CHAT_MESSAGE } from './chatMessage.schema';
import type { WsEventT } from 'shared/types';

export const registerHttpRoutes = async (
  fastify: FastifyInstance,
  service: ChatMessageService,
  broadcast: (event: WsEventT) => void,
) => {
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN ?? '*',
  });

  fastify.get(ROUTE_MESSAGES, () => {
    return service.getAllMessages();
  });

  fastify.post<{ Body: ClientChatMessageT }>(
    ROUTE_MESSAGES,
    { schema: SCHEMA_POST_CHAT_MESSAGE },
    async (request, reply) => {
      const saved = service.saveMessage(request.body);
      broadcast({ type: WS_EVENT_TYPES.chat, data: saved });
      return reply.status(201).send(saved);
    },
  );

  fastify.delete<{ Params: { id: string } }>(`${ROUTE_MESSAGES}/:id`, async (request, reply) => {
    const { id } = request.params;
    service.deleteMessage(id);
    return reply.status(204).send();
  });

  fastify.delete(`${ROUTE_MESSAGES}/all`, async (request, reply) => {
    service.deleteAllMessages();
    return reply.status(204).send();
  });
};
