require("dotenv").config();

const apiKeyMiddleware = (req, res, next) => {
  const providedKey = req.headers["apikey"]; // Extract API key from headers
  const validApiKey = process.env.API_KEY; // Get the stored API key from .env

  if (!providedKey || providedKey !== validApiKey) {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = apiKeyMiddleware;
