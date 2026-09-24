# Capstone: Student Management System - Unified MEAN Project
## R24MSCSL009 - Modern Angular 21 + Express + MongoDB + JWT + Multer

### Structure
mean-project/
+-- backend/
¦   +-- config/db.js, multer.js
¦   +-- middleware/auth.js
¦   +-- models/Student.js, User.js
¦   +-- routes/auth.js, students.js, upload.js
¦   +-- uploads/ (Multer)
¦   +-- public/browser/ (ng build output)
¦   +-- server.js (CORS, static, PORT env)
¦   +-- .env / .env.example
¦   +-- api.test.http
+-- frontend/
    +-- src/app/components/header,navbar
    +-- src/app/pages/home,student-list,student-form,login,register
    +-- src/app/services/student.ts, auth.ts, auth-interceptor.ts
    +-- src/app/guards/auth-guard.ts
    +-- src/app/app.routes.ts (authGuard on add/edit)
    +-- src/environments/environment.ts (apiUrl localhost:3001/api)
    +-- dist/frontend/browser (after ng build)

### Quick Start (Local)
# Terminal 1 - Backend 3001 (memory or Atlas)
cd mean-project/backend
npm install
npm start  # or USE_MEMORY_SERVER=false npm start for Atlas

# Terminal 2 - Frontend 4200
cd mean-project/frontend
npm install
npx ng serve --port 4200
# Then http://localhost:4200 -> Login -> Students

# Seed demo data (optional)
cd backend && npm run seed  # creates admin@sec.edu/admin123 + 3 students

### Ports
- 3001 backend API + serves Angular build at /index.html
- 4200 frontend dev (ng serve)
- 3000 Exp3, 3002 Exp2 legacy (unchanged)

### Features Implemented (Expt 5-10)
- [x] Expt5: Standalone components, interpolation, binding, @Input/@Output
- [x] Expt6: Router, reactive forms, validators
- [x] Expt7: HttpClient + StudentService CRUD, CORS
- [x] Expt8: JWT register/login, auth middleware, route guard, interceptor
- [x] Expt9: Multer upload /api/upload + /api/students/:id/avatar, FormData
- [x] Expt10: ng build (287kB), Atlas ready, CORS prod, static serve

### Test Accounts
- admin@sec.edu / admin123 (seeded)
- Or register new via /register

### Deployment
See DEPLOYMENT.md
