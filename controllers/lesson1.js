const greet =
  ("/",
  (req, res) => {
    res.send("Hello World");
  });

module.exports = {
  greet,
}; // Export the routes to be used in server.js
