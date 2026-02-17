const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage with demo users
global.users = [];
global.inventory = [];
global.suppliers = [];

// Create demo admin user
(async () => {
  const adminPassword = await bcrypt.hash('admin123', 12);
  const userPassword = await bcrypt.hash('user123', 12);
  
  global.users.push({
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@airline.com',
    password: adminPassword,
    department: 'operations',
    role: 'admin',
    createdAt: new Date()
  });
  
  global.users.push({
    id: '2',
    firstName: 'Demo',
    lastName: 'User',
    email: 'user@airline.com',
    password: userPassword,
    department: 'supply-chain',
    role: 'employee',
    createdAt: new Date()
  });
  
  console.log('Demo users created');
})();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Airline SCM Backend is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});