// src/app.js

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db'); // updated this line
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json()); // for parsing application/json
app.use('/auth', authRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));