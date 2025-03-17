// This file is the main router for the application. It will contain all the routes for the application.
const router = require("express").Router();
const lessonController = require("../controllers/lesson1");

router.get("/", lessonController.greet);

module.exports = router; // Export the routes to be used in server.js
