# User CRUD Application – React + TypeScript + Vite

Simple, extensible React-based CRUD application for managing user records.  
Built as part of a development support role test task.

Features:
- Create, Read, Update, Delete users
- Form with input validation (required fields, email & phone patterns)
- Extensible field configuration (add new fields with minimal changes)
- Mock API using in-memory data (serverless-friendly) or JSON Server
- Clean, modular structure with react-hook-form + yup

## Technologies & Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Form Library**: react-hook-form + yup (for validation)
- **HTTP Client**: axios
- **Styling**: Plain CSS / Tailwind (optional) or Material-UI (optional)
- **Mock API Options**:
  - In-memory (recommended for Vercel deployment – serverless)
  - JSON Server (for local development with persistent data)

## Dependencies

### Core (required)

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "axios": "^1.7.7",
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0",
  "yup": "^1.4.0"
}
Development (devDependencies)
JSON"devDependencies": {
  "@types/react": "^18.3.11",
  "@types/react-dom": "^18.3.1",
  "@vitejs/plugin-react": "^4.3.2",
  "typescript": "^5.6.2",
  "vite": "^5.4.8",
  "eslint": "^9.13.0",
  "@typescript-eslint/eslint-plugin": "^8.10.0",
  "@typescript-eslint/parser": "^8.10.0",
  "json-server": "^1.0.0-alpha.23"   // optional – only if using JSON Server locally
}
(Exact versions may vary slightly depending on when you created the project.)
Project Structure (main folders/files)
text├── src/
│   ├── components/
│   │   └── UserForm.tsx           ← Reusable form with config-driven fields
│   ├── config/
│   │   └── userFields.ts          ← Extensible field definitions + validation
│   ├── api/
│   │   └── users.ts               ← Serverless API handler (for Vercel)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── api/                           ← Serverless functions (Vercel)
├── db.json                        ← Optional – for JSON Server
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
└── README.md
Setup & Run Locally
Prerequisites

Node.js ≥ 18
npm / yarn / pnpm

1. Clone the repository
Bashgit clone https://github.com/AmeyRathod05/React-User-CRUD.git
cd React-User-CRUD
2. Install dependencies
Bash npm install
# or
yarn install
# or
pnpm install

Option A: Run with In-Memory API (Recommended – Vercel compatible)
Bash npm run dev

Opens http://localhost:5173 (Vite default)
Uses in-memory data stored in /api/users.ts
Data resets on server restart (normal for test/demo)

Option B: Run with JSON Server (persistent data locally)

Install json-server globally (or use npx)

Bashnpm install -g json-server
# or use npx without global install

Create or use db.json in root (example content):

JSON{
  "users": []
}

Start both frontend + mock API (recommended: use concurrently)

Add to package.json scripts (if not already there):
JSON"scripts": {
  "dev": "vite",
  "json-server": "json-server --watch db.json --port 3001",
  "start:all": "concurrently \"npm run dev\" \"npm run json-server\""
}
Then run:
Bashnpm run start:all
Or separately:
Bash# Terminal 1
npm run dev

# Terminal 2
npx json-server --watch db.json --port 3001
API will be at: http://localhost:3001/users
Frontend calls: /api/users (proxied) or change to http://localhost:3001/users in code.
