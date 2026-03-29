# Uxtweak Chat

Real-time chat - Quasar (Vue 3 + TypeScript) client, Fastify + WebSockets + SQLite server.

**Philosophy** - lean on the Quasar stack (components, layout, plugins, conventions) and only add other libraries when there is a clear need, and avoid piling on frameworks or tools for the same job.

## Setup

```bash
npm install
```

## Commands

- **`npm run dev`** - client + server (API/WS default: `localhost:3001`)
- **`npm run dev:network`** - LAN IP so you can chat from multiple devices on the same network
- **`npm run test`** - Vitest (server)

## Known limitations (intentional for this demo)

Focus was clean structure, not full product coverage.

- No pagination - messages load in full, not in chunks.
- No reconnection recovery - if the WebSocket drops, reload the page to sync messages.
- Mobile - tapping send can dismiss the keyboard; would need a dedicated fix in a real app.
- Hardcoded test users only - no real auth.
- No graceful server shutdown - a production setup would close Fastify and the DB on stop signals.
