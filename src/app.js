import express from "express";
import openapiValidator from "./bootstrap/OpenApiValidator.js";
import logger from "./logger.js";
import errorHandler from "./pairtest/lib/ErrorHandler.js";

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

openapiValidator(app);

app.use(errorHandler)

app.listen(3000, (err) => {
  if (err) throw err;
  logger.info("> Ready on localhost:3000");
});
