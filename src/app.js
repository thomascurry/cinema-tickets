import express from "express";
import openapiValidator from "./bootstrap/openapi-validator.js";

const app = express();

openapiValidator(app);

app.listen(3000, () => {
  console.log("== APP STARTED ON PORT 3000 ==");
});
