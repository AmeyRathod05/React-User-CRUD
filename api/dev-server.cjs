const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database" - same data as in users.ts
let users = [
  { id: 1, firstName: "Mighty", lastName: "Mouse", phoneNumber: "+3432234234", email: "mighty@mail.com" },
  { id: 3, firstName: "Ilia", lastName: "Topuria", phoneNumber: "+9999999999", email: "ilia@elmatador.com" },
  { id: 4, firstName: "Justin", lastName: "Gatche", phoneNumber: "+7777777777", email: "justin@highlight.com" },
  { id: 5, firstName: "Alex", lastName: "Perera", phoneNumber: "+1231231231", email: "alex@chama.com" },
  { id: 6, firstName: "Jon", lastName: "Jones", phoneNumber: "+1231231233", email: "jonny@bones.com" },
  { id: 7, firstName: "Conor", lastName: "Mcgregor", phoneNumber: "+7777777777", email: "conor@thenotorious.com" },
  { id: 8, firstName: "Merab", lastName: "Dvalishvili", phoneNumber: "+3433443441", email: "merab@themachine.com" }
];
let nextId = 9;

// API Routes - same logic as users.ts
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/api/users', (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  
  // Basic validation
  if (!firstName || !lastName || !phoneNumber || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newUser = {
    id: nextId++,
    firstName,
    lastName,
    phoneNumber,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id?', (req, res) => {
  const id = Number(req.params.id || req.query.id);
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { firstName, lastName, phoneNumber, email } = req.body;
  
  // Basic validation
  if (!firstName || !lastName || !phoneNumber || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  users[index] = { ...users[index], ...req.body };
  res.status(200).json(users[index]);
});

app.delete('/api/users/:id?', (req, res) => {
  const id = Number(req.params.id || req.query.id);
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users = users.filter(u => u.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/users`);
  console.log(`👥 Initial users loaded: ${users.length}`);
});
