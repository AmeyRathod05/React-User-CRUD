# Local Development Setup

## Problem Solved
Your app showed a blank page because Vercel serverless functions only work on Vercel, not locally. I've created a local development server that mimics Vercel's behavior.

## What I Added

### 1. Local Development Server (`api/dev-server.js`)
- Express server that runs your serverless functions locally
- Compiles TypeScript on-the-fly
- Handles the same API endpoints as Vercel

### 2. Vite Proxy Configuration
- Proxies `/api/*` calls to local server on port 3001
- Frontend runs on port 5173, API on port 3001

### 3. Updated Scripts
- `npm run dev` now starts both API server and frontend
- Uses `concurrently` to run both servers together

## How to Run Locally

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

You should see:
```
[0] 🚀 Local API server running on http://localhost:3001
[0] 📡 API endpoint: http://localhost:3001/api/users
[1]   VITE v7.3.1  ready in 826 ms
[1]   ➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser
Navigate to `http://localhost:5173`

Your app should now work with full CRUD functionality!

## How It Works

```
Frontend (Vite)     →    Vite Proxy    →    Local API Server
localhost:5173           /api/*           localhost:3001
```

1. Frontend makes API calls to `/api/users`
2. Vite proxy forwards to `http://localhost:3001/api/users`
3. Local Express server runs your serverless function code
4. Same logic as production Vercel functions

## Production vs Development

| Development | Production |
|-------------|------------|
| Local Express server | Vercel serverless functions |
| Port 3001 + 5173 | Single domain |
| In-memory data | In-memory data |
| Same API logic | Same API logic |

## Troubleshooting

### If you see "Cannot find module" errors:
```bash
npm install
```

### If API calls still fail:
1. Make sure both servers are running (check terminal output)
2. Check browser console for errors
3. Verify API calls go to `/api/users` not `localhost:3001`

### If port 3001 is occupied:
The server will automatically find an available port.

Now you can develop locally with the same API logic that will run in production!
