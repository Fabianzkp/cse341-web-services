// const routes = require('express').Router();
// const lesson1Controller = require('../controllers/lesson1');

// routes.get('/', lesson1Controller.ananaRoute);

// routes.get('/fabian', lesson1Controller.fabianRoute);

// module.exports = routes;  // Export the routes to be used in server.js 


const router = require('express').Router(); 
const lessonController = require('../controllers/lesson1');

router.get('/', lessonController.greet);

module.exports = router;  // Export the routes to be used in server.js