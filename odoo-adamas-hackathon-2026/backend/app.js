const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/employees', employeeRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

module.exports = app;
