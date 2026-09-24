require('dotenv').config();
const mongoose = require('mongoose');

let memoryServer = null;

async function connectDB() {
  const useMemory = process.env.USE_MEMORY_SERVER === 'true';
  let uri = process.env.MONGO_URI;

  // Try real MongoDB first unless forced to memory
  if (!useMemory && uri) {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected:', mongoose.connection.host, '/', mongoose.connection.name);
      return;
    } catch (err) {
      console.warn('MongoDB connection failed:', err.message);
      console.warn('Falling back to mongodb-memory-server (in-memory) for lab demo...');
    }
  }

  // Fallback to memory server
  const { MongoMemoryServer } = require('mongodb-memory-server');
  memoryServer = await MongoMemoryServer.create();
  uri = memoryServer.getUri();
  await mongoose.connect(uri);
  console.log('MongoDB connected via mongodb-memory-server:', uri);
}

async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    console.log('In-memory MongoDB stopped');
  }
}

module.exports = { connectDB, disconnectDB };
