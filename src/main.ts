import app from './app.js';
import {PORT} from './constants/env.js';
import localStore from './localStore/index.js';
import {log} from './utils/log.js';

// Initialise local store
localStore.init();

// Start server
const server = app.listen(PORT, () => {
  log(`Listening on port ${PORT}`);
});

function handleServerStop(signal: string) {
  log(`${signal} received`);
  server.close(() => log('Server closed'));
}

process.addListener('SIGINT', handleServerStop);
process.addListener('SIGTERM', handleServerStop);
