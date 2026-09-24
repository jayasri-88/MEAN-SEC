# Deployment Guide - Capstone Student Management System

## Backend (Express + MongoDB Atlas)
1. Create Atlas cluster (you said ready) -> get URI:
   mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/meanlab?retryWrites=true&w=majority
2. Update D:\SEC\mean-lab\mean-project\backend\.env:
   PORT=3001 (Render will override with process.env.PORT)
   MONGO_URI=mongodb+srv://... (your Atlas string)
   JWT_SECRET=strong_secret_here
   USE_MEMORY_SERVER=false
   FRONTEND_URL=https://your-frontend.vercel.app
3. Test locally with Atlas:
   cd backend
   USE_MEMORY_SERVER=false npm start
   # Should log: MongoDB connected: cluster0-shard...
4. Deploy to Render:
   - New Web Service -> Connect GitHub repo (push mean-project/backend)
   - Build: npm install
   - Start: node server.js
   - Env: MONGO_URI, JWT_SECRET, FRONTEND_URL, PORT (auto)
5. Verify: curl https://your-backend.onrender.com/api/health

## Frontend (Angular)
1. Update src/environments/environment.prod.ts:
   apiUrl: 'https://your-backend.onrender.com/api'
2. Build: cd frontend && ng build
3. Deploy to Vercel / Netlify / Firebase Hosting:
   - Vercel: vercel --prod (output: dist/frontend/browser)
   - Netlify: drag dist/frontend/browser
   - Firebase: firebase init hosting -> public: dist/frontend/browser
4. Configure CORS in backend server.js: FRONTEND_URL env already handled

## Local Full-Stack (single server)
cd frontend && ng build
# backend already copies dist to backend/public/browser via build script
cd backend && npm start
# Then http://localhost:3001/ -> Angular, http://localhost:3001/api/students -> API

## Production Checklist
- [ ] Atlas network access 0.0.0.0/0 + db user
- [ ] JWT_SECRET not default
- [ ] CORS FRONTEND_URL set
- [ ] ng build succeeds (287kB)
- [ ] /api/auth/register, /api/students, /api/upload tested via Thunder Client
