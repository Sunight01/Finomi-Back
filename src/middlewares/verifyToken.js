import jwt from "jsonwebtoken";
import config from "../config.js";

// Funcion para verificar si la sesión está activa con el token de jwt.
export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (!auth) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  const parts = auth.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ status: 401, message: "Invalid authorization header format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};

export const verifyTokenAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (!auth) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  const parts = auth.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ status: 401, message: "Invalid authorization header format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
    if (decoded.role === "admin") {
      next();
    } else {
      throw new Error("No tiene permisos para acceder a esta ruta");
    }
  } catch (err) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};