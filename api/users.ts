import type { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

// In-memory "database" (persists only during function lifetime – fine for test/demo)
let users: User[] = [
  { id: 1, firstName: "Mighty", lastName: "Mouse", phoneNumber: "+3432234234", email: "mighty@mail.com" },
  { id: 3, firstName: "Ilia", lastName: "Topuria", phoneNumber: "+9999999999", email: "ilia@elmatador.com" },
  { id: 4, firstName: "Justin", lastName: "Gatche", phoneNumber: "+7777777777", email: "justin@highlight.com" },
  { id: 5, firstName: "Alex", lastName: "Perera", phoneNumber: "+1231231231", email: "alex@chama.com" },
  { id: 6, firstName: "Jon", lastName: "Jones", phoneNumber: "+1231231233", email: "jonny@bones.com" },
  { id: 7, firstName: "Conor", lastName: "Mcgregor", phoneNumber: "+7777777777", email: "conor@thenotorious.com" },
  { id: 8, firstName: "Merab", lastName: "Dvalishvili", phoneNumber: "+3433443441", email: "merab@themachine.com" }
];
let nextId = 9;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, url } = req;

  // Debug logging
  console.log('=== API Request ===');
  console.log('Method:', method);
  console.log('URL:', url);
  console.log('Query params:', req.query);
  console.log('Headers:', req.headers);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Parse the URL to extract path parameters
    const pathname = new URL(url || '', `http://${req.headers.host}`).pathname;
    const pathParts = pathname.split('/').filter(Boolean);
    
    console.log('Pathname:', pathname);
    console.log('Path parts:', pathParts);
    
    // Extract ID from path if it exists (e.g., /api/users/1)
    const pathId = pathParts.length > 1 && pathParts[0] === 'api' && pathParts[1] === 'users' 
      ? pathParts[2] 
      : null;
    
    console.log('Path ID:', pathId);

    if (method === 'GET') {
      return res.status(200).json(users);
    }

    if (method === 'POST') {
      const { firstName, lastName, phoneNumber, email } = req.body;
      
      // Basic validation
      if (!firstName || !lastName || !phoneNumber || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newUser: User = {
        id: nextId++,
        firstName,
        lastName,
        phoneNumber,
        email
      };
      users.push(newUser);
      return res.status(201).json(newUser);
    }

    if (method === 'PUT') {
      // Handle both path parameter (/api/users/1) and query parameter (/api/users?id=1)
      const id = pathId ? Number(pathId) : Number(req.query.id);
      
      console.log('PUT - Final ID:', id);
      
      if (!id || isNaN(id)) {
        console.log('Invalid ID provided');
        return res.status(400).json({ error: 'Valid user ID is required' });
      }

      const index = users.findIndex(u => u.id === id);
      
      console.log('User index:', index);
      console.log('Available users:', users.map(u => u.id));
      
      if (index === -1) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }

      const { firstName, lastName, phoneNumber, email } = req.body;
      
      // Basic validation
      if (!firstName || !lastName || !phoneNumber || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      users[index] = { ...users[index], ...req.body };
      console.log('User updated successfully');
      return res.status(200).json(users[index]);
    }

    if (method === 'DELETE') {
      // Handle both path parameter (/api/users/1) and query parameter (/api/users?id=1)
      const id = pathId ? Number(pathId) : Number(req.query.id);
      
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid user ID is required' });
      }

      const index = users.findIndex(u => u.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      users = users.filter(u => u.id !== id);
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
