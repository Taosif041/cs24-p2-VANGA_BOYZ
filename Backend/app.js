require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const connectDB = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/auth', authRoutes);

// Use authMiddleware before userRoutes
app.use(authMiddleware);
app.use('/user', userRoutes); // Use userRoutes

// Middleware for handling undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not defined' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));