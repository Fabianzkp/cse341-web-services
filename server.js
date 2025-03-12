// const express = require('express');
// const app = express();
// const routes = require('./routes/lesson1route');

// // Serve frontend files from "public" folder
// // app.use(express.static('public'));

// app.use('/', routes);
// app.use('/fabian', routes);

// const port = 3000;
// app.listen(process.env.PORT || port, () => {
//   console.log('Web Server is listening at port ' + (process.env.PORT || port));
// });


const express = require('express');
const app = express();
const routes = require('./routes/index');

const port = process.env.PORT || 3000;

//routes
app.use ('/', routes);

app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});