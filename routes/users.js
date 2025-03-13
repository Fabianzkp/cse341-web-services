
const router = require('express').Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingle);

module.exports = router;  // Export the routes to be used in server.js