# Student Management System — MEAN Stack Capstone
**R24MSCSL009** | Angular 21 · Express 4 · MongoDB · JWT · Multer

---

## Project Structure

```
mean-project/
├── backend/
│   ├── config/          db.js, multer.js
│   ├── middleware/       auth.js (JWT verify)
│   ├── models/           Student.js, User.js
│   ├── routes/           auth.js, students.js, upload.js
│   ├── uploads/          Multer file storage
│   ├── public/browser/   Angular build output (ng build)
│   ├── server.js
│   ├── seed.js
│   ├── .env              (gitignored)
│   ├── .env.example
│   └── api.test.http
└── frontend/
    └── src/app/
        ├── components/   header/, navbar/
        ├── pages/        home/, login/, register/, student-list/, student-form/
        ├── services/     student.ts, auth.ts, auth-interceptor.ts
        ├── guards/       auth-guard.ts
        └── app.routes.ts
```

---

## Quick Start

**Terminal 1 — Backend (port 3001)**
```bash
cd mean-project/backend
npm install
npm start
# Uses in-memory MongoDB by default (USE_MEMORY_SERVER=true)
```

**Terminal 2 — Frontend (port 4200)**
```bash
cd mean-project/frontend
npm install
npx ng serve --port 4200
```

Open http://localhost:4200 → Register or Login → Manage Students

**Seed demo data (optional)**
```bash
cd mean-project/backend
npm run seed
# Creates: admin@sec.edu / admin123 + 3 sample students
```

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env`:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/meanlab
JWT_SECRET=change_this_in_production
USE_MEMORY_SERVER=true        # false → uses MONGO_URI / Atlas
FRONTEND_URL=                 # set in production e.g. https://your-app.vercel.app
```

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | — | Register user |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/students` | ✓ | List all students |
| POST | `/api/students` | ✓ | Add student |
| PUT | `/api/students/:id` | ✓ | Update student |
| DELETE | `/api/students/:id` | ✓ | Delete student |
| POST | `/api/upload` | ✓ | Upload file (Multer) |
| PATCH | `/api/students/:id/avatar` | ✓ | Set student avatar |
| GET | `/api/health` | — | Health check |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21 (standalone components, reactive forms) |
| Backend | Node.js + Express 4 |
| Database | MongoDB via Mongoose 8 (memory-server or Atlas) |
| Auth | JWT (jsonwebtoken 9) + bcryptjs |
| File Upload | Multer 1.4 |
| HTTP Client | Angular HttpClient + auth interceptor |

---

## Features (Experiments 5–10)

- **Exp 5** — Standalone components, interpolation, `@Input`/`@Output`, event binding
- **Exp 6** — Angular Router, reactive forms, validators
- **Exp 7** — HttpClient, StudentService CRUD, CORS
- **Exp 8** — JWT register/login, auth middleware, route guard, HTTP interceptor
- **Exp 9** — Multer file upload (`/api/upload`, `/api/students/:id/avatar`), FormData
- **Exp 10** — `ng build` production bundle, MongoDB Atlas support, static file serving

---

## Production Build (Single Server)

```bash
cd mean-project/frontend
npx ng build
# Copy dist/frontend/browser → backend/public/browser

cd ../backend
USE_MEMORY_SERVER=false npm start
# Serves API at http://localhost:3001/api
# Serves Angular SPA at http://localhost:3001/
```

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Render (backend) + Vercel/Netlify (frontend) steps.

---

## Test Accounts

| Email | Password |
|-------|----------|
| admin@sec.edu | admin123 |
| *(or register a new account via `/register`)* | |
