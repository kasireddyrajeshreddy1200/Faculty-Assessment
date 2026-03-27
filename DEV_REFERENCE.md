# Development Setup & Credentials Reference

## 🔑 Current Credentials (Development Only)

**⚠️ WARNING**: These credentials should be in `.env` which is in `.gitignore` and never committed to git.

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://admin:rajesh@faculty-assessment-clus.ejxshey.mongodb.net/facultyDB
JWT_SECRET=fb093054254ad7a94758c5eacea89902ea2803be40dde0bfece27719801ff0a4
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Test User Credentials (from seed.js)
```
Admin:
  Email: admin@test.com
  Password: password123
  Role: ADMIN

Faculty:
  Email: faculty@test.com
  Password: password123
  Role: FACULTY

Evaluator:
  Email: evaluator@test.com
  Password: password123
  Role: EVALUATOR
```

---

## 🛠️ Development Environment Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- npm or yarn package manager

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example if needed)
# Edit .env with your MongoDB URI and other values

# Seed the database with test users
node seed.js
# Output: ✅ Seed data created successfully!

# Start development server
npm run dev
# Output: Server running on port 5000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file with API URL
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start React development server
npm start
# Output: Compiled successfully!
# Opens http://localhost:3000
```

---

## 🔄 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user (admin only)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/faculty-list` - Get all faculty (evaluator/admin only)

### Faculty
- `GET /api/faculty/profile` - Get faculty profile
- `PUT /api/faculty/profile` - Update faculty profile
- `GET /api/faculty/:id` - Get specific faculty

### Contributions
- `POST /api/contributions` - Create contribution
- `GET /api/contributions` - List contributions
- `GET /api/contributions/:id` - Get contribution
- `PUT /api/contributions/:id` - Update contribution
- `DELETE /api/contributions/:id` - Delete contribution

### Evaluations
- `POST /api/evaluations` - Create evaluation
- `GET /api/evaluations` - List evaluations
- `PUT /api/evaluations/:id` - Update evaluation

### Reports
- `GET /api/reports/faculty/:facultyId` - Faculty report
- `GET /api/reports/category/:category` - Category report
- `GET /api/reports/system` - System report

---

## 🧪 Testing the Application

### Test Login Flow
1. Navigate to http://localhost:3000
2. Use test credentials (see above)
3. Should redirect to appropriate dashboard
4. Token should be stored in localStorage

### Test File Upload
1. Go to Faculty → Add Contribution
2. Upload PDF/image files
3. Check backend/uploads/contributions/ folder

### Verify JWT Token
1. Open browser DevTools → Application → Local Storage
2. Find `token` entry
3. Copy token and decode at https://jwt.io (paste in Encoded section)
4. Should see payload: `{ id, role, iat, exp }`

---

## 🔐 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | Database connection | mongodb+srv://username:password@cluster... |
| JWT_SECRET | Token signing key | cryptographic hash |
| CLIENT_URL | Frontend URL for CORS | http://localhost:3000 |
| REACT_APP_API_URL | API base URL for frontend | http://localhost:5000/api |

---

## 📝 Common Issues & Solutions

### "MongoDB connection failed"
- Check `MONGO_URI` in `.env` is correct
- Verify IP address is whitelisted in MongoDB Atlas
- Ensure database user password is correct

### "CORS error" when calling API from frontend
- Check `CLIENT_URL` in backend `.env` matches frontend URL
- Clear browser cache and localStorage
- Restart both frontend and backend

### "Invalid token" error
- Tokens expire after 1 day
- Clear localStorage and re-login
- Check JWT_SECRET hasn't changed

### Port already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

