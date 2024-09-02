import jwt from "jsonwebtoken";
import config from "../config.js";

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (!auth) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  const parts = auth.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: "Invalid authorization header format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};