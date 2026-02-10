User CRUD Test Task

A simple React + TypeScript application for managing user records with an extensible, configuration-driven form and full CRUD operations.

Setup Instructions
Prerequisites

Node.js ≥ 18

npm / yarn / pnpm

Steps
1. Clone the repository
git clone https://github.com/AmeyRathod05/React-User-CRUD.git
cd React-User-CRUD

2. Install dependencies
npm install

3. Start the development server (In-memory API – recommended for this test)
npm run dev


Open the app in your browser:

http://localhost:5173

Alternative: Persistent Data with JSON Server
1. Install json-server (one-time)
npm install -g json-server

2. Create db.json in the project root (if not present)
{
  "users": []
}

3. Run both servers

Terminal 1

npm run dev


Terminal 2

json-server --watch db.json --port 3001


API will be available at:

http://localhost:3001/users

Build for Production / Deployment
npm run build

How to Add New Fields to the Form

The form is configuration-driven for easy extensibility.

1. Open the configuration file
src/config/userFields.ts

2. Add a new field object to the exported array
export const userFormFields = [
  // ... existing fields ...
  {
    name: "dateOfBirth",        // unique key
    label: "Date of Birth",
    type: "date",               // input type
    required: false,
    validation: {
      // Example:
      // required: "Date is required",
    }
  }
];

3. Save the file

✅ The new field will automatically:

Appear in the form with label and validation

Show in the users table

Be sent and received via the API

🚫 No changes required in:

UserForm.tsx

App.tsx

API handlers

Assumptions & Design Decisions
Mock API

Primary: In-memory data inside /api/users.ts

Vercel serverless function style

Resets on redeploy

Suitable for demo/test tasks

Secondary: JSON Server

Local development with file persistence via db.json

General Decisions

No external hosted API used

Everything runs from the same repository/deployment

Form library: react-hook-form + yup

Chosen for performance, clean validation, and dynamic fields

Data persistence not required for test task

Styling kept minimal (CSS / Tailwind)

Focus on functionality over UI polish

Error handling via basic alerts and loading states

No authentication, pagination, or sorting (out of scope)

Branch assumed: main or master

Live Demo

🔗 https://react-user-crud-lyart.vercel.app/
