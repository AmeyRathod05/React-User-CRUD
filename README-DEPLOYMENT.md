# Vercel Deployment Instructions

## What Changed
- ✅ Created `api/users.ts` - Serverless function for CRUD operations
- ✅ Updated API calls from `http://localhost:3001/users` to `/api/users`
- ✅ Added `@vercel/node` dependency for TypeScript types
- ✅ Created `vercel.json` configuration
- ✅ Updated `package.json` scripts
- ✅ Removed `json-server` dependency

## Local Development
```bash
npm install
npm run dev
```
Note: API calls will fail locally since serverless functions only work on Vercel.

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite + React + API routes
6. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npm run deploy
```

## How It Works
- Frontend: Static React app served by Vercel
- Backend: Serverless functions in `/api` folder
- API: `/api/users` handles all CRUD operations
- Data: In-memory storage (resets on redeploy)

## Production URL
After deployment, your app will be available at:
`https://your-project-name.vercel.app`

## API Endpoints
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users?id=1` - Update user
- `DELETE /api/users?id=1` - Delete user

## Limitations
- Data resets when Vercel redeploys (serverless functions are stateless)
- For persistent data, consider adding a real database (MongoDB, PostgreSQL, etc.)
