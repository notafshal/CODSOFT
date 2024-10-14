import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  userId?: any;
}
const getTokenFrom = (req: Request) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

const verifyToken = async (
  req: AuthRequest,
  res: any,
  next: NextFunction
): Promise<void> => {
  const token = getTokenFrom(req);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: JWT_KEY not defined." });
  }
  try {
    const decoded = jwt.verify(token, jwtKey) as JwtPayload;

    req.userId = decoded.id;
  } catch (err) {
    res.json(err);
  }
  next();
};

export default verifyToken;
