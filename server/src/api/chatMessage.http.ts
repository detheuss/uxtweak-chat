import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import type { WsEventT } from 'shared/types';
import type { ChatMessageService, ClientChatMessageT } from '../abl/chatMessage.service';

export const registerHttpRoutes = async (
  fastify: FastifyInstance,
  service: ChatMessageService,
  broadcast: (event: WsEventT) => void,
) => {
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN ?? '*',
  });

  fastify.get('/messages', () => {
    return service.getAllMessages();
  });

  fastify.post<{ Body: ClientChatMessageT }>('/messages', async (request, reply) => {
    const saved = service.saveMessage(request.body);
    broadcast({ type: 'chat', data: saved });
    return reply.status(201).send(saved);
  });
};
