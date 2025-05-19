import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

interface AuthenticatedRequest extends Request {
  user?: string;
}

const authMiddleware = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };
    if (!decoded.userId) {
      return res.status(401).json({ message: "Token payload invalid" });
    }
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error("Error in authMiddleware:", err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
