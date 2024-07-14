import app from './app.js';
import {PING_ROUTE, PORT} from './constants/env.js';
import localStore from './localStore/index.js';
import {log} from './utils/log.js';

// Initialise local store
localStore.init();

// Start server
const server = app.listen(PORT, () => {
  log(`Listening on port ${PORT}`);
});

// Server pings itself to keep deployment service active
let pingItselfIntervalId: NodeJS.Timeout | null = null;

if (PING_ROUTE) {
  pingItselfIntervalId = setInterval(() => fetch(PING_ROUTE as string), 20000);
}

// Stop server
function handleServerStop(signal: string) {
  log(`${signal} received`);

  if (pingItselfIntervalId) clearInterval(pingItselfIntervalId);
  server.close(() => log('Server closed'));

  localStore.deInit();
}

process.addListener('SIGINT', handleServerStop);
process.addListener('SIGTERM', handleServerStop);
