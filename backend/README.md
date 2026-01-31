# ChatAI - Backend

Node.js + Express backend for ChatAI SaaS application.

## Features

- 🔐 JWT Authentication
- 💾 MongoDB with Mongoose
- 💬 Chat history management
- 🤖 OpenAI API integration
- 🛡️ Helmet security headers
- ⚡ Rate limiting
- 📝 CORS enabled

## Setup

### Prerequisites

- Node.js 16+
- MongoDB local or Atlas connection string

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and update:

```bash
MONGODB_URI=mongodb://localhost:27017/chatgpt-saas
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-your-openai-key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Chat

- `POST /api/chat/create` - Create new chat
- `GET /api/chat/list` - Get user's chats
- `GET /api/chat/:id` - Get specific chat
- `DELETE /api/chat/:id` - Delete chat
- `PUT /api/chat/:id` - Update chat title
- `POST /api/chat/:id/message` - Send message and get AI response
- `POST /api/chat/:id/regenerate/:messageId` - Regenerate AI response

## Database Models

### User

- name (String)
- email (String, unique)
- password (String, hashed)
- createdAt (Date)
- updatedAt (Date)

### Chat

- userId (ObjectId, ref: User)
- title (String)
- messages (Array of Message)
  - role (user | assistant)
  - content (String)
  - timestamp (Date)
- createdAt (Date)
- updatedAt (Date)

## Security

- Password hashing with bcryptjs
- JWT token authentication
- CORS restrictions
- Helmet security headers
- Rate limiting (100 requests per 15 minutes)

## Demo Credentials

- Email: demo@example.com
- Password: demo123
