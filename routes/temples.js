const routes = require("express").Router();
const temples = require("../controllers/temples");
const apiKeyMiddleware = require("../middlewares/auth"); // Import middleware

// Apply middleware to all temple routes
routes.use(apiKeyMiddleware);

/**
 * @swagger
 * /temples:
 *   get:
 *     summary: Get all temples
 *     description: Fetches a list of all temples from the database.
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of temples.
 *       500:
 *         description: Server error.
 */
routes.get("/", temples.findAll);

/**
 * @swagger
 * /temples/{temple_id}:
 *   get:
 *     summary: Get a specific temple
 *     description: Fetches details of a temple by its ID.
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: temple_id
 *         required: true
 *         description: The ID of the temple to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple found.
 *       404:
 *         description: Temple not found.
 *       500:
 *         description: Server error.
 */
routes.get("/:temple_id", temples.findOne);

/**
 * @swagger
 * /temples:
 *   post:
 *     summary: Add a new temple
 *     description: Creates a new temple and adds it to the database.
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the temple.
 *               location:
 *                 type: string
 *                 description: The location of the temple.
 *     responses:
 *       201:
 *         description: Temple successfully created.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error.
 */
routes.post("/", temples.create);

/**
 * @swagger
 * /temples/{temple_id}:
 *   put:
 *     summary: Update a temple
 *     description: Updates a temple's details.
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: temple_id
 *         required: true
 *         description: The ID of the temple to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the temple.
 *               location:
 *                 type: string
 *                 description: The new location of the temple.
 *               dedicated:
 *                 type: string
 *                 description: The dedication date.
 *     responses:
 *       200:
 *         description: Temple successfully updated.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Temple not found.
 *       500:
 *         description: Server error.
 */
routes.put("/:temple_id", temples.update);

/**
 * @swagger
 * /temples/{temple_id}:
 *   delete:
 *     summary: Delete a temple
 *     description: Removes a temple from the database.
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: temple_id
 *         required: true
 *         description: The ID of the temple to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple successfully deleted.
 *       404:
 *         description: Temple not found.
 *       500:
 *         description: Server error.
 */
routes.delete("/:temple_id", temples.delete);

module.exports = routes;
