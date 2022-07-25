import express from "express";
import helmet from 'helmet';
import openapiValidator from "./bootstrap/OpenApiValidator.js";
import errorHandler from "./pairtest/lib/ErrorHandler.js";

const app = express();

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

openapiValidator(app);

app.use(errorHandler)

export default app