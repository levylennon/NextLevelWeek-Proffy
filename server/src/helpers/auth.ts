import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");


// I need declare a new interface, but the userId needs be declared
export interface IRequestUser extends Request {
  userId?: string; // or any other type
}


function authenticator(Request: IRequestUser, Response: Response, next: NextFunction) {
  const authHeader = Request.headers.authorization;

  if (!authHeader) {
    return Response.status(401).send({ error: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = promisify(jwt.verify)(token, "secret");

    Request.userId = decoded.id;

    return next();
  } catch (err) {
    return Response.status(401).send({ error: "Token invalid" });
  }
};

export default authenticator;