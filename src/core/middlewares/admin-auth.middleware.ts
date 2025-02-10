import {Request, Response, NextFunction} from "express";
import {DecodedIdToken} from "firebase-admin/auth";
import createError from "http-errors";
import {FirebaseBaseAuth} from "../firebase/auth.base";

export interface User extends DecodedIdToken {
  name: string;
  picture: string;
}

export interface CustomRequest extends Request {
  user?: User;
}

export const FirebaseAdminAuthMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(createError(401, "No ID Token provided"));
  }

  try {
    const token = authHeader.split("Bearer ")[1];
    const decodedToken: DecodedIdToken = await FirebaseBaseAuth.verifyToken(token);
    const role = await FirebaseBaseAuth.getUserRoleById(decodedToken?.uid);

    if (role !== "admin") {
      return next(createError(401, "Unauthorized user"));
    }

    req.user = decodedToken as User; // Attach decoded token to request
    next();
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Error verifying ID token: ${err.message}`);
    return next(createError(401, `Authentication failed: ${err.message}`));
  }
};
