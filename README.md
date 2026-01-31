# ChatAI - Full-Stack SaaS ChatGPT-like AI Chatbot

A production-ready, full-stack SaaS application featuring a modern, dark, premium UI with persistent chat history and a subtle Three.js 3D animated background.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-16+-success)
![React](https://img.shields.io/badge/react-18.2+-blue)

---

## 🚀 Features

### 💬 Chat Features

- ✅ Multiple conversations per user
- ✅ Persistent chat history (MongoDB)
- ✅ Streaming/typewriter AI responses
- ✅ Typing indicators
- ✅ Markdown support with syntax highlighting
- ✅ Copy & regenerate responses
- ✅ Delete conversations
- ✅ Auto-generated conversation titles

### 👤 Authentication

- ✅ User signup & login
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Session persistence
- ✅ Password hashing with bcryptjs

### 🎨 UI/UX Design

- ✅ Dark mode (default)
- ✅ Glassmorphism design
- ✅ Gradient backgrounds
- ✅ Smooth animations (Framer Motion)
- ✅ Responsive sidebar
- ✅ Custom scrollbars
- ✅ Modern typography

### 🌌 3D Background

- ✅ Three.js animated 3D background
- ✅ Subtle, non-distracting design
- ✅ Abstract particles & wireframe shapes
- ✅ Performance optimized

### ⚙️ SaaS-Ready Features

- ✅ Modular scalable architecture
- ✅ Environment-based configs
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Security headers (Helmet)
- ✅ CORS enabled
- ✅ MVC folder structure
- ✅ Error handling

### 🔌 AI Integration

- ✅ OpenAI-compatible API
- ✅ Pluggable AI provider
- ✅ Fallback demo responses
- ✅ API key via .env

---

## 🧠 Tech Stack

### Frontend

- **React 18.2** - UI library
- **Vite 5.0** - Build tool & dev server
- **Tailwind CSS 3.3** - Utility-first styling
- **Framer Motion 10.16** - Smooth animations
- **Three.js 0.160** - 3D graphics engine
- **Zustand 4.4** - Lightweight state management
- **React Router DOM 6.20** - Client-side routing
- **React Markdown 9.0** - Markdown rendering
- **React Syntax Highlighter 15.5** - Code highlighting
- **Axios 1.6** - HTTP client
- **Lucide React 0.296** - Icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 4.18** - Web framework
- **MongoDB 8.0** - NoSQL database
- **Mongoose 8.0** - MongoDB ODM
- **JWT 9.0** - Token-based authentication
- **Bcryptjs 2.4** - Password hashing
- **Helmet 7.1** - Security middleware
- **Express Rate Limit 7.1** - Rate limiting
- **Dotenv 16.3** - Environment variables
- **Axios 1.6** - HTTP client
- **CORS 2.8** - Cross-origin support

---

## 📁 Project Structure

```
chatgpt-saas/
│
├── 📄 Root Files
│   ├── package.json              ← Root package with npm scripts
│   └── README.md                 ← This file
│
├── 🎨 frontend/                  ← React + Vite SPA
│   ├── package.json
│   ├── vite.config.js           ← Vite configuration
│   ├── tailwind.config.js        ← Tailwind setup
│   ├── postcss.config.js         ← PostCSS setup
│   ├── index.html                ← HTML entry point
│   │
│   └── src/
│       ├── main.jsx              ← App mount point
│       ├── App.jsx               ← Root component with routing
│       ├── api.js                ← Axios API service layer
│       ├── store.js              ← Zustand global state
│       ├── index.css             ← Global styles
│       │
│       ├── components/           ← Reusable UI components
│       │   ├── Sidebar.jsx       ← Chat history & navigation
│       │   ├── ChatInput.jsx     ← Auto-expanding message input
│       │   ├── Message.jsx       ← Chat message with markdown
│       │   ├── PromptSuggestions.jsx ← Initial prompt suggestions
│       │   ├── TypingIndicator.jsx   ← Typing animation
│       │   └── ThreeDBackground.jsx  ← Three.js 3D background
│       │
│       └── pages/                ← Page-level components
│           ├── LandingPage.jsx   ← Landing page
│           ├── HomePage.jsx      ← Home with suggestions
│           ├── ChatPage.jsx      ← Main chat interface
│           ├── LogIn.jsx         ← Login authentication
│           └── SignUp.jsx        ← User registration
│
├── 🔧 backend/                   ← Node.js + Express API
│   ├── package.json
│   ├── server.js                 ← Express server (port 5000)
│   │
│   ├── models/                   ← Mongoose schemas
│   │   ├── User.js               ← User model with auth
│   │   └── Chat.js               ← Chat & message model
│   │
│   ├── routes/                   ← API endpoints
│   │   ├── auth.js               ← Authentication routes
│   │   │   ├── POST /signup      ← Register new user
│   │   │   └── POST /login       ← Authenticate user
│   │   │
│   │   └── chat.js               ← Chat management routes
│   │       ├── POST /create      ← Create new chat
│   │       ├── GET /list         ← Get user's chats
│   │       ├── GET /:id          ← Get chat with messages
│   │       ├── PUT /:id          ← Update chat title
│   │       ├── DELETE /:id       ← Delete chat
│   │       ├── POST /:id/message ← Send message & get AI response
│   │       └── POST /:id/regenerate/:messageId ← Regenerate response
│   │
│   └── utils/                    ← Utility functions
│       ├── auth.js               ← JWT utilities
│       │   ├── generateToken()   ← Create JWT
│       │   ├── verifyToken()     ← Validate JWT
│       │   └── authenticateToken middleware
│       │
│       └── ai.js                 ← AI integration
│           └── generateAIResponse() ← OpenAI API call
```

---

## 🔄 Application Flow

### User Authentication Flow

```
1. User visits landing page
   ↓
2. User clicks Sign Up → SignUp.jsx
   ├─ Enters email & password
   ├─ POST /api/auth/signup (backend)
   ├─ bcryptjs hashes password
   ├─ Stores in MongoDB (User model)
   └─ Returns JWT token
   ↓
3. Token stored in localStorage (Zustand store)
   ↓
4. User logged in → Redirects to HomePage
```

### Chat Flow

```
1. User on HomePage clicks "Start Conversation"
   ↓
2. Creates new chat (POST /api/chat/create)
   ├─ Chat document created in MongoDB
   └─ User redirected to ChatPage
   ↓
3. User types message → ChatInput component
   ↓
4. User submits message
   ├─ POST /api/chat/:chatId/message (with JWT auth)
   ├─ Message stored in MongoDB
   ├─ Backend calls OpenAI API (generateAIResponse)
   ├─ AI response streamed back
   └─ Stored in MongoDB
   ↓
5. Frontend renders conversation
   ├─ Message.jsx renders each message
   ├─ Markdown formatting applied
   ├─ Syntax highlighting for code blocks
   └─ Display with smooth animations
   ↓
6. User actions:
   ├─ Copy message → Clipboard
   ├─ Regenerate response → API call
   ├─ Delete chat → DELETE /api/chat/:chatId
   └─ View history → Sidebar component
```

### Data Flow Architecture

```
Frontend (React + Zustand)
    ↓ (API requests)
    ↓ (axios in api.js)
Backend API (Express)
    ↓
    ├─ Auth Routes (JWT verification)
    ├─ Chat Routes (CRUD operations)
    └─ AI Utils (OpenAI integration)
    ↓
Database (MongoDB)
    ├─ User Collection
    └─ Chat Collection
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 16+ (`node --version`)
- npm 8+ (`npm --version`)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key (optional for demo mode)

### Installation

1. **Navigate to project directory:**

   ```bash
   cd "c:\Users\Sakshi\OneDrive\Desktop\gpt"
   ```

2. **Install root dependencies:**

   ```bash
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Configuration

1. **Frontend Setup (.env.local in `frontend/`):**

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Backend Setup (.env in `backend/`):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatgpt-saas
   JWT_SECRET=your_jwt_secret_key_here
   OPENAI_API_KEY=your_openai_key_here (optional)
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

---

## 🎯 Running the Application

### Development Mode (Both Frontend & Backend)

```bash
npm run dev
```

This runs:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

### Individual Development

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Production Build

```bash
npm run build
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint           | Description       | Auth |
| ------ | ------------------ | ----------------- | ---- |
| POST   | `/api/auth/signup` | Register new user | ❌   |
| POST   | `/api/auth/login`  | Login user        | ❌   |

### Chat Management

| Method | Endpoint                              | Description                    | Auth   |
| ------ | ------------------------------------- | ------------------------------ | ------ |
| POST   | `/api/chat/create`                    | Create new chat                | ✅ JWT |
| GET    | `/api/chat/list`                      | Get user's chats               | ✅ JWT |
| GET    | `/api/chat/:id`                       | Get chat details               | ✅ JWT |
| PUT    | `/api/chat/:id`                       | Update chat title              | ✅ JWT |
| DELETE | `/api/chat/:id`                       | Delete chat                    | ✅ JWT |
| POST   | `/api/chat/:id/message`               | Send message & get AI response | ✅ JWT |
| POST   | `/api/chat/:id/regenerate/:messageId` | Regenerate AI response         | ✅ JWT |

### Health Check

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | `/api/health` | Server status |

---

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed with bcryptjs),
  username: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String (auto-generated),
  messages: [
    {
      role: 'user' | 'assistant',
      content: String,
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

- **Password Hashing:** bcryptjs with salt rounds
- **JWT Authentication:** Token-based auth for protected routes
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Security Headers:** Helmet.js for HTTP security headers
- **CORS:** Configured for frontend domain only
- **Environment Variables:** Sensitive data in .env files
- **Input Validation:** Server-side validation on all endpoints

---

## 📊 Performance Optimizations

- **Vite Build Tool:** Fast HMR & optimized builds
- **Code Splitting:** React Router lazy loading
- **Tree Shaking:** Unused code removal
- **3D Optimization:** Throttled Three.js rendering
- **Rate Limiting:** API abuse prevention
- **MongoDB Indexing:** Optimized queries

---

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<production-mongodb-uri>
JWT_SECRET=<strong-secret-key>
OPENAI_API_KEY=<your-api-key>
FRONTEND_URL=<your-domain.com>
```

### Deploy to Vercel (Frontend)

```bash
cd frontend
npm run build
# Deploy the 'dist' folder to Vercel
```

### Deploy to Heroku (Backend)

```bash
cd backend
# Set environment variables in Heroku dashboard
# Deploy using Heroku CLI
heroku create your-app-name
git push heroku main
```

---

## 📝 Project Features Summary

| Feature              | Status      | Details                  |
| -------------------- | ----------- | ------------------------ |
| User Authentication  | ✅ Complete | JWT + bcryptjs           |
| Chat Management      | ✅ Complete | CRUD operations          |
| AI Integration       | ✅ Complete | OpenAI API ready         |
| Persistent Storage   | ✅ Complete | MongoDB                  |
| Real-time UI Updates | ✅ Complete | Zustand state            |
| Dark Theme UI        | ✅ Complete | Tailwind + Glassmorphism |
| 3D Background        | ✅ Complete | Three.js animated        |
| Markdown Support     | ✅ Complete | With syntax highlighting |
| Rate Limiting        | ✅ Complete | 100 req/15 min           |
| Error Handling       | ✅ Complete | Server & client          |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`
- Verify MongoDB Atlas credentials if using cloud

### Port Already in Use

```bash
# Kill process using port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process using port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### npm install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Environment Variables Not Loading

- Ensure `.env` files are in correct directories
- Frontend: `.env.local` in `frontend/` root
- Backend: `.env` in `backend/` root
- Restart dev server after .env changes

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Three.js Documentation](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

---

## 📄 License

MIT License - Free to use and modify

---

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your needs.

---

## 👨‍💻 Author

Created with ❤️ as a full-stack SaaS application

**Last Updated:** January 30, 2026

---

## ✨ Quick Start Summary

```bash
# 1. Install dependencies
npm install && cd frontend && npm install && cd ../backend && npm install && cd ..

# 2. Configure .env files
# - frontend/.env.local
# - backend/.env

# 3. Start development
npm run dev

# 4. Open http://localhost:5173
# 5. Sign up and start chatting!
```

---

**For detailed information about features, API endpoints, and deployment, refer to the structured sections above.**
