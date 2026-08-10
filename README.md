# Shagriha rental frontend

Next.js client for the Shagriha Spring Boot REST API.

## Local requirements

- Node.js 22 or newer
- The `shagriha_backend_services` repository running locally
- PostgreSQL and the backend environment described in that repository

## Run locally

Copy the example environment file and add a Mapbox token if map search is needed:

```bash
cp .env.example .env.local
npm ci
npm run build
npm start
```

The client runs at <http://localhost:3000>. The default API address is
<http://localhost:8080/api/v1/>. Start the Spring Boot application in a separate
terminal before signing up or signing in.

JWT authentication is handled by `POST /auth/signup` and `POST /auth/login`.
Authenticated screens validate the token with `GET /auth/me`. The access token
is stored in browser local storage so a page refresh remains signed in; signing
out removes it.

To work on UI without a backend, set `NEXT_PUBLIC_DEMO_MODE=true`. Demo mode is
off by default so local builds exercise the real REST endpoints.

## Development

```bash
npm run dev
```

Run `npm run lint` before submitting changes.
