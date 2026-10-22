# Security Architecture

## Principles

1. **Never trust the client.** All authentication, authorisation, and data validation must be enforced on the server.
2. **Student records are confidential.** They must not appear in public static files, GitHub repositories, or client-side storage as a security boundary.
3. **Demo mode is not production.** The included mock authentication exists only for UI demonstration.

## Authentication

- Credentials verified server-side only.
- Passwords hashed with Argon2id or bcrypt; never stored in plaintext.
- Sessions: prefer httpOnly, Secure, SameSite cookies. If using tokens, keep lifetimes short and store refresh tokens securely.
- Rate-limit login attempts; consider progressive lockout.
- Invalidate sessions on logout.

## Authorisation

- Role-based access control (RBAC): Super Admin, School Admin, Teacher, Student, Parent.
- **Record-level checks:** A student may only access their own records; a parent only linked students; a teacher only assigned classes/subjects.
- Enforce on every protected API endpoint — not merely by hiding UI elements.

## Frontend Protections

- Output encoding to mitigate XSS.
- Avoid `innerHTML` with untrusted data; prefer `textContent` or sanitisation.
- CSRF tokens for state-changing requests when using cookie sessions.
- Content-Security-Policy and other security headers on the server.

## Data Protection

- Minimise collection of personal data.
- HTTPS everywhere in production.
- No secrets, API keys, or real credentials in the frontend or public repo.
- Audit logs for score changes, attendance corrections, and permission changes.
- Configurable retention and secure backup procedures.

## What This Static Demo Does NOT Provide

- Production-grade multi-user authentication
- Guaranteed isolation of student records
- Server-generated timestamps for attendance
- Protected score entry or result publication workflows
- Secure password reset

Connect a properly secured backend before handling real student data.
