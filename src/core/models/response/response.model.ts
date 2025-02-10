import {SuccessResponse} from "./entities/SuccessResponse";
import {SuccessResponseWithResults} from "./entities/SuccessResponseAsResult";
import {ErrorResponse} from "./entities/ErrorResponse";

export const ResponseType = Object.freeze({
  HTTP: "HTTP",
  CALLABLE: "CALLABLE",
});

export const sendSuccessResponse = (
  responseData: any
): SuccessResponse | any => {
  const {
    type = ResponseType.CALLABLE,
    res = null,
    params = {
      logToSD: false,
    },
    success = true,
    status = "success",
    payload,
    statusCode = 200,
    asResults = false,
  } = responseData;

  if (params.logToSD) {
    // Log to stack driver as Info.
    // eslint-disable-next-line no-console
    console.info("Response Payload : ", payload);
  }

  const data = {
    success,
    status,
    payload,
  };

  if (type === ResponseType.HTTP && !asResults) {
    return res.status(statusCode).send(new SuccessResponse(data));
  } else if (type === ResponseType.HTTP && asResults) {
    return res.status(statusCode).send(new SuccessResponseWithResults(data));
  }

  return new SuccessResponse(data);
};

export const sendErrorResponse = (responseData: any): ErrorResponse | any => {
  const {
    type = ResponseType.CALLABLE,
    res = null,
    params = {
      logToSD: false,
    },
    success = false,
    status = "error",
    payload,
    statusCode = 500,
    errorCode,
  } = responseData;

  if (params.logToSD) {
    // Log to stack driver as Info.
    // eslint-disable-next-line no-console
    console.info("An error occurred!. Error : ", payload);
  }

  const data = {
    success,
    status,
    payload,
    errorCode,
  };

  if (errorCode) {
    data["errorCode"] = errorCode;
  }

  if (type === ResponseType.HTTP) {
    return res.status(statusCode).send(new ErrorResponse(data));
  }

  return new ErrorResponse(data);
};
