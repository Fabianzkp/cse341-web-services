require("dotenv").config(); // Load environment variables
const connectDB = require("./data/database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const userRoutes = require("./routes/users");
const templesRoutes = require("./routes/temples");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve Swagger JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", routes);
app.use("/users", userRoutes);
app.use("/temples", templesRoutes);

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
  });
}).catch(err => {
  console.error("Failed to connect to the database", err);
});