# TheMentR Backend

Production-ready Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, and Zod backend for TheMentR.

## Features

- Modular folder structure under `src/modules`
- Controller-service-repository architecture
- Mongoose ODM models
- JWT authentication and role-based access for `Admin`, `Parent`, and `Teacher`
- Zod request validation middleware
- Centralized error handling
- Pagination, filtering, search, and sorting
- Swagger UI at `/api/docs`
- Placeholder-only payment and chatbot modules, with no gateway or AI integration

## Getting Started

```bash
npm install
copy .env.example .env
npm run dev
```

Set `MONGODB_URI` and a long `JWT_SECRET` in `.env` before running the API.

## API Base

- Health: `GET /health`
- Versioned API: `/api/v1`
- Swagger: `/api/docs`

## Module Endpoints

| Module | Endpoints |
| --- | --- |
| Auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| Teachers | CRUD at `/teachers` |
| Parent Requirements | Public create at `/parent-requirements`, admin CRUD |
| Assessment Visits | Admin CRUD at `/assessment-visits` |
| AVSAR | `GET /avsar/dashboard` |
| TheMentR Online | `GET /thementr-online/teachers` |
| Olympiad | CRUD at `/olympiad/olympiads`, `/study-materials`, `/participants`, `/results` |
| Blogs | Public list/get, admin write at `/blogs` |
| Gallery | Public list/get, admin write at `/gallery` |
| Testimonials | Public list/get, admin write at `/testimonials` |
| Organogram | CRUD at `/organogram`, tree at `/organogram/tree` |
| Contact Forms | Public create at `/forms/contact`, admin management |
| Payments | Placeholder at `/payments` |
| Chatbot | Placeholder at `POST /chatbot/chat` |

## Query Support

List endpoints support:

- `page`
- `limit`
- `sort`, for example `-createdAt`
- `search`
- Exact field filters, for example `status=Verified`

## Access Rules

- Admin manages teachers, assessment visits, olympiads, content, organogram, contact forms, and AVSAR analytics.
- Parent requirements can be submitted publicly.
- Verified teacher discovery is public through TheMentR Online.
- Payment and chatbot endpoints intentionally return coming-soon messages only.

## Mentee AI Chatbot (OpenAI Integration)

Mentee is the AI educational assistant for TheMentR powered by OpenAI.

### 1. Dependencies Installed
- Official OpenAI Node.js SDK: `openai` (`^7.23.0`)

### 2. Required Environment Variables
Configure these in your backend `.env` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.6-luna
```
> **Action Required**: Paste your OpenAI API key into `OPENAI_API_KEY` in the backend `.env` file.

### 3. Model Configuration
- Current Default Model: **`gpt-5.6-luna`** (configurable via `OPENAI_MODEL`)

### 4. Running the Backend
```bash
# Start backend server with live reload
npm run dev
```

### 5. Mentee Chat Endpoint & Format
- **Endpoint**: `POST /api/mentee/chat` (also available via `POST /api/v1/mentee/chat`)
- **Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
  "message": "What is photosynthesis?"
}
```

**Response Format:**
```json
{
  "success": true,
  "reply": "Photosynthesis is the process by which green plants..."
}
```

### 6. Testing Mentee in Development
Run this `curl` command in your terminal:
```bash
curl -X POST http://localhost:5000/api/mentee/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What is photosynthesis?\"}"
```

