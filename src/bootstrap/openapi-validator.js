import * as OpenApiValidator from "express-openapi-validator";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, "..", "..", "docs", "swagger.yaml"),
      validateRequests: true,
      validateResponses: true,
      operationHandlers: path.join(__dirname, "..", "controllers"),
    })
  );
};