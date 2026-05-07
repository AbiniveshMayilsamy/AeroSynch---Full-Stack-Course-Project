const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:3002', 
    process.env.CLIENT_URL,
    /\.vercel\.app$/
  ].filter(Boolean),
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Airline SCM Backend is running', timestamp: new Date() });
});

// DB connect + sync + seed
const { sequelize, User } = require('./models');

const seedAdmin = async () => {
  const count = await User.count();
  if (count === 0) {
    await User.bulkCreate([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@airline.com',
        password: 'admin123',
        department: 'operations',
        role: 'admin'
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'user@airline.com',
        password: 'user123',
        department: 'supply-chain',
        role: 'employee'
      }
    ], { individualHooks: true });
    console.log('✅ Demo users seeded');
  }
};

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('✅ PostgreSQL connected and tables synced');
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    console.error('❌ Full error:', JSON.stringify(err, null, 2));
    console.error('❌ DATABASE_URL set:', !!process.env.DATABASE_URL);
    console.error('❌ DB_HOST set:', !!process.env.DB_HOST);
    process.exit(1);
  });