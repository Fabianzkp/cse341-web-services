// const ananaRoute = ('/', (req, res) => {
//     res.send("Hello and welcome to the web server Anana");
//   });

// const fabianRoute = ('/fabian', (req, res) => {
//     res.send("Hello Fabian");
//   }); 

// module.exports = {
//     ananaRoute,
//     fabianRoute
// };   // Export the routes to be used in server.js

const greet = ('/', (req, res) => {
    res.send("Hello World");  
  });

module.exports = {
    greet
};   // Export the routes to be used in server.js