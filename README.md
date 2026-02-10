# User CRUD Test Task

Simple React + TypeScript application for managing user records with extensible form and CRUD operations.

## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm / yarn / pnpm

### Steps
1. Clone the repository
   ```bash
   git clone https://github.com/AmeyRathod05/React-User-CRUD.git
   cd React-User-CRUD
 
Install dependencies 
Bash npm install
Start the development server (in-memory API – recommended for this test)Bashnpm run dev→ Open http://localhost:5173 

Alternative (persistent data with JSON Server):
Install json-server (one-time):Bashnpm install -g json-server
Create db.json in project root (if not present):JSON{ "users": [] }
Run both servers:Bash# In one terminal
npm run dev

# In second terminal
json-server --watch db.json --port 3001
→ API available at http://localhost:3001/users
Build for production / deploymentBashnpm run build

How to Add New Fields to the Form
The form is configuration-driven for easy extensibility.

Open src/config/userFields.ts
Add a new field object to the exported array:TypeScriptexport const userFormFields = [
  // ... existing fields ...
  {
    name: "dateOfBirth",               // unique key
    label: "Date of Birth",
    type: "date",                      // input type
    required: false,
    validation: {                      // optional yup rules
      // Example: required: "Date is required",
    }
  }
];
Save the file.

→ The new field will automatically:

Appear in the form with label and validation
Show in the users table
Be sent/received via API
No changes needed in UserForm.tsx, App.tsx or API handler

Assumptions & Design Decisions

Mock API:
Primary: In-memory data inside /api/users.ts (Vercel serverless function style) – resets on redeploy, suitable for demo/test task.
Secondary: JSON Server for local development with file persistence (via db.json).

No external hosted API used – everything runs from the same repo/deployment.
Form library: react-hook-form + yup → chosen for performance, clean validation, and ease of dynamic fields.
Data persistence: Not required for test task → in-memory is acceptable (real production would use a database).
Styling: Minimal plain CSS / Tailwind classes – focus on functionality over design.
Error handling: Basic alerts + loading states (can be improved with toasts in future).
No authentication/pagination/sorting – kept minimal per test scope.
Branch: Assumes main or master – code works with either.

Live Demo: [https://react-user-crud-lyart.vercel.app/]
