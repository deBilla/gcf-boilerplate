import express from "express";
import cors from "cors";
import {HttpsFunction, onRequest} from "firebase-functions/v2/https";
import {
  ResponseType,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../core/models/response/response.model";
import configurations from "../../server-config/configurations";
import {ModuleController} from "./<module>.controller";
import {validateRequest} from "../../core/middlewares/validate-request";
import {bigqueryJobSchema} from "./dto/<module>-request.dto";
import {CustomRequest, FirebaseAdminAuthMiddleware} from "../../core/middlewares/admin-auth.middleware";

const app = express();
app.use(cors());

app.use(FirebaseAdminAuthMiddleware);

const moduleController = new ModuleController();

app.post("/v1/", validateRequest(bigqueryJobSchema), async (req: CustomRequest, res) => {
  try {
    const bigqueryRequest = req.body;
    const uid = req.user?.uid;

    if (!uid) throw new Error("User ID not found !!!");

    const payload = await moduleController.createModule(
      bigqueryRequest,
    );

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(error);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

app.get("/v1/", async (req, res) => {
  try {
    const payload = await moduleController.getAll();

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

app.delete("/v1/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) throw new Error("UUID needed");
    await moduleController.deleteModule(uuid);

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: true,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

const moduleRoute: HttpsFunction = onRequest(
  configurations().httpsOptions,
  app
);
module.exports = moduleRoute;
