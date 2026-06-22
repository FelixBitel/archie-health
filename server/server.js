const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const initializeDatabase = require('./config/initializeDB');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Инициализация базы данных
initializeDatabase();

// Import routes
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const nutritionRoutes = require('./routes/nutrition');
const medicationRoutes = require('./routes/medication');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/medication', medicationRoutes);

// Serve static files from the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});