const app = require('./app');
const config = require('./config/env');

const server = app.listen(config.port, () => {
  console.log(`=========================================`);
  console.log(` TechFlow Enterprise API Server Running`);
  console.log(` Environment : ${config.env}`);
  console.log(` Port        : ${config.port}`);
  console.log(` API Endpoint: http://localhost:${config.port}/api`);
  console.log(`=========================================`);
});

const shutdown = () => {
  console.log('Terminating server process...');
  server.close(() => {
    console.log('Server shut down cleanly.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
