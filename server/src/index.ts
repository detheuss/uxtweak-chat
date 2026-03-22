import Fastify from 'fastify';
import { createDatabase } from './storage/connection';
import { ChatMessageDb } from './storage/chatMessage.db';
import { ChatMessageService } from './abl/chatMessage.service';
import { registerWebSocket, createBroadcast } from './api/chatMessage.ws';
import { registerHttpRoutes } from './api/chatMessage.http';

const PORT = Number(process.env.PORT ?? 3001);

const db = createDatabase('data/chat.db');
const chatMessageDb = new ChatMessageDb(db);
const chatMessageService = new ChatMessageService(chatMessageDb);

const fastify = Fastify({ logger: true });

await registerWebSocket(fastify);
const broadcast = createBroadcast(fastify);
await registerHttpRoutes(fastify, chatMessageService, broadcast);

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
