const express = require('express');
const sequelize = require('./src/config/db');
const routes = require('./src/routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route middleware
app.use("/api/auth",routes.auth)

// Test route
app.get('/', (req, res) => {
  res.send('Employees Management System');
});

sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
