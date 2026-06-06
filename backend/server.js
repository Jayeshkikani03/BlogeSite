const app = require('./app');
const config = require('./config/env');

const connectDB = require('./config/db');
const User = require('./models/User');

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Seed default admin user if none exists
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        email: 'admin@blogesite.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Seeded default admin user: admin@blogesite.com / admin123');
    } else {
      console.log('Admin user check: Admin already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }

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
};

startServer();
