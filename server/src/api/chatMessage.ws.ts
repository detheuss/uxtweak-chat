import websocket from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';
import type { WsEventT } from 'shared/types';

export const registerWebSocket = async (fastify: FastifyInstance) => {
  await fastify.register(websocket);

  fastify.get('/', { websocket: true }, (socket) => {
    console.log('Client connected');

    socket.send(
      JSON.stringify({
        type: 'system',
        message: 'Connected to server',
      } satisfies WsEventT),
    );

    socket.on('close', () => {
      console.log('Client disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
};

export const createBroadcast = (fastify: FastifyInstance) => (event: WsEventT) => {
  const payload = JSON.stringify(event);
  for (const client of fastify.websocketServer.clients) {
    if (client.readyState === WebSocket.OPEN) client.send(payload);
  }
};
