import {Schema} from "joi";
import {NextFunction, Request, Response} from "express";
import createError from "http-errors";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req.body, {abortEarly: false});

    if (error) {
      next(createError(400, error));
    }

    next();
  };
};
