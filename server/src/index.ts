import { createServer } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;

const httpServer = createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (socket: WebSocket) => {
  console.log('Client connected');

  socket.send(
    JSON.stringify({
      type: 'system',
      message: 'Connected to server',
    }),
  );

  socket.on('message', (rawMessage) => {
    const text = rawMessage.toString();

    console.log('Received:', text);

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'chat',
            message: text,
          }),
        );
      }
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
