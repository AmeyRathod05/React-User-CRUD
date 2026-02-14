# React User CRUD Application

A modern React + TypeScript application for managing user records with full CRUD operations, form validation, and Vercel serverless functions for production deployment.

## 🚀 Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Form validation with Yup schema
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Vercel serverless functions for production
- ✅ Local development with Express server
- ✅ Configuration-driven form fields
- ✅ Real-time notifications
- ✅ Loading states and error handling

## 📋 Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0 or **yarn** ≥ 1.22.0
- **Git** for version control

## 🛠️ Tech Stack & Dependencies

### Frontend Dependencies
```json
{
  "react": "^19.2.0",           // React library
  "react-dom": "^19.2.0",       // React DOM renderer
  "react-hook-form": "^7.71.1", // Form management and validation
  "@hookform/resolvers": "^5.2.2", // Form validation integration
  "yup": "^1.7.1",              // Schema validation
  "axios": "^1.13.5"            // HTTP client for API calls
}
```

### Backend Dependencies (Development)
```json
{
  "express": "^4.22.1",        // Web server for local development
  "cors": "^2.8.6",            // Cross-origin resource sharing
  "@vercel/node": "^5.6.0"     // Vercel serverless function types
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^5.1.1", // Vite React plugin
  "vite": "^7.3.1",                 // Build tool and dev server
  "typescript": "~5.9.3",           // TypeScript compiler
  "tailwindcss": "^3.3.6",          // CSS framework
  "autoprefixer": "^10.4.16",       // CSS post-processor
  "postcss": "^8.4.32",             // CSS tooling
  "eslint": "^9.39.1",              // Code linting
  "concurrently": "^8.2.2"          // Run multiple scripts
}
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AmeyRathod05/React-User-CRUD.git
cd React-User-CRUD/user-crud-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

This command starts:
- **Frontend**: React app on `http://localhost:5173`
- **Backend API**: Express server on `http://localhost:3001`

### 4. Open in Browser
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
user-crud-app/
├── src/                    # React frontend source code
│   ├── components/         # React components
│   │   ├── UserForm.tsx    # User creation/editing form
│   │   ├── UserTable.tsx   # Users list table
│   │   └── Notifications.tsx # Toast notifications
│   ├── config/             # Configuration files
│   │   └── userFields.ts   # Form field definitions
│   ├── types/              # TypeScript type definitions
│   │   └── user.ts         # User interface
│   └── App.tsx             # Main application component
├── api/                    # API endpoints
│   ├── users.ts            # Vercel serverless function (production)
│   └── dev-server.cjs      # Express server (development)
├── public/                 # Static assets
├── vercel.json            # Vercel deployment configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development (starts both frontend and API server)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Deploy to Vercel
npm run deploy

# Run API server only (for testing)
npm run api:dev
```

## 🧪 Testing the Application

### Manual Testing Steps

1. **Load Users**: Verify the user list loads with initial data
2. **Create User**: 
   - Fill in all form fields
   - Click "Create User"
   - Verify user appears in the list
3. **Edit User**:
   - Click "Edit" on any user
   - Modify user details
   - Click "Update User"
   - Verify changes are reflected
4. **Delete User**:
   - Click "Delete" on any user
   - Confirm deletion
   - Verify user is removed from list

### API Endpoints Testing

```bash
# Get all users
curl http://localhost:3001/api/users

# Create a new user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","phoneNumber":"+1234567890","email":"john@example.com"}'

# Update a user
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","phoneNumber":"+0987654321","email":"jane@example.com"}'

# Delete a user
curl -X DELETE http://localhost:3001/api/users/1
```

## 🔧 Configuration

### Adding New Form Fields

Edit `src/config/userFields.ts`:

```typescript
export const userFields: FieldConfig[] = [
  // ... existing fields ...
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: 'YYYY-MM-DD',
    required: false,
    validation: yup.string()
      .nullable()
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
  }
];
```

### Environment Variables

Create `.env.local` for local development:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects the configuration
   - Click "Deploy"

### Manual Build

```bash
# Build the application
npm run build

# The build output is in the `dist/` folder
# Deploy this folder to any static hosting service
```

## 🔄 Development vs Production

| Feature | Development | Production (Vercel) |
|---------|-------------|-------------------|
| API Server | Express (`dev-server.cjs`) | Serverless Functions (`users.ts`) |
| Data Storage | In-memory | In-memory (resets on deploy) |
| URL | `http://localhost:3001/api` | `/api` (same domain) |
| Hot Reload | ✅ Available | ❌ Not applicable |

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module 'express'"**
   ```bash
   npm install express cors
   ```

2. **"API calls not working"**
   - Ensure both servers are running (`npm run dev`)
   - Check browser console for errors
   - Verify API endpoints in Network tab

3. **"Edit/Delete not working in production"**
   - Fixed in latest update - both path and query parameters supported

4. **"Blank page on load"**
   - Check if both frontend and API servers are running
   - Verify no JavaScript errors in console

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=* npm run dev
```

## 📄 License

This project is for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Open an issue on GitHub

---

**Live Demo**: https://react-user-crud-lyart.vercel.app/
