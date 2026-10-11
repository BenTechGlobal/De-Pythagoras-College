# De-Pythagoras-College — School Website & Student Information System

A complete, production-oriented **public school website** built with **vanilla HTML5, CSS3, and JavaScript**, plus integration-ready interfaces for a secure **Student Information and Academic Results Management System**.

> **Important:** The public pages work as a static site (GitHub Pages ready). Student records, authentication, attendance, and results **require a separately hosted secure backend** for production use. Demo mode uses synthetic data only.

---

## Features

### Public Website
- Responsive homepage with animated 3D-inspired hero
- About, Academics, Admissions, Facilities, News, Contact pages
- Accessible navigation (keyboard, skip link, focus states)
- SEO meta tags, semantic HTML, favicon, robots.txt
- Print-friendly result sheet styles
- Design system: colours, typography, spacing, components

### Student / Parent Portal (Demo)
- Login with role-based redirect
- View published results (print / Save as PDF)
- Profile view (own records only in demo)

### Admin / Teacher Interfaces (Demo)
- Dashboard with stats
- Student list with search/filter
- Attendance register with summaries
- Results overview and configurable grading scale display

### Architecture
- Clear separation: static public site vs protected API
- Central config (`js/config.js`)
- Documented API contract for backend integration
- Security and deployment documentation

---

## Quick Start

1. Download or clone this project.
2. Open `index.html` in a modern browser, or serve the folder:
   ```bash
   python -m http.server 8080
   ```
3. Explore the public site. Use the portal login for demo dashboards.

No npm install. No build step. Edit files directly in VS Code.

---

## Demonstration Access Credentials

These credentials work **only in demo mode** with synthetic data. They are not secure and must never be used for real student records.

| Role | Username | Password | Login page |
|------|----------|----------|------------|
| Super Admin | `admin` | `Demo@Admin1` | `/portal/login.html` |
| Teacher | `j.adebayo` | `Demo@Teach1` | `/portal/login.html` |
| Student | `STU2025001` | `Demo@Stud1` | `/portal/login.html` |
| Parent | `parent.eze` | `Demo@Par1` | `/portal/login.html` |

**Access limitations:** Mock authentication and local synthetic data. No real backend. Not suitable for production or confidential information.

---

## Project Structure

```
school-website/
├── index.html
├── about.html
├── academics.html
├── admissions.html
├── facilities.html
├── news.html
├── contact.html
├── robots.txt
├── .gitignore
├── README.md
├── portal/
│   ├── login.html
│   ├── dashboard.html
│   ├── results.html
│   ├── profile.html
│   └── unauthorized.html
├── admin/
│   ├── dashboard.html
│   ├── teacher-dashboard.html
│   ├── students.html
│   ├── attendance.html
│   └── results.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   ├── responsive.css
│   ├── print.css
│   └── main.css
├── js/
│   ├── config.js
│   ├── main.js
│   ├── api.js
│   └── modules/
│       ├── auth.js
│       ├── demo-data.js
│       └── demo-api.js
├── assets/
│   ├── images/
│   ├── icons/favicon.svg
│   └── fonts/
└── docs/
    ├── architecture.md
    ├── security.md
    └── deployment.md
```

---

## Configuration

Edit `js/config.js` to customise school identity, academic session, grading scale, attendance rules, API base URL, and demo mode.

---

## Deploying the Public Site (GitHub Pages)

1. Push the contents of this folder to a GitHub repository.
2. Enable GitHub Pages (Settings → Pages → Deploy from branch).
3. Site available at `https://<user>.github.io/<repo>/`.

See `docs/deployment.md` for details and backend connection steps.

---

## Backend Integration

Protected features need a server:

1. Implement API endpoints in `docs/architecture.md`.
2. Set `apiBaseUrl` and `demoMode: false` in `config.js`.
3. Enforce auth, RBAC, and record-level checks server-side.
4. Use HTTPS and secure password hashing.

---

## Security Notes

Demo login is not production authentication. Do not place real student data in static files. See `docs/security.md`.

---

## Implemented vs Limitations

| Feature | Status |
|---------|--------|
| Public responsive website | Implemented |
| Design system and animations | Implemented |
| Print-ready result sheets | Implemented (CSS) |
| Demo portal and admin UI | Implemented |
| Mock auth and synthetic data | Implemented |
| Real multi-user auth | Requires backend |
| Persistent attendance/results | Requires backend |
| Full score entry workflow | UI shell; needs backend |

---

## Testing Performed

- Public pages load and navigate (local/static server).
- Responsive CSS media queries applied.
- Contact form client-side validation works.
- Demo login redirects by role.
- Student results render; print styles present.
- Demo API enforces simple record-level checks.
- prefers-reduced-motion respected.
- No mandatory external CDNs or API keys.

Backend integration tests and full Lighthouse audits require deployment and a live API.

---

## Next Steps

1. Replace placeholder school details.
2. Add real images under `assets/images/`.
3. Deploy public site to GitHub Pages.
4. Implement and host a secure backend; disable demo mode.
5. Security review and staff UAT.
