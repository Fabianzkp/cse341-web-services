const mongodb = require('./data/database');
const express = require('express');
const app = express();
const routes = require('./routes/index');
const userRoutes = require('./routes/users');

const port = process.env.PORT || 3000;

//routes
app.use ('/', routes);
app.use ('/users', userRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  }

  else {
    app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`)});
    }
    });
  
