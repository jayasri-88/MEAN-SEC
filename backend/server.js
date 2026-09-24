require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS for Angular dev + deployed frontend
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  process.env.FRONTEND_URL // set in production: https://your-frontend.vercel.app
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(null, true); // lab demo: allow all; restrict in prod via env
  }
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health
app.get('/', (req, res) => {
  res.json({ message: 'Student Management API running', version: 'capstone', endpoints: ['/api/auth', '/api/students', '/api/upload'] });
});
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: process.env.MONGO_URI ? 'configured' : 'missing' }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);

// Legacy /students for backward compat with Exp3/4 tests
app.use('/students', studentRoutes);

// Serve Angular build in production (when frontend dist copied to backend/public)
const publicPath = path.join(__dirname, 'public', 'browser');
app.use(express.static(publicPath));
app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/students')) return next();
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath, (err) => { if (err) next(); });
});

// Error handler for multer
app.use((err, req, res, next) => {
  if (err) return res.status(400).json({ message: err.message });
  next();
});

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Capstone API running at http://localhost:${PORT}`);
    console.log(`CORS allowed: ${allowedOrigins.join(', ')}`);
    console.log(`Mongo: ${process.env.MONGO_URI} | memory=${process.env.USE_MEMORY_SERVER} | JWT=${process.env.JWT_SECRET ? 'set' : 'missing'}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} in use. Kill: netstat -ano | findstr :${PORT} -> taskkill /PID <pid> /F  or  PORT=3005 npm start`);
      process.exit(1);
    } else throw err;
  });
});
