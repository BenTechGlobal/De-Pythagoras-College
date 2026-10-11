# Architecture Overview

## Dual-System Design

This project separates two concerns:

1. **Public website** — Marketing pages (home, about, academics, admissions, facilities, news, contact). Suitable for static hosting (e.g. GitHub Pages).
2. **Private management system** — Student records, attendance, results, authentication, role-based access. Requires a secure backend and must not rely on frontend JavaScript alone for security.

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Pages / CDN                    │
│  index.html · about · academics · admissions · contact   │
│  Static assets (CSS, JS public, images)                  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ API calls (HTTPS)
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Secure Backend (separate host)              │
│  Authentication · Authorization · Business logic         │
│  PostgreSQL / MySQL · Session store · Audit logs         │
└─────────────────────────────────────────────────────────┘
```

## Frontend Stack

- HTML5 (semantic structure)
- CSS3 (custom design system, responsive, print styles, animations)
- Vanilla JavaScript (ES6+)

No React, Vue, Angular, jQuery, Bootstrap, Tailwind, or build tools.

## Configuration

Central configuration lives in `js/config.js`:

- School identity (name, address, contact)
- Academic session, terms, grading scale, assessment structure
- Attendance rules (school open time)
- API base URL and `demoMode` flag

## Demo Mode vs Production

| Aspect | Demo Mode (`CONFIG.demoMode = true`) | Production |
|--------|--------------------------------------|------------|
| Auth | Client-side check against synthetic users | Server-side sessions / JWT |
| Data | `js/modules/demo-data.js` | Database |
| Security | Illustrative only | Full server-side enforcement |
| Hosting | Static files only | Frontend + API server |

## API Interface (Integration Contract)

When connecting a backend, implement these endpoints (JSON):

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate; return user + token |
| POST | `/auth/logout` | Invalidate session |
| POST | `/auth/change-password` | Password change |
| GET | `/students` | List (filtered, paginated) |
| GET | `/students/:id` | Single student (record-level auth) |
| POST | `/students` | Create |
| PUT | `/students/:id` | Update |
| GET | `/attendance` | Query attendance |
| POST | `/attendance` | Mark / correct |
| GET | `/results/:studentId` | Results for session/term |
| POST | `/results/scores` | Submit scores |
| POST | `/results/publish` | Publish approved results |
| GET | `/classes` | Class list |
| GET | `/subjects` | Subject list |
| GET | `/dashboard/stats` | Aggregate stats |

Set `CONFIG.apiBaseUrl` to the API origin and `CONFIG.demoMode = false`.

## Recommended Backend Stack

- **Runtime:** Node.js (Express/Fastify) or Python (FastAPI) or PHP (Laravel)
- **Database:** PostgreSQL (preferred) or MySQL
- **Auth:** Server-side sessions (httpOnly cookies) or short-lived JWT + refresh
- **Password hashing:** Argon2id or bcrypt (cost factor ≥ 12)
- **Hosting:** Railway, Render, Fly.io, DigitalOcean, or institutional VPS with HTTPS

Do not store secrets in frontend code or public repositories.
