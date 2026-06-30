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
