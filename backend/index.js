const express = require('express');
const cors = require('cors');
// const authRoutes = require('./authRoutes');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/companies/123/participants', (req, res) => {
  const data = { message: 'Hello, world!' };
  res.json(data);
});
// app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
