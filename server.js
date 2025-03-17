require('dotenv').config(); // Load environment variables
const mongodb = require('./data/database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const routes = require('./routes/index');
const userRoutes = require('./routes/users');
const templesRoutes = require('./routes/temples');
const { swaggerUi, swaggerSpec } = require('./swagger');

const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', routes);
app.use('/users', userRoutes);
app.use('/temples', templesRoutes);

// Connect to the database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`);
      console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
    });
  }
});