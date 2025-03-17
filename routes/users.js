// const router = require("express").Router();
// const userController = require("../controllers/usersController");

// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getSingle);

// module.exports = router; // Export the routes to be used in server.js

const router = require("express").Router();
const userController = require("../controllers/usersController");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 */
router.get("/:id", userController.getSingle);

module.exports = router; // Export the routes to be used in server.js
