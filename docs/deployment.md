# Deployment Guide

## Public Website → GitHub Pages

1. Create a GitHub repository (e.g. `school-website`).
2. Push the project contents (the files inside `school-website/`) to the repository root or a `docs/` folder.
3. In repository **Settings → Pages**:
   - Source: Deploy from a branch
   - Branch: `main` (or `gh-pages`), folder `/` or `/docs`
4. After a few minutes the site is available at `https://<user>.github.io/<repo>/`.
5. Optional: add a custom domain and enforce HTTPS.

### Important

- Only public marketing pages should be indexed.
- `robots.txt` already disallows `/portal/` and `/admin/`.
- Do not commit real student data, passwords, or `.env` files.

## Local Preview

Open `index.html` directly in a modern browser, or use any static file server:

```bash
# Python
python -m http.server 8080

# VS Code Live Server extension
```

No build step is required.

## Connecting a Backend

1. Deploy your API server with HTTPS.
2. Configure CORS to allow your GitHub Pages origin (or serve the frontend from the same domain).
3. Edit `js/config.js`:
   ```js
   apiBaseUrl: "https://api.yourschool.edu.ng/v1",
   demoMode: false
   ```
4. Implement the endpoints described in `docs/architecture.md`.
5. Use environment variables for database URLs, session secrets, and SMTP credentials — never hardcode them.

## Environment Variables (Backend Example)

```
DATABASE_URL=postgresql://...
SESSION_SECRET=<long-random-string>
NODE_ENV=production
CORS_ORIGIN=https://yourschool.github.io
```

## Checklist Before Going Live

- [ ] Replace all placeholder school details
- [ ] Remove or disable demo credentials
- [ ] Set `demoMode: false` and valid `apiBaseUrl`
- [ ] Confirm HTTPS and security headers
- [ ] Verify role and record-level access tests
- [ ] Ensure no real student data is in the public repo
- [ ] Test print layouts for result sheets
- [ ] Test responsive layouts and keyboard navigation
