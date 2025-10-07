# Magazynator

A very simple product management system in NestJS and Solid.

## Tech stack

### Workspace global

- pnpm package manager
- prettier for code formatting

### Frontend

- Solid
- Solid Router
- Tailwind CSS with DaisyUI
- Material Symbols

### Backend

- NestJS
- TypeORM (better-sqlite3 driver)

## Configuration

By default backend also serves SPA static files under `http://localhost:3000/`.

### Frontend

When building or running following environment variables are available:

| Name             | Default    | Description               |
| ---------------- | ---------- | ------------------------- |
| VITE_API_URL     | `/api/v1`  | Backend API URL           |
| VITE_UPLOADS_URL | `/uploads` | Backend uploads directory |

**There is no need to change anything if you're serving SPA from Nest.**

For development setup you probably want to point those variables to your backend server.\
By default `http://localhost:3000/api/v1` and `http://localhost:3000/uploads`

### Backend

| Name    | Default       | Description               |
| ------- | ------------- | ------------------------- |
| PORT    | `3000`        | Port to listen on         |
| DB_PATH | `database.db` | SQLite database location  |

## Self-hosting

```sh
# Build everything
pnpm -r build

# Now start your backend server
cd backend
pnpm start:prod
```


## Development server

```sh
cd frontend
export VITE_API_URL="http://localhost:3000/api/v1"
export VITE_UPLOADS_URL="http://localhost:3000/uploads"
pnpm dev
```

```sh
cd backend
pnpm start:dev
```
