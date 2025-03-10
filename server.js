const express = require('express');
const app = express();
const routes = require('./routes/lesson1route');

app.use('/', routes);
app.use('/fabian', routes);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});