# Uxtweak Chat

Real-time chat - Quasar (Vue 3 + TypeScript) client, Fastify + WebSockets + SQLite server.

**Philosophy** - lean on the Quasar stack (components, layout, plugins, conventions) and only add other libraries when there is a clear need. Avoid piling on frameworks or tools.

## Setup

```bash
npm install
```

## Commands

- **`npm run dev`** - client + server (API/WS default: `localhost:3001`)
- **`npm run dev:network`** - LAN IP so you can chat from multiple devices on the same network
- **`npm run test`** - Vitest (server)

## Known limitations (intentional for this demo)

I skipped the following features intentionally. I’m aware of their importance in prod, however my focus for this demo was on clean structure rather than full product coverage as instructed:

- No pagination - messages load in full instead of in chunks.
- No reconnection recovery - if the WebSocket drops, a page reload is required to resync messages.
- Mobile UX - tapping send may dismiss the keyboard; this would need refinement in a real app.
- Hardcoded test users only - no authentication implemented.
- No graceful server shutdown - a production setup would properly close Fastify and database connections on termination signals.
