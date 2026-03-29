# 🏥 SehatSaathi — Your Healthcare Super App

A full-stack MERN healthcare application combining social health feed, doctor consultations, government schemes, emergency support, and AI chatbot.

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js v18+
- MongoDB running locally OR MongoDB Atlas URI
- npm or yarn

---

## 📁 Project Structure

```
SehatSaathi/
├── backend/         ← Express + MongoDB API (port 5000)
└── frontend/        ← React + Vite app (port 5173)
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Configure `.env`
The `.env` file is already created. Edit if needed:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sehatsaathi
JWT_SECRET=sehatsaathi_super_secret_jwt_key_2024
NODE_ENV=development
```

> **MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string.

### Run Backend
```bash
npm run dev       # with nodemon (auto-restart)
# OR
npm start         # plain node
```

✅ Backend runs at: `http://localhost:5000`
✅ Health check: `http://localhost:5000/api/health`

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs at: `http://localhost:5173`

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/signup` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get profile (auth required) |
| PUT | `/api/users/profile` | Update profile (auth required) |

### Posts (Feed)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/:id/like` | Like/unlike post |
| POST | `/api/posts/:id/comment` | Comment on post |
| DELETE | `/api/posts/:id` | Delete post |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors |
| POST | `/api/doctors/:id/book` | Book a session |

### Schemes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schemes` | Get schemes (supports `?age=&income=&gender=`) |

### Emergency
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/emergency` | Get nearby hospitals |

---

## 🌟 Features

| Feature | Status |
|---------|--------|
| JWT Auth (Login/Signup) | ✅ |
| Health Social Feed | ✅ |
| Like, Comment, Share | ✅ |
| Doctor Listings + Booking | ✅ |
| Government Schemes + Filters | ✅ |
| Emergency Hospitals | ✅ |
| Awareness Articles | ✅ |
| Breathing Exercise Tool | ✅ |
| AI Chatbot (Mock) | ✅ |
| Protected Routes | ✅ |
| Responsive Design | ✅ |

---

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Auth:** JWT Bearer Token

---

## 🧪 Test Accounts

Create any account via the Signup page. No pre-seeded data needed.

---

## 📦 Run Both Together (Two Terminals)

**Terminal 1 (Backend):**
```bash
cd SehatSaathi/backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd SehatSaathi/frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**
