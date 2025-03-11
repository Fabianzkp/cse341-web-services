const express = require('express');
const app = express();
const routes = require('./routes/lesson1route');

// Serve frontend files from "public" folder
// app.use(express.static('public'));

app.use('/', routes);
app.use('/fabian', routes);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});