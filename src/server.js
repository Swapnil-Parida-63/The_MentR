const { app } = require('./app');
const { connectDatabase } = require('./config/database');
const { env } = require('./config/env');
require('../make_transparent');

let server;

async function bootstrap() {
  await connectDatabase();

  server = app.listen(env.PORT, () => {
    console.log(`TheMentR API running on port ${env.PORT}`);
  });
}

function shutdown(signal) {
  console.log(`${signal} received. Closing server...`);
  if (!server) process.exit(0);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  shutdown('unhandledRejection');
});

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
