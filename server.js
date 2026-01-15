const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const db = require("./db/connection.js");
const app = express();
const routes = require("./routes/index.js");

// Constants
const PORT = process.env.PORT ? process.env.PORT : 3000; // Set the port from environment variable or default to 3000

// Middleware imports
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const logger = require("morgan");

// Middlewares
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data from forms
app.use(methodOverride("_method")); // Middleware for using HTTP verbs such as PUT or DELETE
app.use(logger("dev")); // Morgan for logging HTTP requests
app.use(express.static(path.join(__dirname, "public"))); // Configures public assets folder

// Routes
app.use(routes);

// Connect to db & start server
db.on("connected", () => {
  console.clear();
  console.log(`Connected to MongoDB ${db.name}.`);
  app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
  });
});
