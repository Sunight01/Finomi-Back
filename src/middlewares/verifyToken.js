import jwt from "jsonwebtoken";
import config from "../config.js";

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
